import React, {memo, useEffect, useMemo, useRef, useState} from 'react';
import styled from 'styled-components/native';
import {Map} from '@/screens/CheckIn/components/Map';
import {Colors} from '@/themes/Colors';
import moment from 'moment';
import 'moment/locale/vi'; // ko co dong nay locale ko chay
import CameraView from '@/screens/CheckIn/components/Camera';
import {MobileClient, RawClient} from '@/types';
import {useClient} from '@/store/login';
import {Camera} from 'react-native-vision-camera';
import {useAsyncFn} from 'react-use';
import {useLocation} from '@/hooks/useLocation';
import {defaultParams} from '@/utils/formData';
import {requestCheckin} from '@/store/login/functions';
import {ActivityIndicator, Alert, Platform} from 'react-native';
import {Marker} from 'react-native-maps';
import {css} from 'styled-components';
import {RNCamera} from 'react-native-camera';

interface Props {
  selectedClient?: MobileClient;
}

export const CheckInActiveScreen = memo(({selectedClient}: Props) => {
  const [time, setTime] = useState(moment().format('HH:mm:ss'));

  const weekName = moment().locale('vi').format('dddd');

  const today = moment().format('L');

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format('HH:mm:ss'));
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const client: RawClient = useClient();

  const cameraRef = useRef<any>(null);

  const {latitude, longitude} = useLocation();

  const initialRegion = useMemo(() => {
    return latitude && longitude
      ? {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }
      : undefined;
  }, [latitude, longitude]);

  const coordinate = useMemo(() => {
    return latitude && longitude
      ? {
          latitude,
          longitude,
        }
      : undefined;
  }, [latitude, longitude]);

  const [{loading, error}, submitCheckin] = useAsyncFn(async () => {
    if (!cameraRef?.current || !latitude || !longitude || !selectedClient) {
      return null;
    }

    const photo = await cameraRef?.current.takePhoto({
      flash: 'off',
    });

    const ts = moment().unix() / 1000;
    const params = {
      access_token: client.access_token,
      client_key: client.client_key,
      lat: latitude,
      lng: longitude,
      client_id: selectedClient.id,
      photo: photo.path,
      ts,
      ...defaultParams,
    };

    console.log('params', params);
    //
    // try {
    //   const res = await requestCheckin(params);
    // } catch (error) {
    //   console.log('eee ', error);
    // }

    const res = await requestCheckin(params);

    Alert.alert(
      '',
      res
        ? 'CheckIn thành công'
        : 'CheckIn không thành công, hãy vui lòng thử lại',
      [{text: 'OK'}],
    );
  }, [latitude, longitude, cameraRef]);

  return (
    <Container>
      <DateTimeContainer>
        <Date>
          {weekName}, {today}
        </Date>
        <Time>{time}</Time>
      </DateTimeContainer>
      <Map initialRegion={initialRegion}>
        {coordinate && <Marker coordinate={coordinate} />}
      </Map>
      <CameraView ref={cameraRef} />
      {/*<RNCamera*/}
      {/*  ref={cameraRef}*/}
      {/*  type={RNCamera.Constants.Type.front}*/}
      {/*  androidCameraPermissionOptions={{*/}
      {/*    title: 'Permission to use camera',*/}
      {/*    message: 'We need your permission to use your camera',*/}
      {/*    buttonPositive: 'Ok',*/}
      {/*    buttonNegative: 'Cancel',*/}
      {/*  }}*/}
      {/*  androidRecordAudioPermissionOptions={{*/}
      {/*    title: 'Permission to use audio recording',*/}
      {/*    message: 'We need your permission to use your audio',*/}
      {/*    buttonPositive: 'Ok',*/}
      {/*    buttonNegative: 'Cancel',*/}
      {/*  }}*/}
      {/*/>*/}
      <ButtonContainer>
        <CheckInButton onPress={submitCheckin}>
          <CheckInButtonText>CHẤM CÔNG</CheckInButtonText>
          {loading && <ActivityIndicator />}
        </CheckInButton>
        <CheckInClientContainer>
          <CheckInClientText>CO - Chấm công mobile</CheckInClientText>
        </CheckInClientContainer>
      </ButtonContainer>
    </Container>
  );
});

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.white};
  margin-top: 8px;
`;

const DateTimeContainer = styled.View`
  flex: 1;
  align-items: center;
  ${Platform.select({
    ios: css`
      padding-top: 30px;
    `,
    android: css`
      padding-top: 10px;
    `,
  })};
  ${Platform.select({
    ios: css`
      margin-bottom: 0;
    `,
    android: css`
      margin-bottom: 20px;
    `,
  })};
`;

const Date = styled.Text`
  font-size: 25px;
  font-weight: 500;
  text-transform: capitalize;
  color: ${Colors.black};
`;

const Time = styled.Text`
  font-size: 45px;
  color: ${Colors.azure};
  font-weight: 600;
  padding-top: 10px;
`;

const ButtonContainer = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
  ${Platform.select({
    ios: css`
      margin-top: 10px;
    `,
    android: css`
      margin-top: 20px;
    `,
  })};
`;

const CheckInButton = styled.TouchableOpacity`
  height: 55px;
  width: 76%;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border-color: ${Colors.green2};
  border-width: 0.5px;
  margin-bottom: 15px;
  flex-direction: row;
`;

const CheckInButtonText = styled.Text`
  font-size: 20px;
  color: ${Colors.green2};
  font-weight: 500;
`;

const CheckInClientContainer = styled.TouchableOpacity`
  height: 30px;
  width: 44%;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: antiquewhite;
`;

const CheckInClientText = styled.Text`
  font-size: 13px;
  color: ${Colors.green2};
  font-weight: 400;
`;
