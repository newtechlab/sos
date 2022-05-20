import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { Button, Container, Image, Icon } from "semantic-ui-react";
import styled from "styled-components";
import { FamilyMember, InitialUserInfo, LedgerRow, Pet, UserInformation } from "../../App";
import PdfConverter from "../../services/PdfService/PdfConverter";
import { AdjustmentAmountPercent, LedgerRowId } from "../ResultatInteract";
import { StyledBoxSection } from "../StyledBoxSection";
import frontpage_family from "./frontpage_family.png";

export interface HomProps {
  setPreviousData: (data: any[]) => void;
  setFamilyMembers: (_: Array<FamilyMember>) => void;
  setLedger: (_: Array<LedgerRow>) => void;
  setUserDetails(_: UserInformation): void;
  setAdjustments(_: Map<LedgerRowId, AdjustmentAmountPercent>): void;
  setPets: (_: Array<Pet>) => void; 
}

export const firstStep = "/family";

export interface PdfFormat {
  previousData: any[]; // previous / historical sessions
  familyMembers: Array<FamilyMember>;
  ledger: Array<LedgerRow>;
  userDetails: UserInformation | undefined;
  adjustments: Map<LedgerRowId, AdjustmentAmountPercent>;
  pets: Array<Pet>;
}

export default function Home(props: HomProps) {
  const navigate = useNavigate();
  const { setFamilyMembers, setLedger, setUserDetails, setPreviousData, setAdjustments, setPets } = props;
  const onDrop = useCallback((acceptedFiles) => {
    const fileReader = new FileReader();
    fileReader.onload = async (event) => {
      if (event?.target?.readyState === FileReader.DONE) {
        const attachments = await PdfConverter.getAttachmentAsObject(event.target.result);
        setPreviousData(attachments.previousData);
        setFamilyMembers(attachments.familyMembers);
        setLedger(attachments.ledger);
        setUserDetails(attachments.userDetails || InitialUserInfo);
        setAdjustments(attachments.adjustments);
        setPets(attachments.pets);
      }
      navigate(firstStep);
    };
    fileReader.readAsArrayBuffer(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Container>
      <StyledBoxSection>
        <Image size="large" src={frontpage_family} wrapped />
        <Styledtitle>Økonomiveilederen</Styledtitle>

        <StyledParagraph>
          Velkommen til økonomiveilederen! Målet med dette verktøyet er å gi deg
          bedre oversikt over din pengebruk. Ved å få bedre oversikt, tror vi at
          det blir enklere å ta nødvendige grep for å få en trygg økonomi og en
          enklere hverdag.{" "}
        </StyledParagraph>

        <StyledNBParagraph>
          <StyledIcon>
            <Icon name="info circle" />
          </StyledIcon>
          NB! Før vi begynner ber vi deg gjøre klar Bank-ID da vi vil be deg om
          å logge på forskjellige nettsteder for å få full oversikt over din
          økonomisk situasjon
        </StyledNBParagraph>

        <StyledSpace {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <StyledDragParagraphActive>Slipp fil</StyledDragParagraphActive>
          ) : (
            <StyledDragParagraph>
              <Icon name="cloud upload" color="blue" /> Dra og slipp PDF eller
              klikk i feltet for å åpne fra maskin.
            </StyledDragParagraph>
          )}
        </StyledSpace>
        <StyledSpace>eller</StyledSpace>
        <StyledSpace>
          <Button
            circular
            color={"blue"}
            onClick={() => {
              navigate(firstStep);
            }}
          >
            Begynn ny kartlegging
          </Button>
        </StyledSpace>
      </StyledBoxSection>
    </Container>
  );
}

const StyledSpace = styled.div`
  padding: 1em !important;
`;

const StyledDragParagraph = styled.p`
  background-color: #f1f8f8 !important;
  border: 1px dashed #3d8eb1;
  padding: 3em;
  border-radius: 3px;
`;
const StyledDragParagraphActive = styled.p`
  background-color: #f1f8f8 !important;
  border: 2px solid #3d8eb1;
  padding: 3em;
  border-radius: 3px;
`;

const Styledtitle = styled.h1`
  font-weight: bold !important;
  padding: 1em;
`;
const StyledNBParagraph = styled.p`
  background-color: #f1f8f8 !important;
  padding: 0.5em;
  text-align: left;
  border-radius: 3px;
  margin-bottom: 2em;
`;
const StyledIcon = styled.p`
  background-color: #f1f8f8 !important;
  color: #3d8eb1;
  padding: 0.5em;
  text-align: left;
  font-size: 17px;
  border-radius: 2px;
  float: left;
`;

const StyledParagraph = styled.p`
  margin-bottom: 3em;
`;
