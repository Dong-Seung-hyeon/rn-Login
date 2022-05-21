import React, { useState, useRef} from 'react';
{/*Input 컨포넌트의 변화하는 값을 관리하기 위해서 useState를 이용해준다.
useRef를 이용하여 onSubmitEditing을 작성하기위해 useRef를 사용해준다.*/}
import styled from 'styled-components/native';
import {Button, Image, Input} from '../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { signup } from '../firebase';
import { Alert } from 'react-native';

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.background};
    padding: 50px 20px;
`;

const Signup = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const refEmail = useRef(null);
    /*확인버튼을 통한 포커스 이동을 위해 useRef이용하여 추가로 변수를 추가해주었다.*/
    const refPassword = useRef(null);
    /*password의 위치만 알면되므로 refPassword라는 변수를 만들어주었다.*/
    const refPasswordConfirm = useRef(null);;
    /*확인버튼을 통한 포커스 이동을 위해 useRef이용하여 추가로 변수를 추가해주었다.*/
    
    const _handleSignupBtnPress = async () => {
        /*password Input 컨포넌트에 onSubmitEditing과 signup 버튼에서 호출되는 onPress가 
        같은함수를 바라보도록 handleSignupBtnPress라는 함수를 만들어서 적용해주었다.*/
        try {
            const user = await signup({name, email, password, phoneNumber});
            Alert.alert('회원가입이 완료되었습니다.')
            navigation.navigate('Signin')
        } catch (e) {
            Alert.alert('회원가입 오류', e.message);
        }
    };

    return (
    <KeyboardAwareScrollView extraScrollHeight={20}>
        {/* 키보드와 Input 컨포넌트가 너무 가깝게 붙어있으므로 extraScrollHeight에 값을 주어 여유공간을 만들어주었다. */}
     <Container>
         <Input 
        label="Name" 
        placeholder="Name" 
        returnKeyType="next"
        value={name}
        onChangeText={setName} 
        onSubmitEditing={() => refEmail.current.focus()}
        /*Email Input에 onSubmitEditing에서 포커스를 이동하는 함수를 작성해주었다.*/
        />
        <Input /*상태변수와 Input 컨포넌트를 이용하여 value, onChangeText를 설정해준다.*/
        ref={refEmail} /*Email Input 컨포넌트에도 포커스가 이동할 수 있어야한다.*/
        label="Email" 
        placeholder="Email" 
        returnKeyType="next"
        value={email}
        onChangeText={setEmail} 
        onSubmitEditing={() => refPassword.current.focus()}
        /*Email Input에 onSubmitEditing에서 포커스를 이동하는 함수를 작성해주었다.*/
        />
        <Input 
        ref={refPassword}
        label="Password" 
        placeholder="Password"   
        returnKeyType="next"
        value={password}
        onChangeText={setPassword}
        isPassword={true}
        /*password Input 컨포넌트에 isPassword를 입력하면 비밀번호가 특수문자로 나타나게 할 수 있다.*/
        onSubmitEditing={() => refPasswordConfirm.current.focus()}
        />
        <Input 
        ref={refPasswordConfirm}
        label="Password Confirm" 
        placeholder="Password Confirm"  
        returnKeyType="done"
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        isPassword={true}
        /*password Input 컨포넌트에 isPassword를 입력하면 비밀번호가 특수문자로 나타나게 할 수 있다.*/
        onSubmitEditing={_handleSignupBtnPress}
        />
        <Button title="회원가입" onPress ={_handleSignupBtnPress}/>
    </Container>
    </KeyboardAwareScrollView>
    );
};

export default Signup;