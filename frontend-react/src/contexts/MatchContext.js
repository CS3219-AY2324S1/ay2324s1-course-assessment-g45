import React, { createContext, useReducer } from 'react';

export const MatchContext = createContext();

const initialState = {
    showBanner: false,
    showModal: false
};

function reducer(state, action) {
    switch (action.type) {
        case 'WAITING_EASY_MATCH':
            return { ...state, showBanner: "WAITING_EASY_MATCH", showModal: false };
        case 'WAITING_MEDIUM_MATCH':
            return { ...state, showBanner: "WAITING_MEDIUM_MATCH", showModal: false };
        case 'WAITING_HARD_MATCH':
            return { ...state, showBanner: "WAITING_HARD_MATCH", showModal: false };
        case 'NO_MATCH_FOUND':
            return { ...state, showBanner: false, showModal: true, previousBanner: state.showBanner};
        case 'HIDE_MODAL':
                return { ...state, showModal: false};
        case 'HIDE_BANNER':
            return { ...state, showBanner: false };
        default:
            return state;
    }
}

export function MatchContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <MatchContext.Provider value={{ state, dispatch }}>
            {children}
        </MatchContext.Provider>
    );
}
