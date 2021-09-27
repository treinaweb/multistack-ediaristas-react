import { styled } from '@mui/material/styles';
// import {  } from '@mui/material';
// import { JobInformationProps } from './JobInformation';

export const JobInformationContainer = styled('div')`
    color: ${({ theme }) => theme.palette.text.secondary};
    padding: ${({ theme }) => theme.spacing(2) + ' ' + theme.spacing()};
    margin-bottom: ${({ theme }) => theme.spacing(4)};
    font-size: ${({ theme }) => theme.typography.body2.fontSize};

    ${({ theme }) => theme.breakpoints.up('md')} {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        gap: ${({ theme }) => theme.spacing(4)};
        padding: ${({ theme }) => theme.spacing(3) + ' ' + theme.spacing(4)};
        background-color: ${({ theme }) => theme.palette.grey[100]};
    }
`;

export const JobInformationIcon = styled('i')`
    font-size: 24px;
    ${({ theme }) => theme.breakpoints.down('md')} {
        display: none;
    }
`;

export const JobDataContainer = styled('div')`
    ${({ theme }) => theme.breakpoints.down('md')} {
        strong {
            font-weight: normal;
        }
    }
`;
