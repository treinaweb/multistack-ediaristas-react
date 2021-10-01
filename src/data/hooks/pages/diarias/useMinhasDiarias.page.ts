import { DiariaInterface } from 'data/@types/DiariaInterface';
import { DiariaContext } from 'data/contexts/DiariasContext';
import useIsMobile from 'data/hooks/useIsMobile';
import usePagination from 'data/hooks/usePagination.hook';
import { ApiServiceHateoas, linksResolver } from 'data/services/ApiService';
import { useContext, useState } from 'react';
import { mutate } from 'swr';

export default function useMinhasDiarias() {
    const isMobile = useIsMobile(),
        { diariaState } = useContext(DiariaContext),
        { diarias } = diariaState,
        filteredData = diarias,
        {
            currentPage,
            setCurrentPage,
            totalPages,
            itemsPerPage,
        } = usePagination(diarias, 5),
        [diariaCancelar, setDiariaCancelar] = useState({} as DiariaInterface),
        [diariaConfirmar, setDiariaConfirmar] = useState({} as DiariaInterface),
        [diariaAvaliar, setDiariaAvaliar] = useState({} as DiariaInterface);

    function podeVisualizar(diaria: DiariaInterface): boolean {
        return linksResolver(diaria.links, 'self') !== undefined;
    }

    function podeCancelar(diaria: DiariaInterface): boolean {
        return linksResolver(diaria.links, 'cancelar_diaria') !== undefined;
    }

    function podeConfirmar(diaria: DiariaInterface): boolean {
        return linksResolver(diaria.links, 'confirmar_diarista') !== undefined;
    }

    function podeAvaliar(diaria: DiariaInterface): boolean {
        return linksResolver(diaria.links, 'avaliar_diaria') !== undefined;
    }

    async function confirmarDiaria(diaria: DiariaInterface) {
        ApiServiceHateoas(
            diaria.links,
            'confirmar_diarista',
            async (request) => {
                try {
                    await request();
                    setDiariaConfirmar({} as DiariaInterface);
                    atualizarDiarias();
                } catch (error) {}
            }
        );
    }

    async function cancelarDiaria(diaria: DiariaInterface, motivo: string) {
        ApiServiceHateoas(diaria.links, 'cancelar_diaria', async (request) => {
            try {
                await request({
                    data: {
                        motivo_cancelamento: motivo,
                    },
                });
                setDiariaCancelar({} as DiariaInterface);
                atualizarDiarias();
            } catch (error) {}
        });
    }

    async function avaliarDiaria(
        diaria: DiariaInterface,
        avaliacao: { descricao: string; nota: number }
    ) {
        ApiServiceHateoas(diaria.links, 'avaliar_diaria', async (request) => {
            try {
                await request({
                    data: avaliacao,
                });
                setDiariaAvaliar({} as DiariaInterface);
                atualizarDiarias();
            } catch (error) {}
        });
    }

    function atualizarDiarias() {
        mutate('lista_diarias');
    }

    return {
        filteredData,
        currentPage,
        setCurrentPage,
        totalPages,
        itemsPerPage,
        isMobile,
        podeVisualizar,
        podeConfirmar,
        diariaConfirmar,
        setDiariaConfirmar,
        confirmarDiaria,
        diariaAvaliar,
        setDiariaAvaliar,
        podeAvaliar,
        avaliarDiaria,
        diariaCancelar,
        setDiariaCancelar,
        podeCancelar,
        cancelarDiaria,
    };
}
