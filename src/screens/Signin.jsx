import React, {useContext, useState, useRef, useEffect} from 'react';
{/*Input 컨포넌트의 변화하는 값을 관리하기 위해서 useState를 이용해준다.
useRef를 이용하여 onSubmitEditing을 작성하기위해 useRef를 사용해준다.*/}
import styled, {ThemeContext} from 'styled-components/native';
import {Button, Image, Input, ErrorMessage} from '../components'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
/*헤더라인이 없으면 노치디자인에서 문제가 발생하므로 노치디자인을 해결하는 코드이다.*/
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { signin } from '../firebase';
/*signin함수를 이용하여 로그인을 하도록 하였다.*/
import {validateEmail, removeWhitespace} from '../utils';
/* untils.jsx의 이메일유효성검사와 공백제거 함수를 불러와 사용 */
import { Alert } from 'react-native';
import {UserContext} from '../contexts';
/* 사용자가 로그인에 성공하면 UserContext의 User를 로그인한 사용자의 정보로 업데이트하도록 코드를추가하기 위해서 사용하는것이다. */

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
    const {setUser} = useContext(UserContext);
    /* useContext를 이용하여 User정보를 업데이트할 수 있는 setUser를 가져왔다. */

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    /* ErrorMessage를 관리할 errorMessage라는 상태변수를 설정해주었다. */
    const [disabled, setDisabled] = useState(true);
    /* 처음에는 입력된 값이 없기 때문에 초기값을 true로 설정해주었다. */
    const refPassword = useRef(null);
    /*password의 위치만 알면되므로 refPassword라는 변수를 만들어주었다.*/

    useEffect(() => {
        /* useEffect를 이용하여 상태변수의 변화에따라 disabled 값이 변화하도록 만들었다. */
        setDisabled(!(email && password && !errorMessage))
        /* 이메일이 입력되어있고, 비밀번호가 입력되어있고, 에러메시지가 없어야 버튼이 활성화되도록 만들었습니다.
        그리고 이 조건일때 disabled가 펄스여야합니다. */
    }, [email, password, errorMessage]/* disabled 값에 영향을주는 상태변수는 email, password, errorMessage가 있습니다. */)

    const _handleEmailChange = email => {
        const changedEmail = removeWhitespace(email);
        setEmail(changedEmail);
        /* 이메일에는 공백이 있을 수 없으니 이메일이 입력될때마다 공백을 제거하고 상태변수를 업데이트 하도록 하였다. */
        setErrorMessage(validateEmail(changedEmail) ? '' : '이메일을 제대로 입력해주시길 바랍니다!!')
        /* 이메일이 변경될 때마다 이메일의 유효성을 검사하고 그 결과에따라 에러메시지가 변경되도록 만들었습니다. */
    }

    const _handlePasswordChange = password => {
        setPassword(removeWhitespace(password));
        /* 비밀번호에도 공백이 있을 수 없으니 공백을 제거하고 상태변수를 업데이트 하도록 하였다. */
    }
    
    const _handleSigninBtnPress = async () => {
        /*password Input 컨포넌트에 onSubmitEditing과 signin 버튼에서 호출되는 onPress가 
        같은함수를 바라보도록 handleSigninBtnPress라는 함수를 만들어서 적용해주었다.
        그리고 async, await를 이용해주었다.*/
        try {
            const user = await signin({email, password});
            console.log(user);
            setUser(user);
            /*로그인에 성공하면 setUser를 이용해서 사용자의 정보로 업데이트 하도록 하였다.*/
        } catch (e) {
            Alert.alert('아이디와 비밀번호를 확인해주십시오.', e.message);
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
        onChangeText={_handleEmailChange} 
        onSubmitEditing={() => refPassword.current.focus()}
        /*Email Input에 onSubmitEditing에서 포커스를 이동하는 함수를 작성해주었다.*/
        />
        <Input 
        ref={refPassword}
        label="password" 
        placeholder="password"  
        returnKeyType="done"
        value={password}
        onChangeText={_handlePasswordChange}
        isPassword={true}
        /*password Input 컨포넌트에 isPassword를 입력하면 비밀번호가 특수문자로 나타나게 할 수 있다.*/
        onSubmitEditing={_handleSigninBtnPress}
        />
        <ErrorMessage message={errorMessage} />
        <Button title="로그인" onPress ={_handleSigninBtnPress} disabled={disabled}/>
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