import React from 'react';
import { GetStaticProps } from 'next';
import VerificarProfissionais from '@partials/encontrar-diarista/_verificar-profissionais';
import Contratacao from '@partials/encontrar-diarista/_contratacao';
import useEncontrarDiarista from 'data/hooks/pages/useEncontrarDiarista.page';

// import { Component } from '@styles/pages/encontrar-diarista.styled';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: 'Encontrar Diarista',
        },
    };
};

const EncontrarDiarista: React.FC = () => {
    const { podeContratar, setPodeContratar } = useEncontrarDiarista();

    return (
        <div>
            {!podeContratar ? (
                <VerificarProfissionais
                    onContratarProfissional={() => setPodeContratar(true)}
                />
            ) : (
                <Contratacao />
            )}
        </div>
    );
};

export default EncontrarDiarista;
