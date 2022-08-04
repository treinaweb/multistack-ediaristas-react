import { ComponentMeta, ComponentStory } from '@storybook/react';

import Header from './Header';

export default {
    title: 'surfaces/Header',
    component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {};
