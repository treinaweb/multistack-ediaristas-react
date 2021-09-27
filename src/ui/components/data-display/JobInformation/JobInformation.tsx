import React from 'react';
// import { } from '@mui/material';
import {
    JobInformationContainer,
    JobInformationIcon,
    JobDataContainer,
} from './JobInformation.style';

export interface JobInformationProps {}

const JobInformation: React.FC<JobInformationProps> = ({ children }) => {
    return (
        <JobInformationContainer>
            <JobInformationIcon className={'twf-check-circle'} />
            <JobDataContainer>{children}</JobDataContainer>
        </JobInformationContainer>
    );
};

export default JobInformation;
