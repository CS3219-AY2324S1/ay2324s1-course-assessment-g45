import { useContext } from 'react';
import { WaitingBannerContext } from '../contexts/WaitingBannerContext';

export function useWaitingBanner() {
    const context = useContext(WaitingBannerContext);

    if (!context) {
        throw new Error('useWaitingBanner must be used within a WaitingBannerProviders');
    }

    return context;
}
