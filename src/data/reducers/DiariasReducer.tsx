import React, { useReducer, useEffect, useContext } from 'react';
import produce from 'immer';
import { DiariaInterface } from 'data/@types/DiariaInterface';
import { UserContext } from 'data/contexts/UserContext';
import { useApiHateoas } from 'data/hooks/useApi.hook';

export const initialState = {
    diarias: [] as DiariaInterface[],
    isFetching: true,
};

type InitialStateType = typeof initialState;

type DiariaAction = 'SET_DIARIA' | 'SET_FETCHING';

export type DiariaActionType = {
    type: DiariaAction;
    payload?: unknown;
};

export interface DiariaReducerInterface {
    diariaState: InitialStateType;
    diariaDispatch: React.Dispatch<DiariaActionType>;
}

const reducer = (
    state: InitialStateType,
    action: DiariaActionType
): InitialStateType => {
    const nextState = produce(state, (draftState) => {
        switch (action.type) {
            case 'SET_DIARIA':
                draftState.diarias = action.payload as DiariaInterface[];
                draftState.isFetching = false;
                break;
            case 'SET_FETCHING':
                draftState.isFetching = action.payload as boolean;
                break;
        }
    });
    return nextState;
};

export function useDiariaReducer(): DiariaReducerInterface {
    const { userState } = useContext(UserContext),
        { user } = userState,
        diarias = useApiHateoas<DiariaInterface[]>(user.links, 'lista_diarias')
            .data,
        [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (diarias) {
            dispatch({ type: 'SET_DIARIA', payload: diarias });
        }
    }, [diarias]);

    return {
        diariaState: state,
        diariaDispatch: dispatch,
    };
}
