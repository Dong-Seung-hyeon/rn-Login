import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native'
import PropTypes from 'prop-types';

const Container = styled.View`
    background-color: ${({theme}) => theme.btnBackground}; /* theme에 정의한 색을 이용하여 버튼의 색을 정의하였다. */
    padding: 10px;
    margin: 10px 0;
    flex: 1;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    opacity: ${({disabled}) => (disabled ? 0.5 : 1)};
    /* disabled 값에따라 opacity를 조절하여 사용자가 구분할 수 있도록 만들었다. */
`;
const Title = styled.Text`
    font-size: 24px;
    color: ${({theme}) => theme.btnTitle}; /* 타이틀의 글자색도 theme에 정의한 색을 이용하였다. */
`;

const Button = ({title, onPress, containerStyle, textStyle, disabled}) => { /*props로는 title과 onPress를 받도록 하였다. */
    /*그리고 버튼의 모습을 수정할 수 있는 containerStyle이라는 props를 추가해서 받고, title을 수정할 수 있는 textStyle을 받도록 하였다.
    로그인과 비밀번호를 모두 입력해야 로그인버튼이 활성화가 되도록 만들기 위해서 disabled를 추가해주었다.
    disabled를 사용한 이유는 TouchableOpacity 컨포넌트에서 설정할 수 있는것중에서 disabled라는 속성이 있기때문에 사용하였다. */
    return (
        <TouchableOpacity 
        onPress={onPress} 
        style={{flexDirection: 'row'}} disabled={disabled} 
        /*flexDirection을 row로 설정하여 방향을 가로로 변경한다.*/
        >
            <Container style={containerStyle} disabled={disabled} /* disabled상태에 따라 스타일을 변경하기 위해서 container components에도 disabled를 전달해주었다. */>
                <Title style={textStyle}>{title}</Title>
            </Container>
        </TouchableOpacity>
    )
}

Button.propTypes = { 
    /*propTypes를 이용하여 props로 전달되는 title과 onPress의 타입을 지정해준다.*/
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    containerStyle: PropTypes.object, /*전달되는 containerStyle은 style코드이기 때문에 객체로 전달되어야한다.*/
    textStyle: PropTypes.object, /*전달되는 textStyle은 style코드이기 때문에 객체로 전달되어야한다.*/
    disabled: PropTypes.bool,
};

export default Button;