import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Map} from '@/screens/Checkin/components/Map';
import {Colors} from '@/themes/Colors';
import moment from 'moment';
import 'moment/locale/vi'; // ko co dong nay locale ko chay
import CameraView from '@/screens/Checkin/components/Camera';

export const CheckinActiveScreen = () => {
  const [time, setTime] = useState(moment().format('HH:mm:ss'));

  moment.locale();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format('HH:mm:ss'));
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  return (
    <Container>
      <DateTimeContainer>
        <Date>
          {moment().locale('vi').format('dddd')}, {moment().format('L')}
        </Date>
        <Time>{time}</Time>
      </DateTimeContainer>
      <MapContainer>
        <Map />
      </MapContainer>
      <CameraContainer>
        <CameraView />
      </CameraContainer>
      <ButtonContainer>
        <CheckinButton>
          <CheckinButtonText>CHẤM CÔNG</CheckinButtonText>
        </CheckinButton>
        <CheckinClientContainer>
          <CheckinClientText>CO - Chấm công mobile</CheckinClientText>
        </CheckinClientContainer>
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
  text-transform: capitalize;
  color: ${Colors.black};
`;

const Time = styled.Text`
  font-size: 40px;
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
  margin-top: -25px;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 80%;
`;

const ButtonContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const CheckinButton = styled.TouchableOpacity`
  height: 55px;
  width: 76%;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border-color: ${Colors.green2};
  border-width: 0.5px;
  margin-top: 30px;
  margin-bottom: 15px;
`;

const CheckinButtonText = styled.Text`
  font-size: 20px;
  color: ${Colors.green2};
  font-weight: 500;
`;

const CheckinClientContainer = styled.TouchableOpacity`
  height: 30px;
  width: 44%;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin-bottom: 40px;
  background-color: antiquewhite;
`;

const CheckinClientText = styled.Text`
  font-size: 13px;
  color: ${Colors.green2};
  font-weight: 400;
`;
