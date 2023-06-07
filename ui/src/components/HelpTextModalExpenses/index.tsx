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
          Trenger du hjelp med å forstå de ulike kategoriene?
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
              <Header>Utfyllende om de enkelte forbruksområdene</Header>
              <StyledParagraph>
                <strong>Mat og drikke</strong>
              </StyledParagraph>
              Denne utgiften dekker mat og drikke både fra dagligvarebutikk og
              restaurant.
              <StyledParagraph>
                <strong>Klær og sko</strong>
              </StyledParagraph>
              Utgifter til klær og sko til ulike årstider, samt klær for vanlige
              sports- og fritidsaktiviteter og til formelle anledninger.
              <StyledParagraph>
                <strong>Personlig pleie</strong>
              </StyledParagraph>
              Personlig pleie inkluderer utgifter til personlig pleie, som såpe,
              enkel tannpleie, kosmetikk, godlukt, frisør, barbersaker, bleier
              m.m. Tannlegeettersyn og fastlege inngår også.
              <StyledParagraph>
                <strong>Lek, sport og mediebruk</strong>
              </StyledParagraph>
              Utgiften omfatter leker til barn, sykler, sportsutstyr, bærbar pc,
              bøker, dataspill, kino, teater osv. I tillegg dekker den
              deltakelse i fritidsaktiviteter og medlemskap i frivillige
              organisasjoner.
              <StyledParagraph>
                <strong>Reisekostnader</strong>
              </StyledParagraph>
              Utgifter til kollektivtransport. Utgifter i forbindelse med bil
              finnes i 'Bilkostnader'.
              <StyledParagraph>
                <strong>Andre dagligvarer</strong>
              </StyledParagraph>
              Denne utgiften omfatter papirvarer, vask- og rengjøringsartikler,
              farmasivarer, mat- og husholdningsartikler og el-artikler
              (lyspærer, batterier osv.)
              <StyledParagraph>
                <strong>Husholdningsartikler</strong>
              </StyledParagraph>
              Utgifter til hvitevarer, kjøkkenutstyr, dekketøy,
              rengjøringsutstyr og lignende, samt husholdstekstiler som
              sengetøy, håndklær og gardiner.
              <StyledParagraph>
                <strong>Møbler</strong>
              </StyledParagraph>
              Denne utgiften omfatter alt av møbler og inventar i alle rom, som
              entré, stue, kjøkken og soverom.
              <StyledParagraph>
                <strong>Mediebruk og fritid</strong>
              </StyledParagraph>
              Utgifter til TV, radio, internett, kanalpakke til TV,
              spillkonsoll, høyttaler m.m. Her er også noen utgifter til
              fritidsutstyr som er knyttet til husholdet, som telt, primus og
              printer. Også kjøp av aviser, magasiner og en enkel
              innboforsikring ligger inn i denne utgiften.
              <StyledParagraph>
                <strong>Bilkostnader</strong>
              </StyledParagraph>
              Denne utgiften omfatter driftsutgifter, inkludert forsikring og
              årsavgift, samt utgifter til bompassering.
              <StyledParagraph>
                <strong>Spedbarnsutstyr</strong>
              </StyledParagraph>
              Utstyr som et barn trenger fra det er født, f.eks. seng, sengetøy,
              vogn, tåteflasker og lignende. I tillegg inkluderes utstyr som
              gjerne anskaffes når barnet har blitt større som for eks.
              barnestol, barnebestikk, trille, bæremeis og ustyr til
              barnesikring av hjemmet.
              <StyledParagraph>
                <strong>Barnehage</strong>
              </StyledParagraph>
              Månedlig total barnehageutgift.
              <StyledParagraph>
                <strong>SFO/AKS</strong>
              </StyledParagraph>
              Månedlig total utgift for aktivitetsskole/skolefritidsordning.
              <StyledParagraph>
                <strong>Husleie og andre bokostnader</strong>
              </StyledParagraph>
              Utgifter som leie og fellesutgifter.
              <StyledParagraph>
                <strong>Strøm</strong>
              </StyledParagraph>
              Siste månedlige strømregning og nettleie for husstanden.
              <StyledParagraph>
                <strong>Forsikring</strong>
              </StyledParagraph>
              Denne posten gjelder alle forsikringer som betales månedlig, som
              for eksempel reiseforsikring, husforsikring, innboforsikring og
              uføreforsikring.
              <StyledParagraph>
                <strong>Forskuddsskatt</strong>
              </StyledParagraph>
              Denne utgiftsposten gjelder de som har skattepliktig inntekt eller
              formue som det ikke blir trukket skatt av, og som det dermed
              betales forskuddsskatt på. Dette gjelder for eksempel mennesker
              med enkeltmannsforetak.
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
  padding-top: 2em;
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
