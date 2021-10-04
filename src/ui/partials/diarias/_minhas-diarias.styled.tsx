import { styled } from '@mui/material/styles';
// import { } from '@mui/material';

export const ButtonsContainer = styled('div')`
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing(2)};
    margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

export const RatingBox = styled('div')`
    display: grid;
    grid-template-columns: 100px 1fr;
    gap: ${({ theme }) => theme.spacing() + ' ' + theme.spacing(2)};
    margin: ${({ theme }) => theme.spacing(4)} 0;

    ${({ theme }) => theme.breakpoints.up('md')} {
        padding: ${({ theme }) => theme.spacing(3)};
        border: 1px solid ${({ theme }) => theme.palette.grey[200]};
        > :nth-child(odd) {
            justify-self: end;
        }
    }

    ${({ theme }) => theme.breakpoints.down('md')} {
        grid-template-columns: 1fr;
    }
`;
