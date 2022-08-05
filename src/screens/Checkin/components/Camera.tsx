import React, {forwardRef, memo} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {Colors} from '@/themes/Colors';
import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

const LoadingView = styled.View`
  width: 80%;
  height: 300px;
  align-self: center;
  background-color: ${Colors.yellowOrange};
  margin-bottom: 5px;
`;

const CameraView = (props: any, ref: any) => {
  const devices = useCameraDevices();
  const device = devices.front;
  const isFocused = useIsFocused();

  if (!device) {
    return <LoadingView />;
  }

  return (
    <>
      {isFocused && (
        <Camera
          ref={ref}
          device={device}
          isActive
          photo
          style={styles.camera}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 2,
    justifyContent: 'center',
    alignSelf: 'center',
    height: 140,
    width: '80%',
  },
});

export default forwardRef(CameraView);
