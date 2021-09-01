import { styled } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import { UserProfileAvatarProps } from './UserProfileAvatar';

export const UserAvatar = styled(Avatar)`
    border: 2px solid currentColor;
`;

export const AvatarIcon = styled('i')<UserProfileAvatarProps>`
    font-size: 8px;
    vertical-align: middle;
    display: ${({ user }) => (user?.nome_completo ? 'initial' : 'none')};
`;
