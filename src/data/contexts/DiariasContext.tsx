import React, { createContext } from 'react';
import {
    DiariaReducerInterface,
    initialState,
    useDiariaReducer,
} from 'data/reducers/DiariasReducer';

const initialValue: DiariaReducerInterface = {
    diariaState: initialState,
    diariaDispatch: () => {},
};

export const DiariaContext = createContext(initialValue);

export const DiariaProvider: React.FC = ({ children }) => {
    const reducer = useDiariaReducer();
    return (
        <DiariaContext.Provider value={reducer}>
            {children}
        </DiariaContext.Provider>
    );
};
