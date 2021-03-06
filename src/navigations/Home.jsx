import React, {useContext, useEffect} from 'react';
import {ThemeContext} from 'styled-components/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {ChannelList, Profile} from '../screens';
import { MaterialIcons } from '@expo/vector-icons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
/* getFocusedRouteNameFromRoute를 이용하면 현재 선택된 화면의 이름을 알 수 있다. */

const TabIcon = ({name, focused}) => {
    const theme = useContext(ThemeContext);
    return <MaterialIcons name={name} size={24} color={focused ? theme.tabBtnActive : theme.tabBtnInactive} />
}

const Tab = createBottomTabNavigator();

const Home = ({navigation, route}) => {
    /* screen component에 component로 사용되고있기 때문에 homenavigation을 props해도 navigation과 route가 전달됩니다. */
    useEffect(() => {
        const screenName = getFocusedRouteNameFromRoute(route) || 'List'
        navigation.setOptions({
            headerTitle: screenName,
            headerRight: () => screenName === 'List' && (
                /* 화면의 이름이 List일때만 나타나도록 하였다. */
                <MaterialIcons name="add" size={26} style={{margin: 10}}
                onPress={() => navigation.navigate('ChannelCreation')}
                />
            )
        })
    });
    return (
        <Tab.Navigator>
            <Tab.Screen 
            name="List" 
            component={ChannelList} 
            options={{
                tabBarIcon: ({focused}) => 
                TabIcon({name: focused ? 'chat-bubble' : 'chat-bubble-outline', focused,
            }),
            }} />
            <Tab.Screen 
            name="Profile" 
            component={Profile}
            options={{
                tabBarIcon: ({focused}) => 
                TabIcon({name: focused ? 'person' : 'person-outline', focused,
            }),
            }} />
        </Tab.Navigator>
    );
};

export default Home;