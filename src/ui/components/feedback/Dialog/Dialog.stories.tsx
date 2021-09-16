import { ComponentMeta, ComponentStory } from '@storybook/react';

import Dialog from './Dialog';

export default {
    title: 'feedback/Dialog',
    component: Dialog,
    argTypes: {},
} as ComponentMeta<typeof Dialog>;

const Template: ComponentStory<typeof Dialog> = (args) => <Dialog {...args} />;

export const Default = Template.bind({});
Default.args = {
    isOpen: true,
    title: 'Confirmar presença da diarista',
    subtitle: 'Tem certeza que deseja confirmar a diária abaixo?',
    children: 'Texto',
};
