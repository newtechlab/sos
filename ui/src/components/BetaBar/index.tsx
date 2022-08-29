import styled from "styled-components";
import {
  Button,
  Header,
  Icon,
  Segment,
  TransitionablePortal,
} from "semantic-ui-react";
import { Fragment } from "react";

interface OpenBetaBarProps {
  open: boolean;
  setOpen: (_: boolean) => void;
}

export default function OpenBetaBar(props: OpenBetaBarProps) {
  const { open, setOpen } = props;
  const transition = {
    animation: "fly left",
    duration: 300,
  };

  return (
    <Fragment>
      <ButtonDiv>
        <Button circular color="blue" onClick={() => setOpen(true)}>
          Les mer
        </Button>
      </ButtonDiv>
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
              <Header>Hva vil "under utvikling" si?</Header>
              <StyledParagraph>
                At nettsiden er under utvikling betyr at den ikke er et helt
                ferdig, og at vi ønsker hjelp av deg for å gjøre den ferdig. Du
                kan hjelpe oss ved å si hva du mener om den. Er det noe som ikke
                gir mening? Er det noe som mangler? Er det noe som er bra og vi
                burde ha mer av? Vi setter stor pris på alt av tilbakemeldinger,
                selv om tilbakemeldingen skulle være at ingen ting er bra. Den
                tilbakemeldingen er vi kanskje aller mest interessert i, hvis
                det er tilfellet. Vi ønsker at dette skal være et nyttig
                verktøy, som hjelper dere som skal bruke det. Du gir
                tilbakemelding ved å klikke på knappen som heter "Send oss din
                tilbakemelding", nederst i høyre hjørne.
              </StyledParagraph>
            </StyledDiv>
          </StyledModalSidebar>
        </StyledSegment>
      </TransitionablePortal>
    </Fragment>
  );
}
export const ButtonDiv = styled.div`
  float: right;
  margin-left:2em;
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
  hight: 10em;
`;
