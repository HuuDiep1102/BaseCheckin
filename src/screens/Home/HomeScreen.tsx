import * as React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import styled from 'styled-components/native';
import {Colors} from '@/themes/Colors';

import {HeaderComponent} from '@/components/HeaderComponent';
import {CheckInScreen} from '@/screens/CheckIn/CheckInScreen';

import {HistoryScreen} from '@/screens/History/HistoryScreen';
import {memo} from 'react';

const initialLayout = {width: Dimensions.get('window').width};

const renderScene = SceneMap({
  first: CheckInScreen,
  second: HistoryScreen,
});

export const renderTabBar = (props: any) => {
  return (
    <TabBar
      {...props}
      indicatorStyle={styles.indicatorStyle}
      style={styles.tabBar}
      renderLabel={({route, focused}) => (
        <LabelText focused={focused}>{route.title}</LabelText>
      )}
    />
  );
};

export const HomeScreen = memo(() => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Checkin'},
    {key: 'second', title: 'Lịch sử'},
  ]);

  return (
    <>
      <HeaderComponent title="Checkin" />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={styles.container}
        renderTabBar={renderTabBar}
      />
    </>
  );
});

const LabelText = styled.Text<{
  focused: boolean | undefined;
}>`
  color: ${p => (p.focused ? Colors.azure : Colors.oldSilver)};
  margin: 8px;
  font-size: 15px;
  font-weight: 500;
  line-height: 18px;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scene: {
    flex: 1,
  },

  indicatorStyle: {
    backgroundColor: Colors.azure,
  },

  tabBar: {
    backgroundColor: Colors.white,
  },
});
