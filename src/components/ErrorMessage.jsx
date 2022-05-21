import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const StyledText = styled.Text`
    align-items: flex-start;
    width: 100%;
    height: 100%;
    margin-bottom: 10px;
    line-height: 20px;
    color: ${({theme}) => theme.errorText};
`;

const ErrorMessage = ({message}) => {
    /* 에러메시지는 간단하게 메시지를 props에 전달받고, 렌더링하도록 만들었습니다. */
    return <StyledText>{message}</StyledText>
}

ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired,
}

export default ErrorMessage;