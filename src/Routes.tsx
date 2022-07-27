import React, {memo, useCallback} from 'react';
// import {HistoryScreen} from '@/screens/History/HistoryScreen';
import {WelcomeScreen} from '@/screens/Login/WelcomeScreen';
import {LoginScreen} from '@/screens/Login/LoginScreen';
import {HistoryScreen} from '@/screens/History/HistoryScreen';
import {navigationRef} from '@/utils/navigation';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

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
