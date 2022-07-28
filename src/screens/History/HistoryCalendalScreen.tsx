import {Calendar, LocaleConfig} from 'react-native-calendars';
import {StyleSheet, View, Text} from 'react-native';
import moment from 'moment';
import {Colors} from '@/themes/Colors';
import React, {useCallback, useMemo, useState} from 'react';
import styled from 'styled-components/native';

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

const renderDayComponents = (date: any) => {
  const selectedMonth = moment().month();

  const isDayInMonth = selectedMonth === date?.date?.month;

  const color = isDayInMonth ? Colors.oldSilver : Colors.gray;
  return (
    <DayContainer disabled={!isDayInMonth} onPress={() => {}}>
      <Date color={color}>{moment(date.date).format('DD/MM').toString()}</Date>
      <Time>08:30</Time>
      <Time>18:00</Time>
    </DayContainer>
  );
};

export const HistoryCalendarScreen = () => {
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
        }}
        disableMonthChange={true}
        firstDay={1}
        showWeekNumbers={false}
        onPressArrowLeft={subtractMonth => subtractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        renderHeader={renderHeader}
        enableSwipeMonths={false}
        dayComponent={date => renderDayComponents(date)}
        theme={themes}
      />
    </View>
  );
};

const DayContainer = styled.TouchableOpacity`
  width: 100%;
  height: 100px;
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
});
