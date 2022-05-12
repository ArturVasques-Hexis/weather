import { useCallback, useEffect, useState } from 'react';
import { ICurrentDay } from '../interfaces/weather.interface';

import classes from './CurrentWeather.module.css';

interface CurrentWeatherProps {
    latitude: number;
    longitude: number;
    children?: React.ReactNode;
}

const CurrentWeather = (props: CurrentWeatherProps) => {
    const [currentWeather, setCurrentWeather] = useState<ICurrentDay | null>(null);

    const fetchCurrentWeatherHandler = useCallback(async () => {
        try {
            const apiKey = process.env.REACT_APP_API_KEY;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${props.latitude}&lon=${props.longitude}&appid=${apiKey}&lang=pt&units=metric`
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();
            setCurrentWeather(data);
        } catch (error) {
            console.error(error);
        }
    }, [props.latitude, props.longitude]);


    useEffect(() => {
        fetchCurrentWeatherHandler();
    }, [fetchCurrentWeatherHandler])

    return (
        <div className={classes.card}>
            <img src={`http://openweathermap.org/img/wn/${currentWeather?.weather[0].icon}@2x.png`} alt='icon' />
            <p className={classes.description}>{currentWeather?.weather[0].description}</p>
            <h1>{currentWeather?.name}</h1>
            <p className={classes.temp}>{currentWeather?.main.temp}º C</p>
            <div>Min: {currentWeather?.main.temp_min}º C | Max: {currentWeather?.main.temp_max}º C</div>
        </div>
    )

}

export default CurrentWeather;