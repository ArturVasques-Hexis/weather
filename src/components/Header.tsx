import classes from './Header.module.css';

import searchIcon from '../assets/search.png';
import { useState } from 'react';

const Header = () => {
    const [city, setCity] = useState('');

    const fetchWeatherByCity = async (cityName: string) => {
        try {
            const apiKey = process.env.REACT_APP_API_KEY;

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();

        } catch (error) {
        }
    };

    const submitHandler = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (city.trim() === '') {
            return;
        }

        fetchWeatherByCity(city);
        setCity('');
    }

    return (
        <form onSubmit={submitHandler} className={classes.searchBar}>
            <div className={classes.searchIconContainer}>
                <img src={searchIcon} alt='Search icon' />
            </div>
            <input
                type='text'
                value={city}
                onChange={(event) => setCity(event.target.value)}
                placeholder='Search by city'
                className={classes.searchInput}
            />
        </form>

    )
}

export default Header