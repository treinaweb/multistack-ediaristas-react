import { TextColor } from 'data/@types/DiariaInterface';
import React from 'react';
// import { } from '@mui/material';
import { StatusStyled } from './Status.style';

export interface StatusProps {
    color?: TextColor;
}

const Status: React.FC<StatusProps> = ({ color = 'success', ...props }) => {
    return <StatusStyled sx={{ bgcolor: `${color}.main` }} {...props} />;
};

export default Status;
