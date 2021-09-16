import TextField from '../../TextField/TextField';
import { useFormContext } from 'react-hook-form';
import { FinancialData } from '../UserForm.style';

export const FinancialForm = () => {
    const { register } = useFormContext();
    return (
        <FinancialData>
            <TextField
                label={'Chave Pix'}
                defaultValue={''}
                {...register('usuario.chave_pix', { minLength: 5 })}
            />
        </FinancialData>
    );
};
