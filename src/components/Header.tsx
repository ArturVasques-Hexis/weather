
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { geolocationActions } from '../store/geolocation-slice';

import classes from './Header.module.css';
import searchIcon from '../assets/search.png';

const Header = () => {
    const dispatch = useDispatch();
    const [city, setCity] = useState('');


    const fetchCityGeolocation = async (cityName: string) => {
        try {
            const apiKey = process.env.REACT_APP_API_KEY;
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&lang=pt&units=metric`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();

            dispatch(geolocationActions.updateGeolocation({ latitude: data.coord.lat, longitude: data.coord.lon }));
        } catch (error) {
            console.error(error);
        }
    };

    const submitHandler = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (city.trim() === '') {
            return;
        }

        fetchCityGeolocation(city);
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