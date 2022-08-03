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
import {defaultParams} from '@/utils';
import {requestCheckin} from '@/store/login/functions';
import {ActivityIndicator, Alert, Platform} from 'react-native';
import {Marker} from 'react-native-maps';
import {css} from 'styled-components';

export const CheckInActiveScreen = memo(
  ({selectedClient}: {selectedClient?: MobileClient}) => {
    const [time, setTime] = useState(moment().format('HH:mm:ss'));

    useEffect(() => {
      const interval = setInterval(() => {
        setTime(moment().format('HH:mm:ss'));
      }, 1000);

      return () => clearInterval(interval);
    }, [time]);

    const client: RawClient = useClient();

    const cameraRef = useRef<Camera>(null);

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

    const [{loading}, submitCheckin] = useAsyncFn(async () => {
      if (!cameraRef?.current || !latitude || !longitude) {
        return null;
      }

      console.log('client', client.client_key);

      const photo = await cameraRef?.current.takePhoto({
        flash: 'off',
      });

      const ts = moment().unix() / 1000;
      const params = {
        access_token: client.access_token,
        client_key: client.client_key,
        lat: latitude,
        lng: longitude,
        client_id: 240,
        photo: photo.path,
        ts,
        ...defaultParams,
      };

      try {
        const res = await requestCheckin(params);
      } catch (e) {
        console.log('eee ', e);
      }

      Alert.alert(
        '',
        res
          ? 'Checkin thành công'
          : 'Checkin không thành công, hãy vui lòng thử lại',
        [{text: 'OK'}],
      );
    }, [latitude, longitude, cameraRef]);

    return (
      <Container>
        <DateTimeContainer>
          <Date>
            {moment().locale('vi').format('dddd')}, {moment().format('L')}
          </Date>
          <Time>{time}</Time>
        </DateTimeContainer>
        <MapContainer>
          <Map initialRegion={initialRegion}>
            {coordinate && <Marker coordinate={coordinate} />}
          </Map>
        </MapContainer>
        <CameraContainer>
          <CameraView ref={cameraRef} />
        </CameraContainer>
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
  },
);

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.white};
  margin-top: 8px;
`;

const DateTimeContainer = styled.View`
  flex: 1;
  align-items: center;
  //padding-top: 30px;
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
      margin-bottom: 40px;
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

const MapContainer = styled.View`
  flex: 1;
  align-items: center;
  margin-top: -40px;
`;

const CameraContainer = styled.View`
  flex: 2;
  margin-left: 10%;
  justify-content: center;
  align-items: center;
  height: 120px;
  width: 80%;
  ${Platform.select({
    ios: css`
      margin-top: -45px;
    `,
    android: css`
      margin-top: -25px;
    `,
  })};
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
