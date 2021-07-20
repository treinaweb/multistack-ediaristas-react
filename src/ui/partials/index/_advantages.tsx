import React from 'react';
import { ListItem, ListItemAvatar, Container } from '@material-ui/core';
import {
    GradientBackground,
    SectionTitle,
    ListStyled,
    ListItemTextStyled,
    AvatarStyled,
    ListDivider,
} from './_advantages.styled';

const advantagesList = [
    {
        icon: 'twf-woman',
        title: 'Diversidade',
        description: 'São mais de 5.000 profissionais esperando por você!',
    },
    {
        icon: 'twf-certificate',
        title: 'Confiabilidade',
        description: 'Todos os profissionais são verificados',
    },
    {
        icon: 'twf-search-2',
        title: 'Rastreabilidade',
        description: 'Você pode acessar todo o histórico do(a) profissional',
    },
    {
        icon: 'twf-frame-broken',
        title: 'Segurança',
        description: 'Seguro sobre qualquer possível dano',
    },
    {
        icon: 'twf-payment',
        title: 'Controle',
        description:
            'O pagamento é realizado somente quando o(a) profissional está na sua casa',
    },
    {
        icon: 'twf-broom-bucket',
        title: 'Experiência',
        description: 'Mais de 50.000 diárias realizadas',
    },
];

const Advantages = () => {
    return (
        <GradientBackground>
            <Container>
                <SectionTitle>Por que usar o E-diaristas?</SectionTitle>

                <ListStyled>
                    {advantagesList.map((item, index) => (
                        <React.Fragment key={item.icon}>
                            {index !== 0 && <ListDivider />}
                            <ListItem disableGutters>
                                <ListItemAvatar>
                                    <AvatarStyled>
                                        <i className={item.icon} />
                                    </AvatarStyled>
                                </ListItemAvatar>
                                <ListItemTextStyled
                                    primary={item.title}
                                    secondary={item.description}
                                />
                            </ListItem>
                        </React.Fragment>
                    ))}
                </ListStyled>
            </Container>
        </GradientBackground>
    );
};

export default Advantages;
