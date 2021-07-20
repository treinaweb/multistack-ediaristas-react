import { styled } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import RoundedButton from 'ui/components/inputs/RoudedButton/RoundedButton';
import Link, { LinkProps } from 'ui/components/navigation/Link/Link';

export const SectionContainer = styled('section')`
    position: relative;
    min-height: 250px;
    background-image: url('/img/home/living-room.svg');
    background-repeat: no-repeat;
    background-position: right center;
    background-size: cover;

    ${({ theme }) => theme.breakpoints.down('md')} {
        display: flex;
        text-align: center;
    }
    ${({ theme }) => theme.breakpoints.up('md')} {
        background-position: center;
    }
`;

export const ContainerStyled = styled(Container)`
    display: grid;
    grid-template-rows: repeat(3, auto);
    grid-template-areas: 'title' 'description' 'button';

    ${({ theme }) => theme.breakpoints.down('md')} {
        align-content: center;
        max-width: 350px;
    }

    ${({ theme }) => theme.breakpoints.up('md')} {
        grid-template-columns: 450px minmax(200px, 450px);
        grid-template-rows: 125px 55px 60px;
        grid-template-areas:
            'title picture'
            'description picture'
            'button picture';
        gap: ${({ theme }) => theme.spacing(4)};
        align-items: center;
        align-content: center;
        justify-content: space-between;
        justify-items: center;
        min-height: 450px;
    }
`;

export const SectionTitle = styled('h1')`
    position: relative;
    grid-area: title;
    margin: 0;

    em {
        font-style: inherit;
    }

    .twf-search {
        position: absolute;
        top: 0;
        right: 0;
        background-color: ${({ theme }) => theme.palette.grey[200]};
        border-radius: 50px;
        padding: ${({ theme }) => theme.spacing(2)};
        transform: translate(25%, -25%);
    }

    ${({ theme }) => theme.breakpoints.down('md')} {
        font-size: ${({ theme }) => theme.typography.body1.fontSize};
        font-weight: normal;
        .twf-search {
            display: none;
        }
    }

    ${({ theme }) => theme.breakpoints.up('md')} {
        border: 4px solid ${({ theme }) => theme.palette.grey[200]};
        border-radius: 65px;
        padding: ${({ theme }) => theme.spacing(4) + ' ' + theme.spacing(8)};
        line-height: 30px;

        em {
            color: ${({ theme }) => theme.palette.primary.main};
        }
    }
`;

export const SectionDescription = styled('p')`
    grid-area: description;
    ${({ theme }) => theme.breakpoints.down('md')} {
        margin: 0 0 ${({ theme }) => theme.spacing(5)};
    }
    ${({ theme }) => theme.breakpoints.up('md')} {
        width: 350px;
    }
`;

export const SectionButton = styled((props: LinkProps) => (
    <Link {...props} Component={RoundedButton} />
))`
    grid-area: button;
    ${({ theme }) => theme.breakpoints.up('md')} {
        width: 405px;
        height: 100%;
    }
`;

export const SectionPictureContainer = styled('div')`
    position: relative;
    grid-area: picture;

    img {
        position: relative;
        top: 35px;
        width: 100%;
    }

    &::before,
    &::after {
        content: '';
        position: absolute;
        border-radius: 100%;
    }

    &::before {
        top: 20%;
        right: -5%;
        width: 130px;
        height: 130px;
        background-color: ${({ theme }) => theme.palette.primary.main};
        z-index: 2;
    }

    &::after {
        bottom: 0;
        right: 0;
        width: 40px;
        height: 40px;
        background-color: ${({ theme }) => theme.palette.grey[200]};
    }

    ${({ theme }) => theme.breakpoints.down('md')} {
        display: none;
    }
`;

export const BottomButton = styled('span')`
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
    background-color: ${({ theme }) => theme.palette.secondary.main};
    padding: 11px 12px;
    border-radius: 50px;
    color: ${({ theme }) => theme.palette.common.white};
    border: 5px solid currentColor;

    i {
        position: relative;
        left: -2px;
    }
`;
