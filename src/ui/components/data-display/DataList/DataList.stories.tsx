import { Button } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import DataList from './DataList';

export default {
    title: 'data-display/DataList',
    component: DataList,
    argTypes: {},
} as ComponentMeta<typeof DataList>;

const Template: ComponentStory<typeof DataList> = () => (
    <DataList
        header={
            <div>
                Data: 05/05/2020
                <br />
                Limpeza simples
            </div>
        }
        body={
            <div>
                Cidade: São Paulo <br />
                Número de cômodos
            </div>
        }
        actions={
            <>
                <Button variant={'contained'} color={'secondary'}>
                    Se candidatar
                </Button>
            </>
        }
    />
);

export const Default = Template.bind({});
Default.args = {};
