import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { geolocationActions } from './store/geolocation-slice';

import CurrentWeather from './components/CurrentWeather';
import ForecastWeather from './components/ForecastWeather';
import Header from './components/Header';

import classes from './App.module.css';
import { RootState } from './store';

function App() {
  const dispatch = useDispatch();
  const latitude = useSelector((state: RootState) => state.geolocation.latitude);
  const longitude = useSelector((state: RootState) => state.geolocation.longitude);

  const getGeolocation = useCallback(async () => {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
    } else {
      console.log('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        const {latitude, longitude} = position.coords;

        dispatch(geolocationActions.updateGeolocation({latitude, longitude}));
      }, () => {
        console.log('Unable to retrieve your location');
      });
    }
  }, [dispatch]);

  useEffect(() => {
    getGeolocation();
  }, [getGeolocation]);


  return (
    <div className={classes.app} style={{ backgroundImage: `url(${process.env.REACT_APP_PUBLIC_URL + '/images/storm.jpg'})` }}>
      <div className={classes.header}>
        <Header />
      </div>
      <div className={classes.currentWeather}>
        <CurrentWeather latitude={latitude} longitude={longitude}/>
      </div>
      <div className={classes.forecastWeather}>
        <ForecastWeather latitude={latitude} longitude={longitude}/>
      </div>
    </div>
  );
}

export default App;
