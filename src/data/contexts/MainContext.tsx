import React, { PropsWithChildren } from 'react';
import { ExternalServicesProvider } from './ExternalServicesContext';
import { UserProvider } from './UserContext';

export const MainProvider: React.FC<PropsWithChildren> = ({
    children,
}) => {
    return (
        <>
            <ExternalServicesProvider>
                <UserProvider>{children}</UserProvider>
            </ExternalServicesProvider>
        </>
    );
};
