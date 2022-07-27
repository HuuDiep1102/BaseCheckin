import {Calendar, LocaleConfig} from 'react-native-calendars';
import {StyleSheet, View} from 'react-native';
import moment from 'moment';
import {Colors} from '@/themes/Colors';
import * as React from 'react';
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
  dayNamesShort: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'],
};

LocaleConfig.defaultLocale = 'vn';

export const HistoryCalendalScreen = () => (
  <View style={[styles.scene, styles.history]}>
    <Calendar
      // Initially visible month. Default = now
      initialDate={'2022-07-26'}
      // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
      minDate={'2022-07-01'}
      // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
      maxDate={'202-07-30'}
      // Handler which gets executed on day press. Default = undefined
      onDayPress={day => {
        console.log('selected day', day);
      }}
      // Handler which gets executed on day long press. Default = undefined
      onDayLongPress={day => {
        console.log('selected day', day);
      }}
      // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
      monthFormat={'yyyy MM'}
      // Handler which gets executed when visible month changes in calendar. Default = undefined
      onMonthChange={month => {
        console.log('month changed', month);
      }}
      // Hide month navigation arrows. Default = false
      hideArrows={false}
      // Replace default arrows with custom ones (direction can be 'left' or 'right')
      // renderArrow={direction => <Arrow />}
      // Do not show days of other months in month page. Default = false
      hideExtraDays={false}
      // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
      // day from another month that is visible in calendar page. Default = false
      disableMonthChange={true}
      // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
      firstDay={1}
      // Hide day names. Default = false
      hideDayNames={false}
      // Show week numbers to the left. Default = false
      showWeekNumbers={false}
      // Handler which gets executed when press arrow icon left. It receive a callback can go back month
      onPressArrowLeft={subtractMonth => subtractMonth()}
      // Handler which gets executed when press arrow icon right. It receive a callback can go next month
      onPressArrowRight={addMonth => addMonth()}
      // Disable left arrow. Default = false
      disableArrowLeft={false}
      // Disable right arrow. Default = false
      disableArrowRight={false}
      // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
      disableAllTouchEventsForDisabledDays={true}
      // Replace default month and year title with custom one. the function receive a date as parameter
      // renderHeader={() => {
      //   const today = moment(new Date()).format('DD/MM/YYYY').toString();
      //   return (
      //     <View style={styles.headerContainer}>
      //       <Text style={styles.header}>Ngày {today}</Text>
      //       <Text style={styles.title}>(Danh sách lịch sử chấm công)</Text>
      //     </View>
      //   );
      // }}
      // Enable the option to swipe between months. Default = false
      enableSwipeMonths={false}
      dayComponent={date => {
        return (
          <DayContainer>
            <Date>{moment(date.date).format('DD/MM').toString()}</Date>
            <Time>08:30</Time>
            <Time>18:00</Time>
          </DayContainer>
        );
      }}
      theme={{
        'stylesheet.calendar.header': {
          week: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            backgroundColor: Colors.anti_flashWhite,
            height: 44,
            alignItems: 'center',
            color: Colors.white,
            fontWeight: '400',
            fontSize: 13,
            borderWidth: 1,
          },
        },
      }}
    />
  </View>
);

const DayContainer = styled.View`
  width: 100%;
  height: 100px;
  border-width: 0.5px;
  justify-content: space-evenly;
  align-items: center;
  border-color: ${Colors.gray2};
  padding-bottom: 0;
`;

const Date = styled.Text`
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: ${Colors.oldSilver};
`;

const Time = styled.Text`
  font-weight: 500;
  font-size: 11px;
  line-height: 13px;
  color: ${Colors.green1};
`;

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },

  history: {
    backgroundColor: Colors.anti_flashWhite,
    marginTop: 8,
  },
});
