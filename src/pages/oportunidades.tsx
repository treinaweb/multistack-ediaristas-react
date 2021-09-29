import React from 'react';
import { GetStaticProps } from 'next';
import useOportunidadesTrabalho from 'data/hooks/pages/useOportunidades.page';
import {
    Button,
    Container,
    Divider,
    Snackbar,
    Typography,
} from '@mui/material';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import DataList from 'ui/components/data-display/DataList/DataList';
import Table, {
    TableCell,
    TablePagination,
    TableRow,
} from 'ui/components/data-display/Table/Table';
import Dialog from 'ui/components/feedback/Dialog/Dialog';
import { Box } from '@mui/material';
import JobInformation from 'ui/components/data-display/JobInformation/JobInformation';
import UserInformation from 'ui/components/data-display/UserInformation/UserInformation';
import { TextFormatService } from 'data/services/TextFormatService';
import { EnderecoInterface } from 'data/@types/EnderecoInterface';

// import { Component } from '@styles/pages/oportunidades.styled';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: 'Oportunidades',
        },
    };
};

const Oportunidades: React.FC = () => {
    const {
        isMobile,
        oportunidades,
        currentPage,
        setCurrentPage,
        totalPages,
        itemsPerPage,
        oportunidadeSelecionada,
        setOportunidadeSelecionada,
        seCandidatar,
        mensagemSnackbar,
        setMensagemSnackbar,
        totalComodos,
        podeCandidatar,
    } = useOportunidadesTrabalho();

    return (
        <>
            <Container sx={{ mb: 5, p: 0 }}>
                <PageTitle title={'Oportunidades de trabalho'} />

                {oportunidades.length > 0 ? (
                    isMobile ? (
                        <>
                            {oportunidades.map((item) => (
                                <DataList
                                    key={item.id}
                                    header={
                                        <>
                                            Data:{' '}
                                            {TextFormatService.reverseDate(
                                                item.data_atendimento as string
                                            )}
                                            <br />
                                            {item.nome_servico}
                                            <br />
                                            {TextFormatService.currency(
                                                item.preco
                                            )}
                                        </>
                                    }
                                    body={
                                        <>
                                            Cidade: {item.cidade}
                                            <br />
                                            Número de cômodos:{' '}
                                            {totalComodos(item)}
                                        </>
                                    }
                                    actions={
                                        <>
                                            {podeCandidatar(item) && (
                                                <Button
                                                    variant={'contained'}
                                                    color={'secondary'}
                                                    onClick={() =>
                                                        setOportunidadeSelecionada(
                                                            item
                                                        )
                                                    }
                                                >
                                                    Se candidatar
                                                </Button>
                                            )}
                                        </>
                                    }
                                />
                            ))}
                        </>
                    ) : (
                        <>
                            <Table
                                header={[
                                    'Data',
                                    'Tipo de Serviço',
                                    'Número de Cômodos',
                                    'Cidade',
                                    'Valor',
                                    '',
                                ]}
                                data={oportunidades}
                                itemsPerPage={itemsPerPage}
                                currentPage={currentPage}
                                rowElement={(item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <strong>
                                                {TextFormatService.reverseDate(
                                                    item.data_atendimento as string
                                                )}
                                            </strong>
                                        </TableCell>
                                        <TableCell>
                                            {item.nome_servico}
                                        </TableCell>
                                        <TableCell>
                                            {totalComodos(item)} cômodos
                                        </TableCell>
                                        <TableCell>
                                            {item.cidade} - {item.estado}
                                        </TableCell>
                                        <TableCell>
                                            {TextFormatService.currency(
                                                item.preco
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {podeCandidatar(item) && (
                                                <Button
                                                    onClick={() =>
                                                        setOportunidadeSelecionada(
                                                            item
                                                        )
                                                    }
                                                >
                                                    Se candidatar
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                )}
                            />
                            <TablePagination
                                count={totalPages}
                                page={currentPage}
                                onChange={(_event, nextPage) =>
                                    setCurrentPage(nextPage)
                                }
                            />
                        </>
                    )
                ) : (
                    <Typography align={'center'}>
                        Nenhuma oportunidade ainda
                    </Typography>
                )}
            </Container>

            {oportunidadeSelecionada && (
                <Dialog
                    isOpen={oportunidadeSelecionada !== undefined}
                    onClose={() => setOportunidadeSelecionada(undefined)}
                    onConfirm={() => seCandidatar(oportunidadeSelecionada)}
                    title={'Se candidatar à diária'}
                    subtitle={
                        'Tem certeza que deseja se candidatar à diária abaixo?'
                    }
                >
                    <Box>
                        <JobInformation>
                            <>
                                <div>
                                    Data:{' '}
                                    <strong>
                                        {TextFormatService.dateTime(
                                            oportunidadeSelecionada?.data_atendimento as string
                                        )}
                                    </strong>
                                </div>
                                <div>
                                    {TextFormatService.getAddress(
                                        oportunidadeSelecionada as EnderecoInterface
                                    )}
                                </div>
                                <div>
                                    <strong>
                                        Valor:{' '}
                                        {TextFormatService.currency(
                                            oportunidadeSelecionada?.preco
                                        )}
                                    </strong>
                                </div>
                            </>
                        </JobInformation>
                    </Box>

                    <UserInformation
                        name={
                            oportunidadeSelecionada?.cliente.nome_completo || ''
                        }
                        rating={oportunidadeSelecionada?.cliente.reputacao || 0}
                        picture={
                            oportunidadeSelecionada?.cliente.foto_usuario || ''
                        }
                    />

                    <Divider />

                    {oportunidadeSelecionada?.avaliacoes_cliente.length > 0 && (
                        <>
                            <Typography
                                sx={{
                                    p: 3,
                                    fontWeight: 'medium',
                                    bgcolor: 'grey.50',
                                }}
                            >
                                Últimas avaliações do cliente
                            </Typography>

                            {oportunidadeSelecionada?.avaliacoes_cliente.map(
                                (item, index) => (
                                    <UserInformation
                                        key={index}
                                        name={item.nome_avaliador}
                                        rating={item.nota}
                                        picture={item.foto_avaliador}
                                        description={item.descricao}
                                        isRating={true}
                                    />
                                )
                            )}
                        </>
                    )}

                    <Typography
                        sx={{ py: 2 }}
                        variant={'subtitle2'}
                        color={'textSecondary'}
                    >
                        Ao se candidatar você ainda não é o(a) diarista
                        escolhido(a) para realizar o trabalho. Vamos analisar
                        suas qualificações e a distância para o local da diária.
                        Caso você seja a pessoa selecionada, receberá um email
                        avisando. Atente-se à sua caixa de entrada!
                    </Typography>
                </Dialog>
            )}

            <Snackbar
                open={mensagemSnackbar.length > 0}
                message={mensagemSnackbar}
                autoHideDuration={4000}
                onClose={() => setMensagemSnackbar('')}
            />
        </>
    );
};

export default Oportunidades;
