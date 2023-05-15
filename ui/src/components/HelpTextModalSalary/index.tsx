import styled from "styled-components";
import {
  Button,
  Header,
  Icon,
  Segment,
  TransitionablePortal,
} from "semantic-ui-react";
import { Fragment } from "react";

interface AddHelpTextModalProps {
  open: boolean;
  setOpen: (_: boolean) => void;
}

export default function OpenHelpTextModalSalary(props: AddHelpTextModalProps) {
  const { open, setOpen } = props;
  const transition = {
    animation: "fly left",
    duration: 300,
  };

  return (
    <Fragment>
      <StyledParagraph>
        <Button basic primary onClick={() => setOpen(true)}>
          Hvorfor spør vi om dette?
        </Button>
      </StyledParagraph>
      <TransitionablePortal
        onClose={() => setOpen(false)}
        open={open}
        transition={transition}
      >
        <StyledSegment
          style={{
            right: "0",
            position: "fixed",
            top: "0",
            bottom: "0",
            zIndex: 1000,
          }}
        >
          <Button icon circular color="blue" onClick={() => setOpen(false)}>
            <Icon name="close" />
          </Button>
          <StyledModalSidebar>
            <StyledDiv>
              <Header>Hvorfor spør vi om dette? </Header>
              <StyledParagraph>
                Fordi du har et eller flere barn i enten barnehage eller AKS
                (SFO) trenger vi familiens samlede årsinntekt for å beregne
                hvilken sum dere må betale per måned.
              </StyledParagraph>

              <p>
                Brutto årsinntekt er inntekt du tjener før skatt. Denne summen
                kan man finne enten i en arbeidskontrakt eller i
                skattemeldingen, som er den inntekten man rapporterer.
              </p>
              <p>
                Vi bruker antall elbiler og fossilbiler til å beregne forventet
                kostnad per bil per måned. En fossilbil er en bil som bruker
                bensin eller diesel som drivstoff.
              </p>
            </StyledDiv>
          </StyledModalSidebar>
        </StyledSegment>
      </TransitionablePortal>
    </Fragment>
  );
}
export const LabelButton = styled.button`
  text-decoration: underline;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 20px;
  color: #3d8eb1;
  background-color: #f1f8f8;
  font-family: Montserrat !important;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const StyledModalSidebar = styled.div`
  padding: 3em;
`;
const StyledDiv = styled.div`
  width: 40em;
`;

const StyledParagraph = styled.p`
  padding-top: 1em;
`;

const StyledSegment = styled(Segment)`
  margin-top: 0px !important;
  overflow: scroll;
`;
