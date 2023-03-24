/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import i18n from 'app/i18n';
import HomeScreen from 'features/HomeScreen/index';
import AppData from 'general/constants/AppData';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './app/store';

const Stack = createStackNavigator();

function App(): JSX.Element {
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <I18nextProvider i18n={i18n}>
                        <AppNavigator />
                    </I18nextProvider>
                </PersistGate>
            </Provider>
        </SafeAreaProvider>
    );
}

function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name={AppData.screens.HOME_SCREEN}
                    component={HomeScreen}
                    options={{ animationEnabled: true, header: () => null }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
