import React, {forwardRef, memo} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {Colors} from '@/themes/Colors';
import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';

const LoadingView = styled.View`
  width: 100%;
  height: 300px;
  background-color: ${Colors.yellowOrange};
`;

const CameraView = ((props: any, ref: any) => {
  const devices = useCameraDevices();
  const device = devices.front;

  if (!device) {
    return <LoadingView />;
  }

  return (
    <Camera ref={ref} device={device} isActive photo style={styles.camera} />
  );
});

const styles = StyleSheet.create({
  camera: {
    height: '100%',
    width: '100%',
  },
});

export default forwardRef(CameraView);
