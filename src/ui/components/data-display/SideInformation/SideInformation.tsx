import React from 'react';
// import { } from '@mui/material';
import {
    SideInformationContainer,
    InformationHeader,
    InformationFooter,
    InformationListItem,
} from './SideInformation.style';

export interface SideInformationProps {
    title?: string;
    items: {
        title: string;
        description: string[];
        icon?: string;
    }[];
    footer?: {
        text: string;
        icon: string;
    };
}

const SideInformation: React.FC<SideInformationProps> = (props) => {
    return (
        <SideInformationContainer>
            {props.title && (
                <InformationHeader>
                    <h3>{props.title}</h3>
                </InformationHeader>
            )}

            <ul>
                {props.items.map((item, index) => (
                    <InformationListItem key={index}>
                        {item.icon && <i className={item.icon} />}
                        <div>
                            <h4>{item.title}</h4>
                            <ul>
                                {item.description.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </InformationListItem>
                ))}
            </ul>

            {props.footer && (
                <InformationFooter>
                    {props.footer.icon && <i className={props.footer.icon} />}
                    {props.footer.text}
                </InformationFooter>
            )}
        </SideInformationContainer>
    );
};

export default SideInformation;
