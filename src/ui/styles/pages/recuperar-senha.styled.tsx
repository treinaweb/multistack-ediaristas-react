import { styled } from '@mui/material/styles';
// import { } from '@mui/material';

export const FormFieldsContainer = styled('div')`
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(2)};
    width: 100%;
    max-width: 500px;
    margin: ${({ theme }) => '0 auto ' + theme.spacing(8)};
`;
