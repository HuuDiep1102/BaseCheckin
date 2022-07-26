/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import * as React from 'react';
import {View, StyleSheet, Dimensions, StatusBar, Text} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import styled from 'styled-components/native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {Colors} from '@/themes/Colors';
import moment from 'moment';

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

const FirstRoute = () => (
  <View style={[styles.scene, {backgroundColor: Colors.white}]} />
);

const SecondRoute = () => (
  <View style={[styles.scene, {backgroundColor: Colors.anti_flashWhite}]}>
    <Calendar
      style={{
        height: 800,
        marginTop: 8,
      }}
      // Initially visible month. Default = now
      initialDate={'2012-03-01'}
      // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
      minDate={'2012-05-10'}
      // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
      maxDate={'2012-05-30'}
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
      renderHeader={() => {
        const today = moment(new Date()).format('DD/MM/YYYY').toString();
        return (
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Ngày {today}</Text>
            <Text style={styles.title}>(Danh sách lịch sử chấm công)</Text>
          </View>
        );
      }}
      // Enable the option to swipe between months. Default = false
      enableSwipeMonths={false}
      dayComponent={date => {
        return (
          <View
            style={{
              width: '100%',
              height: 100,
              // backgroundColor: 'red',
              borderWidth: 0.5,
              justifyContent: 'space-evenly',
              alignItems: 'center',
              borderColor: Colors.gray2,
              paddingBottom: 0,
            }}>
            <Text
              style={{
                fontWeight: '400',
                fontSize: 11,
                lineHeight: 13,
                color: Colors.oldSilver,
              }}>
              {/*{e.date.day}*/}
              {moment(date.date).format('DD/MM').toString()}
            </Text>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 11,
                lineHeight: 13,
                color: Colors.green,
              }}>
              08:30
            </Text>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 11,
                lineHeight: 13,
                color: Colors.green,
              }}>
              18:00
            </Text>
          </View>
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
            color: Colors.black,
            fontWeight: '400',
            fontSize: 13,
            borderWidth: 1,
          },
        },
      }}
    />
  </View>
);

const initialLayout = {width: Dimensions.get('window').width};

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});
export const HistoryScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Checkin'},
    {key: 'second', title: 'Lich Su'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={styles.container}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    paddingTop: 40,
  },
  scene: {
    flex: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.gray1,
  },

  title: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
    letterSpacing: -0.41,
    color: Colors.oldSilver,
  },

  headerContainer: {
    height: 64,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
