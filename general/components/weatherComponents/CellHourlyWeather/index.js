import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Utils from 'general/utils/Utils';
import AppResource from 'general/constants/AppResource';

CellHourlyWeather.propTypes = {
    additionalStyles: PropTypes.object,
    time: PropTypes.string,
    icon: PropTypes.string,
    temp: PropTypes.number,
    onPress: PropTypes.func,
    active: PropTypes.bool,
};

CellHourlyWeather.defaultProps = {
    additionalStyles: { marginRight: 11 },
    time: '',
    icon: '',
    temp: '',
    onPress: null,
    active: false,
};

function CellHourlyWeather(props) {
    const { additionalStyles, time, icon, temp, onPress, active } = props;
    const [activeState, setActiveState] = useState(active);

    function handlePress() {
        setActiveState(active);
        if (onPress) {
            onPress();
        }
    }

    const styles = StyleSheet.create({
        cell: {
            backgroundColor: active ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            borderRadius: 30,
            width: 50,
            height: 90,
            paddingVertical: 10,
            ...additionalStyles,
        },
    });
    return (
        <TouchableOpacity style={styles.cell} onPress={handlePress}>
            <Text style={{ color: active ? AppResource.colors.textPrimary : '#9C9EAA' }}>
                {time}
            </Text>
            <Image source={{ uri: Utils.getWeatherIcon(icon) }} style={{ width: 40, height: 40 }} />
            <Text style={{ fontWeight: '700', color: AppResource.colors.textPrimary }}>
                {temp}°C
            </Text>
        </TouchableOpacity>
    );
}

export default CellHourlyWeather;
