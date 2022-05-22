import React, { useState, useRef, useEffect, useContext } from 'react';
{/*Input 컨포넌트의 변화하는 값을 관리하기 위해서 useState를 이용해준다.
useRef를 이용하여 onSubmitEditing을 작성하기위해 useRef를 사용해준다.*/}
import styled from 'styled-components/native';
import {Button, Image, Input, ErrorMessage} from '../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { signup } from '../firebase';
/* 생성한 signup함수를 불러와서 제작하였다. */
import { Alert } from 'react-native';
import {validateEmail, removeWhitespace} from '../utils';
/* untils.jsx의 이메일유효성검사와 공백제거 함수를 불러와 사용 */
import {UserContext} from '../contexts';
/* 사용자가 로그인에 성공하면 UserContext의 User를 로그인한 사용자의 정보로 업데이트하도록 코드를추가하기 위해서 사용하는것이다. */

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.background};
    padding: 50px 20px;
`;

const Signup = ({navigation}) => {
    const {setUser} = useContext(UserContext); 
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    /* ErrorMessage를 관리할 errorMessage라는 상태변수를 설정해주었다. */
    const [disabled, setDisabled] = useState(true);
    /* 처음에는 입력된 값이 없기 때문에 초기값을 true로 설정해주었다. */

    const refEmail = useRef(null);
    /*확인버튼을 통한 포커스 이동을 위해 useRef이용하여 추가로 변수를 추가해주었다.*/
    const refPassword = useRef(null);
    /*password의 위치만 알면되므로 refPassword라는 변수를 만들어주었다.*/
    const refPasswordConfirm = useRef(null);;
    /*확인버튼을 통한 포커스 이동을 위해 useRef이용하여 추가로 변수를 추가해주었다.*/
    const refPhoneNumber = useRef(null);
    /*확인버튼을 통한 포커스 이동을 위해 useRef이용하여 추가로 변수를 추가해주었다.*/
    const refDidMount = useRef(null);

    useEffect(() => {
        /* useEffect를 이용하여 상태변수의 변화에따라 disabled 값이 변화하도록 만들었다. */
        setDisabled(!(name && email && password && passwordConfirm && phoneNumber && !errorMessage))
        /* 네임이 입력되어있고, 이메일이 입력되어있고, 비밀번호가 입력되어있고, 비밀번호확인이 입력되어있고, 전화번호가 입력되어있고, 에러메시지가 없어야 버튼이 활성화되도록 만들었습니다.
        그리고 이 조건일때 disabled가 펄스여야합니다. */
    }, [name, email, password, passwordConfirm, phoneNumber, errorMessage]
    /* disabled 값에 영향을주는 상태변수는 name, email, password, passwordConfirm, phoneNumber, errorMessage가 있습니다. */)

    useEffect(() => {
        if (refDidMount.current) {
        let error = '';
        if (!name) {error = '이름을 입력해주세요!';
      } else if (!email) {error = '이메일을 입력해주세요!';
      } else if (!validateEmail(email)) {error ='이메일형식에 맞도록 입력해주세요.';
      } else if (password.length<6) {error = '비밀번호는 최소 6자 이상 입력하셔야합니다.';
      } else if (password !== passwordConfirm) {error = '비밀번호가 일치하지 않습니다!';
      } else if (!phoneNumber) {error = '전화번호를 입력해주세요!';
      } else {
            error = '';
        }
        setErrorMessage(error);
    } else {
        refDidMount.current = true;
    }
    }, [name, email, password, passwordConfirm, phoneNumber])
    
    const _handleSignupBtnPress = async () => {
        /*password Input 컨포넌트에 onSubmitEditing과 signup 버튼에서 호출되는 onPress가 
        같은함수를 바라보도록 handleSignupBtnPress라는 함수를 만들어서 적용해주었다.*/
        try {
            const user = await signup({name, email, password, phoneNumber});
            Alert.alert('회원가입이 완료되었습니다.')
            setUser(user);
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
        onBlur={() => setName(name.trim())}
        /* 입력받는 값중 name은 공백은 허용되지만 앞,뒤로 공백은 허용하지 않도록 작성하였다. */
        maxLength={12}
        /* 너무 긴 이름을 입력하지 않도록 설정해주었다. */
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
        onBlur={() => setEmail(removeWhitespace(email))}
        /* 이메일은 공백을 허용하지 않도록 작성하였다. */
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
        onBlur={() => setPassword(removeWhitespace(password))}
        /* 비밀번호도 마찬가지로 공백을 허용하지 않도록 작성하였다. */
        />
        <Input 
        ref={refPasswordConfirm}
        label="Password Confirm" 
        placeholder="Password Confirm"  
        returnKeyType="next"
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        isPassword={true}
        /*password Input 컨포넌트에 isPassword를 입력하면 비밀번호가 특수문자로 나타나게 할 수 있다.*/
        onSubmitEditing={() => refPhoneNumber.current.focus()}
        onBlur={() => setPasswordConfirm(removeWhitespace(passwordConfirm))}
        /* 비밀번호확인도 마찬가지로 공백을 허용하지 않도록 작성하였다. */
        />
        <Input 
        ref={refPhoneNumber}
        label="Phone Number" 
        placeholder="Phone Number"  
        returnKeyType="done"
        value={phoneNumber}
        onChangeText={setPhoneNumber} 
        onSubmitEditing={_handleSignupBtnPress}
        /*Email Input에 onSubmitEditing에서 포커스를 이동하는 함수를 작성해주었다.*/
        onBlur={() => setPhoneNumber(removeWhitespace(phoneNumber))}
        /* 전화번호도 마찬가지로 공백을 허용하지 않도록 작성하였다. */
        />
        <ErrorMessage message={errorMessage} />
        <Button title="회원가입" onPress ={_handleSignupBtnPress} disabled={disabled} /* 정보를 다 입력하지 않으면 버튼이 활성화가 되지않도록 작성하였다. *//>
    </Container>
    </KeyboardAwareScrollView>
    );
};

export default Signup;