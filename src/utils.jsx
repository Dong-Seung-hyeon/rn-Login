export const validateEmail = email => { /* 사용자가 정상적인 이메일을 입력했는지 확인하는 함수 */
    const regex = /^[0-9?A-z0-9?]+(\.)?[0-9?A-z0-9?]+@[0-9?A-z]+\.[A-z]{2}.?[A-z]{0,3}$/;
    /* 이메일 유효성을 검사하는 정규표현식 */
    return regex.test(email);
};

export const removeWhitespace = text => { /* 공백을 제거하는 함수 */
    const regex = /\s/g;
    return text.replace(regex, '');
};