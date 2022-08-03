import { styled } from '@mui/material/styles';
// import {  } from '@mui/material';
// import { BreadcrumbProps } from './Breadcrumb';

export const BreadcrumbContainer = styled('ul')`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0;
    list-style: none;
    color: ${({ theme }) => theme.palette.text.secondary};
    counter-reset: breadcrumb-counter;

    ${({ theme }) => theme.breakpoints.down('md')} {
        font-size: 12px;
        text-align: center;
        margin: 0;
        span {
            display: none;
        }
    }
    ${({ theme }) => theme.breakpoints.up('md')} {
        gap: ${({ theme }) => theme.spacing(2)};
        margin: ${({ theme }) => theme.spacing(2, 0)};
    }
`;

export const BreadcrumbItem = styled('li', {
    shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected?: boolean }>`
    ${({ theme }) => theme.breakpoints.down('md')} {
        flex: auto;
        padding: ${({ theme }) => theme.spacing(1, 3)};
        background-color: ${({ theme, isSelected }) =>
            theme.palette.grey[isSelected ? 200 : 100]};
    }
    ${({ theme }) => theme.breakpoints.down('sm')} {
        padding: ${({ theme }) => theme.spacing()};
    }

    ${({ theme }) => theme.breakpoints.up('md')} {
        counter-increment: breadcrumb-counter;
        font-weight: ${({ isSelected }) => (isSelected ? 'bold' : 'normal')};
        &::before {
            content: counter(breadcrumb-counter);
            margin-right: ${({ theme }) => theme.spacing()};
        }
    }
`;
