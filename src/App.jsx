import React from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {theme} from './theme';
import Navigation from './navigations';
import {UserProvider, ProgressProvider} from './contexts';
/* 어디에서든 UserContext를 이용할 수 있도록 App components에서 UserProvider를 사용하여 전체를 감싸도록 하였다. 
ProgressProvider도 마찬가지로 전체를 감싸도록 하였다.*/

const App = () => {
    return (
    <ThemeProvider theme={theme} >
        <ProgressProvider>
        <UserProvider>
        <StatusBar backgroundColor={theme.background} barStyle="dark-content"/>
        <Navigation /> 
        </UserProvider>
        </ProgressProvider>
    </ThemeProvider>
    );
};

export default App;