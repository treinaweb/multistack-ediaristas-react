import { styled } from '@mui/material/styles';
import { Accordion } from '@mui/material';
// import { DataListProps } from './DataList';

export const AccordionStyled = styled(Accordion)`
    &.MuiAccordion-root {
        background-color: ${({ theme }) => theme.palette.background.default};
        color: ${({ theme }) => theme.palette.text.secondary};
        font-size: ${({ theme }) => theme.typography.body2.fontSize};
        box-shadow: none;

        &::before {
            background-color: transparent;
        }

        &,
        &.Mui-expanded {
            margin: -2px 0 0;
        }
    }

    .MuiAccordionDetails-root,
    .MuiAccordionActions-root {
        padding: ${({ theme }) => theme.spacing() + ' ' + theme.spacing(2)};
        background-color: ${({ theme }) => theme.palette.primary.main};
    }

    .MuiAccordionDetails-root,
    .MuiAccordionDetails-root .MuiTypography-root {
        color: ${({ theme }) => theme.palette.primary.contrastText};
        font-size: ${({ theme }) => theme.typography.body2.fontSize};
    }

    .MuiAccordionActions-root {
        flex-wrap: wrap;
        gap: ${({ theme }) => theme.spacing()};
        padding-bottom: ${({ theme }) => theme.spacing(3)};
        color: ${({ theme }) => theme.palette.primary.contrastText};
    }

    .MuiAccordionSummary-expandIconWrapper {
        color: ${({ theme }) => theme.palette.text.secondary};
        font-size: 12px;
    }
`;
