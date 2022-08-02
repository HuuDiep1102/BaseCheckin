import React, {memo, useCallback} from 'react';
import {WelcomeScreen} from '@/screens/Login/WelcomeScreen';
import {LoginScreen} from '@/screens/Login/LoginScreen';
import {HomeScreen} from '@/screens/Home/HomeScreen';
import {navigationRef} from '@/utils/navigation';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PreloadScreen} from '@/screens/PreloadScreen';

const RootStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

const MainStackComponent = memo(function MainStackComponent() {
  return (
    <MainStack.Navigator
      initialRouteName="PreloadScreen"
      screenOptions={{headerShown: false}}>
      <RootStack.Screen name="PreloadScreen" component={PreloadScreen} />
      <RootStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <MainStack.Screen name="LoginScreen" component={LoginScreen} />
      <MainStack.Screen name="HomeScreen" component={HomeScreen} />
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
        initialRouteName="MainNavigation"
        screenOptions={{headerShown: false}}>
        <RootStack.Screen
          name="MainNavigation"
          component={MainStackComponent}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
});

export default Routes;
