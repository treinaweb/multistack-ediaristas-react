import { styled } from '@mui/material/styles';
import { Paper, Typography } from '@mui/material';

export const CardsContainer = styled('div')`
    display: grid;
    grid-template-columns: 1fr;
    margin-bottom: ${({ theme }) => theme.spacing(5)};
    gap: ${({ theme }) => theme.spacing(2)};

    ${({ theme }) => theme.breakpoints.up('md')} {
        grid-template-columns: repeat(2, 1fr);
        grid-template-areas:
            'detail detail'
            'housecleaner client';
        gap: ${({ theme }) => theme.spacing(7)};
    }
`;

export const JobTitle = styled(Typography)`
    color: ${({ theme }) => theme.palette.primary.main};
    font-weight: bold;
    margin-bottom: ${({ theme }) => theme.spacing(4)};
    ${({ theme }) => theme.breakpoints.down('md')} {
        display: none;
    }
`;

export const JobDetails = styled(Paper)`
    color: ${({ theme }) => theme.palette.text.secondary};
    ${({ theme }) => theme.breakpoints.up('md')} {
        grid-area: detail;
        padding: ${({ theme }) => theme.spacing(4)};
    }
    ${({ theme }) => theme.breakpoints.down('md')} {
        box-shadow: none;
        margin-bottom: ${({ theme }) => theme.spacing(5)};
    }
`;

export const UserTitle = styled(Typography)`
    color: ${({ theme }) => theme.palette.primary.main};
    font-weight: bold;
    ${({ theme }) => theme.breakpoints.down('md')} {
        background-color: ${({ theme }) => theme.palette.grey[100]};
        padding: ${({ theme }) => theme.spacing(3)};
        margin: ${({ theme }) => '0 ' + theme.spacing(-3)};
    }
`;

export const UserCard = styled(Paper)`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing()};
    padding: ${({ theme }) => theme.spacing(4)};
    ${({ theme }) => theme.breakpoints.down('md')} {
        padding: 0;
        box-shadow: none;
    }
`;
