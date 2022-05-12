interface IWeather {
    description: string;
    icon: string;
    id: string;
}

export interface ICurrentDay {
    name: string;
    main: {
        temp: number;
        temp_max: number;
        temp_min: number;
    },
    weather: Array<IWeather>
}

export interface IUpcomingDay {
    dt: number;
    temp: {
        max: number;
        min: number;
    },
    weather: Array<IWeather>;
}