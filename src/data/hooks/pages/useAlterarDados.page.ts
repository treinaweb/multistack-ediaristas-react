import { yupResolver } from '@hookform/resolvers/yup';
import axios, { Axios, AxiosError, AxiosResponse } from 'axios';
import { EnderecoInterface } from 'data/@types/EnderecoInterface';
import { CadastroDiaristaFormDataInterface } from 'data/@types/FormInterface';
import { UserInterface, UserType } from 'data/@types/UserInterface';
import { UserContext } from 'data/contexts/UserContext';
import { ApiServiceHateoas } from 'data/services/ApiService';
import { FormSchemaService } from 'data/services/FormSchemaService';
import { ObjectService } from 'data/services/ObjectService';
import { TextFormatService } from 'data/services/TextFormatService';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function useAlterarDados() {
    const { userState, userDispatch } = useContext(UserContext),
        { user, userAddress } = userState,
        formMethods = useForm<CadastroDiaristaFormDataInterface>({
            resolver: getResolver(),
        }),
        [picture, setPicture] = useState(''),
        [pictureFile, setPictureFile] = useState<File>(),
        [snackMessage, setSnackMessage] = useState('');

    useEffect(() => {
        setPicture(user.foto_usuario || '');
    }, [user]);

    function getResolver() {
        let resolver = FormSchemaService.userData().concat(
            FormSchemaService.contact()
        );
        if (user.tipo_usuario === UserType.Diarista) {
            resolver = resolver.concat(FormSchemaService.address());
        }
        return yupResolver(resolver);
    }

    function onPictureChange(event: ChangeEvent) {
        const target = event.target as HTMLInputElement,
            files = target.files;

        if (files !== null && files.length) {
            const file = files[0];
            setPicture(URL.createObjectURL(file));
            setPictureFile(file);
        }
    }

    async function onSubmit(data: CadastroDiaristaFormDataInterface) {
        await updatePicture();
        await updateUser(data);
        if (user.tipo_usuario === UserType.Diarista) {
            await Promise.all([
                updateUserAddress(data),
                updateCitiesList(data),
            ]);
        }
        setSnackMessage('Dados atualizados!');
    }

    async function updateUser(data: CadastroDiaristaFormDataInterface) {
        ApiServiceHateoas(user.links, 'editar_usuario', async (request) => {
            const endereco = {
                ...data.endereco,
                cep: TextFormatService.getNumbersFromText(data.endereco.cep),
            };

            try {
                const nascimento = TextFormatService.dateToString(
                        data.usuario.nascimento as Date
                    ),
                    cpf = TextFormatService.getNumbersFromText(
                        data.usuario.cpf
                    ),
                    telefone = TextFormatService.getNumbersFromText(
                        data.usuario.telefone
                    ),
                    userData = {
                        ...data.usuario,
                        nascimento,
                        cpf,
                        telefone,
                    };

                delete userData.foto_usuario;

                if (
                    !userData.password ||
                    !userData.password_confirmation ||
                    !userData.new_password
                ) {
                    delete userData.password;
                    delete userData.password_confirmation;
                    delete userData.new_password;
                }

                const updatedUser = (
                    await request<UserInterface>({
                        data: userData,
                    })
                ).data;

                userDispatch({
                    type: 'SET_USER',
                    payload: {
                        ...user,
                        ...updatedUser,
                    },
                });
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const err = error as AxiosError<{ password?: string }>;
                    if (err.response?.data.password) {
                        formMethods.setError('usuario.password', {
                            type: 'invalida',
                            message: 'Senha inválida',
                        });
                    }
                }
            }
        });
    }

    async function updatePicture() {
        ApiServiceHateoas(
            user.links,
            'alterar_foto_usuario',
            async (request) => {
                if (pictureFile) {
                    try {
                        const userData = ObjectService.jsonToFormData({
                            foto_usuario: pictureFile,
                        });
                        await request<UserInterface>({
                            data: userData,
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        });
                    } catch (error) {
                        /**/
                    }
                }
            }
        );
    }

    async function updateUserAddress(data: CadastroDiaristaFormDataInterface) {
        ApiServiceHateoas(user.links, 'editar_endereco', async (request) => {
            const endereco = {
                ...data.endereco,
                cep: TextFormatService.getNumbersFromText(data.endereco.cep),
            };

            try {
                await request<EnderecoInterface>({
                    data: endereco,
                });

                userDispatch({
                    type: 'SET_USER_ADDRESS',
                    payload: endereco,
                });
            } catch (error) {
                /**/
            }
        });
    }

    async function updateCitiesList(data: CadastroDiaristaFormDataInterface) {
        ApiServiceHateoas(user.links, 'relacionar_cidades', async (request) => {
            try {
                await request<EnderecoInterface>({
                    data: { cidades: data.enderecosAtendidos },
                });

                userDispatch({
                    type: 'SET_ADDRESS_LIST',
                    payload: data.enderecosAtendidos,
                });
            } catch (error) {
                /**/
            }
        });
    }

    return {
        user,
        userAddress,
        formMethods,
        picture,
        onPictureChange,
        snackMessage,
        setSnackMessage,
        onSubmit,
    };
}
