import {useCallback, useEffect, useRef, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';

export const useLocation = () => {
  const [latitude, setLatitude] = useState<number | undefined>();
  const [longitude, setLongitude] = useState<number | undefined>();

  const watchID = useRef<any>();

  const getOneTimeLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        //Setting Longitude state
        setLongitude(position.coords.longitude);

        //Setting Longitude state
        setLatitude(position.coords.latitude);
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  }, []);

  const subscribeLocationLocation = useCallback(() => {
    watchID.current = Geolocation.watchPosition(
      position => {
        //Setting Longitude state
        setLongitude(position.coords.longitude);

        //Setting Longitude state
        setLatitude(position.coords.latitude);
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
      },
    );
  }, []);
  useEffect(() => {
    getOneTimeLocation();
    subscribeLocationLocation();

    return () => {
      Geolocation.clearWatch(watchID.current);
    };
  }, []);

  return {latitude, longitude};
};
