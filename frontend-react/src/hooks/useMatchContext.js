import { useContext } from 'react';
import { MatchContext } from '../contexts/MatchContext';

export function useMatchContext() {
    const context = useContext(MatchContext);

    if (!context) {
        throw new Error('useMatchContext must be used within a WaitingBannerProviders');
    }

    return context;
}
