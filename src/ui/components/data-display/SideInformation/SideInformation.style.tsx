import { styled } from '@mui/material/styles';
// import {  } from '@mui/material';
// import { SideInformationProps } from './SideInformation';

export const SideInformationContainer = styled('aside')`
    background-color: ${({ theme }) => theme.palette.grey[50]};
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: ${({ theme }) => theme.typography.body2.fontSize};
    max-width: 320px;
    h3,
    h4 {
        margin: 0;
    }
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
`;

export const InformationHeader = styled('header')`
    background-color: ${({ theme }) => theme.palette.grey[100]};
    padding: ${({ theme }) => theme.spacing(3)};
    text-align: center;
    font-size: ${({ theme }) => theme.typography.h6.fontSize};
`;

export const InformationFooter = styled('footer')`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(3)};
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.primary.contrastText};
    font-size: ${({ theme }) => theme.typography.h5.fontSize};
    padding: ${({ theme }) => theme.spacing(3)};

    i {
        font-size: 26px;
    }
`;

export const InformationListItem = styled('li')`
    position: relative;
    display: flex;
    padding: ${({ theme }) => theme.spacing(3)};
    gap: ${({ theme }) => theme.spacing(3)};
    align-items: center;

    h4 {
        margin-bottom: ${({ theme }) => theme.spacing()};
    }

    ul {
        color: ${({ theme }) => theme.palette.text.secondary};
    }

    i {
        font-size: 24px;
        & ~ div {
            h4 {
                margin-bottom: 0;
            }
        }
    }

    &:not(:last-of-type)::after {
        content: '';
        position: absolute;
        background-color: ${({ theme }) => theme.palette.grey[200]};
        height: 1px;
        left: ${({ theme }) => theme.spacing(3)};
        right: ${({ theme }) => theme.spacing(3)};
        bottom: 0;
    }
`;
