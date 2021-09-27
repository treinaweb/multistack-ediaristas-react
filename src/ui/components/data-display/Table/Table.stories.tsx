import { Button } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Table, { TableCell, TablePagination, TableRow } from './Table';

export default {
    title: 'data-display/Table',
    component: Table,
    argTypes: {},
} as ComponentMeta<typeof Table>;

interface TemplatePropInterface {
    data: string;
    tipo: string;
    comodos: number;
    cidade: string;
}

const Template: ComponentStory<typeof Table> = (args) => (
    <>
        <Table {...args} />
        <TablePagination count={10} />
    </>
);

export const Default = Template.bind({});
Default.args = {
    header: ['Data', 'Tipo de Serviço', 'Número de Cômodos', 'Cidade', ''],
    data: [
        {
            data: '05/05/2021',
            tipo: 'Limpeza de rotina',
            comodos: 4,
            cidade: 'São Bernardo do Campo - SP',
        },
        {
            data: '05/05/2021',
            tipo: 'Limpeza pesada',
            comodos: 2,
            cidade: 'Santo André - SP',
        },
        {
            data: '05/05/2021',
            tipo: 'Limpeza pós obra',
            comodos: 3,
            cidade: 'São Bernardo do Campo - SP',
        },
    ],
    rowElement(_item, index) {
        const item = _item as TemplatePropInterface;
        return (
            <TableRow key={index}>
                <TableCell>
                    <strong>{item.data}</strong>
                </TableCell>
                <TableCell>{item.tipo}</TableCell>
                <TableCell>{item.comodos} cômodos</TableCell>
                <TableCell>{item.cidade}</TableCell>
                <TableCell align={'right'}>
                    <Button>Visualizar</Button>
                </TableCell>
            </TableRow>
        );
    },
};
