import { unwrapResult } from '@reduxjs/toolkit';
import AppLoader from 'general/components/AppLoader/index';
import AppHeader from 'general/components/weatherComponents/AppHeader/index';
import CellHourlyWeather from 'general/components/weatherComponents/CellHourlyWeather/index';
import RowHolder from 'general/components/weatherComponents/RowHolder/index';
import AppResource from 'general/constants/AppResource';
import Global from 'general/constants/Global';
import Utils from 'general/utils/Utils';
import moment from 'moment';
import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StatusBar, StyleSheet, Text, View, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import {
    thunkGetCurrentWeatherByCityName,
    thunkGetHourlyWeatherByCityName,
} from './dashboardSlice';

const sTag = '[dashboard]';

const HomeScreen = () => {
    // MARK --- params: ---
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [currentWeatherFilter, setCurrentWeatherFilter] = useState(
        Global.gFilterCurrentWeatherByCityName,
    );
    const [hourlyWeatherFilter, setHourlyWeatherFilter] = useState(
        Global.gFilterCurrentWeatherByCityName,
    );
    const {
        currentWeather,
        isGettingCurrentWeatherByCityName,
        hourlyWeather,
        isGettingHourlyWeatherByCityName,
    } = useSelector(state => state?.dashboard);
    const [detailWeather, setDetailWeather] = useState(currentWeather);

    //MARK --- function: ---
    async function getCurrentWeather() {
        try {
            unwrapResult(await dispatch(thunkGetCurrentWeatherByCityName(currentWeatherFilter)));
        } catch (error) {
            console.log(`${sTag} get current weather by city name error ${error.message}`);
        }
    }

    async function getHourlyWeather() {
        try {
            unwrapResult(await dispatch(thunkGetHourlyWeatherByCityName(hourlyWeatherFilter)));
        } catch (error) {
            console.log(`${sTag} get hourly weather by city name error ${error.message}`);
        }
    }

    function handleSelectedWeather(item) {
        setDetailWeather(item);
    }

    //MARK --- hooks: ---
    useEffect(() => {
        getCurrentWeather();
    }, [currentWeatherFilter]);

    useEffect(() => {
        getHourlyWeather();
    }, [hourlyWeatherFilter]);

    useEffect(() => {
        setDetailWeather(currentWeather);
    }, [currentWeather]);

    const hourlyWeatherState = useMemo(() => {
        return [currentWeather].concat(Utils.divideTimestampsByDate(hourlyWeather?.list, moment()).filter(item => {
            const currentDate = moment();
            const date = moment(item.dt_txt, 'YYYY-MM-DD HH:mm:ss');
            return date.isAfter(currentDate);
        }));
    }, [hourlyWeather]);

    console.log(Utils.formatDateTime(detailWeather?.dt_txt));

    return (
        <LinearGradient
            start={{ x: 0.0, y: 0.1 }}
            end={{ x: 0.4, y: 1.0 }}
            colors={[0.3, 0.3, 0.4, 0.4, 0.5, 0.5, 0.6, 0.6, 0.7, 0.8, 0.8, 0.9, 1.0].map(item =>
                Utils.blurColor('#FEA14E', item),
            )}
            style={styles.linearGradient}>
            <StatusBar
                animated={true}
                backgroundColor={
                    [0.3, 0.3, 0.4, 0.4, 0.5, 0.5, 0.6, 0.6, 0.7, 0.8, 0.8, 0.9, 1.0].map(item =>
                        Utils.blurColor('#FEA14E', item),
                    )[0]
                }
                barStyle="dark-content"
                // showHideTransition={statusBarTransition}
                hidden={false}
            />
            {/* header */}
            <AppHeader />

            {/* address */}
            {isGettingCurrentWeatherByCityName ? (
                <View>
                    <AppLoader loaderColor="#FEA14E" loaderType="line" />
                    <AppLoader loaderColor="#FEA14E" loaderType="line" />
                    <AppLoader loaderColor="#FEA14E" loaderType="line" />
                </View>
            ) : (
                <View>
                    <Text style={{ fontSize: 40, color: '#313341', fontWeight: '700' }}>
                        {`${currentWeather?.name}, ${currentWeather?.sys?.country}`}
                    </Text>
                    <Text style={{ fontSize: 20, color: '#9A938C' }}>
                        {!detailWeather?.dt_txt
                            ? Utils.formatDatetimeFromTimestamp(detailWeather?.dt, 'dd, Do MMM YY')
                            : Utils.formatDateTime(detailWeather?.dt_txt, 'dd, Do MMM YY')}
                    </Text>
                </View>
            )}

            {/* degree */}
            {isGettingCurrentWeatherByCityName ? (
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginTop: 20,
                        marginBottom: 20,
                    }}>
                    <AppLoader
                        loaderColor="#FEA14E"
                        loaderType="circle"
                        loaderRadius={45}
                        additionalStyles={{ paddingLeft: 20 }}
                    />
                    <View>
                        <AppLoader
                            loaderColor="#FEA14E"
                            loaderType="line"
                            customContentLoaderWidth={100}
                            customContentLoaderHeight={12}
                        />
                        <AppLoader loaderColor="#FEA14E" loaderType="line" />
                    </View>
                </View>
            ) : (
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginTop: 20,
                        marginBottom: 20,
                    }}>
                    <Image
                        source={{ uri: Utils.getWeatherIcon(detailWeather?.weather?.[0]?.icon) }}
                        style={{ width: 150, height: 150 }}
                    />
                    <View>
                        <View style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                            <Text
                                style={{
                                    marginTop: 30,
                                    color: AppResource.colors.textPrimary,
                                    fontSize: 20,
                                }}>
                                °C
                            </Text>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}>
                                <Text
                                    style={{
                                        color: AppResource.colors.textPrimary,
                                        fontSize: 100,
                                        fontWeight: '700',
                                    }}>
                                    {parseInt(detailWeather?.main?.temp - 273)}
                                </Text>
                                <Text
                                    style={{ color: AppResource.colors.textPrimary, fontSize: 20 }}>
                                    {detailWeather?.weather?.[0]?.main}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            )}

            {/* parameter row */}
            <ScrollView>
                <View>
                    {detailWeather?.rain && (
                        <RowHolder
                            fieldName={t('Rain fall')}
                            iconName={<IonIcon name="md-rainy-outline" size={28} color="#1E9B26" />}
                            value={`${detailWeather?.rain?.['1h']} mm`}
                            iconColor="#1E9B26"
                            loading={isGettingCurrentWeatherByCityName}
                        />
                    )}
                    {detailWeather?.snow && (
                        <RowHolder
                            fieldName={t('Snow volume')}
                            iconName={<IonIcon name="md-snow-sharp" size={28} color="#C0F6FB" />}
                            value={`${detailWeather?.snow?.['1h']} mm`}
                            iconColor="#C0F6FB"
                            loading={isGettingCurrentWeatherByCityName}
                        />
                    )}
                    <RowHolder
                        fieldName={t('Humidity')}
                        iconName={<IonIcon name="md-water-sharp" size={28} color="#379ADC" />}
                        value={`${detailWeather?.main?.humidity} %`}
                        iconColor="#379ADC"
                        loading={isGettingCurrentWeatherByCityName}
                    />
                    <RowHolder
                        fieldName={t('Wind')}
                        iconName={<FeatherIcon name="wind" size={28} color="#C01B3C" />}
                        value={`${detailWeather?.wind?.speed} km/h`}
                        iconColor="#C01B3C"
                        loading={isGettingCurrentWeatherByCityName}
                    />
                    <RowHolder
                        fieldName={t('Visibility')}
                        iconName={<FontAwesomeIcon name="eye" size={25} color="#d128b2" />}
                        value={`${detailWeather?.visibility / 1000} km`}
                        iconColor="#d128b2"
                        loading={isGettingCurrentWeatherByCityName}
                    />
                </View>

                {/* tab */}
                <View></View>

                {/* hourly weather */}
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {hourlyWeatherState?.map((item, index) => {
                        return (
                            <CellHourlyWeather
                                key={index}
                                temp={parseInt(item?.main?.temp - 273)}
                                icon={item?.weather?.[0].icon}
                                time={Utils.formatDateTime(item?.dt_txt, 'HH:ss')}
                                onPress={() => handleSelectedWeather(item)}
                                active={detailWeather?.dt === item.dt}
                            />
                        );
                    })}
                </ScrollView>
            </ScrollView>
        </LinearGradient>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    flex: 1,
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
    },
});
