import React from 'react';
import {
  DrawerActions,
  NavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

import {TransitionPresets} from '@react-navigation/stack';
import {LoginScreen} from '@/screens/Login/LoginScreen';

import {HomeScreen} from '@/screens/Home/HomeScreen';

import {CheckInActiveScreen} from '@/screens/CheckIn/CheckInActiveScreen';

// import {DetailScreenProps, CreateScreenProps} from '@/types';

export const defaultScreenOptions = TransitionPresets.SlideFromRightIOS;

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export const navigation = () => navigationRef.current!;

export const createNavigate =
  <T extends object>(screenName: string) =>
  (params?: T) => {
    return navigation().navigate(screenName, params);
  };

export const createReplace =
  <T extends object>(screenName: string) =>
  (params?: T) => {
    return navigation().dispatch(StackActions.replace(screenName, params));
  };

export const goBack = () => navigation().goBack();

export const openDrawer = () =>
  navigation().dispatch(DrawerActions.openDrawer());

export const replaceWithCheckinScreen = createReplace('HomeScreen');

export const navigateToLoginScreen = createNavigate('LoginScreen');

export const replaceWithLoginScreen = createReplace('LoginScreen');

export const navigateToHomeScreen = createNavigate('HomeScreen');

export const navigateToCheckInActiveScreen = createNavigate(
  'CheckInActiveScreen',
);

export const navigateToMainNavigation = createNavigate('MainNavigation');
