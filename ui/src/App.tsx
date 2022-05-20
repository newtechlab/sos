import "./App.css";
import { Route, Routes } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { StepsState } from "./components/Steps";
import { useState } from "react";
import UserDetails from "./components/UserDetails";
import { InitialSteps } from "./data/StepsInitialState";
import MoneyIn from "./components/MoneyIn";
import MoneyOut from "./components/MoneyOut";
// import { v4 as uuidv4 } from "uuid";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Resultat from "./components/Resultat";
import styled from "styled-components";
import { goBackStep, progressStep } from "./data/StepProgressor";
import ResultatInteract from "./components/ResultatInteract";
// import { Container } from "semantic-ui-react";
import Home from "./components/Home";
import MoneyOutDebt from "./components/MoneyOutDebt";
// import { useEffect } from "react";

export interface FamilyMember {
  id: string;
  name: string;
  age: string;
}

export enum TransactionCategory {
  // Housing = "HOUSING",
  // Transportation = "TRANSPORTATION",
  // Food = "FOOD",
  // Utilities = "UTILITIES",
  // Clothing = "CLOTHING",
  // Medical_Healthcare = "MEDICAL_HEALTHCARE",
  // Insurance = "INSURANCE",
  // Household_Items = "HOUSEHOLD_ITEMS",
  // Personal = "PERSONAL",
  // Debt = "DEBT",
  // Retirement = "RETIREMENT",
  // Education = "EDUCATION",
  // Savings = "SAVINGS",
  // Gifts_Donations = "GIFTS_DONATIONS",
  // Entertainment = "ENTERTAINMENT",
  // Undefined = "UNDEFINED",

  Income = "INCOME",
  Childcare_other = "AKS/SFO",
  Kindergarden = "Barnehage",
  Insurance = "Forsikring",
  Debt = "Gjeld",
  Rent = "Husleie",
  Phone = "Telefonabonnement",
  WiFi = "Internettabonnement (WiFi)",
  Other = "Annet",
  Media_and_Subscriptions = "Abonnement (Streaming, gaming)",
  Car = "Bilkostnader",
  Food_and_Beverages = "Dagligvarer",
  Household_Items = "Husholdningsartikler",
  Snacks_and_stuff = "Godteri, brus og snacks",
  Cafe = "Kafé, kaffe",
  Clothing_and_Footwear = "Klær og sko",
  Furniture = "Møbler",
  Personal_Care = "Personlig pleie",
  Bars_and_restaurants = "Restaurant / bar",
  Recreation = "Sport og fritid",
  Electricity = "Strøm",
  Travel_Expenses = "Transport og reise",
  Regular_Income = "Fast jobb",
  Part_Time_Income = "Deltidsjobb",
  Social_Support = "NAV-støtte",
  Private_Funding = "Privat bidrag",
  Undefined = "UNDEFINED",
}

export const AllTransactionCategories: Array<string> =
  Object.values(TransactionCategory);

export interface LedgerRow {
  id: string;
  dayOfMonth: number;
  amount: number;
  accountFrom: string;
  accountTo: string;
  category: TransactionCategory;
}

export interface Goal {
  name: string;
  amount: number;
}

export interface Car {
  own: boolean;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export enum HouseSituation {
  OWN = "OWN",
  RENT = "RENT",
}

export interface UserInformation {
  goal: Goal;
  car: Car;
  house: HouseSituation;
  otherAssets: string;
}

export const InitialUserInfo: UserInformation = {
  goal: { name: "", amount: 0 },
  car: { own: false },
  house: HouseSituation.RENT,
  otherAssets: "",
};

function App() {
  const navigate = useNavigate();
  const [previousData, setPreviousData] = useState<any[]>([]);
  const [steps, setSteps] = useState<StepsState>(
    InitialSteps(window.location.pathname)
  );
  const [familyMembers, setFamilyMembers] = useState<Array<FamilyMember>>([]);
  const [ledger, setLedger] = useState<Array<LedgerRow>>([]);
  const [userDetails, setUserDetails] =
    useState<UserInformation>(InitialUserInfo);

  const purpleMonkeyDishWasher = (familyMember: FamilyMember) => {
    setFamilyMembers(familyMembers.concat(familyMember));
  };

  const addLedgerRow = (ledgerRow: LedgerRow) => {
    setLedger(ledger.concat(ledgerRow));
  };

  const deleteLedgerRow = (id: string) => {
    const filtered = ledger.filter((row) => {
      return row.id !== id;
    });

    setLedger(filtered);
  };

  // This is kept as it is useful for local testing
  // useEffect(() => {
  //   setLedger([
  //     {
  //       id: uuidv4(),
  //       dayOfMonth: 1,
  //       amount: 1000,
  //       accountFrom: "salary",
  //       accountTo: "user",
  //       category: TransactionCategory.Income
  //     },
  //     {
  //       id: uuidv4(),
  //       dayOfMonth: 10,
  //       amount: 100,
  //       accountFrom: "user",
  //       accountTo: "netflix",
  //       category: TransactionCategory.Cafe
  //     },
  //     {
  //       id: uuidv4(),
  //       dayOfMonth: 1,
  //       amount: 1000,
  //       accountFrom: "user",
  //       accountTo: "coffee",
  //       category: TransactionCategory.Furniture
  //     },
  //     {
  //       id: uuidv4(),
  //       dayOfMonth: 15,
  //       amount: 167,
  //       accountFrom: "user",
  //       accountTo: "pony",
  //       category: TransactionCategory.Childcare_other
  //     },
  //   ]);
  // }, []);

  const completeStep = () => {
    const newState = progressStep(steps);
    setSteps(newState);
    navigate(newState.steps[newState.activeStepId]?.path || "/");
  };

  const goBack = () => {
    const newState = goBackStep(steps);
    setSteps(newState);
    navigate(newState.steps[newState.activeStepId]?.path || "/");
  };

  const activeStep = steps.steps.find((s) => s.id === steps.activeStepId);

  return (
    <StyledRootDiv className="App">
      <StyledOverridesDiv>
        <StyledBodyDiv>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  setPreviousData={setPreviousData}
                  setFamilyMembers={setFamilyMembers}
                  setLedger={setLedger}
                  setUserDetails={setUserDetails}
                />
              }
            />
            <Route
              path="/family"
              element={
                <UserDetails
                  familyMembers={familyMembers}
                  addFamilyMember={purpleMonkeyDishWasher}
                  activeStep={activeStep}
                  steps={steps}
                  completeStep={completeStep}
                  goBack={goBack}
                  setUserDetails={setUserDetails}
                  userDetails={userDetails}
                />
              }
            />

            <Route
              path="/penger-inn"
              element={
                <MoneyIn
                  ledger={ledger}
                  addLedgerRow={addLedgerRow}
                  removeLedgerRow={deleteLedgerRow}
                  completeStep={completeStep}
                  goBack={goBack}
                  activeStep={activeStep}
                  steps={steps}
                />
              }
            />
            <Route
              path="/gjeld"
              element={
                <MoneyOutDebt
                  ledger={ledger}
                  addLedgerRow={addLedgerRow}
                  removeLedgerRow={deleteLedgerRow}
                  completeStep={completeStep}
                  goBack={goBack}
                  activeStep={activeStep}
                  steps={steps}
                  categories={new Set([TransactionCategory.Debt])}
                />
              }
            />
            <Route
              path="/penger-ut"
              element={
                <MoneyOut
                  ledger={ledger}
                  addLedgerRow={addLedgerRow}
                  removeLedgerRow={deleteLedgerRow}
                  completeStep={completeStep}
                  goBack={goBack}
                  activeStep={activeStep}
                  steps={steps}
                  categories={
                    new Set(
                      AllTransactionCategories.filter(
                        (c) => c !== TransactionCategory.Debt.toString()
                      )
                    )
                  }
                />
              }
            />
            <Route
              path="/resultat1"
              element={
                <ResultatInteract
                  ledger={ledger}
                  removeLedgerRow={deleteLedgerRow}
                  completeStep={completeStep}
                  goal={userDetails.goal}
                  goBack={goBack}
                  activeStep={activeStep}
                  steps={steps}
                />
              }
            />
            <Route
              path="/resultat2"
              element={
                <Resultat
                  ledger={ledger}
                  familyMembers={familyMembers}
                  removeLedgerRow={deleteLedgerRow}
                  completeStep={completeStep}
                  userDetails={userDetails}
                  previousData={previousData}
                  goBack={goBack}
                />
              }
            />
          </Routes>
        </StyledBodyDiv>
      </StyledOverridesDiv>
    </StyledRootDiv>
  );
}

export const StyledOverridesDiv = styled.div`
  div,
  p,
  h1,
  h2,
  h3,
  h4,
  button,
  table {
    font-family: Montserrat !important;
    font-weight: 300;
  }
`;

export const StyledRootDiv = styled.div`
  // background-color: #f1f8f8;
  height: 100%;
  min-height: 100vh;
`;

const StyledBodyDiv = styled.div`
  text-align: left;
  padding-top: 40px;
  padding-bottom: 40px;
`;

export default App;
