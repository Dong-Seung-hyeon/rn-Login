import React, {useContext} from 'react';
import {ThemeContext} from 'styled-components/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {ChannelList, Profile} from '../screens';
import { MaterialIcons } from '@expo/vector-icons';

const TabIcon = ({name, focused}) => {
    const theme = useContext(ThemeContext);
    return <MaterialIcons name={name} size={24} color={focused ? theme.tabBtnActive : theme.tabBtnInactive} />
}

const Tab = createBottomTabNavigator();

const Home = () => {
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