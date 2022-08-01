import {Calendar, LocaleConfig} from 'react-native-calendars';
import {StyleSheet, View} from 'react-native';
import moment from 'moment';
import {Colors} from '@/themes/Colors';
import React, {memo, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import useBoolean from '@/hooks/useBoolean';
import {useAsyncFn} from 'react-use';
import {useClient} from '@/store/login';
import {Log, RawClient} from '@/types';
import {defaultParams} from '@/utils';
import {requestGetHistory} from '@/store/history/function';
import {useHistory} from '@/store/history';

LocaleConfig.locales['vn'] = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  dayNames: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'],
  dayNamesShort: ['CN', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
};

LocaleConfig.defaultLocale = 'vn';

const themes: any = {
  textSectionTitleColor: Colors.black,
  arrowColor: Colors.oldSilver,
  weekVerticalMargin: 0,
  textDayHeaderFontSize: 13,
  textDayHeaderFontWeight: '400',
  dayTextColor: '#2d4150',
  textDisabledColor: '#d9e1e8',
  'stylesheet.calendar.header': {
    week: {
      flexDirection: 'row',
      width: '100%',
      height: 50,
      borderBottomWidth: 0.25,
      borderBottomColor: Colors.black10,
      backgroundColor: Colors.anti_flashWhite,
      justifyContent: 'space-around', //fix around over day components
    },
    dayHeader: {
      paddingTop: 17,
      textAlign: 'center',
      fontSize: 13,
      fontWeight: '400',
      color: Colors.black,
      flex: 1,
      borderWidth: 0.25,
      borderColor: Colors.gray2,
    },
  },
};

const renderHeader = () => {
  const today = moment().format('DD/MM/YYYY').toString();
  return (
    <HeaderContainer>
      <DateHeader>Ngày {today}</DateHeader>
      <DateTextHeader>(Danh sách lịch sử chấm công)</DateTextHeader>
    </HeaderContainer>
  );
};

const RenderDayComponents = ({date, selectedDate}: any) => {
  const selectedMonth = moment().month();

  const history = useHistory(date.date.dateString);

  const isDayInMonth = selectedMonth === date?.date?.month;

  const color = isDayInMonth ? Colors.oldSilver : Colors.gray;

  // const [modalVisible, setModalVisible] = useState(false);

  const [modalVisible, showModalVisible, hideModalVisible] = useBoolean(false); //Khong can viet thanh ham nua

  // const onBackdrop = useCallback(() => {
  //   hideModalVisible();
  // }, []);
  //
  // const onOpenModal = useCallback(() => {
  //   setModalVisible(true);
  // }, []);

  const Cell = ({time, ip}: Log) => {
    return (
      <WrapItem>
        <SItem>
          <STitleCell>{moment.unix(time).format('DD/MM HH:mm:ss')}</STitleCell>
          <SSubTitleCell>{`IP: ${ip}`}</SSubTitleCell>
        </SItem>
      </WrapItem>
    );
  };

  const client: RawClient = useClient();

  const [{loading}, getHistory] = useAsyncFn(async () => {
    if (!client.access_token || !client.client_key) {
      return null;
    }
    const time_start = moment(selectedDate).startOf('month').valueOf();
    const time_end = moment(selectedDate).endOf('month').valueOf();

    const payload = {
      access_token: client.access_token,
      client_key: client.client_key,
      time_start,
      time_end,
      client_id: 240,
      ...defaultParams,
    };
    await requestGetHistory(payload);
  }, [client, selectedDate]);

  useEffect(() => {
    getHistory().then();
  }, [selectedDate]);

  return (
    <>
      <Modal
        style={styles.modal}
        isVisible={modalVisible}
        hasBackdrop={true}
        statusBarTranslucent={true}
        onBackdropPress={hideModalVisible}>
        <CenteredView>
          <ModalView>
            <InputContactContainer>
              <NoteSelectContainer>
                <NoteText>Thứ Sáu, 01/07/2022</NoteText>
              </NoteSelectContainer>
              <LogTime>
                <TitleText>01/07 08:28:19</TitleText>
                <DeatailText>
                  IP: 72.12.12.43 - Văn phòng: True Platform HQ
                </DeatailText>
              </LogTime>
              <LogTime>
                <TitleText>01/07 18:00:00</TitleText>
                <DeatailText>
                  IP: 72.12.12.43 - Văn phòng: True Platform HQ
                </DeatailText>
              </LogTime>
            </InputContactContainer>
          </ModalView>
        </CenteredView>
      </Modal>

      <DayContainer disabled={!isDayInMonth} onPress={showModalVisible}>
        <Date color={color}>
          {moment(date.date).format('DD/MM').toString()}
        </Date>
        <Time>08:30</Time>
        <Time>18:00</Time>
      </DayContainer>
    </>
  );
};

export const HistoryScreen = memo(() => {
  const [selectedDate, setSelectedDate] = useState<string>(
    moment().format('YYYY-MM-DD'),
  );

  return (
    <View style={[styles.scene, styles.history]}>
      <Calendar
        style={styles.calendar}
        onDayPress={day => {
          console.log('selected day', day);
        }}
        onDayLongPress={day => {
          console.log('selected day', day);
        }}
        monthFormat={'yyyy MM'}
        onMonthChange={month => {
          console.log('month changed', month);
          setSelectedDate(month.dateString);
        }}
        disableMonthChange={true}
        firstDay={1}
        showWeekNumbers={false}
        onPressArrowLeft={subtractMonth => subtractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        renderHeader={renderHeader}
        enableSwipeMonths={false}
        dayComponent={date => (
          <RenderDayComponents date={date} selectedDate={selectedDate} />
        )}
        theme={themes}
      />
    </View>
  );
});

const DayContainer = styled.TouchableOpacity`
  width: 100%;
  height: 88.8px;
  border-width: 0.25px;
  justify-content: space-evenly;
  align-items: center;
  border-color: ${Colors.gray2};
  padding-bottom: 0;
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
`;

const HeaderContainer = styled.View`
  height: 64px;
  justify-content: center;
  align-items: center;
`;

const DateHeader = styled.Text`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: ${Colors.black};
`;

const DateTextHeader = styled.Text`
  font-weight: 400;
  font-size: 13px;
  line-height: 18px;
  color: ${Colors.oldSilver};
`;

const styles = StyleSheet.create({
  calendar: {
    width: '100%',
    paddingRight: 0,
    paddingLeft: 0,
    height: '100%',
  },

  scene: {
    flex: 1,
  },

  history: {
    backgroundColor: Colors.anti_flashWhite,
    marginTop: 8,
  },

  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    padding: 0,
  },
});

const NoteSelectContainer = styled.View`
  border-bottom-width: 0.5px;
  border-bottom-color: ${Colors.gray2};
  height: 40px;
  justify-content: center;
`;

const NoteText = styled.Text`
  font-size: 20px;
  font-weight: 700;
  line-height: 20px;
  color: ${Colors.black};
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

const WrapItem = styled.TouchableOpacity`
  padding-left: 16px;
  padding-right: 16px;
`;

const SItem = styled.View`
  padding-top: 12px;
  padding-bottom: 12px;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.anti_flashWhite};
`;

const STitleCell = styled.Text`
  font-weight: 600;
  font-size: 13px;
`;

const SSubTitleCell = styled.Text`
  font-weight: 400;
  font-size: 13px;
  color: ${Colors.oldSilver};
  margin-top: 4px;
`;
