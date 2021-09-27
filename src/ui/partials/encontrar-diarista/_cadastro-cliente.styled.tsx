import { styled } from '@mui/material/styles';
// import { } from '@mui/material';

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
