import React, { useState, useContext } from 'react';
import { DiariaInterface } from 'data/@types/DiariaInterface';
import JobInformation from 'ui/components/data-display/JobInformation/JobInformation';
import { TextFormatService } from 'data/services/TextFormatService';
import { DateService } from 'data/services/DateService';
import Dialog from 'ui/components/feedback/Dialog/Dialog';
import UserInformation from 'ui/components/data-display/UserInformation/UserInformation';
import { Divider, Rating, Snackbar, Typography } from '@mui/material';
import { RatingBox } from './_minhas-diarias.styled';
import TextField from 'ui/components/inputs/TextField/TextField';
import useIsMobile from 'data/hooks/useIsMobile';
import { UserContext } from 'data/contexts/UserContext';
import { UserType } from 'data/@types/UserInterface';

interface DialogProps {
    diaria: DiariaInterface;
    onConfirm: (diaria: DiariaInterface) => void;
    onCancel: () => void;
}

const JobBox: React.FC<{ diaria: DiariaInterface }> = ({ diaria }) => {
    return (
        <JobInformation>
            <>
                <div>
                    Data:{' '}
                    <strong>
                        {TextFormatService.reverseDate(
                            diaria.data_atendimento as string
                        )}{' '}
                        às{' '}
                        {DateService.getTimeFromDate(
                            diaria.data_atendimento as string
                        )}
                    </strong>
                </div>
                <div>Endereço: {TextFormatService.getAddress(diaria)}</div>
                <div>
                    <strong>
                        Valor: {TextFormatService.currency(diaria.preco)}
                    </strong>
                </div>
            </>
        </JobInformation>
    );
};

interface RatingDialogProps extends Omit<DialogProps, 'onConfirm'> {
    onConfirm: (
        diaria: DiariaInterface,
        avaliacao: { descricao: string; nota: number }
    ) => void;
}

export const RatingDialog: React.FC<RatingDialogProps> = (props) => {
    const isMobile = useIsMobile(),
        { user } = useContext(UserContext).userState,
        usuarioAvaliado =
            user.tipo_usuario === UserType.Cliente
                ? props.diaria?.diarista
                : props.diaria?.cliente,
        [descricao, setDescricao] = useState(''),
        [nota, setNota] = useState(3),
        [erro, setErro] = useState('');

    function tentarAvaliar() {
        if (descricao.length > 3) {
            props.onConfirm(props.diaria, { descricao, nota });
        } else {
            setErro('Escreva um depoimento');
        }
    }

    return (
        <Dialog
            isOpen={true}
            onClose={props.onCancel}
            onConfirm={tentarAvaliar}
            title={'Avaliar uma diária'}
            subtitle={'Avalie a diária abaixo'}
        >
            <JobBox diaria={props.diaria} />

            <UserInformation
                name={usuarioAvaliado?.nome_completo || ''}
                rating={usuarioAvaliado?.reputacao || 1}
                description={
                    'Telefone: ' +
                    TextFormatService.formatPhoneNumber(
                        usuarioAvaliado?.telefone || ''
                    )
                }
                picture={usuarioAvaliado?.foto_usuario || ''}
            />

            <Divider sx={{ my: 4 }} />

            <Typography>Deixe a sua avaliação</Typography>

            <RatingBox>
                <strong>Nota:</strong>
                <Rating
                    value={nota}
                    onChange={(_event, value) => setNota(value || 1)}
                    size={isMobile ? 'large' : 'small'}
                />
                <strong>Depoimento:</strong>
                <TextField
                    label={'Digite aqui seu depoimento'}
                    fullWidth
                    multiline
                    rows={3}
                    value={descricao}
                    onChange={(event) => setDescricao(event.target.value)}
                />
            </RatingBox>
            <Snackbar
                open={erro.length > 0}
                autoHideDuration={4000}
                message={erro}
                onClose={() => setErro('')}
            />
        </Dialog>
    );
};

export const ConfirmDialog: React.FC<DialogProps> = (props) => {
    const diarista = props.diaria.diarista;
    return (
        <Dialog
            isOpen={true}
            onClose={props.onCancel}
            onConfirm={() => props.onConfirm(props.diaria)}
            title={'Confirmar presença da diarista'}
            subtitle={'Você confirma a presença da diarista na diária abaixo?'}
        >
            <JobBox diaria={props.diaria} />

            <UserInformation
                name={diarista?.nome_completo || ''}
                rating={diarista?.reputacao || 1}
                description={
                    'Telefone: ' +
                    TextFormatService.formatPhoneNumber(
                        diarista?.telefone || ''
                    )
                }
                picture={diarista?.foto_usuario || ''}
            />

            <Typography
                sx={{ py: 2 }}
                variant={'subtitle2'}
                color={'textSecondary'}
            >
                Ao confirmar a presença do(a) diarista, você está definindo que
                o serviço foi realizado em sua residência e autoriza a
                plataforma a fazer o repasse do valor para o profissional. Caso
                você tenha algum problema, pode entrar em contato com a nossa
                equipe pelo e-mail sac@e-diaristas.com.br
            </Typography>
        </Dialog>
    );
};
