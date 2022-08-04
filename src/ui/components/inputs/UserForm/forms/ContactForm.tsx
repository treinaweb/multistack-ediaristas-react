import { FormValues } from 'data/@types/form/FormValue';
import { UserContext } from 'data/contexts/UserContext';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import PasswordStrength from 'ui/components/feedback/PasswordStrength/PasswordStrength';
import TextField from '../../TextField/TextField';
import { ContactData } from '../UserForm.style';

export const ContactForm = () => {
    const {
            register,
            formState: { errors },
            watch,
        } = useFormContext<FormValues>(),
        newPassword = watch('usuario.new_password'),
        { user } = useContext(UserContext).userState;

    return (
        <ContactData>
            <TextField
                label={'E-mail'}
                defaultValue={user.email}
                style={{ gridArea: 'email' }}
                {...register('usuario.email')}
                error={errors?.usuario?.email !== undefined}
                helperText={errors?.usuario?.email && 'E-mail já cadastrado'}
            />
            <TextField
                type={'password'}
                label={'Senha antiga'}
                style={{ gridArea: 'senha-antiga' }}
                {...register('usuario.password')}
                error={errors?.usuario?.password !== undefined}
                helperText={errors?.usuario?.password?.message}
                required={false}
            />
            <TextField
                type={'password'}
                label={'Nova senha'}
                style={{ gridArea: 'nova-senha' }}
                {...register('usuario.new_password')}
                error={errors?.usuario?.new_password !== undefined}
                helperText={errors?.usuario?.new_password?.message}
                required={false}
            />
            <TextField
                type={'password'}
                label={'Nova senha confirmação'}
                style={{ gridArea: 'confirmar-senha' }}
                {...register('usuario.password_confirmation')}
                error={errors?.usuario?.password_confirmation !== undefined}
                helperText={errors?.usuario?.password_confirmation?.message}
                required={false}
            />
            <PasswordStrength password={newPassword ?? ''} />
        </ContactData>
    );
};
