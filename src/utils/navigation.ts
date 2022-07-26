import React from 'react';
import {DrawerActions, NavigationContainerRef} from '@react-navigation/native';

import {TransitionPresets} from '@react-navigation/stack';
import {LoginScreen} from '@/screens/Login/LoginScreen';

import {HistoryScreen} from '@/screens/History/HistoryScreen';

// import {DetailScreenProps, CreateScreenProps} from '@/types';

export const defaultScreenOptions = TransitionPresets.SlideFromRightIOS;

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export const navigation = () => navigationRef.current!;

export const createNavigate =
  <T extends object>(screenName: string) =>
  (params?: T) => {
    return navigation().navigate(screenName, params);
  };

export const goBack = () => navigation().goBack();

export const openDrawer = () =>
  navigation().dispatch(DrawerActions.openDrawer());

export const navigateToLoginScreen = createNavigate('LoginScreen');

export const navigateToHistoryScreen = createNavigate('HistoryScreen');

export const navigateToMainNavigation = createNavigate('MainNavigation');
