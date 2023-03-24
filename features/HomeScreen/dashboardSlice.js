import weatherApi from 'api/weatherApi';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const thunkGetCurrentWeatherByCityName = createAsyncThunk(
    'dashboard/current-weather',
    async params => {
        const res = await weatherApi.getWeatherByCityName(params);
        return res;
    },
);

export const thunkGetHourlyWeatherByCityName = createAsyncThunk(
    'dashboard/hourly-weather',
    async params => {
        const res = await weatherApi.getWeatherByHourly(params);
        return res;
    },
);

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        currentWeather: {},
        isGettingCurrentWeatherByCityName: false,

        hourlyWeather: {},
        isGettingHourlyWeatherByCityName: false,
    },
    reducers: {},
    extraReducers: {
        // thoi tiet hien tai
        [thunkGetCurrentWeatherByCityName.pending]: (state, action) => {
            state.isGettingCurrentWeatherByCityName = true;
        },
        [thunkGetCurrentWeatherByCityName.rejected]: (state, action) => {
            state.isGettingCurrentWeatherByCityName = false;
        },
        [thunkGetCurrentWeatherByCityName.fulfilled]: (state, action) => {
            state.isGettingCurrentWeatherByCityName = false;
            const { data } = action.payload;
            if (data) {
                state.currentWeather = data;
            }
        },

        // thoi tiet theo gio
        [thunkGetHourlyWeatherByCityName.pending]: (state, action) => {
            state.isGettingHourlyWeatherByCityName = true;
        },
        [thunkGetHourlyWeatherByCityName.rejected]: (state, action) => {
            state.isGettingHourlyWeatherByCityName = false;
        },
        [thunkGetHourlyWeatherByCityName.fulfilled]: (state, action) => {
            state.isGettingHourlyWeatherByCityName = false;
            const { data } = action.payload;
            if (data) {
                state.hourlyWeather = data;
            }
        },
    },
});

export const {} = dashboardSlice.actions;
export default dashboardSlice.reducer;
