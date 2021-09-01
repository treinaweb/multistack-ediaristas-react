import { ComponentMeta, ComponentStory } from '@storybook/react';

import UserForm from './UserForm';

export default {
    title: 'inputs/UserForm',
    component: UserForm,
    argTypes: {},
} as ComponentMeta<typeof UserForm>;

const Template: ComponentStory<typeof UserForm> = (args) => (
    <UserForm {...args} />
);

export const Default = Template.bind({});
Default.args = {};