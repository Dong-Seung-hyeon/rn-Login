/* 로그인이나 회원가입같이 network 통신을하는 동안에 사용자가 추가로 다른행동을 하지않도록 화면을 막는 Spinner Component를 만들었다. */
import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
    position: absolute;
    z-index: 2;
    /* Spinner Component는 z-index를 이용해서 다른 컨포넌트보다 항상 위에 나타나도록 만들었다. */
    opacity: 0.3;
    /* opacity를 이용해서 약간 투명하게 만들었다. */
    width: 100%;
    height: 100%;
    /* width와 height를 이용해서 화면전체를 차지하도록 제작하였다. */
    justify-content: center;
    background-color: ${({theme}) => theme.spinnerBackground};
`;

/* React Native에서 제공하는 ActivityIndicator Components를 이용하면 쉽게 Spinner Components를 구성할 수 있습니다. */
const Indicator = styled.ActivityIndicator.attrs(({theme}) => ({
    size: 'large',
    color: theme.spinnerIndicator
}))``;

const Spinner = () => {
    return (
        <Container>
            <Indicator />
        </Container>
    )
}

export default Spinner;