import { Button, Container, Image } from "semantic-ui-react";
import {
  Car,
  FamilyMember,
  HouseSituation,
  LedgerRow,
  Pet,
  TransactionCategory,
  UserInformation,
} from "../../App";
import congratulations from "./congratulations.png";
import { useNavigate } from "react-router-dom";

import {
  CreatePdfProps,
  PdfWriterService,
} from "../../services/PdfService/PdfWriterService";
import { AdjustmentAmountPercent, LedgerRowId } from "../ResultatInteract";
import { LastPageBackForwardControls } from "../BackForwardControls";
import styled from "styled-components";

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
  console.log("whats up");
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
  console.log("example pdf");
  console.log("whats up");
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
      age: "25+",
    },
    {
      id: "614d9e84-c616-4721-bda5-c53cda4ecbef",
      name: "Fredrik",
      age: "28",
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

  console.log(props);

  return (
    <StyledFullScreenDiv>
      <Container>
        <h1>Resultat</h1>
        <div>
          <Image size="big" src={congratulations} wrapped />
        </div>

        <LastPageBackForwardControls goBack={() => goBack()} />

        <Button circular color="blue" onClick={() => createExamplePdf()}>
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
`;
