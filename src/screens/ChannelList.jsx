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
            <Button title="Channel" onPress={() => navigation.navigate('Channel')} />
        </Container>
    );
};

export default ChannelList;