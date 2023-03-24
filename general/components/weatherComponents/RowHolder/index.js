import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import AppResource from 'general/constants/AppResource';
import AppLoader from 'general/components/AppLoader/index';

RowHolder.propTypes = {
    iconName: PropTypes.element,
    fieldName: PropTypes.string,
    value: PropTypes.string,
    iconColor: PropTypes.string,
    loading: PropTypes.bool,
};

RowHolder.defaultProps = {
    iconName: null,
    fieldName: '',
    value: '',
    iconColor: '',
    loading: false,
};

function RowHolder(props) {
    const { iconName, fieldName, value, iconColor, loading } = props;
    return (
        <View style={styles.row}>
            <View style={styles.left}>
                <View
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        padding: 6,
                        borderRadius: 14,
                        shadowColor: iconColor,
                        shadowOffset: {
                            width: 0,
                            height: 9,
                        },
                        shadowOpacity: 0.15,
                        shadowRadius: 10,
                        elevation: 5,
                    }}>
                    {iconName ? iconName : null}
                </View>

                <Text style={{ marginLeft: 8, color: AppResource.colors.textPrimary }}>
                    {fieldName}
                </Text>
            </View>
            {loading ? (
                <AppLoader
                    loaderColor="#FEA14E"
                    loaderType="line"
                    customContentLoaderWidth={20}
                    additionalStyles={{ marginRight: 30 }}
                />
            ) : (
                <Text style={{ color: AppResource.colors.textPrimary }}>
                    {value}
                </Text>
            )}
        </View>
    );
}

export default RowHolder;

const styles = StyleSheet.create({
    row: {
        borderRadius: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.36);',
        paddingVertical: 14,
        paddingHorizontal: 14,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    left: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 70,
        height: 70,
    },
});
