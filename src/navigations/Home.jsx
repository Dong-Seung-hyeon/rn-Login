import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {ChannelList, Profile} from '../screens';

const Tab = createBottomTabNavigator();

const Home = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="List" component={ChannelList} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
};

export default Home;