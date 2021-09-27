import React from 'react';
import InputMask from 'react-input-mask';
import TextField from '../TextField/TextField';
import { OutlinedTextFieldProps } from '@mui/material';

export interface TextFieldMaskProps
    extends Omit<OutlinedTextFieldProps, 'variant'> {
    mask: string;
}

const TextFieldMask: React.FC<TextFieldMaskProps> = ({
    mask,
    value,
    onChange,
    onBlur,
    ...props
}) => {
    return (
        <InputMask
            mask={mask}
            value={value as string}
            onChange={onChange}
            onBlur={onBlur}
        >
            {() => {
                return <TextField {...props} variant={'outlined'} />;
            }}
        </InputMask>
    );
};

export default TextFieldMask;
