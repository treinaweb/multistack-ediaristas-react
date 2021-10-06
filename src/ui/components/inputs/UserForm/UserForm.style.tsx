import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
// import { UserFormProps } from './UserForm';

export const FormContainerStyled = styled(Container)`
    ${({ theme }) => theme.breakpoints.down('md')} {
        .MuiPaper-root {
            box-shadow: none;
        }
    }
`;

export const PageFormContainer = styled('div', {
    shouldForwardProp: (prop) => prop !== 'fullWidth',
})<{ fullWidth?: boolean }>`
    display: grid;
    grid-template-columns: ${({ fullWidth }) =>
        fullWidth ? '1fr' : 'minmax(652px, 1fr) minmax(150px, 318px)'};
    gap: ${({ theme }) => theme.spacing(6)};
    align-items: start;
    margin-bottom: ${({ theme }) => theme.spacing(8)};

    ${({ theme }) => theme.breakpoints.down('md')} {
        grid-template-columns: 1fr;
        gap: ${({ theme }) => theme.spacing(3)};
        .MuiPaper-root {
            padding: 0;
        }
    }
`;

export const BaseGrid = styled('div')`
    display: grid;
    grid-auto-rows: auto;
    gap: ${({ theme }) => theme.spacing(2) + ' ' + theme.spacing(3)};
    padding: ${({ theme }) => '0 0 ' + theme.spacing(5)};

    ${({ theme }) => theme.breakpoints.down('md')} {
        grid-template-columns: 1fr;
        gap: ${({ theme }) => theme.spacing(3)};
    }
`;

export const UserData = styled(BaseGrid)`
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
        'nome nome nome'
        'data-nascimento cpf telefone';

    ${({ theme }) => theme.breakpoints.down('md')} {
        grid-template-areas:
            'nome'
            'data-nascimento'
            'cpf'
            'telefone';
    }
`;

export const NewContactData = styled(BaseGrid)`
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
        'email email'
        'senha password-strength'
        'confirmar-senha password-strength';

    ${({ theme }) => theme.breakpoints.down('md')} {
        grid-template-areas:
            'email'
            'senha'
            'password-strength'
            'confirmar-senha';
    }
`;

export const ContactData = styled(BaseGrid)`
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
        'email email'
        'senha-antiga senha-antiga'
        'nova-senha confirmar-senha'
        'password-strength _';

    ${({ theme }) => theme.breakpoints.down('md')} {
        grid-template-areas:
            'email'
            'senha-antiga'
            'senha-antiga'
            'nova-senha'
            'password-strength'
            'confirmar-senha';
    }
`;

export const PaymentData = styled(BaseGrid)`
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
        'numero numero'
        'nome nome'
        'validade codigo'
        'erro erro';

    ${({ theme }) => theme.breakpoints.down('md')} {
        grid-template-areas:
            'numero'
            'nome'
            'validade'
            'codigo'
            'erro';
    }
`;

export const AddressData = styled(BaseGrid)`
    grid-template-columns: repeat(7, 1fr);
    grid-template-areas:
        'cep cep estado estado cidade cidade cidade'
        'bairro bairro logradouro logradouro numero complemento complemento';

    ${({ theme }) => theme.breakpoints.down('md')} {
        grid-template-areas:
            'cep' 'estado' 'cidade' 'bairro' 'logradouro'
            'numero'
            'complemento';
    }
`;

export const FinancialData = styled(BaseGrid)`
    grid-template-columns: 1fr;
`;

export const CitiesSelection = styled(BaseGrid)`
    grid-template-columns: 1fr;
    grid-template-areas: 'busca-cidade';
`;

export const PictureSelection = styled(BaseGrid)`
    grid-template-columns: 1fr;
    padding: 0;
`;

export const LoginData = styled(BaseGrid)`
    ${({ theme }) => theme.breakpoints.down('md')} {
        text-align: right;
    }

    a {
        text-decoration: underline;
        color: ${({ theme }) => theme.palette.text.secondary};
    }
`;
