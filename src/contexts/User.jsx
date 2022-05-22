import React, {useState, createContext} from 'react';

const UserContext = createContext({
    /* createContext를 이용하여 UserContext를 생성해주었다. */
    user: {uid: null},
    /* firebase에 생성되는 user의 uid를 이용하여 로그인이 되었는지 아닌지를 판단하기 위해서 작성하였다. */
    setUser: () => {}
});

const UserProvider = ({children}) => {
    const [user, setUserInfo] = useState({});
    const setUser = ({uid}) => {
        setUserInfo({uid});
    };
    const value = { user, setUser };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export {UserContext, UserProvider};
/* consumer을 이용하지 않을것이기 때문에 UserContext와 UserProvider만 export를 해주었다. */