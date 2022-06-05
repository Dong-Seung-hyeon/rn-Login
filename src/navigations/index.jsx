import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Auth from './Auth';
import { UserContext, ProgressContext } from '../contexts';
/* Navigation에서 inprogress 값에따라 components가 렌더링되도록 코드를 수정해주었다. */
import Main from './Main';
import { Spinner } from '../components';
/* 어떤화면이든 가릴 수 있게 하기위해서 Spinner Components를 사용하였다. */

const Navigation = () => {
  const { user } = useContext(UserContext);
  /* UserContext에 User정보에 따라 Auth navigation이 렌더링되도록 수정해주었다. */
  const { inProgress } = useContext(ProgressContext);

  return (
    <NavigationContainer>
      {user.uid ? <Main /> : <Auth />}
      {
        inProgress && (
          <Spinner />
        ) /* Spinner Components는 inProgress가 true일때만 렌더링되도록 수정하였다. */
      }
    </NavigationContainer>
  );
  /* user에 uid존재 여부에따라 Main navigation이나 Auth navigation 둘중 하나가 이용되도록 설정해주었다. */
};

export default Navigation;
