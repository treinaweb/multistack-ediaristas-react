import { styled } from '@material-ui/core/styles';
// import { } from '@material-ui/core';

export const LoginButtonsContainer = styled('div')`
    display: flex;
    justify-content: flex-end;
    gap: ${({ theme }) => theme.spacing(3)};

    ${({ theme }) => theme.breakpoints.down('md')} {
        flex-direction: column;
        margin: 0 auto;
        max-width: 300px;
    }
`;
