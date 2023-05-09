import { Button, Container, Image } from "semantic-ui-react";
import {
  Ages,
  Car,
  FamilyMember,
  HouseSituation,
  LedgerRow,
  Pet,
  TransactionCategory,
  UserInformation,
} from "../../App";
import smiley from "./smiley.png";
import { useNavigate } from "react-router-dom";

import {
  CreatePdfProps,
  PdfWriterService,
} from "../../services/PdfService/PdfWriterService";
import { AdjustmentAmountPercent, LedgerRowId } from "../ResultatInteract";
import BackForwardControls, {
  LastPageBackForwardControls,
} from "../BackForwardControls";
import styled from "styled-components";
import { useEffect } from "react";
import { StyledBoxSection } from "../StyledBoxSection";
import { StyledBackgroundColour, StyledContainerSpace } from "../UserDetails";

interface ResultatProps {
  ledger: Array<LedgerRow>;
  familyMembers: Array<FamilyMember>;
  removeLedgerRow: (id: string) => void;
  completeStep: () => void;
  goBack: () => void;
  resetSession: () => void;
  userDetails: UserInformation;
  previousData: any[];
  adjustments: Map<LedgerRowId, AdjustmentAmountPercent>;
  pets: Array<Pet>;
}

const createPdf = async (props: CreatePdfProps) => {
  const current = new Date();
  const date = `${current.getFullYear()}/${current.getMonth() + 1}`;
  const blob = await PdfWriterService.createPdf(props);
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = `${date}_okonomiveilederen.pdf`;
  link.click();
};

{
  /*onClick={() => {
            createPdf({
              ledger,
              familyMembers,
              adjustments,
              pets,
              userDetails,
              previousData,
              addImage: true,
            });
            ResetStep();
          }}*/
}

const createExamplePdf = async () => {
  const current = new Date();
  const date = `${current.getFullYear()}/${current.getMonth() + 1}`;
  const ledger: LedgerRow[] = [
    {
      id: "dc5f4db9-e81c-4c31-8a03-943e649fdec2",
      dayOfMonth: 10,
      amount: 35000,
      accountFrom: "Lønn",
      accountTo: "user",
      category: TransactionCategory.Income,
    },
    {
      id: "33d332fb-f6aa-46ea-99b4-bbabf72de93d",
      dayOfMonth: 1,
      amount: 12000,
      accountFrom: "user",
      accountTo: "Huslån",
      category: TransactionCategory.Debt,
    },
    {
      id: "86d80a31-2c46-4fff-9667-cc8294904956",
      dayOfMonth: 1,
      amount: 200,
      accountFrom: "user",
      accountTo: "Transport (trikk, tog, buss)",
      category: TransactionCategory.Travel_Expenses,
    },
    {
      id: "bcdf1db4-9932-457c-a8c2-6672614fed3c",
      dayOfMonth: 1,
      amount: 3000,
      accountFrom: "user",
      accountTo: "Mat og drikke",
      category: TransactionCategory.Food_and_Beverages,
    },
    {
      id: "a321c387-0be5-410a-8732-69af83d7e1c5",
      dayOfMonth: 1,
      amount: 550,
      accountFrom: "user",
      accountTo: "Strøm",
      category: TransactionCategory.Electricity,
    },
    {
      id: "4b84f1f3-6e21-4649-b38f-64ef1cca8400",
      dayOfMonth: 1,
      amount: 250,
      accountFrom: "user",
      accountTo: "Personlig pleie",
      category: TransactionCategory.Personal_Care,
    },
    {
      id: "eb59be9d-8192-4f2a-b15e-b9a45a691f76",
      dayOfMonth: 1,
      amount: 100,
      accountFrom: "user",
      accountTo: "Forsikring",
      category: TransactionCategory.Insurance,
    },
    {
      id: "499029e0-68c2-4558-afb9-46b79d3109cf",
      dayOfMonth: 1,
      amount: 2000,
      accountFrom: "user",
      accountTo: "Mat og drikke",
      category: TransactionCategory.Social_Support,
    },
    {
      id: "8ea87484-a7ec-476f-b415-ba13126859c9",
      dayOfMonth: 1,
      amount: 1000,
      accountFrom: "user",
      accountTo: "Husholdningsartikler",
      category: TransactionCategory.Household_Items,
    },
  ];
  const familyMembers = [
    {
      id: "614d9e84-c616-4721-bda5-c53cda3ecbef",
      name: "Ada",
      age: Ages.year20_30,
      gender: "",
    },
    {
      id: "614d9e84-c616-4721-bda5-c53cda4ecbef",
      name: "Fredrik",
      age: Ages.year20_30,
      gender: "",
    },
  ];
  const userDetails: UserInformation = {
    goal: {
      name: "Ny bolig",
      amount: 4000000,
    },
    car: Car.NOTOWN,
    house: HouseSituation.OWN,
    otherAssets: "",
  };

  const adjustments = new Map();
  adjustments.set("5835ecbd-c14b-49fd-86a0-18961bae91c0", "90");
  adjustments.set("e4fd033e-db05-4495-b33e-1ef2e759b768", "25");
  const pets: Pet[] = [{ id: "123", name: "Petty", type: "Hund" }];
  const previousData: any[] = [];
  const addImage = true;
  const blob = await PdfWriterService.createPdf({
    ledger,
    familyMembers,
    userDetails,
    adjustments,
    pets,
    previousData,
    addImage,
  });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = `${date}_okonomiveilederen.pdf`;
  link.click();
};

export default function Resultat(props: ResultatProps) {
  const {
    ledger,
    familyMembers,
    userDetails,
    pets,
    previousData,
    adjustments,
    goBack,
    resetSession,
  } = props;
  const navigate = useNavigate();

  const ResetStep = () => {
    resetSession();
    navigate("/");
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  console.log(props);

  return (
    <StyledBackgroundColour>
      <StyledContainer>
        <StyledContainerSpace>
          <StyledBoxSection>
            <StyledPad>
              <Image size="big" src={smiley} wrapped />
            </StyledPad>
            <h1>Gratulerer!</h1>
            <p>
              Du har tatt et viktig steg mot bedre oversikt over din økonomi!
              Hvis du ønsker et sammendrag, kan du laste ned rapporten her.
              Neste gang du bruker nettsiden kan den lastes opp igjen, slik at
              du slipper å skrive inn alt på nytt. Lykke til videre!{" "}
            </p>
          </StyledBoxSection>
          <BackForwardControls
            text="Fullfør og last ned rapport"
            goBack={() => goBack()}
            completeStep={() => {
              createPdf({
                ledger,
                familyMembers,
                adjustments,
                pets,
                userDetails,
                previousData,
                addImage: true,
              });
              ResetStep();
            }}
          />
        </StyledContainerSpace>
      </StyledContainer>
    </StyledBackgroundColour>
  );
}

export const StyledPad = styled.p`
  padding-top: 3em;
  padding-bottom: 2em;
  padding-left: 3em;
`;
const StyledContainer = styled(Container)`
  padding-top: 9.375rem;
`;
export const StyledFullScreenDiv = styled.div`
  background-color: white;
  text-align: center;
  position: absolute;
  padding-top: 3em;
  height: 100%;
  width: 100%;
`;
