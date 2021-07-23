export const ValidationService = {
    cep(cep: string): boolean {
        return cep.replace(/\D/g, '').length === 8;
    },
};
