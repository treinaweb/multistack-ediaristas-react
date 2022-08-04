import { FormValues } from 'data/@types/form/FormValue';
import { UserContext } from 'data/contexts/UserContext';
import { TextFormatService } from 'data/services/TextFormatService';
import React, { useContext } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TextField from '../../TextField/TextField';
import TextFieldMask from '../../TextFieldMask/TextFieldMask';
import { UserData } from '../UserForm.style';

export interface UserDataFormProps {
    cadastro?: boolean;
}

export const UserDataForm: React.FC<UserDataFormProps> = ({
    cadastro = false,
}) => {
    const {
            register,
            formState: { errors },
            control,
        } = useFormContext<FormValues>(),
        { user } = useContext(UserContext).userState;

    return (
        <UserData>
            <TextField
                label={'Nome completo'}
                defaultValue={user.nome_completo}
                style={{ gridArea: 'nome' }}
                {...register('usuario.nome_completo')}
                error={errors?.usuario?.nome_completo !== undefined}
                helperText={errors?.usuario?.nome_completo?.message}
            />

            <Controller
                name={'usuario.nascimento'}
                defaultValue={TextFormatService.reverseDate(
                    user.nascimento as string
                )}
                control={control}
                render={({ field: { ref, ...inputProps } }) => (
                    <TextFieldMask
                        {...inputProps}
                        mask={'99/99/9999'}
                        label={'Data de nascimento'}
                        style={{ gridArea: 'data-nascimento' }}
                        error={errors?.usuario?.nascimento !== undefined}
                        helperText={errors?.usuario?.nascimento?.message}
                    />
                )}
            />

            <Controller
                name={'usuario.cpf'}
                defaultValue={user.cpf}
                control={control}
                render={({ field: { ref, ...inputProps } }) => (
                    <TextFieldMask
                        {...inputProps}
                        mask={'999.999.999-99'}
                        label={'CPF'}
                        style={{ gridArea: 'cpf' }}
                        error={errors?.usuario?.cpf !== undefined}
                        helperText={errors?.usuario?.cpf?.message}
                        InputProps={{ readOnly: !cadastro }}
                    />
                )}
            />

            <Controller
                name={'usuario.telefone'}
                defaultValue={user.telefone}
                control={control}
                render={({ field: { ref, ...inputProps } }) => (
                    <TextFieldMask
                        {...inputProps}
                        mask={'(99) 99999-9999'}
                        label={'Telefone'}
                        style={{ gridArea: 'telefone' }}
                        error={errors?.usuario?.telefone !== undefined}
                        helperText={errors?.usuario?.telefone?.message}
                    />
                )}
            />
        </UserData>
    );
};
