/* 네트워크 통신같이 시간지연이있는 행동을 시작할때 Spinner Components가 나타나고, 끝나면 Spinner Components가 사라지도록 해야한다. 
따라서 Spinner Components의 렌더링여부를 결정하는 Progress context를 제작하였다. */

import React, {useState, createContext} from 'react';

const ProgressContext =  createContext({
    inProgress: false,
    /* Spinner Components에 렌더링을 결정하는 inProgress라는 값을 만들었고,*/
    spinner: {start: () => {}, stop: () =>{}}
    /* Spinner Components에 렌더링 시작과 끝을 알려줄 함수를 만들었다. */
});

const ProgressProvider = ({children}) => {
    const [inProgress, setInProgress] = useState(false);
    const spinner = {
        start: () => setInProgress(true),
        /* Spinner의 Start함수는 Inprogress를 true로 만들고, */
        stop: () => setInProgress(false),
        /* Spinner의 Stop함수는 Inprogress를 false로 만들었다. */
    }
    const value = { inProgress, spinner };
    return (
        <ProgressContext.Provider value={value}>
            {children}
        </ProgressContext.Provider>
    );
};

export { ProgressContext, ProgressProvider };