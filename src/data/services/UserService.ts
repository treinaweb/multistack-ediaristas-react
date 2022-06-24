import { ApiLinksInterface } from 'data/@types/ApiLinksInterface';
import { UserInterface, UserType } from 'data/@types/UserInterface';
import { FieldPath, UseFormReturn } from 'react-hook-form';
import { ApiService } from './ApiService';
import { ObjectService } from './ObjectService';
import { TextFormatService } from './TextFormatService';

export const UserService = {
    async cadastrar(
        user: UserInterface,
        userType: UserType,
        link: ApiLinksInterface
    ): Promise<UserInterface | undefined> {
        ApiService.defaults.headers.common.Authorization = '';

        const nascimento = TextFormatService.dateToString(
                user.nascimento as Date
            ),
            cpf = TextFormatService.getNumbersFromText(user.cpf),
            telefone = TextFormatService.getNumbersFromText(user.telefone),
            userData = ObjectService.jsonToFormData({
                ...user,
                tipo_usuario: userType,
                nascimento,
                telefone,
                cpf,
            });

        const response = await ApiService.request<UserInterface>({
            url: link.uri,
            method: link.type,
            data: userData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    },
    handleNewUserError<T>(error: any, form: UseFormReturn<T>): void {
        const errorList = error?.response?.data;
        if (errorList) {
            if (errorList.cpf) {
                form.setError('usuario.cpf' as FieldPath<T>, {
                    type: 'cadastrado',
                    message: 'CPF já cadastrado',
                });
            }
            if (errorList.email) {
                form.setError('usuario.email' as FieldPath<T>, {
                    type: 'cadastrado',
                    message: 'E-mail já cadastrado',
                });
            }
        }
    },
};
