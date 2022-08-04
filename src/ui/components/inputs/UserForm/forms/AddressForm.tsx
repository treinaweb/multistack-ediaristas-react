import { Autocomplete, MenuItem } from '@mui/material';
import { AddressData } from '../UserForm.style';
import { Controller } from 'react-hook-form';
import useAddressForm from 'data/hooks/components/inputs/UserForm/forms/useAddressForm';
import Select from '../../Select/Select';
import TextField from '../../TextField/TextField';
import TextFieldMask from '../../TextFieldMask/TextFieldMask';
import { FormValues } from 'data/@types/form/FormValue';

export const AddressForm = () => {
    const {
        user,
        userAddress,
        control,
        errors,
        estados,
        opcoesCidades,
        addressState,
        register,
    } = useAddressForm();

    return (
        <AddressData>
            <Controller
                name={'endereco.cep'}
                defaultValue={userAddress.cep}
                control={control}
                render={({ field: { ref, ...inputProps } }) => (
                    <TextFieldMask
                        {...inputProps}
                        inputRef={ref}
                        mask={'99.999-999'}
                        label={'CEP'}
                        style={{ gridArea: 'cep' }}
                        error={errors?.endereco?.cep !== undefined}
                        helperText={errors?.endereco?.cep?.message}
                    />
                )}
            />

            <Controller
                name={'endereco.estado'}
                defaultValue={userAddress.estado}
                control={control}
                render={({ field: { ref, ...inputProps } }) => (
                    <Select
                        {...inputProps}
                        label={'Estado'}
                        style={{ gridArea: 'estado' }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {estados.map((estado) => (
                            <MenuItem key={estado.sigla} value={estado.sigla}>
                                {estado.nome}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            />

            <Controller
                name={'endereco.cidade'}
                defaultValue={userAddress.cidade}
                control={control}
                render={({ field: { ref, ...inputProps } }) => (
                    <Autocomplete
                        {...inputProps}
                        onChange={(_event, newValue) => {
                            inputProps.onChange(newValue);
                        }}
                        disablePortal
                        options={opcoesCidades}
                        style={{ gridArea: 'cidade' }}
                        disabled={addressState === ''}
                        loading={opcoesCidades.length === 0}
                        loadingText={'Carregando cidades...'}
                        noOptionsText={'Nenhuma cidade com esse nome'}
                        renderInput={(params) => (
                            <TextField
                                label={'Cidade'}
                                {...params}
                                InputLabelProps={{ required: false }}
                            />
                        )}
                    />
                )}
            />

            <Controller
                name={'endereco.bairro'}
                defaultValue={userAddress.bairro}
                control={control}
                render={({ field: { ref, ...inputProps } }) => (
                    <TextField
                        label={'Bairro'}
                        style={{ gridArea: 'bairro' }}
                        {...inputProps}
                        error={errors?.endereco?.bairro !== undefined}
                        helperText={errors?.endereco?.bairro?.message}
                    />
                )}
            />

            <Controller
                name={'endereco.logradouro'}
                defaultValue={userAddress.logradouro}
                control={control}
                render={({ field: { ref, ...inputProps } }) => (
                    <TextField
                        label={'Logradouro'}
                        style={{ gridArea: 'logradouro' }}
                        {...inputProps}
                        error={errors?.endereco?.logradouro !== undefined}
                        helperText={errors?.endereco?.logradouro?.message}
                    />
                )}
            />

            <TextField
                label={'Número'}
                style={{ gridArea: 'numero' }}
                defaultValue={userAddress.numero}
                {...register('endereco.numero')}
                error={errors?.endereco?.numero !== undefined}
                helperText={errors?.endereco?.numero?.message}
            />

            <TextField
                label={'Complemento'}
                style={{ gridArea: 'complemento' }}
                defaultValue={userAddress.complemento}
                {...register('endereco.complemento')}
                error={errors?.endereco?.complemento !== undefined}
                helperText={errors?.endereco?.complemento?.message}
                required={false}
            />
        </AddressData>
    );
};
