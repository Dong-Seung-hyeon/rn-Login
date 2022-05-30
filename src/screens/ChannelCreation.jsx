import React, {useState, useRef, useEffect} from 'react';
/* Channel생성화면에서 필요한 useState, useRef, useEffect를 Import하였다. */
import styled from 'styled-components/native'
import {Button, Input, ErrorMessage} from '../components';
/* Input, ErrorMessage 컨포넌트도 import 하였다. */
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
/* KeyboardAwareScrollView도 사용하였다. */

const Container = styled.View`
    flex: 1;
    background-color: white;
    justify-content: center;
    /* Container components의 style을 수정 */
    align-items: center;
    padding: 0 20px;
`;

const ChannelCreation = ({navigation}) => {
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

    return(
        <Container>
            <Button title="Create" onPress={() => navigation.replace('Channel')/* navigate함수 대신 replace함수를 이용해 화면을 이동한다. */} />
        </Container>
    );
};

export default ChannelCreation;