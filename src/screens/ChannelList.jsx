import React from 'react';
import styled from 'styled-components/native'
import {Button} from '../components';

const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.background};
`;

const StyledText = styled.Text`
    font-size: 30px;
`;

const ChannelList = () => {
    return(
        <Container>
            <StyledText>Channel List</StyledText>
            <Button title="Create" onPress={() => {}} />
            <Button title="Channel" onPress={() => {}} />
        </Container>
    );
};

export default ChannelList;