import React from 'react'
import styled from 'styled-components/native'
import PropTypes from 'prop-types'

const Container = styled.View`
margin-bottom: 30px; 
// 아래의 컨포넌트와 너무 붙지않도록 margin-bottom을 주었다.
`;

const ProfileImage = styled.Image`
    background-color: ${({theme}) => theme.imgBackground};
    width: 170px;
    height: 170px;
    border-radius: 50px; 
    //가로와 세로(width, height)를 100px로 맞춰주었다.
    //이미지가 원형으로 나타나기 위해서 border-radius를 설정하였다.
`;

const Image = ({url}) => { //이미지 컨포넌트는 렌더링할 이미지의 주소를 알아야하므로 url을 전달받도록 하였다.
    return (
        <Container>
            <ProfileImage source={{uri: url}}/>
        </Container>
    );
};

Image.propTypes = { //전달되는 url은 string이 전달되어야한다.
    url: PropTypes.string,
};

export default Image;