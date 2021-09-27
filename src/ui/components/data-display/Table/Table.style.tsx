import { styled } from '@mui/material/styles';
import {
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Pagination,
    Paper,
} from '@mui/material';
// import { TableProps } from './Table';

export const TablePaper = styled(Paper)`
    padding: ${({ theme }) => '0 ' + theme.spacing(4)};
`;

export const TableContainerStyled = styled(TableContainer)``;
export const TableStyled = styled(Table)`
    &.MuiTable-root {
        border-collapse: separate;
        border-spacing: 0 ${({ theme }) => theme.spacing(3)};
    }
`;
export const TableHeadStyled = styled(TableHead)`
    text-transform: uppercase;
    .MuiTableCell-root {
        font-weight: bold;
    }
`;
export const TableBodyStyled = styled(TableBody)`
    .MuiTableRow-root {
        background-color: ${({ theme }) => theme.palette.grey[100]};
    }
`;
export const TableRowStyled = styled(TableRow)``;
export const TableCellStyled = styled(TableCell)`
    &.MuiTableCell-root {
        border: none;
        padding: ${({ theme }) => theme.spacing(0.5) + ' ' + theme.spacing(4)};
        color: ${({ theme }) => theme.palette.text.secondary};
    }
`;

export const TablePaginationStyled = styled(Pagination)`
    display: flex;
    justify-content: flex-end;
    margin: ${({ theme }) => theme.spacing(4)};
`;
