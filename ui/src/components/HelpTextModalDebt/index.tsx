import styled from "styled-components";
import {
  Image,
  Button,
  Header,
  Segment,
  TransitionablePortal,
  Icon,
  Grid,
} from "semantic-ui-react";
import { Fragment } from "react";
import BankID from "./BankID.png";

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
      <LabelButton onClick={() => setOpen(true)}>
        Trenger du hjelp med å finne ut din samlede gjeld?
      </LabelButton>
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
                gjeld du har. Husk å sjekke med din egen bank også.
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
                  oversikt. NB. Krever BankID
                </StyledParagraph>
                <StyledParagraph>
                  <StyledImage src={BankID} wrapped ui={false} />
                </StyledParagraph>
              </StyledGaryBox>

              <StyledLinkButton
                onClick={() => window.open("https://www.altinn.no")}
              >
                Altinn
                <IconDiv>
                  <Icon name="external" />
                </IconDiv>
              </StyledLinkButton>

              <StyledLinkButton
                onClick={() => window.open("https://www.sismo.no/en/pub/")}
              >
                Statens innkrevingssentral
                <IconDiv>
                  <Icon name="external" />
                </IconDiv>
              </StyledLinkButton>

              <StyledLinkButton
                onClick={() =>
                  window.open(
                    "https://www.nav.no/no/person/flere-tema/innkreving-og-innbetaling"
                  )
                }
              >
                Nav Innkreving
                <IconDiv>
                  <Icon name="external" />
                </IconDiv>
              </StyledLinkButton>

              <StyledLinkButton
                onClick={() => window.open("https://www.lanekassen.no")}
              >
                Lånekassen{" "}
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
const LabelButton = styled.button`
  border: 0px;
  color: #3d8eb1;
  background-color: #f1f8f8;
  font-family: Montserrat !important;
  font-weight: 300;
  position: absolute;
  top: 0px;
  right: 0px;
  &:hover {
    text-decoration: underline;
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

const StyledGaryBox = styled.div`
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

const StyledCloseButton = styled.button`
  border: 1px solid #a5c8d7;
  border-radius: 2em;
  background-color: #f1f8f8;
  padding: 0.5em;

  color: #3d8eb1;
  text-align: center;
`;
const IconDiv = styled.div`
  float: right;
`;
