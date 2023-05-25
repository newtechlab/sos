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
          Hva er SIFO?
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
              <Header>Hva er SIFO?</Header>
              <StyledParagraph>
                SIFOs referansebudsjett viser alminnelige forbruksutgifter for
                ulike typer hushold. Budsjettet er oppdatert med tall for 2023.
              </StyledParagraph>

              <StyledParagraph>
                For detaljert beskrivelse av de ulike kategoriene, se "Penger
                ut".
              </StyledParagraph>
              <StyledGaryBox>
                <Header>Et akseptabelt forbruksnivå</Header>
                <StyledParagraph>
                  Referansebudsjettet viser hva det koster å leve på et
                  akseptabelt forbruksnivå for det aktuelle husholdet. Med et
                  akseptabelt forbruksnivå menes et forbruk som kan godtas av
                  folk flest. Forbruket er akseptabelt i den forstand at de
                  fleste nordmenn - uansett egen inntekt - kan leve på dette
                  nivået uten å skille seg for mye ut. Dette er et forbruk som
                  en med rimelighet kan forvente at personer som er i arbeid har
                  tilgang til. Det gjør det mulig å følge offentlige helse- og
                  kostholdsanbefalinger og å delta i de mest vanlige
                  fritidsaktivitetene på en fullverdig måte.
                </StyledParagraph>
              </StyledGaryBox>

              <StyledGaryBox>
                <Header>Budsjettet er et eksempel</Header>
                <StyledParagraph>
                  Utgangspunktet for budsjettet er en detaljert oversikt over
                  varer og tjenester som blir gjenstand for prismålinger. Det er
                  et eksempel på hva fagfolk innen de ulike forbruksområdene
                  mener inngår i et akseptabelt forbruk. Dette betyr at
                  budsjettet ikke gjenspeiler et statistisk gjennomsnitt. Varene
                  som ligger til grunn for beregningene holder et alminnelig bra
                  kvalitetsnivå. Det er lagt vekt på god holdbarhet, enkel
                  utførelse og funksjonalitet. I de tilfeller der det er
                  nødvendig, er sikkerhetsaspektet også vurdert. Videre er det
                  viktig å merke seg at budsjettet ikke omfatter alle utgifter
                  som en person eller en familie kan ha, som f.eks. bolig,
                  feriereiser, gaver og helsetjenester utover et årlig lege- og
                  tannlegebesøk.
                </StyledParagraph>
              </StyledGaryBox>
              <StyledGaryBox>
                <Header>Budsjettet er et langtidsbudsjett</Header>
                <StyledParagraph>
                  Referansebudsjettet er et budsjett for hushold som allerede
                  lever på et akseptabelt nivå, det er et suppleringsbudsjett.
                  Det blir kalt et langtidsbudsjett fordi det er beregnet at en
                  skal sette til side penger hver måned for å ha råd til å
                  foreta sjeldnere innkjøp av dyre og varige
                  forbruksgjenstander. Når kjøleskapet, komfyren, vaskemaskinen
                  eller lignende går i stykker, skal en ha penger til
                  reparasjoner eller til å kjøpe nytt, uten at dette går ut over
                  forbruket ellers.
                </StyledParagraph>
              </StyledGaryBox>
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
