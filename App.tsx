import React from 'react';

import 'react-native-gesture-handler';
import 'react-native-reanimated';
import {StatusBar} from 'react-native';
import Routes from '@/Routes';

export default function App() {
  return (
    <>
      <StatusBar
        translucent={true}
        //Bo header trong phien ban Android
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <Routes />
    </>
  );
}
