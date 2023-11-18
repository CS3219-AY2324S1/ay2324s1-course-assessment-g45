import React, { createContext, useReducer } from 'react';

export const MatchContext = createContext();

const initialState = {
    showBanner: false,
    showModal: false,
    disableButtons: false
};

function reducer(state, action) {
    switch (action.type) {
        case 'WAITING_EASY_MATCH':
            return { ...state, showBanner: "WAITING_EASY_MATCH", showModal: false, disableButtons: true };
        case 'WAITING_MEDIUM_MATCH':
            return { ...state, showBanner: "WAITING_MEDIUM_MATCH", showModal: false, disableButtons: true  };
        case 'WAITING_HARD_MATCH':
            return { ...state, showBanner: "WAITING_HARD_MATCH", showModal: false, disableButtons: true  };
        case 'NO_MATCH_FOUND':
            return { ...state, showBanner: false, showModal: true, previousBanner: state.showBanner, disableButtons: true };
        case 'HIDE_MODAL':
            return { ...state, showBanner: false, showModal: false, disableButtons: false  };
        case 'HIDE_BANNER':
            return { ...state, showBanner: false, showModal: false, disableButtons: false  };
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
