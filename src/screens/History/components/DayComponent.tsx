import React, {useEffect, useMemo} from 'react';
import {Colors} from '@/themes/Colors';
import styled from 'styled-components/native';
import {ScrollView, StyleSheet, TextInputProps} from 'react-native';
import Modal from 'react-native-modal';
import moment from 'moment';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {useHistory} from '@/store/history';
import useBoolean from '@/hooks/useBoolean';
import {RawHistory} from '@/types';

interface Props extends TextInputProps {
  date: any;
  isDayInMonth: boolean;
}

export const DayComponent = (props: Props) => {
  const {date, isDayInMonth} = props;

  const [modalVisible, showModalVisible, hideModalVisible] = useBoolean(false); //Khong can viet thanh ham nua

  const color = isDayInMonth ? Colors.oldSilver : Colors.gray;

  const history: RawHistory = useHistory(date);

  return (
    <>
      <Modal
        style={styles.modal}
        isVisible={modalVisible}
        hasBackdrop={true}
        statusBarTranslucent={true}
        onBackdropPress={hideModalVisible}
        onSwipeComplete={hideModalVisible}
        swipeThreshold={20}
        swipeDirection="down">
        <CenteredView>
          <ModalView>
            <InputContactContainer>
              <NoteSelectContainer>
                <NoteText>
                  {moment(date).locale('vi').format('dddd')},{' '}
                  {moment(date).format('L')}
                </NoteText>
              </NoteSelectContainer>
              <ScrollView style={styles.scroll}>
                {history?.logs.length > 0 &&
                  history?.logs.map((log, index) => (
                    <LogTime>
                      <TitleText key={index}>
                        {moment.unix(log.time).format('DD/MM')}{' '}
                        {moment.unix(log.time).format('HH:mm:ss')}
                      </TitleText>
                      <DeatailText>
                        IP: {log.ip} - Văn phòng: True Platform HQ
                      </DeatailText>
                    </LogTime>
                  ))}
              </ScrollView>
            </InputContactContainer>
          </ModalView>
        </CenteredView>
      </Modal>

      <DayContainer disabled={!isDayInMonth} onPress={showModalVisible}>
        <Date color={color}>{moment(date).format('DD/MM').toString()}</Date>
        {isDayInMonth && history?.logs.length > 0 && (
          <>
            {history?.logs.length > 0 &&
              history?.logs.map((log, index) => (
                <Time key={index}>{moment.unix(log.time).format('HH:mm')}</Time>
              ))}
          </>
        )}
      </DayContainer>
    </>
  );
};

const NoteSelectContainer = styled.View`
  border-bottom-width: 0.5px;
  border-bottom-color: ${Colors.gray2};
  height: 40px;
  justify-content: center;
`;

const NoteText = styled.Text`
  font-size: 18px;
  font-weight: 500;
  line-height: 20px;
  color: ${Colors.black};
  text-transform: capitalize;
`;

const TitleText = styled.Text`
  font-size: 15px;
  font-weight: 500;
  line-height: 20px;
  color: ${Colors.black};
`;

const DeatailText = styled.Text`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: ${Colors.oldSilver};
`;

const CenteredView = styled.View`
  align-items: center;
  padding: 0 20px;
  padding-bottom: ${getBottomSpace()}px;
  background-color: ${Colors.white};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const ModalView = styled.View`
  width: 110%;
  background-color: ${Colors.white};
  border-radius: 20px;
  padding-top: 10px;
  padding-left: 20px;
`;

const InputContactContainer = styled.View`
  background-color: ${Colors.white};
  border-radius: 15px;
  padding: 5px;
`;

const LogTime = styled.View`
  height: 64px;
  padding-top: 10px;
  border-bottom-width: 0.5px;
  border-bottom-color: ${Colors.gray2};
`;

const DayContainer = styled.TouchableOpacity`
  width: 100%;
  height: 100px;
  border-width: 0.25px;
  justify-content: flex-start;
  align-items: center;
  border-color: ${Colors.gray2};
  padding-bottom: 0;
  padding-top: 12px;
`;

const Date = styled.Text<{color: string}>`
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: ${p => p.color};
`;

const Time = styled.Text`
  font-weight: 500;
  font-size: 11px;
  line-height: 13px;
  color: ${Colors.green1};
  padding-top: 14px;
`;

const styles = StyleSheet.create({
  scroll: {
    height: 130,
  },

  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    padding: 0,
  },
});
