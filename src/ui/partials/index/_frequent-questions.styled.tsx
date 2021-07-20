import { styled } from '@material-ui/core/styles';
import { Accordion } from '@material-ui/core';

export const SectionContainer = styled('section')`
    padding-bottom: ${({ theme }) => theme.spacing(7)};
`;

export const Wave = styled('img')`
    width: 100%;
    height: 100px;
    margin-top: -100px;
`;

export const SectionTitle = styled('h2')`
    margin: 0;
    text-align: center;
`;

export const SectionSubTitle = styled('p')`
    position: relative;
    margin: ${({ theme }) => theme.spacing(2) + ' 0 ' + theme.spacing(10)};
    text-align: center;
    &::after {
        content: '';
        position: absolute;
        width: 96px;
        height: 3px;
        left: 50%;
        bottom: ${({ theme }) => theme.spacing(-5)};
        transform: translateX(-50%);
        background-color: ${({ theme }) => theme.palette.grey[300]};
    }
`;

export const AccordionStyled = styled(Accordion)`
    .MuiAccordionSummary-content .MuiTypography-root {
        font-weight: bold;
    }

    &.MuiAccordion-root {
        box-shadow: none;
        border: 2px solid ${({ theme }) => theme.palette.primary.main};

        &::before {
            background-color: transparent;
        }

        &,
        &.Mui-expanded {
            margin: -2px 0 0;
        }
    }

    .MuiAccordionDetails-root {
        padding-right: ${({ theme }) => theme.spacing(7)};
    }

    .MuiAccordionSummary-expandIconWrapper {
        color: ${({ theme }) => theme.palette.text.secondary};
    }
`;
