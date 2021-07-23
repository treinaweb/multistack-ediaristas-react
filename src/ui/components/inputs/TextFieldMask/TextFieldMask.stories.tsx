import { ComponentMeta, ComponentStory } from '@storybook/react';

import TextFieldMask from './TextFieldMask';

export default {
    title: 'inputs/TextFieldMask',
    component: TextFieldMask,
    argTypes: {},
} as ComponentMeta<typeof TextFieldMask>;

const Template: ComponentStory<typeof TextFieldMask> = (args) => (
    <TextFieldMask {...args} />
);

export const Default = Template.bind({});
Default.args = {
    mask: '99/99/9999',
};
