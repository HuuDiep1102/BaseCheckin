import * as React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import styled from 'styled-components/native';
import {Colors} from '@/themes/Colors';

import {HeaderComponent} from '@/components/HeaderComponent';
import {CheckInScreen} from '@/screens/CheckIn/CheckInScreen';

import {HistoryScreen} from '@/screens/History/HistoryScreen';
import {memo, useCallback, useState} from 'react';

const initialLayout = {width: Dimensions.get('window').width};

const renderScene = SceneMap({
  first: CheckInScreen,
  second: HistoryScreen,
});

export const HomeScreen = memo(() => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'CheckIn'},
    {key: 'second', title: 'Lịch sử'},
  ]);

  const renderTabBar = useCallback((props: any) => {
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
  }, []);

  return (
    <Container>
      <HeaderComponent title="Checkin" />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={styles.container}
        renderTabBar={renderTabBar}
      />
    </Container>
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

const Container = styled.View`
  flex: 1;
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
