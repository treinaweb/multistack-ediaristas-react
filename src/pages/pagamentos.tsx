import { Button, Container, Typography } from '@mui/material';
import { PagamentoStatus } from 'data/@types/PagamentoInterface';
import usePagamentos from 'data/hooks/pages/usePagamentos.page';
import { PaymentService } from 'data/services/PaymentService';
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
import { ButtonsContainer } from 'ui/partials/diarias/_minhas-diarias.styled';

const Pagamentos: React.FC = () => {
    const {
        filteredData,
        currentPage,
        setCurrentPage,
        totalPages,
        itemsPerPage,
        isMobile,
        filtro,
        setFiltro,
        alterarFiltro,
    } = usePagamentos();

    return (
        <>
            <Container sx={{ mb: 5, p: 0 }}>
                <PageTitle title={'Pagamentos'} />

                <ButtonsContainer>
                    <Button
                        onClick={() => alterarFiltro('pago')}
                        variant={filtro === 'pago' ? 'contained' : 'outlined'}
                    >
                        Pago
                    </Button>
                    <Button
                        onClick={() => alterarFiltro('aguardando')}
                        variant={
                            filtro === 'aguardando' ? 'contained' : 'outlined'
                        }
                    >
                        Aguardando transferência
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
                                                item.created_at as string
                                            )}
                                        </>
                                    }
                                    body={
                                        <>
                                            Status:{' '}
                                            {
                                                PaymentService.getStatus(
                                                    item.status as PagamentoStatus
                                                ).label
                                            }
                                            <br />
                                            Valor diária:{' '}
                                            {TextFormatService.currency(
                                                item.valor
                                            )}
                                            <br />
                                            Valor depósito:{' '}
                                            {TextFormatService.currency(
                                                item.valor_deposito
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
                                    'Valor da Diária',
                                    'Valor Depósito',
                                ]}
                                data={filteredData}
                                itemsPerPage={itemsPerPage}
                                currentPage={currentPage}
                                rowElement={(item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <strong>
                                                {TextFormatService.reverseDate(
                                                    item.created_at as string
                                                )}
                                            </strong>
                                        </TableCell>
                                        <TableCell>
                                            <Status
                                                color={
                                                    PaymentService.getStatus(
                                                        item.status as PagamentoStatus
                                                    ).color
                                                }
                                            >
                                                {
                                                    PaymentService.getStatus(
                                                        item.status as PagamentoStatus
                                                    ).label
                                                }
                                            </Status>
                                        </TableCell>
                                        <TableCell>
                                            {TextFormatService.currency(
                                                item.valor
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {TextFormatService.currency(
                                                item.valor_deposito
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
                        Nenhum pagamento ainda
                    </Typography>
                )}
            </Container>
        </>
    );
};

export default Pagamentos;
