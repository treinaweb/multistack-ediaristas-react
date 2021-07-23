import { Container } from '@material-ui/core';
import { SafeEnvironmentContainer } from './SafeEnvironment.style';

const SafeEnvironment = () => {
    return (
        <SafeEnvironmentContainer>
            <Container>
                Ambiente 100% Seguro <i className={'twf-lock'} />
            </Container>
        </SafeEnvironmentContainer>
    );
};

export default SafeEnvironment;
