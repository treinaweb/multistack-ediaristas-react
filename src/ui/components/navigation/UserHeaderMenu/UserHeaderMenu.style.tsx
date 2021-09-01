import { styled } from '@material-ui/core/styles';
import { Menu } from '@material-ui/core';
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
