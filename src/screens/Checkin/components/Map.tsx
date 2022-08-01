import MapView, {MapViewProps, PROVIDER_GOOGLE} from 'react-native-maps';
import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {Colors} from '@/themes/Colors';
import styled from 'styled-components/native'; // remove PROVIDER_GOOGLE import if not using Google Maps

const LoadingView = styled.View`
  width: 100%;
  height: 150px;
  margin-bottom: 20px;
  background-color: ${Colors.oldSilver};
`;

export const Map = (props: MapViewProps) => {
  const {initialRegion, children} = props;

  if (!initialRegion) {
    return <LoadingView />;
  }

  return (
    <MapContainer>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        {...props}>
        {children}
      </MapView>
    </MapContainer>
  );
};

const MapContainer = styled.View`
  height: 75%;
  width: 80%;
  justify-content: flex-end;
  background-color: ${Colors.oldSilver};
`;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
