import React, {useState, forwardRef} from 'react';
/*/포커스 상태를 관리하기 위해서 useState를 사용했다.
Signin.jsx에서 useRef만 사용하였더니 오류가 나와서 forwardRef를 사용해주었다.*/
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.View` /*라벨과 input을 감싸는 Container 컨포넌트를 만든다.*/
flex-direction: column;
width: 100%;
margin: 10px 0;
`;

const Label = styled.Text` /*Label 컨포넌트도 작성해주었다.*/
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 6px;
    color: ${({theme, isFocused}) => isFocused ? theme.text : theme.inputLabel};
    /*Label 컨포넌트에서 isFocused 값에 따라 다른 스타일이 적용되도록 코드를 수정하였다.*/
`;

const StyledInput = styled.TextInput.attrs(({theme}) => ({ 
    /*theme에 정의한 색을 이용하기 위해서 Styled Component에서 제공해주는 attrs를 이용하여 placeholder에 색을 설정하도록 하였다.
    attrs객체는 구성요소가 수신하는 props를 수신하는 기능을 취한다. 반환받은 결과 props에도 병합이된다.
    스타일이 지정된 구성 요소를 래핑할 때.attrs가장 안쪽에 스타일이 지정된 구성 요소에서 가장 바깥에 스타일이 지정된 구성 요소에 적용됩니다.
    이렇게 하면 각 래퍼가 중첩된 사용 을 재정의 할 수 있습니다..attrs, 스타일시트에서 나중에 정의된 CSS 속성이 이전 선언을 재정의하는 방식과 유사합니다.*/
    placeholderTextColor: theme.inputPlaceholder,
}))`
    background-color: ${({theme, editable}) => editable ? theme.inputBackground : theme.inputDisabled};
    /*Input 컨포넌트의 배경색과 그외의 다른색들도 theme의 정의해놓은 색을 이용하였다.*/
    color: ${({theme}) => theme.text};
    padding: 20px 10px;
    font-size: 16px;
    border: 1px solid ${({theme, isFocused}) => isFocused ? theme.text : theme.inputBorder};
    /*Label 컨포넌트에서 isFocused 값에 따라 다른 스타일이 적용되도록 코드를 수정하였다.*/
    border-radius: 4px;
`;

const Input = forwardRef ( /*Input부분에 forwardRef를 전체적으로 넣어주면 된다.*/
(
    {
    /*Input 컨포넌트는 props로 label, value, onChangeText, onSubmitEditing, onBlur, placeholder, returnKeyType, maxLength, isPassword를 넣어주었습니다.*/
    label,
    value,
    onChangeText, /*Text가 변화할 때마다 불리는 function이다.*/
    onSubmitEditing, /*Text가 보내질 때마다 불리어지는 function이다.*/
    onBlur,
    /*onBlur는 포커스가 해지될 때 이벤트 설정이고, onfocus는 포커스를 받은경우 이벤트 설정이다.*/
    placeholder, /*input요소와 textarea요소에 알맞은 힌트를 제공하는 목적으로 사용한다.*/
    returnKeyType, 
    /*return key의 모양을 결정한다. ex) done, go, next, search, send 
    안드로이드 전용 => (none, previous)가 있고, ios 전용 => (default, emergency-call, google, join, route, yahoo)등이 있다. */
    maxLength, /*너무 긴 text가 입력되지 않도록 하는 코드이다.*/
    isPassword,
    disabled,
}, 
ref /*주의해야할 점은 ref는 함수의 두번째 파라미터로 전달된다는 점이다.*/
) => {
    const [isFocused, setIsFocused] = useState(false);
    /*포커스된 상태와 포커스되지 않은 상태를 구분하기위해서 사용한 코드이다.
    포커스 상태를 관리하기 위해서 useState를 가져오고, isFocused라는 상태변수를 만들었다.*/

    return ( /*props로 전달된 값들을 이용하여 label과 input 컨포넌트에 각각 설정해주었다.*/
        <Container>
        <Label isFocused={isFocused}>{label}</Label>
        {/*isFocused 상태변수를 Label 컨포넌트로 전달하여 상태에 따라 스타일이 다르게 나타나도록 하기위해 수정해주었다.*/}
        <StyledInput
        ref={ref}
        /*전달된 ref를 이용하여 input 컨포넌트에 ref로 설정하였다.*/
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        onBlur={() => {
            setIsFocused(false);
            /*포커스를 잃었을때 업데이트를 하기위해서 추가를해주었다.*/
            onBlur();
        }}
        placeholder={placeholder}
        returnKeyType={returnKeyType}
        maxLength={maxLength}
        autoCapitalize="none" /*자동 대문자 기능이나, 오타수정기능에 관련된 설정도 함께해주었다.*/
        autoCorrect={false}
        textContentType="none" /*ios에서 이메일이 나타내는 부분을 없애기 위해서 사용했다.*/
        isFocused={isFocused} 
        /*isFocused 상태변수를 StyledInput 컨포넌트로 전달하여 상태에 따라 스타일이 다르게 나타나도록 하기위해 수정해주었다.*/
        onFocus={()=>setIsFocused(true)}
        /*isFocused의 값은 onFocus가 호출이 되었을때 변경되도록 수정해주었다.*/
        secureTextEntry={isPassword}
        /*입력되는 비밀번호가 노출되는 문제를 해결하기위해 secureTextEntry라는 값을 설정해주었다.*/
        editable={!disabled}
        />
        </Container>
    );
}
);

Input.defaultProps = {
    onBlur: ()=>{},
    /*onBlur가 호출이 될때 props로 전달된 onBlur가 호출이될때 아무것도 전달이되지 않았을때 문제가 발생할 수 있다.
    그래서 defaultProps를 설정하여 혹시 모를 문제에 대응하도록 하였다. */
}

Input.propTypes = { /*props로 전달되는 값들은 PropTypes를 이용하여 type을 설정한다.*/
    label: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    onBlur: PropTypes.func,
    placeholder: PropTypes.string,
    returnKeyType: PropTypes.oneOf(['done', 'next']), /*returnKeyType은 string이긴 하지만, oneOf를 이용하여 done이나 next중에 하나만 허용하기로 한다.*/
    maxLength: PropTypes.number,
    isPassword: PropTypes.bool,
    disabled: PropTypes.bool,
};

export default Input;