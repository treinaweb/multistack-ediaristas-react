import { CidadeInterface } from 'data/@types/EnderecoInterface';
import { UserContext } from 'data/contexts/UserContext';
import useCities from 'data/hooks/useCities.hook';
import { useContext, useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

export default function useCitiesForm(estado: string) {
    const { addressList } = useContext(UserContext).userState,
        { register, setValue, watch } = useFormContext(),
        listaCidades = useCities(estado),
        enderecosAtendidos = watch('enderecosAtendidos', []),
        citiesName = useMemo(
            () =>
                (enderecosAtendidos || []).map(
                    (item: CidadeInterface) => item.cidade
                ),
            [enderecosAtendidos]
        ),
        options = useMemo(() => {
            return listaCidades.filter(
                (item) => !citiesName.includes(item.cidade)
            );
        }, [listaCidades, citiesName]);

    useEffect(() => {
        register('enderecosAtendidos', { value: [] });
    }, []);

    useEffect(() => {
        addressList.length && setValue('enderecosAtendidos', addressList);
    }, [addressList]);

    function handleNewCity(newValue: string | null) {
        if (newValue) {
            const newCity = options.find((item) => item.cidade === newValue);
            newCity &&
                setValue('enderecosAtendidos', [
                    ...enderecosAtendidos,
                    newCity,
                ]);
        }
    }

    function handleDelete(item: string) {
        setValue(
            'enderecosAtendidos',
            enderecosAtendidos.filter(
                (city: CidadeInterface) => city.cidade !== item
            )
        );
    }

    return {
        options,
        handleNewCity,
        citiesList: listaCidades,
        citiesName,
        handleDelete,
    };
}
