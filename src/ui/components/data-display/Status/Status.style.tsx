import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
// import { StatusProps } from './Status';

export const StatusStyled = styled(Typography)`
    display: inline-block;
    border-radius: ${({ theme }) => theme.shape.borderRadius};
    color: white;
    padding: ${({ theme }) => theme.spacing(0.5) + ' ' + theme.spacing(1.5)};
    font-size: ${({ theme }) => theme.typography.body2.fontSize};
    vertical-align: middle;
`;
