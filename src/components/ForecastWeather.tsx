import { useCallback, useEffect, useState } from "react";
import { IUpcomingDay } from '../interfaces/weather.interface';

import classes from './ForecastWeather.module.css';

interface CurrentWeatherProps {
    latitude: number;
    longitude: number;
    children?: React.ReactNode;
}

const ForecastWeather = (props: CurrentWeatherProps) => {
    const [days, setDays] = useState<Array<IUpcomingDay> | null>(null);

    const fetchForecastWeatherHandler = useCallback(async () => {
        try {
            const apiKey = process.env.REACT_APP_API_KEY;
            const exclude = 'current,minutely,hourly,alerts';
            const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${props.latitude}&lon=${props.longitude}&exclude=${exclude}&appid=${apiKey}&lang=pt&units=metric`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();
            const days = data.daily;

            days.shift();

            setDays(days);
        } catch (error) {
            console.error(error);
        }
    }, [props.latitude, props.longitude]);


    useEffect(() => {
        fetchForecastWeatherHandler();
    }, [fetchForecastWeatherHandler]);

    const getWeekDay = (dt: number): string => {
        const weekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        const d = new Date(dt * 1000);
        const dayName = weekDays[d.getDay()];

        return dayName;
    }

    return (
        <div className={classes.cardList}>
            {
                days &&
                days.map((day, index) => {
                    return (
                        <div className={classes.card} key={index}>
                            <h1>{getWeekDay(day.dt)}</h1>
                            <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt='icon' />
                            <div className={classes.temperatures}>
                                <p>{day.temp.min}º</p>
                                <div className={classes.separator}></div>
                                <p className={classes.maxTemperature}>{day.temp.max}º</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )

}

export default ForecastWeather;