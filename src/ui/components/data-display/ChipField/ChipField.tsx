import React from 'react';
import { ChipsContainer, ChipStyled } from './ChipField.style';
// import { } from '@mui/material';
// import { Component } from './ChipField.style';

export interface ChipFieldProps {
    itemsList: string[];
    emptyMessage?: string;
    onDelete?: (item: string) => void;
}

const ChipField: React.FC<ChipFieldProps> = ({
    itemsList,
    emptyMessage = 'Nada selecionado ainda',
    ...props
}) => {
    function onDelete(item: string) {
        if (props.onDelete) {
            props.onDelete(item);
        }
    }

    return (
        <ChipsContainer>
            {itemsList.length ? (
                itemsList.map((item, index) => (
                    <li key={index}>
                        <ChipStyled
                            label={item}
                            deleteIcon={<i className={'twf-times'} />}
                            onDelete={() => onDelete(item)}
                        />
                    </li>
                ))
            ) : (
                <span>{emptyMessage}</span>
            )}
        </ChipsContainer>
    );
};

export default ChipField;
