import { UserInterface } from 'data/@types/UserInterface';
import React from 'react';
import { Button, Grid, Typography, Skeleton } from '@mui/material';
import { UserAvatar, AvatarIcon } from './UserProfileAvatar.style';

export interface UserProfileAvatarProps {
    user: UserInterface;
    onClick?: (event: React.MouseEvent) => void;
}

const UserProfileAvatar: React.FC<UserProfileAvatarProps> = (props) => {
    const hasUser = props.user.nome_completo.length > 0;
    return (
        <Button color={'inherit'} onClick={props.onClick}>
            <Grid container spacing={1} wrap={'nowrap'}>
                <Grid item>
                    {hasUser ? (
                        <UserAvatar
                            alt={props.user.nome_completo}
                            src={props.user.foto_usuario}
                        >
                            {props.user.nome_completo[0]}
                        </UserAvatar>
                    ) : (
                        <Skeleton
                            variant={'circular'}
                            width={40}
                            height={40}
                            animation={'wave'}
                        />
                    )}
                </Grid>
                <Grid item container spacing={1} alignItems={'center'}>
                    <Grid item>
                        {hasUser ? (
                            <Typography variant={'body2'} noWrap>
                                {props.user.nome_completo}
                            </Typography>
                        ) : (
                            <Skeleton
                                variant={'text'}
                                width={100}
                                animation={'wave'}
                            />
                        )}
                    </Grid>
                    <Grid item>
                        <AvatarIcon className={'twf-caret-down'} {...props} />
                    </Grid>
                </Grid>
            </Grid>
        </Button>
    );
};

export default UserProfileAvatar;
