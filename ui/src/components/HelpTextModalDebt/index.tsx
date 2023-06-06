import styled from "styled-components";
import {
  Image,
  Button,
  Header,
  Segment,
  TransitionablePortal,
  Icon,
} from "semantic-ui-react";
import { Fragment } from "react";
import BankID from "./BankID.png";
import { LabelButton } from "../HelpTextModalGoal";

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
      <StyledSpace>
        <Button basic primary onClick={() => setOpen(true)}>
          Trenger du hjelp med å finne ut din samlede gjeld?
        </Button>
      </StyledSpace>
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
              <Header>Usikker på din egen gjeldssituasjon?</Header>
              <StyledParagraph>
                Under finner du de vanligste tjenestene for å finne ut hvilken
                gjeld du har. En god start er også å se etter regninger i
                posten. Husk å sjekke med din egen bank også.
              </StyledParagraph>
              <StyledParagraph>
                Gjeld er penger du skylder som du har lånt, f.eks. huslån,
                billån eller private lån. Noen glemmer at kredittkortgjeld også
                er et lån. Når du bruker et kredittkort låner du penger av
                banken og betaler de tilbake i form av en regning.
              </StyledParagraph>
              <StyledGaryBox>
                <Header>Hvordan finner du din gjeld?</Header>
                <StyledParagraph>
                  Dersom du ikke har oversikt over din gjeld kan du bruke listen
                  under for å logge deg på de forskjellige tjenestene for å få
                  oversikt. NB! Krever BankID.
                </StyledParagraph>
                <StyledParagraph>
                  <StyledImage src={BankID} wrapped ui={false} />
                </StyledParagraph>
              </StyledGaryBox>
              <StyledLinkButton
                onClick={() =>
                  window.open(
                    "https://www.altinn.no/skjemaoversikt/skatteetaten/mine-krav-og-betalinger/"
                  )
                }
              >
                Altinn - krav og betalinger fra Skatteetaten
                <IconDiv>
                  <Icon name="external" />
                </IconDiv>
              </StyledLinkButton>
              <StyledLinkButton
                onClick={() => window.open("https://www.sismo.no/en/pub/")}
              >
                Statens innkrevingssentral - krav og betalinger fra staten
                <IconDiv>
                  <Icon name="external" />
                </IconDiv>
              </StyledLinkButton>
              <StyledLinkButton
                onClick={() => window.open("https://www.norskgjeld.no/")}
              >
                Norsk Gjeld - sjekk din forbruksgjeld
                <IconDiv>
                  <Icon name="external" />
                </IconDiv>
              </StyledLinkButton>
              <StyledLinkButton
                onClick={() =>
                  window.open("https://www.inkassoregisteret.com/")
                }
              >
                Inkassoregisteret - inkassoregisteret tar kontakt med
                inkassoselskapene på dine vegne og lager en oversikt.
                <IconDiv>
                  <Icon name="external" />
                </IconDiv>
              </StyledLinkButton>

              <StyledLinkButton
                onClick={() => window.open("https://www.lanekassen.no")}
              >
                Digipost - noen ganger sendes regninger digitalt, som kan være
                vanskelig å fange opp
                <IconDiv>
                  <Icon name="external" />
                </IconDiv>
              </StyledLinkButton>
              <StyledLinkButton
                onClick={() => window.open("https://www.lanekassen.no")}
              >
                Lånekassen - Studielån
                <IconDiv>
                  <Icon name="external" />
                </IconDiv>
              </StyledLinkButton>
            </StyledDiv>
          </StyledModalSidebar>
        </StyledSegment>
      </TransitionablePortal>
    </Fragment>
  );
}

const StyledModalSidebar = styled.div`
  padding: 3em;
`;

const StyledDiv = styled.div`
  width: 40em;
`;

const StyledParagraph = styled.p`
  padding-top: 1em;
`;

const StyledSpace = styled.p`
  padding-top: 1em;
  padding-bottom: 1em;
`;

export const StyledGaryBox = styled.div`
  padding: 2em;
  background-color: #f5f5f0;
  border-radius: 0.25em;
  margin-top: 2em;
  margin-bottom: 2em;
`;
const StyledImage = styled(Image)`
  img {
    width: 100px !important;
  }
`;

const StyledSegment = styled(Segment)`
  margin-top: 0px !important;
  overflow: scroll;
`;

const StyledLinkButton = styled.button`
  border: 1px solid #a5c8d7;
  border-radius: 0.25em;
  background-color: #f1f8f8;
  padding: 1.5em;
  width: 100%;
  color: #3d8eb1;
  text-align: left;
  margin-bottom: 1em;
  &:hover {
    color: #ffffff;
    background-color: #a5c8d7;
  }
`;

const IconDiv = styled.div`
  float: right;
`;
