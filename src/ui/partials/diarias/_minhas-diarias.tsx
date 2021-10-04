import { Button, Container, Typography } from '@mui/material';
import { DiariaInterface, DiariaStatus } from 'data/@types/DiariaInterface';
import useMinhasDiarias from 'data/hooks/pages/diarias/useMinhasDiarias.page';
import { DiariaService } from 'data/services/DiariaService';
import { TextFormatService } from 'data/services/TextFormatService';
import React from 'react';
import DataList from 'ui/components/data-display/DataList/DataList';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import Status from 'ui/components/data-display/Status/Status';
import Table, {
    TableCell,
    TablePagination,
    TableRow,
} from 'ui/components/data-display/Table/Table';
import Link from 'ui/components/navigation/Link/Link';
import {
    CancelDialog,
    ConfirmDialog,
    RatingDialog,
} from './_minhas-diarias-dialogs';
import { ButtonsContainer } from './_minhas-diarias.styled';

// import { Component } from './_minhas-diarias.styled';

const MinhasDiarias: React.FC = () => {
    const {
        filteredData,
        currentPage,
        setCurrentPage,
        totalPages,
        itemsPerPage,
        isMobile,
        podeVisualizar,
        podeConfirmar,
        diariaConfirmar,
        setDiariaConfirmar,
        confirmarDiaria,
        diariaAvaliar,
        setDiariaAvaliar,
        podeAvaliar,
        avaliarDiaria,
        diariaCancelar,
        setDiariaCancelar,
        podeCancelar,
        cancelarDiaria,
        filtro,
        setFiltro,
        alterarFiltro,
    } = useMinhasDiarias();

    return (
        <>
            <Container sx={{ mb: 5, p: 0 }}>
                <PageTitle title={'Minhas diárias'} />

                <ButtonsContainer>
                    <Button
                        onClick={() => alterarFiltro('pendentes')}
                        variant={
                            filtro === 'pendentes' ? 'contained' : 'outlined'
                        }
                    >
                        Pendentes
                    </Button>
                    <Button
                        onClick={() => alterarFiltro('avaliadas')}
                        variant={
                            filtro === 'avaliadas' ? 'contained' : 'outlined'
                        }
                    >
                        Avaliadas
                    </Button>
                    <Button
                        onClick={() => alterarFiltro('canceladas')}
                        variant={
                            filtro === 'canceladas' ? 'contained' : 'outlined'
                        }
                    >
                        Canceladas
                    </Button>
                </ButtonsContainer>

                {filteredData.length > 0 ? (
                    isMobile ? (
                        <>
                            {filteredData.map((item) => (
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
                                        </>
                                    }
                                    body={
                                        <>
                                            Status:{' '}
                                            {
                                                DiariaService.getStatus(
                                                    item.status as DiariaStatus
                                                ).label
                                            }
                                            <br />
                                            Valor:{' '}
                                            {TextFormatService.currency(
                                                item.preco
                                            )}
                                        </>
                                    }
                                    actions={
                                        <>
                                            {podeVisualizar(item) && (
                                                <Button
                                                    component={Link}
                                                    href={`?id=${item.id}`}
                                                    color={'inherit'}
                                                    variant={'outlined'}
                                                >
                                                    Detalhes
                                                </Button>
                                            )}
                                            {podeCancelar(item) && (
                                                <Button
                                                    color={'error'}
                                                    variant={'contained'}
                                                    onClick={() =>
                                                        setDiariaCancelar(item)
                                                    }
                                                >
                                                    Cancelar
                                                </Button>
                                            )}
                                            {podeConfirmar(item) && (
                                                <Button
                                                    color={'success'}
                                                    variant={'contained'}
                                                    onClick={() =>
                                                        setDiariaConfirmar(item)
                                                    }
                                                >
                                                    Confirmar Presença
                                                </Button>
                                            )}
                                            {podeAvaliar(item) && (
                                                <Button
                                                    color={'success'}
                                                    variant={'contained'}
                                                    onClick={() =>
                                                        setDiariaAvaliar(item)
                                                    }
                                                >
                                                    Avaliar
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
                                    'Status',
                                    'Tipo de Serviço',
                                    'Valor',
                                    '',
                                    '',
                                ]}
                                data={filteredData}
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
                                            <Status
                                                color={
                                                    DiariaService.getStatus(
                                                        item.status as DiariaStatus
                                                    ).color
                                                }
                                            >
                                                {
                                                    DiariaService.getStatus(
                                                        item.status as DiariaStatus
                                                    ).label
                                                }
                                            </Status>
                                        </TableCell>
                                        <TableCell>
                                            {item.nome_servico}
                                        </TableCell>
                                        <TableCell>
                                            {TextFormatService.currency(
                                                item.preco
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {podeVisualizar(item) && (
                                                <Link href={`?id=${item.id}`}>
                                                    Detalhes
                                                </Link>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {podeCancelar(item) && (
                                                <Button
                                                    color={'error'}
                                                    onClick={() =>
                                                        setDiariaCancelar(item)
                                                    }
                                                >
                                                    Cancelar
                                                </Button>
                                            )}
                                            {podeConfirmar(item) && (
                                                <Button
                                                    color={'success'}
                                                    onClick={() =>
                                                        setDiariaConfirmar(item)
                                                    }
                                                >
                                                    Confirmar Presença
                                                </Button>
                                            )}
                                            {podeAvaliar(item) && (
                                                <Button
                                                    color={'success'}
                                                    onClick={() =>
                                                        setDiariaAvaliar(item)
                                                    }
                                                >
                                                    Avaliar
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                )}
                            />
                            <TablePagination
                                count={totalPages}
                                page={currentPage}
                                onChange={(_event, nextPage) => {
                                    setCurrentPage(nextPage);
                                }}
                            />
                        </>
                    )
                ) : (
                    <Typography align={'center'}>
                        Nenhuma diária ainda
                    </Typography>
                )}
            </Container>

            {diariaConfirmar.id && (
                <ConfirmDialog
                    diaria={diariaConfirmar}
                    onConfirm={confirmarDiaria}
                    onCancel={() => setDiariaConfirmar({} as DiariaInterface)}
                />
            )}

            {diariaAvaliar.id && (
                <RatingDialog
                    diaria={diariaAvaliar}
                    onConfirm={avaliarDiaria}
                    onCancel={() => setDiariaAvaliar({} as DiariaInterface)}
                />
            )}

            {diariaCancelar.id && (
                <CancelDialog
                    diaria={diariaCancelar}
                    onConfirm={cancelarDiaria}
                    onCancel={() => setDiariaCancelar({} as DiariaInterface)}
                />
            )}
        </>
    );
};

export default MinhasDiarias;
