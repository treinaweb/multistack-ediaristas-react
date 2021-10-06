import React from 'react';
import { FormContainerStyled } from './UserForm.style';
// import { } from '@mui/material';
// import { Component } from './UserForm.style';

export interface UserFormProps {}

export const UserFormContainer = FormContainerStyled;

const UserForm: React.FC<UserFormProps> = () => {
    return (
        <div>
            <div>UserForm</div>
        </div>
    );
};

export default UserForm;

export * from './forms/AddressForm';
export * from './forms/CitiesForm';
export * from './forms/FinancialForm';
export * from './forms/NewContactForm';
export * from './forms/ContactForm';
export * from './forms/PaymentForm';
export * from './forms/PictureForm';
export * from './forms/UserDataForm';
export * from './forms/LoginForm';
