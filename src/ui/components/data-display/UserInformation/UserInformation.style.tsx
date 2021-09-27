import { styled } from '@mui/material/styles';
import { Avatar, Rating, Box, Theme } from '@mui/material';
// import { UserInformationProps } from './UserInformation';

export const UserInformationContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isRating',
})<{ isRating?: boolean }>`
    display: grid;
    gap: ${({ theme }) => theme.spacing(0.5) + ' ' + theme.spacing(2)};
    align-items: center;
    background-color: ${({ theme, isRating }) =>
        theme.palette.grey[isRating ? 100 : 50]};
    ${({ theme, isRating }) => handleGrid(theme, isRating)}
`;

function handleGrid(theme: Theme, isRating?: boolean) {
    if (isRating) {
        return `
            grid-template-columns: 45px 1fr auto;
            grid-template-rows: repeat(2, auto);
            grid-template-areas:
                'avatar name rating'
                'avatar description rating';
            padding: ${theme.spacing(2) + ' ' + theme.spacing(4)};
        `;
    }
    return `
        grid-template-columns: 60px 1fr;
        grid-template-rows: repeat(3, auto);
        grid-template-areas:
            'avatar name'
            'avatar rating'
            'avatar description';
        padding: ${theme.spacing(3)};
    `;
}

export const UserName = styled('div')`
    grid-area: name;
    font-weight: bolder;
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: ${({ theme }) => theme.typography.body2.fontSize};
`;

export const UserDescription = styled('div')`
    grid-area: description;
    color: ${({ theme }) => theme.palette.text.secondary};
    font-size: ${({ theme }) => theme.typography.body2.fontSize};
`;

export const AvatarStyled = styled(Avatar)`
    grid-area: avatar;
    width: 100%;
    height: initial;
    aspect-ratio: 1;
`;

export const RatingStyled = styled(Rating)`
    grid-area: rating;
    &.MuiRating-root {
        font-size: 14px;
    }
`;
