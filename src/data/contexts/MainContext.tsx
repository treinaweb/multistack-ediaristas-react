import React from 'react';
import { ExternalServicesProvider } from './ExternalServicesContext';
import { UserProvider } from './UserContext';

export const MainProvider: React.FC = ({ children }) => {
    return (
        <>
            <ExternalServicesProvider>
                <UserProvider>{children}</UserProvider>
            </ExternalServicesProvider>
        </>
    );
};
