import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Link from './Link';
import RoundedButton from '../../inputs/RoudedButton/RoundedButton';

export default {
    title: 'navigation/Link',
    component: Link,
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = (args) => <Link {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: 'Clique Aqui',
    href: '/#',
};
