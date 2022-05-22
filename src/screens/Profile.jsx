import React, {useContext} from 'react';
import {UserContext} from '../contexts';
import styled from 'styled-components/native';
import {Button, Image} from '../components';

const Container = styled.View`
    flex: 1;
    background-color: white;
`;

const Profile = ({navigation, route}) => {
    console.log(route.params);
    /*전송된 유저의 정보를 console.log를 이용하여 확인하도록 하였다.*/
    const {setUser} = useContext(UserContext);
    /* Profile화면에 signup버튼이 클릭이되면 UserContext에 setUser를 이용해서 User정보를 변경하도록 만들었다. */

    return (
        <Container>
            <Button title="로그아웃" onPress={() => setUser({})}/>
        </Container>
    );
};

export default Profile;