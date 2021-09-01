import { ComponentMeta, ComponentStory } from '@storybook/react';

import Breadcrumb from './Breadcrumb';

export default {
    title: 'navigation/Breadcrumb',
    component: Breadcrumb,
    argTypes: {},
} as ComponentMeta<typeof Breadcrumb>;

const Template: ComponentStory<typeof Breadcrumb> = (args) => (
    <Breadcrumb {...args} />
);

export const Default = Template.bind({});
Default.args = {
    selected: 'Identificação',
    items: ['Detalhes', 'Identificação', 'Pagamento'],
};
