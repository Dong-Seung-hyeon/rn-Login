import React, {useState, useRef, useEffect, useContext} from 'react';
/* Channel생성화면에서 필요한 useState, useRef, useEffect를 Import하였다. */
import styled from 'styled-components/native'
import {Button, Input, ErrorMessage} from '../components';
/* Input, ErrorMessage 컨포넌트도 import 하였다. */
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
/* KeyboardAwareScrollView도 사용하였다. */
import {ProgressContext} from '../contexts';
/* 네트워크 통신동안 spinner components를 렌더링하기위해 ProgressContext도 가져왔다. */
import {createChannel, createContext} from '../firebase';

const Container = styled.View`
    flex: 1;
    background-color: white;
    justify-content: center;
    /* Container components의 style을 수정 */
    align-items: center;
    padding: 0 20px;
`;

const ChannelCreation = ({navigation}) => {
    const{spinner} = useContext(ProgressContext);
    
    const [title, setTitle] = useState('');
    /* 제목을 관리할 title 상태변수 */
    const [desc, setDesc] = useState('');
    /* 설명을 관리할 description 상태변수 */
    const [errorMessage, setErrorMessage] = useState('');
    /* 에러메시지를 관리할 error 상태변수 에러메시지는 조금 더 명확하게 errorMessage로 해주었다. */
    const [disabled, setDisabled] = useState(true);
    /* 버튼의 활성화 여부를 관리하는 disabled 상태변수 */

    const refDesc = useRef(null);
    /* 포커스 이동을 위해 refDesc도 만들어주었다. */

    useEffect(() => {
        /* useEffect를 사용하여 disabled 상태변수를 업데이트 */
        setDisabled(!(title && !errorMessage));
    }, [title, errorMessage]/* disabled의 영향을 주는 변수는 title, errorMessage이다. */)
    
    const _handleTitleChange = title => { 
        /* 제목이 변경될때 호출할 함수를 만들어주었다. */
        setTitle(title); /* title상태변수를 업데이트 */
        setErrorMessage(title.trim() ? '' : 'Please enter the title')
        /* title의 길이에 따라 에러메시지 상태변수를 업데이트 하도록 하였다. */
    }
    
    const _handleDescChange = desc => {
        /* 설명이 변경되었을때 호출할 함수도 만들어주었다. */
        setDesc(desc);
        setErrorMessage(title.trim() ? '' : 'Please enter the title')
        /* title의 길이에 따라 에러메시지 상태변수를 업데이트 하도록 하였다. */
    }

    const _handleCreateBtnPress = async() => {
        /* discription input component와 생성버튼에서 함께 사용할 함수의 모습만 만들어서 적용 */
        try{
            spinner.start();/* 시작할때 spinnerdp start를 호출해준다. */
            const id = await createChannel({title: title.trim(), desc: desc.trim()})
            /* createChannel로 title과 description을 전달하도록 하였다. */
            navigation.replace('Channel', {id, title});
            /* 정상적으로 channel이 생성되면 channel로 이동하는데 id와 title도 함께 전달해주었다. */
        } catch (e) {
            Alert.alert('Creation Error', e.message);
        } finally {
            spinner.stop(); /* 종료되면 항상 spinner에 stop을 호출한다. */
        }
    }

    return(
        <KeyboardAwareScrollView contentContainerStyle={{flex: 1}} extraScrollHeight={20}>
        <Container>
            <Input 
            label="Title" 
            value={title} 
            onChangeText={_handleTitleChange} /* 생성된 함수를 input 컨포넌트에 전달 */ 
            onSubmitEditing={() => refDesc.current.focus()} /* title input component의 onSubmitEditing에서는 discription input component로 포커스가 이동되도록 하였다. */
            onBlur={() => setTitle(title.trim())}
            placeholder="Title"
            returnKeyType="next"
            maxLength={20} /* 너무 긴 제목을 적지 못하도록 maxLength를 20으로 지정해주었다. */
            />
            <Input 
            /* Input 컨포넌트를 이용하여 제목과 설명을 받도록 하였다. */
            ref={refDesc} 
            label="Description" 
            value={desc} 
            onChangeText={_handleDescChange} 
            onSubmitEditing={_handleCreateBtnPress}
            onBlur={() => setDesc(desc.trim())}
            placeholder="Description"
            returnKeyType="done"
            maxLength={40} /* maxLength를 40으로 지정해주었다. */
            />
            <ErrorMessage message={errorMessage}/>
            {/* ErrorMessage 컨포넌트도 사용해주었다. */}
            <Button title="Create" 
            disabled={disabled}
            /* Button에 disabled를 전달 */
            onPress={_handleCreateBtnPress}/>
        </Container>
        </KeyboardAwareScrollView>
    );
};

export default ChannelCreation;