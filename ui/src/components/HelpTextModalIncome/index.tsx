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

export default function OpenHelpTextModal(props: AddHelpTextModalProps) {
  const { open, setOpen } = props;
  const transition = {
    animation: "fly left",
    duration: 300,
  };

  return (
    <Fragment>
      <StyledParagraph>
        <Button basic primary onClick={() => setOpen(true)}>
          Hva om jeg ikke har inntekt på faste datoer?
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
              <Header>Hva om jeg ikke har inntekt på faste datoer? </Header>
              <StyledParagraph>
                Det kan være mange grunner til at man ikke har inntekt som
                kommer inn på en fast dato. Har man, for eksempel, et
                enkeltpersonforetak og fakturerer til ulike tider hver måned, så
                kan det være vanskelig å si.
              </StyledParagraph>
              <p>
                Hvis dette gjelder deg, kan du ta utgangspunkt i forrige måned
                og se når du hadde inntekter da. Du kan også ta et gjennomsnitt
                av noen måneder og sette det på den første i måneden. Det er
                ikke så farlig når den føres inn, bare det gir et bilde av hvor
                mye inntekt man kan forvente å ha hver måned.
              </p>
              <p>
                Hovedhensikten med kartleggingen er å få et bedre bilde av hvor
                mye man har i inntekt og hvor mye man har i utgifter. For mange
                vil det hjelpe å se når man får penger inn, slik at man kan
                sette store betalinger til rett etter disse dagene. Derfor kan
                det være nyttig med dato. Hvis det ikke er mulig, så er det ikke
                mulig, men verktøyet vil fortsatt kunne gi deg en bedre oversikt
                over økonomien.
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
