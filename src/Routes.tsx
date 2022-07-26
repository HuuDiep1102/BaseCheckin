import React, {memo, useCallback} from 'react';
// import {HistoryScreen} from '@/screens/History/HistoryScreen';
import {WelcomeScreen} from '@/screens/Login/WelcomeScreen';
import {LoginScreen} from '@/screens/Login/LoginScreen';
import {HistoryScreen} from '@/screens/History/HistoryScreen';
// import {CheckinScreen} from '@/screens/CheckinScreen';
import {navigationRef} from '@/utils/navigation';
import styled from 'styled-components/native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

// const TabStackComponent = memo(function TabStackComponent() {
//   return (
//     <TabStack.Navigator
//       screenOptions={() => ({
//         tabBarActiveTintColor: '#ffffff',
//         tabBarInactiveTintColor: '#FFDAAE',
//         tabBarStyle: {
//           backgroundColor: '#F2A54A',
//           height: Platform.OS === 'ios' ? 80 : 60,
//         },
//         tabBarLabelStyle: {
//           marginBottom: Platform.OS === 'ios' ? 0 : 8,
//         },
//         headerShown: false,
//         tabBarHideOnKeyboard: true,
//       })}>
//       <TabStack.Screen
//         name="Danh bạ"
//         component={ContactScreen}
//         options={{
//           tabBarLabel: 'Danh bạ',
//           tabBarIcon: ({focused}) => (
//             <Icon
//               source={PHONEBOOK_ICON}
//               tintColor={focused ? '#ffffff' : '#FFDAAE'}
//             />
//           ),
//         }}
//       />
//       <TabStack.Screen
//         name="History"
//         component={HistoryScreen}
//         options={{
//           tabBarLabel: 'Gần đây',
//           tabBarIcon: ({focused}) => (
//             <Icon
//               source={WATCH_ICON}
//               tintColor={focused ? '#ffffff' : '#FFDAAE'}
//             />
//           ),
//         }}
//       />
//     </TabStack.Navigator>
//   );
// });

const MainStackComponent = memo(function MainStackComponent() {
  return (
    <MainStack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{headerShown: false}}>
      <MainStack.Screen name="LoginScreen" component={LoginScreen} />
      <MainStack.Screen name="HistoryScreen" component={HistoryScreen} />
    </MainStack.Navigator>
  );
});

const Routes = memo(function Routes() {
  const routeNameRef = React.useRef<string>('');
  const onStateChange = useCallback(() => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

    if (currentRouteName && previousRouteName !== currentRouteName) {
      // analytics().setCurrentScreen(currentRouteName);
      routeNameRef.current = currentRouteName;
    }
  }, []);

  return (
    <NavigationContainer ref={navigationRef} onStateChange={onStateChange}>
      <RootStack.Navigator
        initialRouteName="WelcomeScreen"
        screenOptions={{headerShown: false}}>
        <RootStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <RootStack.Screen
          name="MainNavigation"
          component={MainStackComponent}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
});

export default Routes;
