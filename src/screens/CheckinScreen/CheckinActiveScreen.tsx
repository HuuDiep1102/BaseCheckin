import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {MapScreen} from '@/screens/CheckinScreen/MapScreen';
import {Colors} from '@/themes/Colors';
import moment from 'moment';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {StyleSheet} from 'react-native';

export const CheckinActiveScreen = () => {
  const [time, setTime] = useState(moment().format('hh:mm:ss'));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format('hh:mm:ss'));
    }, 1000);

    // setDate(date.toLocaleDateString());

    return () => clearInterval(interval);
  }, [time]);

  // const devices = useCameraDevices();
  // const device = devices.back;

  // React.useEffect(() => {
  //   (async () => {
  //     const status = await Camera.requestCameraPermission();
  //     setHasPermission(status === 'authorized');
  //   })();
  // }, []);

  return (
    <Container>
      <DateTimeContainer>
        <Date>Thứ {moment().format('DD/MM/YYYY')}</Date>
        <Time>{time}</Time>
      </DateTimeContainer>
      <MapContainer>
        <MapScreen />
      </MapContainer>
      <CameraContainer>
        {/*<Camera*/}
        {/*  style={StyleSheet.absoluteFill}*/}
        {/*  device={device}*/}
        {/*  isActive={true}*/}
        {/*/>*/}
      </CameraContainer>
      <ButtonContainer>
        <CheckinButton>
          <CheckinButtonText>CHẤM CÔNG</CheckinButtonText>
        </CheckinButton>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.white};
  margin-top: 8px;
`;

const DateTimeContainer = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 30px;
`;

const Date = styled.Text`
  font-size: 20px;
  font-weight: 500;
`;

const Time = styled.Text`
  font-size: 35px;
  color: ${Colors.azure};
  font-weight: 600;
  padding-top: 10px;
`;

const MapContainer = styled.View`
  flex: 1;
  align-items: center;
  margin-top: -80px;
`;

const CameraContainer = styled.View`
  flex: 1;
`;

const ButtonContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const CheckinButton = styled.TouchableOpacity`
  height: 64px;
  width: 80%;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  border-color: ${Colors.green2};
  border-width: 0.5px;
`;

const CheckinButtonText = styled.Text`
  font-size: 25px;
  color: ${Colors.green2};
  font-weight: 500;
`;
