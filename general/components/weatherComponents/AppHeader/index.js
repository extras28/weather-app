import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import AppResource from 'general/constants/AppResource';

const AppHeader = () => {
    return (
        <View style={{paddingVertical: 15}}>
            <Icon name="search" size={35} color={AppResource.colors.textPrimary} />
        </View>
    );
};

export default AppHeader;

const styles = StyleSheet.create({});
