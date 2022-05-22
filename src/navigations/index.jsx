import React, {useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Auth from './Auth';
import {UserContext} from '../contexts';
import Main from './Main';
import { Spinner } from '../components';
/* 어떤화면이든 가릴 수 있게 하기위해서 Spinner Components를 사용하였다. */

const Navigation = () => {
    const {user} = useContext(UserContext);
    /* UserContext에 User정보에 따라 Auth navigation이 렌더링되도록 수정해주었다. */

    return (
    <NavigationContainer>
        {user.uid ? <Main/> : <Auth />}
        <Spinner />
    </NavigationContainer>);
    /* user에 uid존재 여부에따라 Main navigation이나 Auth navigation 둘중 하나가 이용되도록 설정해주었다. */
};

export default Navigation;