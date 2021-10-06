import React from 'react';
import { GetStaticProps } from 'next';
import useAlterarDados from 'data/hooks/pages/useAlterarDados.page';
import { FormProvider } from 'react-hook-form';
import {
    AddressForm,
    CitiesForm,
    ContactForm,
    FinancialForm,
    UserDataForm,
    UserFormContainer,
} from 'ui/components/inputs/UserForm/UserForm';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import { Paper, Typography, Box, Button, Snackbar } from '@mui/material';
import { FormContainer, UserPicture } from '@styles/pages/alterar-dados.styled';
import { UserType } from 'data/@types/UserInterface';

// import { Component } from '@styles/pages/alterar-dados.styled';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: 'Alterar Dados',
        },
    };
};

const AlterarDados: React.FC = () => {
    const {
        user,
        userAddress,
        formMethods,
        picture,
        onPictureChange,
        snackMessage,
        setSnackMessage,
        onSubmit,
    } = useAlterarDados();

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                <UserFormContainer>
                    <PageTitle title={'Alterar dados cadastrais'} />

                    <Paper sx={{ mb: 3, mt: 15, position: 'relative' }}>
                        <UserPicture>
                            {picture && <img src={picture} alt={'Usuário'} />}
                            <input
                                type={'file'}
                                {...formMethods.register(
                                    'usuario.foto_usuario'
                                )}
                                onChange={onPictureChange}
                                accept={'.jpeg, .jpg, .png'}
                            />
                            <i className={'twf-camera'} />
                        </UserPicture>
                        <Typography sx={{ pt: 14, pb: 2 }} align={'center'}>
                            Dados pessoais
                        </Typography>
                        <FormContainer>
                            <UserDataForm />
                        </FormContainer>
                    </Paper>

                    {user.tipo_usuario === UserType.Diarista && (
                        <Paper sx={{ mb: 3 }}>
                            <Typography sx={{ pt: 4, pb: 2 }} align={'center'}>
                                Financeiro
                            </Typography>
                            <FormContainer>
                                <FinancialForm />
                            </FormContainer>
                        </Paper>
                    )}

                    <Paper sx={{ mb: 3 }}>
                        <Typography sx={{ pt: 4, pb: 2 }} align={'center'}>
                            Dados de acesso
                        </Typography>
                        <FormContainer>
                            <ContactForm />
                        </FormContainer>
                    </Paper>

                    {user.tipo_usuario === UserType.Diarista && (
                        <>
                            <Paper sx={{ mb: 3 }}>
                                <Typography
                                    sx={{ pt: 4, pb: 2 }}
                                    align={'center'}
                                >
                                    Endereço
                                </Typography>
                                <FormContainer>
                                    <AddressForm />
                                </FormContainer>
                            </Paper>
                            <Paper sx={{ mb: 3 }}>
                                <Typography
                                    sx={{ pt: 4, pb: 2 }}
                                    align={'center'}
                                >
                                    Cidades
                                </Typography>
                                <FormContainer>
                                    <CitiesForm estado={userAddress.estado} />
                                </FormContainer>
                            </Paper>
                        </>
                    )}

                    <Box sx={{ mt: 2, mb: 8, textAlign: 'center' }}>
                        <Button
                            variant={'contained'}
                            color={'secondary'}
                            size={'large'}
                            type={'submit'}
                        >
                            Salvar
                        </Button>
                    </Box>
                </UserFormContainer>
            </form>

            <Snackbar
                open={snackMessage.length > 0}
                message={snackMessage}
                autoHideDuration={4000}
                onClose={() => setSnackMessage('')}
            />
        </FormProvider>
    );
};

export default AlterarDados;
