import React, {useContext, useState} from 'react';
//Input 컨포넌트의 변화하는 값을 관리하기 위해서 useState를 이용해준다.
import styled, {ThemeContext} from 'styled-components/native';
import {Button, Image, Input} from '../components'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
//헤더라인이 없으면 노치디자인에서 문제가 발생하므로 노치디자인을 해결하는 코드이다.

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.background};
    padding: 0 20px;
    padding-top: ${({insets: {top}}) => top}px;
    padding-bottom: ${({insets: {bottom}}) => bottom}px;
    //헤더라인이 없으면 노치디자인에서 문제가 발생하므로 노치디자인을 해결하는 코드이다.
`;

const Icon = 'https://firebasestorage.googleapis.com/v0/b/rn-catch-my-hand.appspot.com/o/icon.png?alt=media'

const Signin = ({navigation}) => {
    const insets = useSafeAreaInsets();
    //헤더라인이 없으면 노치디자인에서 문제가 발생하므로 노치디자인을 해결하는 코드이다.
    const theme = useContext(ThemeContext);
    //theme.jsx를 사용하기위해서 useContext와 ThemeContext를 컨포넌트를 해주고 사용해야한다.

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const refPassword = useRef(null);
    
    return (
     <Container insets={insets}>
        <Image url={Icon}/>
        <Input //상태변수와 Input 컨포넌트를 이용하여 value, onChangeText를 설정해준다.
        label="Email" 
        placeholder="Email" 
        returnKeyType="next"
        value={email}
        onChangeText={setEmail} />
        <Input 
        label="password" 
        placeholder="password"  
        returnKeyType="done"
        value={password}
        onChangeText={setPassword} />
        <Button title="로그인" onPress ={() => console.log('로그인')} />
        <Button 
        title="회원가입" 
        onPress ={() => navigation.navigate('Signup')} 
        containerStyle={{marginTop: 0, backgroundColor: 'transparent'}}
        textStyle={{color: theme.btnTextLink, fontSize:18}}
        />
    </Container>
    );
};

export default Signin;