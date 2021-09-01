import { ComponentMeta, ComponentStory } from '@storybook/react';

import PasswordStrength from './PasswordStrength';

export default {
    title: 'feedback/PasswordStrength',
    component: PasswordStrength,
    argTypes: {},
} as ComponentMeta<typeof PasswordStrength>;

const Template: ComponentStory<typeof PasswordStrength> = (args) => (
    <PasswordStrength {...args} />
);

export const Default = Template.bind({});
Default.args = {
    password: '',
};
