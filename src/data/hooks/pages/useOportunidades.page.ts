import { useContext, useState } from 'react';
import { Oportunidade } from 'data/@types/OportunidadeInterface';
import useIsMobile from '../useIsMobile';
import usePagination from '../usePagination.hook';
import { useApiHateoas } from '../useApi.hook';
import { UserContext } from 'data/contexts/UserContext';
import { ApiServiceHateoas, linksResolver } from 'data/services/ApiService';
import { mutate } from 'swr';

export default function useOportunidadesTrabalho() {
    const isMobile = useIsMobile(),
        [
            oportunidadeSelecionada,
            setOportunidadeSelecionada,
        ] = useState<Oportunidade>(),
        { userState } = useContext(UserContext),
        oportunidades =
            useApiHateoas<Oportunidade[]>(
                userState.user.links,
                'lista_oportunidades'
            ).data || ([] as Oportunidade[]),
        [mensagemSnackbar, setMensagemSnackbar] = useState(''),
        {
            currentPage,
            setCurrentPage,
            totalPages,
            itemsPerPage,
        } = usePagination(oportunidades || [], 5);

    function totalComodos(oportunidade: Oportunidade) {
        let total = 0;
        total += oportunidade.quantidade_banheiros;
        total += oportunidade.quantidade_cozinhas;
        total += oportunidade.quantidade_outros;
        total += oportunidade.quantidade_quartos;
        total += oportunidade.quantidade_quintais;
        total += oportunidade.quantidade_salas;
        return total;
    }

    async function seCandidatar(oportunidade: Oportunidade) {
        ApiServiceHateoas(
            oportunidade.links,
            'candidatar_diaria',
            async (request) => {
                try {
                    await request();
                    setMensagemSnackbar('Candidatura enviada!');
                    setOportunidadeSelecionada(undefined);
                    atualizarOportunidades();
                } catch (error) {}
            }
        );
    }

    function podeCandidatar(oportunidade: Oportunidade): boolean {
        return (
            linksResolver(oportunidade.links, 'candidatar_diaria') !== undefined
        );
    }

    function atualizarOportunidades() {
        mutate('lista_oportunidades');
    }

    return {
        isMobile,
        oportunidades,
        currentPage,
        setCurrentPage,
        totalPages,
        itemsPerPage,
        oportunidadeSelecionada,
        setOportunidadeSelecionada,
        seCandidatar,
        mensagemSnackbar,
        setMensagemSnackbar,
        totalComodos,
        podeCandidatar,
    };
}
