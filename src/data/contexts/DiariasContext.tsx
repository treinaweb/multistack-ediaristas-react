import React, { createContext, PropsWithChildren } from 'react';
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

export const DiariaProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const reducer = useDiariaReducer();
    return (
        <DiariaContext.Provider value={reducer}>
            {children}
        </DiariaContext.Provider>
    );
};
