import React, {useContext} from 'react';
/* theme style을 이용하기위해서 useContext를 사용하였다. */
import {ThemeContext} from 'styled-components/native'
/* theme style을 이용하기위해서 ThemeContext를 사용하였다. */
import { createStackNavigator } from '@react-navigation/stack';
import { ChannelList, ChannelCreation, Channel } from '../screens';
/* 화면은 ChannelList, ChannelCreation, Channel 화면만 이용하려고 한다. */
import Home from './Home'

const Stack = createStackNavigator();

const Main = () => {
    const theme = useContext(ThemeContext);

    return(
        <Stack.Navigator
        screenOptions={{
            headerTitleAlign: 'center',
            headerTintColor: theme.text,
            /* headerTintColor는 theme에 적용되어있는 text를 이용하였다. */
            headerBackTitleVisible: false,
            /* 뒤로가기버튼에 타이틀은 감추도록하였다. */
            cardStyle: {backgroundColor: theme.backgroundColor},
        }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ChannelCreation" component={ChannelCreation} />
            <Stack.Screen name="Channel" component={Channel} />
        </Stack.Navigator>
    )
}

export default Main;