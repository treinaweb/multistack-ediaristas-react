import { styled } from '@mui/material/styles';
import { Menu } from '@mui/material';
// import { UserHeaderMenuProps } from './UserHeaderMenu';

export const UserHeaderMenuContainer = styled('div')`
    display: inline-block;
`;

export const UserMenu = styled(Menu)`
    .MuiMenu-paper {
        background-color: ${({ theme }) => theme.palette.primary.main};
        color: ${({ theme }) => theme.palette.primary.contrastText};
    }

    .MuiDivider-root {
        border-color: ${({ theme }) => theme.palette.primary.light};
        margin: ${({ theme }) => theme.spacing(1) + ' ' + theme.spacing(2)};
    }

    li {
        box-sizing: border-box;
        padding: ${({ theme }) => theme.spacing(1) + ' ' + theme.spacing(2)};
    }
`;
