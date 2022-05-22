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

const ChannelList = ({navigation}) => {
    return(
        <Container>
            <StyledText>Channel List</StyledText>
            <Button title="Create" onPress={() => navigation.navigate('ChannelCreation')} />
            <Button title="Channel" onPress={() => navigation.navigate('Channel')} />
            <Button title="가정분양" onPress={() => navigation.navigate('MainDog')} />
        </Container>
    );
};

export default ChannelList;