import { ComponentMeta, ComponentStory } from '@storybook/react';

import ItemCounter from './ItemCounter';

export default {
    title: 'inputs/ItemCounter',
    component: ItemCounter,
    argTypes: {},
} as ComponentMeta<typeof ItemCounter>;

const Template: ComponentStory<typeof ItemCounter> = (args) => (
    <ItemCounter {...args} />
);

export const Default = Template.bind({});
Default.args = {
    label: 'Cozinha',
    plural: 'Cozinhas',
    counter: 0,
};
