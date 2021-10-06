import TextField from '../../TextField/TextField';
import { useFormContext } from 'react-hook-form';
import { FinancialData } from '../UserForm.style';
import { useContext } from 'react';
import { UserContext } from 'data/contexts/UserContext';

export const FinancialForm = () => {
    const { register } = useFormContext(),
        { user } = useContext(UserContext).userState;
    return (
        <FinancialData>
            <TextField
                label={'Chave Pix'}
                defaultValue={user.chave_pix}
                {...register('usuario.chave_pix', { minLength: 5 })}
            />
        </FinancialData>
    );
};
