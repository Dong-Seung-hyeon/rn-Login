import React, {useContext, useState, useRef} from 'react';
{/*Input 컨포넌트의 변화하는 값을 관리하기 위해서 useState를 이용해준다.
useRef를 이용하여 onSubmitEditing을 작성하기위해 useRef를 사용해준다.*/}
import styled, {ThemeContext} from 'styled-components/native';
import {Button, Image, Input} from '../components'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
/*헤더라인이 없으면 노치디자인에서 문제가 발생하므로 노치디자인을 해결하는 코드이다.*/
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { signin } from '../firebase';
/*signin함수를 이용하여 로그인을 하도록 하였다.*/

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.background};
    padding: 0 20px;
    padding-top: ${({insets: {top}}) => top}px;
    padding-bottom: ${({insets: {bottom}}) => bottom}px;
    /*헤더라인이 없으면 노치디자인에서 문제가 발생하므로 노치디자인을 해결하는 코드이다.*/
`;

const Icon = 'https://firebasestorage.googleapis.com/v0/b/rn-catch-my-hand.appspot.com/o/icon.png?alt=media'

const Signin = ({navigation}) => {
    const insets = useSafeAreaInsets();
    /*헤더라인이 없으면 노치디자인에서 문제가 발생하므로 노치디자인을 해결하는 코드이다.*/
    const theme = useContext(ThemeContext);
    /*theme.jsx를 사용하기위해서 useContext와 ThemeContext를 컨포넌트를 해주고 사용해야한다.*/

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const refPassword = useRef(null);
    /*password의 위치만 알면되므로 refPassword라는 변수를 만들어주었다.*/
    
    const _handleSigninBtnPress = async () => {
        /*password Input 컨포넌트에 onSubmitEditing과 signin 버튼에서 호출되는 onPress가 
        같은함수를 바라보도록 handleSigninBtnPress라는 함수를 만들어서 적용해주었다.
        그리고 async, await를 이용해주었다.*/
        try {
            const user = await signin({email, password});
            navigation.navigate('Profile', {user});
            /*로그인에 성공하면 프로필화면으로 이동을하도록 하였고, 프로필화면에 사용자의 정보도 함께 전송되도록 설정하였다.*/
        } catch (e) {
            Alert.alert('로그인 오류발생', e.message);
            /*로그인에 실패하면 alert을 이용하여 에러메시지를 출력하도록 하였습니다.*/
        }
        console.log('signin');
    }

    return (
    <KeyboardAwareScrollView extraScrollHeight={30} contentContainerStyle={{flex:1}}>
     <Container insets={insets}>
        <Image url={Icon}/>
        <Input /*상태변수와 Input 컨포넌트를 이용하여 value, onChangeText를 설정해준다.*/
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
        label="password" 
        placeholder="password"  
        returnKeyType="done"
        value={password}
        onChangeText={setPassword}
        isPassword={true}
        /*password Input 컨포넌트에 isPassword를 입력하면 비밀번호가 특수문자로 나타나게 할 수 있다.*/
        onSubmitEditing={_handleSigninBtnPress}
        />
        <Button title="로그인" onPress ={_handleSigninBtnPress}/>
        <Button 
        title="회원가입" 
        onPress ={() => navigation.navigate('Signup')} 
        containerStyle={{marginTop: 0, backgroundColor: 'transparent'}}
        textStyle={{color: theme.btnTextLink, fontSize:18}}
        />
    </Container>
    </KeyboardAwareScrollView>
    );
};

export default Signin;