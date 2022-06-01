import { Button, Container, Image } from "semantic-ui-react";
import { FamilyMember, LedgerRow, Pet, UserInformation } from "../../App";
import congratulations from "./congratulations.png";

import {
  CreatePdfProps,
  PdfWriterService,
} from "../../services/PdfService/PdfWriterService";
import { AdjustmentAmountPercent, LedgerRowId } from "../ResultatInteract";
import styled from "styled-components";

interface ResultatProps {
  ledger: Array<LedgerRow>;
  familyMembers: Array<FamilyMember>;
  removeLedgerRow: (id: string) => void;
  completeStep: () => void;
  goBack: () => void;
  userDetails: UserInformation;
  previousData: any[];
  adjustments: Map<LedgerRowId, AdjustmentAmountPercent>;
  pets: Array<Pet>;
}

const createPdf = async (props: CreatePdfProps) => {
  const blob = await PdfWriterService.createPdf(props);
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = "myFileName.pdf";
  link.click();
};

export default function Resultat(props: ResultatProps) {
  const { ledger, familyMembers, userDetails, pets, previousData, adjustments, completeStep, goBack } = props;

  return (
    <StyledFullScreenDiv>
      <Container>
        <h1>Resultat</h1>
          <div>
          <Image size="big" src={congratulations} wrapped />
          </div>

        <Button
          circular
          color="blue"
          onClick={() => {
            createPdf({ ledger, familyMembers, adjustments, pets, userDetails, previousData, addImage: true });
            completeStep();
          }}
        >
          Fullfør og last ned rapport
        </Button>
      </Container>
    </StyledFullScreenDiv>
  );
}

export const StyledFullScreenDiv = styled.div`
    background-color: white;
    text-align: center;
    position: absolute;
    padding-top: 3em;
    height: 100%;
    width: 100%;
`
