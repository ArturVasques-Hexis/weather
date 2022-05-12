import { useCallback, useEffect, useState } from 'react';
import CurrentWeather from './components/CurrentWeather';
import ForecastWeather from './components/ForecastWeather';
import Header from './components/Header';

import classes from './App.module.css';

function App() {
  const [latitude, setLatitude] = useState<number>(39.74362);
  const [longitude, setLongitude] = useState<number>(-8.80705);

  const getGeolocation = useCallback(async () => {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
    } else {
      console.log('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        const {latitude, longitude} = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      }, () => {
        console.log('Unable to retrieve your location');
      });
    }
  }, []);

  useEffect(() => {
    getGeolocation();
  }, [getGeolocation]);


  return (
    <div className={classes.app} style={{ backgroundImage: `url(${process.env.REACT_APP_PUBLIC_URL + '/images/storm.jpg'})` }}>
      <div className={classes.header}>
        <Header />
      </div>
      <div className={classes.currentWeather}>
        <CurrentWeather latitude={latitude} longitude={longitude} />
      </div>
      <div className={classes.forecastWeather}>
        <ForecastWeather  latitude={latitude} longitude={longitude} />
      </div>
    </div>
  );
}

export default App;
