import { Box, Button, Paper, Typography } from '@material-ui/core';
import useContratacao from 'data/hooks/pages/useContratacao.page';
import useIsMobile from 'data/hooks/useIsMobile';
import React from 'react';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import SideInformation from 'ui/components/data-display/SideInformation/SideInformation';
import SafeEnvironment from 'ui/components/feedback/SafeEnvironment/SafeEnvironment';
import { UserFormContainer } from 'ui/components/inputs/UserForm/UserForm';
import { PageFormContainer } from 'ui/components/inputs/UserForm/UserForm.style';
import Breadcrumb from 'ui/components/navigation/Breadcrumb/Breadcrumb';
import { FormProvider } from 'react-hook-form';
import DetalhesServico from './_detalhes-servico';
import CadastroCliente, { LoginCliente } from './_cadastro-cliente';
import InformacoesPagamento from './_informacoes-pagamento';
import Link from 'ui/components/navigation/Link/Link';

// import { Component } from './_contratacao.styled';

const Contratacao: React.FC = () => {
    const isMobile = useIsMobile(),
        {
            step,
            setStep,
            breadcrumbItems,
            serviceForm,
            clientForm,
            paymentForm,
            loginForm,
            onServiceFormSubmit,
            onClientFormSubmit,
            onLoginFormSubmit,
            onPaymentFormSubmit,
            servicos,
            hasLogin,
            setHasLogin,
            loginError,
        } = useContratacao();

    return (
        <div>
            {!isMobile && <SafeEnvironment />}
            <Breadcrumb
                selected={breadcrumbItems[step - 1]}
                items={breadcrumbItems}
            />

            {step === 1 && (
                <PageTitle title={'Nos conte um pouco sobre o serviço!'} />
            )}

            {step === 2 && (
                <PageTitle
                    title={'Precisamos conhecer um pouco sobre você!'}
                    subtitle={
                        !hasLogin ? (
                            <span>
                                Caso já tenha cadastro,{' '}
                                <Button onClick={() => setHasLogin(true)}>
                                    clique aqui
                                </Button>
                            </span>
                        ) : (
                            <span>
                                Caso não tenha cadastro,{' '}
                                <Button onClick={() => setHasLogin(false)}>
                                    clique aqui
                                </Button>
                            </span>
                        )
                    }
                />
            )}

            <UserFormContainer>
                <PageFormContainer fullWidth={step === 4}>
                    <Paper sx={{ p: 4 }}>
                        <FormProvider {...serviceForm}>
                            <form
                                onSubmit={serviceForm.handleSubmit(
                                    onServiceFormSubmit
                                )}
                                hidden={step !== 1}
                            >
                                <DetalhesServico servicos={servicos} />
                            </form>
                        </FormProvider>

                        {step === 2 && hasLogin && (
                            <FormProvider {...loginForm}>
                                <form
                                    onSubmit={loginForm.handleSubmit(
                                        onLoginFormSubmit
                                    )}
                                >
                                    {loginError && (
                                        <Typography
                                            color={'error'}
                                            align={'center'}
                                            sx={{ mb: 2 }}
                                        >
                                            {loginError}
                                        </Typography>
                                    )}
                                    <LoginCliente onBack={() => setStep(1)} />
                                </form>
                            </FormProvider>
                        )}

                        <FormProvider {...clientForm}>
                            <form
                                onSubmit={clientForm.handleSubmit(
                                    onClientFormSubmit
                                )}
                                hidden={step !== 2 || hasLogin}
                            >
                                <CadastroCliente onBack={() => setStep(1)} />
                            </form>
                        </FormProvider>

                        {step === 3 && (
                            <FormProvider {...paymentForm}>
                                <form
                                    onSubmit={paymentForm.handleSubmit(
                                        onPaymentFormSubmit
                                    )}
                                >
                                    <InformacoesPagamento />
                                </form>
                            </FormProvider>
                        )}

                        {step === 4 && (
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography
                                    color={'secondary'}
                                    sx={{ fontSize: '82px' }}
                                >
                                    <i className={'twf-check-circle'} />
                                </Typography>
                                <Typography
                                    color={'secondary'}
                                    sx={{ fontSize: '22px', pb: 3 }}
                                >
                                    Pagamento realizado com sucesso!
                                </Typography>
                                <Typography
                                    sx={{
                                        maxWidth: '410px',
                                        mb: 3,
                                        mx: 'auto',
                                    }}
                                    variant={'body2'}
                                    color={'textSecondary'}
                                >
                                    Sua diária foi paga com sucesso! Já estamos
                                    procurando o(a) melhor profissional para
                                    atender sua residência. Caso nenhum(a)
                                    profissional seja encontrado(a), devolvemos
                                    seu dinheiro automaticamente 24 horas antes
                                    da data agendada. Você também pode cancelar
                                    a sua diária sem nenhuma multa até 24 horas
                                    antes da hora do agendamento.
                                </Typography>

                                <Link
                                    href={'/diarias'}
                                    Component={Button}
                                    mui={{
                                        color: 'secondary',
                                        variant: 'contained',
                                    }}
                                >
                                    Ir para minhas diárias
                                </Link>
                            </Box>
                        )}
                    </Paper>

                    {!isMobile && step !== 4 && (
                        <SideInformation
                            title={'Detalhes'}
                            items={[
                                {
                                    title: 'Tipo',
                                    description: [''],
                                    icon: 'twf-check-circle',
                                },
                                {
                                    title: 'Tamanho',
                                    description: [''],
                                    icon: 'twf-check-circle',
                                },
                                {
                                    title: 'Data',
                                    description: [''],
                                    icon: 'twf-check-circle',
                                },
                            ]}
                            footer={{
                                text: 'R$80,00',
                                icon: 'twf-credit-card',
                            }}
                        />
                    )}
                </PageFormContainer>
            </UserFormContainer>
        </div>
    );
};

export default Contratacao;
