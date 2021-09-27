import { Button } from '@mui/material';
import useIsMobile from 'data/hooks/useIsMobile';
import React from 'react';
// import { } from '@mui/material';
import {
    DialogContainer,
    DialogTitle,
    DialogSubtitle,
    DialogContent,
    DialogActions,
    CloseButon,
} from './Dialog.style';

export interface DialogProps {
    children?: React.ReactNode;
    title?: string;
    subtitle?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    onClose: () => void;
    isOpen: boolean;
    confirmLabel?: string;
    cancelLabel?: string;
    noConfirm?: boolean;
    noCancel?: boolean;
}

const Dialog: React.FC<DialogProps> = (props) => {
    const isMobile = useIsMobile();
    return (
        <DialogContainer
            open={props.isOpen}
            onClose={props.onClose}
            fullWidth
            fullScreen={isMobile}
        >
            {props.title && (
                <DialogTitle>
                    {props.title}
                    <CloseButon onClick={props.onCancel || props.onClose}>
                        <i className={'twf-times'} />
                    </CloseButon>
                </DialogTitle>
            )}
            <DialogContent>
                {props.subtitle && (
                    <DialogSubtitle>{props.subtitle}</DialogSubtitle>
                )}
                {props.children}
            </DialogContent>
            <DialogActions>
                {!props.noCancel && (
                    <Button
                        size={'large'}
                        onClick={props.onCancel || props.onClose}
                        variant={'outlined'}
                    >
                        {props.cancelLabel || 'Fechar'}
                    </Button>
                )}
                {!props.noConfirm && (
                    <Button
                        size={'large'}
                        onClick={props.onConfirm || props.onClose}
                        variant={'contained'}
                        color={'secondary'}
                    >
                        {props.confirmLabel || 'Confirmar'}
                    </Button>
                )}
            </DialogActions>
        </DialogContainer>
    );
};

export default Dialog;
