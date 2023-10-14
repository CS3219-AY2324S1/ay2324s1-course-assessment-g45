import React, { createContext, useReducer } from 'react';

export const WaitingBannerContext = createContext();

const initialState = {
    showBanner: false
};

function reducer(state, action) {
    switch (action.type) {
        case 'SHOW_EASY_BANNER':
            return { ...state, showBanner: "EASY_BANNER" };
        case 'SHOW_MEDIUM_BANNER':
            return { ...state, showBanner: "MEDIUM_BANNER" };
        case 'SHOW_HARD_BANNER':
            return { ...state, showBanner: "HARD_BANNER" };
        case 'HIDE_BANNER':
            return { ...state, showBanner: false };
        default:
            return state;
    }
}

export function WaitingBannerContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <WaitingBannerContext.Provider value={{ state, dispatch }}>
            {children}
        </WaitingBannerContext.Provider>
    );
}
