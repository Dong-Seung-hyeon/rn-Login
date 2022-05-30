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
`;

const StyledText = styled.Text`
    font-size: 30px;
`;

const ChannelCreation = ({navigation}) => {
    return(
        <Container>
            <StyledText>Channel Creation</StyledText>
            <Button title="Create" onPress={() => navigation.replace('Channel')/* navigate함수 대신 replace함수를 이용해 화면을 이동한다. */} />
        </Container>
    );
};

export default ChannelCreation;