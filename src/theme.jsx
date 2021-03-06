const Colors = {
  white: '#ffffff',
  black: '#111111',
  main: '#F6EBFC',
  grey_0: '#d5d5d5' /* Image의 배경색으로 사용할 색이다.*/,
  grey_1: '#a6a6a6',
  grey_2: '#f4f4f4',
  red: '#e84118' /* 에러메시지에 사용할 색을 정의해주었다. */,
  blue: '#0080ff',
};

export const theme = {
  background: Colors.main,
  bar: Colors.white,
  text: Colors.black,
  errorText: Colors.red,

  // Button
  btnBackground: Colors.white,
  btnTitle: Colors.black,
  btnTextLink:
    Colors.black /* 배경색이 없는 버튼을 이용할때 사용할 색을 정의한 코드 */,
  //   btnSignout: Colors.red,

  // Image
  imgBackground: Colors.grey_0,
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',

  // Input
  inputBackground: Colors.white,
  inputLabel: Colors.grey_1,
  inputPlaceholder: Colors.grey_1,
  inputBorder: Colors.grey_1,
  inputDisabled: Colors.grey_2,

  // Spinner
  spinnerBackground: Colors.black,
  spinnerIndicator: Colors.white,

  //Tab
  tabBtnActive: Colors.blue,
  tabBtnInactive: Colors.grey_1,

  // List - Item
  itemBorder: Colors.grey_0,
  itemTime: Colors.grey_1,
  itemDesc: Colors.grey_1,
  itemIcon: Colors.text,

  //Chat
  sendBtnActive: Colors.blue,
  sendBtnInactive: Colors.grey_1,
};
