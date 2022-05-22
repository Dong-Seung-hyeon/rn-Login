import React from 'react';
import styled from 'styled-components/native';
import {Button, Image} from '../components';
import { ScrollView } from 'react-native';

  const Icon = 'https://firebasestorage.googleapis.com/v0/b/rn-catch-my-hand.appspot.com/o/icon.png?alt=media'

const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.background};
`;

const Profile = ({navigation, route}) => {
    console.log(route.params);
    /*전송된 유저의 정보를 console.log를 이용하여 확인하도록 하였다.*/
    return (
        <ScrollView extraScrollHeight={30} contentContainerStyle={{flex:1}}>
        <Container>
            <Image source = {require('../screens/dog.png')} />
            <Button title="로그아웃" onPress={() => navigation.navigate('Signin')}/>
        </Container>
        </ScrollView>
    );
};

export default Profile;