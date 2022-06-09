import { Container } from "semantic-ui-react";
import styled from "styled-components";
import Steps, { StepDefinition, StepsState } from "../Steps";

type MenuItemProps = {
  steps: StepsState;
  goToStep: (step: StepDefinition) => void
};
const StepHeader: React.FC<MenuItemProps> = ({ steps, goToStep }) => {
  return (
    <StyledHeaderDiv>
      <Container>
        <Steps steps={steps} goToStep={goToStep} />
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
