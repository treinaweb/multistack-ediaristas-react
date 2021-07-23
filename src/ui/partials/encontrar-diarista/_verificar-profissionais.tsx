import React from 'react';
import {
    Button,
    Container,
    Typography,
    CircularProgress,
} from '@material-ui/core';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import SafeEnvironment from 'ui/components/feedback/SafeEnvironment/SafeEnvironment';

import {
    FormElementsContainer,
    ProfissionaisPaper,
    ProfissionaisContainer,
} from './_verificar-profissionais.styled';
import TextFieldMask from 'ui/components/inputs/TextFieldMask/TextFieldMask';
import UserInformation from 'ui/components/data-display/UserInformation/UserInformation';
import useVerificarProfissionais from 'data/hooks/pages/useVerificarProfissionais.page';

const VerificarProfissionais: React.FC = () => {
    const {
        cep,
        setCep,
        cepValido,
        buscarProfissionais,
        erro,
        diaristas,
        buscaFeita,
        carregando,
        diaristasRestantes,
    } = useVerificarProfissionais();
    return (
        <>
            <SafeEnvironment />
            <PageTitle
                title={'Conheça os profissionais'}
                subtitle={
                    'Preencha seu endereço e veja todos os profissionais da sua localidade'
                }
            />
            <Container sx={{ mb: 10 }}>
                <FormElementsContainer>
                    <TextFieldMask
                        mask={'99.999-999'}
                        label={'Digite seu CEP'}
                        fullWidth
                        value={cep}
                        onChange={(event) => setCep(event.target.value)}
                    />
                    {erro && <Typography color={'error'}>{erro}</Typography>}

                    <Button
                        variant={'contained'}
                        color={'secondary'}
                        sx={{ width: '220px' }}
                        disabled={!cepValido || carregando}
                        onClick={() => buscarProfissionais(cep)}
                    >
                        {carregando ? <CircularProgress size={20} /> : 'Buscar'}
                    </Button>
                </FormElementsContainer>

                {buscaFeita &&
                    (diaristas.length > 0 ? (
                        <ProfissionaisPaper>
                            <ProfissionaisContainer>
                                {diaristas.map((item, index) => (
                                    <UserInformation
                                        key={index}
                                        name={item.nome_completo}
                                        picture={item.foto_usuario || ''}
                                        rating={item.reputacao || 0}
                                        description={item.cidade}
                                    />
                                ))}
                            </ProfissionaisContainer>
                            <Container sx={{ textAlign: 'center' }}>
                                {diaristasRestantes > 0 && (
                                    <Typography
                                        variant={'body2'}
                                        color={'textSecondary'}
                                        sx={{ mt: 5 }}
                                    >
                                        ...e mais {diaristasRestantes}{' '}
                                        {diaristasRestantes > 1
                                            ? 'profissionais atendem'
                                            : 'profissional atende'}{' '}
                                        ao seu endereço.
                                    </Typography>
                                )}

                                <Button
                                    variant={'contained'}
                                    color={'secondary'}
                                    sx={{ mt: 5 }}
                                >
                                    Contratar um(a) profissional
                                </Button>
                            </Container>
                        </ProfissionaisPaper>
                    ) : (
                        <Typography align={'center'} color={'textPrimary'}>
                            Ainda não temos nenhum(a) diarista disponível em sua
                            região
                        </Typography>
                    ))}
            </Container>
        </>
    );
};

export default VerificarProfissionais;
