import { useNavigate } from "react-router-dom";
import { Button, Container, Image } from "semantic-ui-react";
import styled from "styled-components";
// import { FamilyMember, LedgerRow, Pet, UserInformation } from "../../App";
// import { AdjustmentAmountPercent, LedgerRowId } from "../ResultatInteract";
import frontpage_family from "./frontpage_family.png";
import expences from "./expences.png";
import overview from "./Overview.png";

export interface HomProps {
  // setPreviousData: (data: any[]) => void;
  // setFamilyMembers: (_: Array<FamilyMember>) => void;
  // setLedger: (_: Array<LedgerRow>) => void;
  // setUserDetails(_: UserInformation): void;
  // setAdjustments(_: Map<LedgerRowId, AdjustmentAmountPercent>): void;
  // setPets: (_: Array<Pet>) => void;
  resetSession: () => void;
}
export const firstStep = "/family";

export default function Home(props: HomProps) {
  const navigate = useNavigate();
  const { resetSession } = props;

  return (
    <>
      <StyledWhiteLayout>
        <Styledtitle>Økonomiveilederen</Styledtitle>
        <H2>- for bedre oversikt og kontroll på økonomien</H2>

        <StyledSpace>
          <StyledBigButton
            onClick={() => {
              resetSession();
              navigate(firstStep);
            }}
          >
            Start ny kartlegging
          </StyledBigButton>
        </StyledSpace>
      </StyledWhiteLayout>

      <Container>
        <StyledLayout>
          <StyledParagraph>
            <Image size="large" src={frontpage_family} wrapped />
          </StyledParagraph>
          <Styledtitle>Hva er Økonomiveilederen?</Styledtitle>
          <StyledParagraph>
            Velkommen til økonomiveilederen! Målet med dette verktøyet er å gi
            deg bedre oversikt over din pengebruk. Ved å få bedre oversikt, tror
            vi at det blir enklere å ta nødvendige grep for å få en trygg
            økonomi og en enklere hverdag.{" "}
          </StyledParagraph>
          <StyledParagraph>
            Bruk verktøyet til å legge inn husstandens inntekter og månedlige
            utgifter. Da vil du få en oversikt om du/dere har overforbruk eller
            potensiale for å spare.{" "}
          </StyledParagraph>

          <StyledParagraph>
            <Image size="massive" src={overview} wrapped />
          </StyledParagraph>
          <StyledParagraph>
            Det følger også med en enkel budsjettplanlegger, der man tar
            utgangspunkt i dine utgifter og visuelt kan eksperimentere med hvor
            man bør spare penger og hvordan det kan ha utslag på din økonomi på
            lengre sikt.
          </StyledParagraph>
          <StyledSpace>
            <Image size="massive" src={expences} wrapped />
          </StyledSpace>
        </StyledLayout>
      </Container>
      <StyledWhiteLayout>
        <Button
          color="blue"
          onClick={() => {
            resetSession();
            navigate(firstStep);
          }}
        >
          Start ny kartlegging
        </Button>
      </StyledWhiteLayout>
    </>
  );
}

const StyledSpace = styled.div`
  padding-bottom: 2em !important;
`;

const Styledtitle = styled.h1`
  font-weight: bold !important;
  font-size: xx-large;
  padding-top: 1em;
`;

const H2 = styled.h2`
  font-weight: bold !important;
  font-size: medium;
  padding-bottom: 2em;
`;

const StyledParagraph = styled.p`
  margin-bottom: 3em;
`;

export const StyledWhiteLayout = styled.div`
  background-color: #fff;
  padding: 40px;
  margin-bottom: 40px;
  text-align: center;
  height: 100%;
  width: 100%;
`;

export const StyledLayout = styled.div`
  padding: 40px;
  margin: auto;
  text-align: center;
  max-width: 55em;
`;

export const StyledBigButton = styled.button`
  margin-bottom: 2em;
  text-align: center;
  color: white;
  background-color: #3d8eb1 !important;
  border: 2px solid #3d8eb1;
  padding-right: 3em;
  padding-left: 3em;
  padding-top: 1em;
  padding-bottom: 1em;
  border-radius: 3px;
  font-weight: bold !important;
  font-size: large;
  &:hover {
    background-color: white !important;
    color: #3d8eb1;
    cursor: pointer;
  }
`;

export const StyledBlueBackground = styled.div`
  background-color: #3d8eb1 !important;
`;
