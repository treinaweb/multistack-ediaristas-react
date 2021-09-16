import { ComponentMeta, ComponentStory } from '@storybook/react';

import ChipField from './ChipField';

export default {
    title: 'data-display/ChipField',
    component: ChipField,
    argTypes: {},
} as ComponentMeta<typeof ChipField>;

const Template: ComponentStory<typeof ChipField> = (args) => (
    <ChipField {...args} />
);

export const Default = Template.bind({});
Default.args = {
    itemsList: [
        'São Bernardo do Campo - SP',
        'Santo André - SP',
        'Diadema - SP',
        'São Caetano do Sul - SP',
    ],
    emptyMessage: 'Nenhuma cidade selecionada ainda',
};
