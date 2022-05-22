import React, {useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Auth from './Auth';
import {UserContext} from '../contexts';

const Navigation = () => {
    const {user} = useContext(UserContext);
    /* UserContext에 User정보에 따라 Auth navigation이 렌더링되도록 수정해주었다. */

    return <NavigationContainer>{user.uid || <Auth />}</NavigationContainer>;
};

export default Navigation;