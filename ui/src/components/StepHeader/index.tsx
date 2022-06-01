import { Container } from "semantic-ui-react";
import styled from "styled-components";
import Steps, { StepDefinition, StepsState } from "../Steps";

type MenuItemProps = {
  activeStep: StepDefinition | undefined;
  steps: StepsState;
};
const StepHeader: React.FC<MenuItemProps> = ({ activeStep, steps }) => {
  return (
    <StyledHeaderDiv>
      <Container>
        <Steps steps={steps} />
      </Container>
    </StyledHeaderDiv>
  );
};
export default StepHeader;

const StyledHeaderDiv = styled.div`
  text-align: left;
  padding-top: 3em;
  padding-bottom: 3em;
  background-color: #fff !important;
`;
