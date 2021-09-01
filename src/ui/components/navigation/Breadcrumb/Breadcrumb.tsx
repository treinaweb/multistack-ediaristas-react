import React from 'react';
// import { } from '@material-ui/core';
import { BreadcrumbContainer, BreadcrumbItem } from './Breadcrumb.style';

export interface BreadcrumbProps {
    selected: string;
    items: string[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ selected, items }) => {
    return (
        <BreadcrumbContainer>
            {items.map((item, index) => (
                <React.Fragment key={item}>
                    <BreadcrumbItem isSelected={selected === item}>
                        {item}
                    </BreadcrumbItem>
                    {index !== items.length - 1 && <span> &gt; </span>}
                </React.Fragment>
            ))}
        </BreadcrumbContainer>
    );
};

export default Breadcrumb;
