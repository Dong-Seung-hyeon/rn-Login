import React from 'react';
import styled from 'styled-components/native'
import {Button} from '../components';

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