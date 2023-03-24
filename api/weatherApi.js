import axiosClient from './axiosClient';

const weatherApi = {
    getWeatherByCityName: params => {
        const url = '/weather';
        return axiosClient.get(url, { params });
    },

    getWeatherByHourly: params => {
        const url = '/forecast';
        return axiosClient.get(url, { params });
    },
};

export default weatherApi;
