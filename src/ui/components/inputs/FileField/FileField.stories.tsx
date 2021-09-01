import { ComponentMeta, ComponentStory } from '@storybook/react';

import FileField from './FileField';

export default {
    title: 'inputs/FileField',
    component: FileField,
    argTypes: {},
} as ComponentMeta<typeof FileField>;

const Template: ComponentStory<typeof FileField> = (args) => (
    <FileField {...args} />
);

export const Default = Template.bind({});
Default.args = {};