import AppConfig from './AppConfig';

const Global = {
    //dungna
    gNeedToRefreshCurrentWeatherByCityName: false,
    gFilterCurrentWeatherByCityName: {
        q: 'hanoi',
        appid: AppConfig.appid,
    },

    gNeedToRefreshHourlyWeatherByCityName: false,
    gFilterHourlyWeatherByCityName: {
        q: 'hanoi',
        appid: AppConfig.appid,
    },
};

export default Global;
