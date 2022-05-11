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
        <h1>{activeStep?.heading}</h1>
        {activeStep && activeStep?.description && (
          <p> {activeStep?.description} </p>
        )}
        <Steps steps={steps} />
      </Container>
    </StyledHeaderDiv>
  );
};
export default StepHeader;

const StyledHeaderDiv = styled.div`
  text-align: left;
  padding-top: 1em;
  padding-bottom: 5em;
  background-color: #fff !important;
`;
