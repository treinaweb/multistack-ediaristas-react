import React, { createContext } from 'react';
import {
    UserReducerInterface,
    initialState,
    useUserReducer,
} from 'data/reducers/UserReducer';

const initialValue: UserReducerInterface = {
    userState: initialState,
    userDispatch: () => {},
};

export const UserContext = createContext(initialValue);

export const UserProvider: React.FC = ({ children }) => {
    const reducer = useUserReducer();

    return (
        <UserContext.Provider value={reducer}>{children}</UserContext.Provider>
    );
};
