import * as yup from 'yup';
import { DateService } from './DateService';
import { PaymentService } from './PaymentService';
import { ValidationService } from './ValidationService';

export const FormSchemaService = {
    userData() {
        return yup
            .object()
            .shape({
                usuario: yup.object().shape({
                    nome_completo: yup
                        .string()
                        .min(3, 'Digite seu nome completo'),
                    nascimento: yup
                        .date()
                        .transform(DateService.transformDate)
                        .min(
                            DateService.maxAdultBirthday(),
                            'Digite uma data válida'
                        )
                        .max(
                            DateService.minAdultBirthday(),
                            'Proibido menores de idade'
                        )
                        .typeError('Digite uma data válida'),
                    cpf: yup
                        .string()
                        .test('cpf', 'CPF inválido', ValidationService.cpf),
                    telefone: yup
                        .string()
                        .test(
                            'telefone',
                            'Telefone inválido',
                            ValidationService.telefone
                        ),
                }),
            })
            .defined();
    },
    address() {
        return yup
            .object()
            .shape({
                endereco: yup.object().shape({
                    cep: yup
                        .string()
                        .test('cep', 'CEP inválido', (value) =>
                            ValidationService.cep(value)
                        ),
                    estado: yup.string(),
                    cidade: yup.string(),
                    bairro: yup.string(),
                    logradouro: yup.string(),
                    numero: yup.string(),
                    complemento: yup
                        .string()
                        .nullable()
                        .default(undefined)
                        .notRequired(),
                }),
            })
            .defined();
    },
    newContact() {
        return yup
            .object()
            .shape({
                usuario: yup.object().shape({
                    email: yup.string().email('E-mail inválido'),
                    password: yup.string().min(5, 'Senha muito curta'),
                    password_confirmation: yup
                        .string()
                        .min(5, 'Senha muito curta')
                        .oneOf(
                            [yup.ref('password'), null],
                            'As senhas não estão iguais'
                        ),
                }),
            })
            .defined();
    },
    contact() {
        return yup
            .object()
            .shape({
                usuario: yup.object().shape({
                    email: yup.string().email('E-mail inválido'),
                    password: yup
                        .string()
                        .nullable()
                        .default(undefined)
                        .notRequired(),
                    new_password: yup
                        .string()
                        .nullable()
                        .default(undefined)
                        .notRequired(),
                    password_confirmation: yup
                        .string()
                        .nullable()
                        .default(undefined)
                        .notRequired()
                        .oneOf(
                            [yup.ref('new_password'), null],
                            'As senhas não estão iguais'
                        ),
                }),
            })
            .defined();
    },
    payment() {
        return yup
            .object()
            .shape({
                pagamento: yup.object().shape({
                    numero_cartao: yup
                        .string()
                        .test(
                            'card_number',
                            'Número de cartão inválido',
                            (value) => {
                                return PaymentService.validate({
                                    card_number: value as string,
                                    card_holder_name: '',
                                    card_cvv: '',
                                    card_expiration_date: '',
                                }).card_number;
                            }
                        ),
                    nome_cartao: yup.string(),
                    validade: yup
                        .string()
                        .test(
                            'card_expiration_date',
                            'Data de validade inválida',
                            (value) => {
                                return PaymentService.validate({
                                    card_number: '',
                                    card_holder_name: '',
                                    card_cvv: '',
                                    card_expiration_date: value as string,
                                }).card_expiration_date;
                            }
                        ),
                    codigo: yup
                        .string()
                        .test(
                            'card_cvv',
                            'Código de validação inválido',
                            (value) => {
                                return PaymentService.validate({
                                    card_number: '',
                                    card_holder_name: '',
                                    card_cvv: value as string,
                                    card_expiration_date: '',
                                }).card_cvv;
                            }
                        ),
                }),
            })
            .defined();
    },
    detalhesServico() {
        return yup
            .object()
            .shape({
                faxina: yup.object().shape({
                    data_atendimento: yup
                        .date()
                        .transform(DateService.transformDate)
                        .typeError('Digite uma data válida')
                        .test(
                            'antecedencia',
                            'O agendamento deve ser feito com pelo menos 48 horas de antecedência',
                            (value, data) => {
                                if (typeof value === 'object') {
                                    return ValidationService.horarioDeAgendamento(
                                        value.toJSON().substring(0, 10),
                                        data.parent.hora_inicio as string
                                    );
                                }

                                return false;
                            }
                        ),
                    hora_inicio: yup
                        .string()
                        .test(
                            'hora_valida',
                            'Digite uma hora válida',
                            (value) => ValidationService.hora(value)
                        )
                        .test(
                            'hora_inicio',
                            'O serviço não deve começar antes das 06:00',
                            (value) => {
                                const [hora] = value?.split(':') || [''];
                                return +hora >= 6;
                            }
                        ),
                    hora_termino: yup
                        .string()
                        .test(
                            'hora_termino',
                            'O serviço não deve encerrar após as 22:00',
                            (value) => {
                                const [hora, minuto] = value?.split(':') || [
                                    '',
                                ];
                                if (+hora < 22) {
                                    return true;
                                } else if (+hora === 22) {
                                    return +minuto === 0;
                                }
                                return false;
                            }
                        )
                        .test(
                            'tempo_servico',
                            'O serviço não deve levar mais de 8 horas',
                            (value, data) => {
                                const [horaTermino] = value?.split(':') || [''],
                                    [
                                        horaInicio,
                                    ] = data.parent?.hora_inicio.split(':') || [
                                        '',
                                    ];

                                return +horaTermino - +horaInicio <= 8;
                            }
                        ),
                }),
            })
            .defined();
    },
    login() {
        return yup.object().shape({
            login: yup.object().shape({
                email: yup.string().email('E-mail inválido'),
                password: yup.string().min(5, 'Senha muito curta'),
            }),
        });
    },
};
