import pagarme, { CardInterface, CardValidateInterface } from 'pagarme';

export const PaymentService = {
    validate(card: CardInterface): CardValidateInterface {
        return pagarme.validate({ card }).card;
    },
};
