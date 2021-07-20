import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Header from './Header';

export default {
    title: 'surfaces/Header',
    component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header />;

export const Default = Template.bind({});
Default.args = {};
