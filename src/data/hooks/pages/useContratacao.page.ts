import { useState, useMemo, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormSchemaService } from 'data/services/FormSchemaService';
import {
    CadastroClienteFormDataInterface,
    CredenciaisInterface,
    LoginFormDataInterface,
    NovaDiariaFormDataInterface,
    PagamentoFormDataInterface,
} from 'data/@types/FormInterface';
import { ServicoInterface } from 'data/@types/ServicoInterface';
import useApi, { useApiHateoas } from '../useApi.hook';
import { DiariaInterface } from 'data/@types/DiariaInterface';
import { ValidationService } from 'data/services/ValidationService';
import { DateService } from 'data/services/DateService';
import { houseParts } from '@partials/encontrar-diarista/_detalhes-servico';
import { ExternalServicesContext } from 'data/contexts/ExternalServicesContext';
import {
    ApiService,
    ApiServiceHateoas,
    linksResolver,
} from 'data/services/ApiService';
import { UserContext } from 'data/contexts/UserContext';
import { UserInterface, UserType } from 'data/@types/UserInterface';
import { TextFormatService } from 'data/services/TextFormatService';
import { LoginService } from 'data/services/LoginService';
import { ApiLinksInterface } from 'data/@types/ApiLinksInterface';
import { UserService } from 'data/services/UserService';
import { PaymentService } from 'data/services/PaymentService';

export default function useContratacao() {
    const [step, setStep] = useState(1),
        [hasLogin, setHasLogin] = useState(false),
        [loginError, setLoginError] = useState(''),
        breadcrumbItems = ['Detalhes da diária', 'Identificação', 'Pagamento'],
        serviceForm = useForm<NovaDiariaFormDataInterface>({
            resolver: yupResolver(
                FormSchemaService.address().concat(
                    FormSchemaService.detalhesServico()
                )
            ),
        }),
        clientForm = useForm<CadastroClienteFormDataInterface>({
            resolver: yupResolver(
                FormSchemaService.userData().concat(
                    FormSchemaService.newContact()
                )
            ),
        }),
        paymentForm = useForm<PagamentoFormDataInterface>({
            resolver: yupResolver(FormSchemaService.payment()),
        }),
        loginForm = useForm<LoginFormDataInterface<CredenciaisInterface>>({
            resolver: yupResolver(FormSchemaService.login()),
        }),
        { userState, userDispatch } = useContext(UserContext),
        { externalServicesState } = useContext(ExternalServicesContext),
        servicos = useApiHateoas<ServicoInterface[]>(
            externalServicesState.externalServices,
            'listar_servicos'
        ).data,
        dadosFaxina = serviceForm.watch('faxina'),
        cepFaxina = serviceForm.watch('endereco.cep'),
        [podemosAtender, setPodemosAtender] = useState(true),
        [novaDiaria, setNovaDiaria] = useState({} as DiariaInterface),
        tipoLimpeza = useMemo<ServicoInterface>(() => {
            if (servicos && dadosFaxina?.servico) {
                const selectedService = servicos.find(
                    (servico) => servico.id === dadosFaxina?.servico
                );
                if (selectedService) {
                    return selectedService;
                }
            }
            return {} as ServicoInterface;
        }, [servicos, dadosFaxina?.servico]),
        { tamanhoCasa, totalPrice, totalTime } = useMemo<{
            tamanhoCasa: string[];
            totalPrice: number;
            totalTime: number;
        }>(
            () => ({
                tamanhoCasa: listarComodos(dadosFaxina),
                totalPrice: calcularPreco(dadosFaxina, tipoLimpeza),
                totalTime: calcularTempoServico(dadosFaxina, tipoLimpeza),
            }),
            /* eslint-disable react-hooks/exhaustive-deps */
            [
                tipoLimpeza,
                dadosFaxina,
                dadosFaxina?.quantidade_banheiros,
                dadosFaxina?.quantidade_cozinhas,
                dadosFaxina?.quantidade_outros,
                dadosFaxina?.quantidade_quartos,
                dadosFaxina?.quantidade_quintais,
                dadosFaxina?.quantidade_salas,
            ]
        );

    useEffect(() => {
        if (
            dadosFaxina &&
            ValidationService.hora(dadosFaxina.hora_inicio) &&
            totalTime >= 0
        ) {
            serviceForm.setValue(
                'faxina.hora_termino',
                DateService.addHours(
                    dadosFaxina?.hora_inicio as string,
                    totalTime
                ),
                { shouldValidate: true }
            );
        } else {
            serviceForm.setValue('faxina.hora_termino', '');
        }
    }, [dadosFaxina?.hora_inicio, totalTime]);

    useEffect(() => {
        const cep = ((cepFaxina as string) || '').replace(/\D/g, '');
        if (ValidationService.cep(cep)) {
            ApiServiceHateoas(
                externalServicesState.externalServices,
                'verificar_disponibilidade_atendimento',
                (request) => {
                    request<{ disponibilidade: boolean }>({
                        params: {
                            cep,
                        },
                    })
                        .then((response) => {
                            setPodemosAtender(response.data.disponibilidade);
                        })
                        .catch((_error) => setPodemosAtender(false));
                }
            );
        } else {
            setPodemosAtender(true);
        }
    }, [cepFaxina]);

    function onServiceFormSubmit(data: NovaDiariaFormDataInterface) {
        console.log(99991);
        if (userState.user.nome_completo) {
            criarDiaria(userState.user);
        } else {
            setStep(2);
        }
    }

    async function onClientFormSubmit(data: CadastroClienteFormDataInterface) {
        const newUserlink = linksResolver(
            externalServicesState.externalServices,
            'cadastrar_usuario'
        );
        if (newUserlink) {
            try {
                await cadastrarUsuario(data, newUserlink);
            } catch (error) {
                UserService.handleNewUserError(error, clientForm);
            }
        }
    }

    async function cadastrarUsuario(
        data: CadastroClienteFormDataInterface,
        link: ApiLinksInterface
    ) {
        const newUser = await UserService.cadastrar(
            data.usuario,
            UserType.Cliente,
            link
        );
        if (newUser) {
            const loginSuccess = await login(
                {
                    email: data.usuario.email,
                    password: data.usuario.password || '',
                },
                newUser
            );
            if (loginSuccess) {
                criarDiaria(newUser);
            }
        }
    }

    async function onLoginFormSubmit(data: LoginFormDataInterface<CredenciaisInterface>) {
        const loginSuccess = await login(data.login);
        if (loginSuccess) {
            const user = await LoginService.getUser();
            if (user) {
                criarDiaria(user);
                setStep(3);
            }
        }
    }

    async function login(
        credentials: CredenciaisInterface,
        user?: UserInterface
    ): Promise<boolean> {
        const loginSuccess = await LoginService.login(credentials);
        if (loginSuccess) {
            if (!user) {
                user = await LoginService.getUser();
            }
            userDispatch({ type: 'SET_USER', payload: user });
        } else {
            setLoginError('E-mail e/ou Senha inválidos');
        }
        return loginSuccess;
    }

    async function onPaymentFormSubmit(data: PagamentoFormDataInterface) {
        const cartao = {
            card_number: data.pagamento.numero_cartao.replaceAll(' ', ''),
            card_holder_name: data.pagamento.nome_cartao,
            card_cvv: data.pagamento.codigo,
            card_expiration_date: data.pagamento.validade,
        };
        const hash = await PaymentService.getHash(cartao);

        ApiServiceHateoas(novaDiaria.links, 'pagar_diaria', async (request) => {
            try {
                await request({
                    data: {
                        card_hash: hash,
                    },
                });

                setStep(4);
            } catch (error) {
                paymentForm.setError('pagamento_recusado', {
                    type: 'manual',
                    message: 'Pagamento recusado',
                });
            }
        });
    }

    function listarComodos(dadosFaxina: DiariaInterface): string[] {
        const comodos: string[] = [];
        if (dadosFaxina) {
            houseParts.forEach((housePart) => {
                const total = dadosFaxina[
                    housePart.name as keyof DiariaInterface
                ] as number;

                if (total > 0) {
                    const nome =
                        total > 1 ? housePart.plural : housePart.singular;
                    comodos.push(`${total} ${nome}`);
                }
            });
        }
        return comodos;
    }

    function calcularTempoServico(
        dadosFaxina: DiariaInterface,
        tipoLimpeza: ServicoInterface
    ) {
        let total = 0;
        if (dadosFaxina && tipoLimpeza) {
            total +=
                tipoLimpeza.horas_banheiro * dadosFaxina.quantidade_banheiros;
            total +=
                tipoLimpeza.horas_cozinha * dadosFaxina.quantidade_cozinhas;
            total += tipoLimpeza.horas_outros * dadosFaxina.quantidade_outros;
            total += tipoLimpeza.horas_quarto * dadosFaxina.quantidade_quartos;
            total +=
                tipoLimpeza.horas_quintal * dadosFaxina.quantidade_quintais;
            total += tipoLimpeza.horas_sala * dadosFaxina.quantidade_salas;
        }
        return total;
    }

    function calcularPreco(
        dadosFaxina: DiariaInterface,
        tipoLimpeza: ServicoInterface
    ) {
        let total = 0;
        if (dadosFaxina && tipoLimpeza) {
            total +=
                tipoLimpeza.valor_banheiro * dadosFaxina.quantidade_banheiros;
            total +=
                tipoLimpeza.valor_cozinha * dadosFaxina.quantidade_cozinhas;
            total += tipoLimpeza.valor_outros * dadosFaxina.quantidade_outros;
            total += tipoLimpeza.valor_quarto * dadosFaxina.quantidade_quartos;
            total +=
                tipoLimpeza.valor_quintal * dadosFaxina.quantidade_quintais;
            total += tipoLimpeza.valor_sala * dadosFaxina.quantidade_salas;
        }
        return Math.max(total, tipoLimpeza.valor_minimo);
    }

    async function criarDiaria(user: UserInterface) {
        if (user.nome_completo) {
            const serviceData = serviceForm.getValues();
            ApiServiceHateoas(
                user.links,
                'cadastrar_diaria',
                async (request) => {
                    try {
                        const novaDiaria = (
                            await request<DiariaInterface>({
                                data: {
                                    ...serviceData.endereco,
                                    ...serviceData.faxina,
                                    cep: TextFormatService.getNumbersFromText(
                                        serviceData.endereco.cep
                                    ),
                                    preco: totalPrice,
                                    tempo_atendimento: totalTime,
                                    data_atendimento:
                                        TextFormatService.reverseDate(
                                            serviceData.faxina
                                                .data_atendimento as string
                                        ) +
                                        'T' +
                                        serviceData.faxina.hora_inicio,
                                },
                            })
                        ).data;

                        if (novaDiaria) {
                            setStep(3);
                            setNovaDiaria(novaDiaria);
                        }
                    } catch (error) {}
                }
            );
        }
    }

    return {
        step,
        setStep,
        breadcrumbItems,
        serviceForm,
        clientForm,
        paymentForm,
        loginForm,
        onServiceFormSubmit,
        onClientFormSubmit,
        onPaymentFormSubmit,
        onLoginFormSubmit,
        servicos,
        podemosAtender,
        hasLogin,
        tipoLimpeza,
        totalPrice,
        tamanhoCasa,
        setHasLogin,
        loginError,
    };
}
