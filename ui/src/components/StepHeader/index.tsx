import { Container } from "semantic-ui-react";
import styled from "styled-components";
import Steps, { StepsState } from "../Steps";

type MenuItemProps = {
  steps: StepsState;
};
const StepHeader: React.FC<MenuItemProps> = ({ steps }) => {
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
