import { useState } from 'react';

export default function useEncontrarDiarista() {
    const [podeContratar, setPodeContratar] = useState(false);

    return {
        podeContratar,
        setPodeContratar,
    };
}
