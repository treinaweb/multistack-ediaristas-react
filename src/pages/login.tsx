import React from 'react';
import { GetStaticProps } from 'next';
import SafeEnvironment from 'ui/components/feedback/SafeEnvironment/SafeEnvironment';
import { Container, Typography } from '@mui/material';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';

import { LoginContainer, LoginButton } from '@styles/pages/login.styled';
import { LoginForm } from 'ui/components/inputs/UserForm/UserForm';
import useLogin from 'data/hooks/pages/useLogin.page';
import { FormProvider } from 'react-hook-form';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: 'Login',
        },
    };
};

const Login: React.FC = () => {
    const {
        formMethods,
        errorMessage,
        onSubmit,
        externalServicesState,
    } = useLogin();

    return (
        <FormProvider {...formMethods}>
            <SafeEnvironment />
            <Container>
                <PageTitle title={'Informe seu e-mail e senha'} />
                <LoginContainer
                    as={'form'}
                    onSubmit={formMethods.handleSubmit(onSubmit)}
                >
                    <LoginForm />

                    {errorMessage && (
                        <Typography color={'error'} align={'center'}>
                            {errorMessage}
                        </Typography>
                    )}

                    <LoginButton
                        size={'large'}
                        variant={'contained'}
                        color={'secondary'}
                        type={'submit'}
                        disabled={
                            externalServicesState?.externalServices?.length ===
                            0
                        }
                    >
                        Entrar
                    </LoginButton>
                </LoginContainer>
            </Container>
        </FormProvider>
    );
};

export default Login;
