import React, {useContext} from 'react';
import {ThemeContext} from 'styled-components/native'
import { createStackNavigator } from '@react-navigation/stack';
import { Signin, Signup, Profile } from '../screens';
import {MaterialIcons} from '@expo/vector-icons'; // 왼쪽 버튼을 동일하게 나타나기 위해 MaterialIcons 컨포넌트를 가져온다.

const Stack = createStackNavigator();

const Auth = () => {
    const theme = useContext(ThemeContext);

    return (
    <Stack.Navigator
    screenOptions={{
        cardStyle: { backgroundColor: theme.background},
    }}
    >
        <Stack.Screen 
        name="Signin" 
        component={Signin} 
        options={{headerShown: false}} //헤더라인 안보이게 하는 코드
        />
        <Stack.Screen 
        name="Signup" 
        component={Signup}
        options={{
            headerTitleAlign: "center", //헤더타이틀 정렬을 중앙으로 정렬한다.
            headerBackTitleVisible: false, //뒤로가기 버튼의 타이틀은 나타나지 않도록 한다.
            headerTintColor: theme.text, //headerTintColor를 설정하여 타이틀과 버튼의 색을 일치하도록 하는 코드
            headerLeft: ({onPress, tintColor}) => (
                <MaterialIcons
                name="keyboard-arrow-left"
                size={38}
                color={tintColor}
                onPress={onPress}
                />
            ),
        }}
        />
        <Stack.Screen 
        name="Profile" 
        component={Profile} 
        />
    </Stack.Navigator>
    );
};

export default Auth;