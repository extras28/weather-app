import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import ContentLoader, { Rect, Circle, Path } from 'react-content-loader/native';

AppLoader.propTypes = {
    loaderColor: PropTypes.string,
    customContentLoaderHeight: PropTypes.number,
    customContentLoaderWidth: PropTypes.number,
    loaderType: PropTypes.string,
    loaderRadius: PropTypes.number,
    additionalStyles: PropTypes.object,
};

AppLoader.defaultProps = {
    loaderColor: '#c4c4c4',
    customContentLoaderHeight: 6,
    customContentLoaderWidth: 88,
    loaderType: 'line',
    loaderRadius: 20,
    additionalStyles: { paddingTop: 10 },
};

function AppLoader(props) {
    const {
        loaderColor,
        customContentLoaderHeight,
        customContentLoaderWidth,
        loaderType,
        loaderRadius,
        additionalStyles,
    } = props;
    return (
        <View style={additionalStyles}>
            <ContentLoader
                speed={1}
                width={loaderType === 'line' ? customContentLoaderWidth : loaderRadius * 2}
                height={loaderType === 'line' ? customContentLoaderHeight : loaderRadius * 2}
                viewBox={`0 0 ${
                    loaderType === 'line' ? customContentLoaderWidth : loaderRadius * 2
                } ${loaderType === 'line' ? customContentLoaderHeight : loaderRadius * 2}`}
                backgroundColor={loaderColor}
                foregroundColor="#e3e3e3"
                {...props}>
                {loaderType === 'line' ? (
                    <Rect
                        x="0"
                        y="0"
                        rx="3"
                        ry="3"
                        width={loaderType === 'line' ? customContentLoaderWidth : loaderRadius}
                        height={loaderType === 'line' ? customContentLoaderHeight : loaderRadius}
                    />
                ) : (
                    <Circle cx={loaderRadius} cy={loaderRadius} r={loaderRadius} />
                )}
            </ContentLoader>
        </View>
    );
}

export default AppLoader;
