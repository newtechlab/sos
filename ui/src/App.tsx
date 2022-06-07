import "./App.css";
import { Route, Routes } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { StepsState } from "./components/Steps";
import { useEffect, useState } from "react";
import UserDetails from "./components/UserDetails";
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
import ResultatInteract, {
  AdjustmentAmountPercent,
  LedgerRowId,
} from "./components/ResultatInteract";
// import { Container } from "semantic-ui-react";
import Home from "./components/Home";
import MoneyOutDebt from "./components/MoneyOutDebt";
import { Container } from "semantic-ui-react";
import { InitialStepsWithPath } from "./data/StepsInitialState";
// import { useEffect } from "react";

export interface FamilyMember {
  id: string;
  name: string;
  age: string;
}

export interface Pet {
  id: string;
  name: string;
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

  Income = "Income",
  Housing_Benefit = "Housing_Benefit",
  Government_Income = "Government_Income",
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

export enum Car {
  OWN = "OWN",
  NOTOWN = "RENT",
  UNDEFINED = "UNDEFINED",
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
  UNDEFINED = "UNDEFINED",
}

export interface UserInformation {
  goal: Goal;
  car: Car;
  house: HouseSituation;
  otherAssets: string;
}

export const InitialUserInfo: UserInformation = {
  goal: { name: "", amount: 0 },
  car: Car.UNDEFINED,
  house: HouseSituation.UNDEFINED,
  otherAssets: "",
};

function rehydrate<T>(name: string, ifEmpty: T): T {
  const item = localStorage.getItem(name);

  return item ? (JSON.parse(item) as T) : ifEmpty;
}

function rehydrateMap<A, B>(name: string, ifEmpty: Map<A, B>): Map<A, B> {
  const item = localStorage.getItem(name);

  if (item) {
    return new Map<A, B>(JSON.parse(item));
  }

  return ifEmpty;
}

function App() {
  const navigate = useNavigate();
  const [pets, setPets] = useState<Array<Pet>>(rehydrate("pets", []));
  const [previousData, setPreviousData] = useState<any[]>(
    rehydrate("previousData", [])
  );
  const [steps, setSteps] = useState<StepsState>(
    InitialStepsWithPath(window.location.pathname)
  );
  const [familyMembers, setFamilyMembers] = useState<Array<FamilyMember>>(
    rehydrate("familyMembers", [])
  );
  const [ledger, setLedger] = useState<Array<LedgerRow>>(
    rehydrate("ledger", [])
  );
  const [userDetails, setUserDetails] = useState<UserInformation>(
    rehydrate("userDetails", InitialUserInfo)
  );
  const [adjustments, setAdjustments] = useState<
    Map<LedgerRowId, AdjustmentAmountPercent>
  >(
    rehydrateMap<LedgerRowId, AdjustmentAmountPercent>(
      "adjustments",
      new Map<LedgerRowId, AdjustmentAmountPercent>()
    )
  );

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

  const deletePet = (id: string) => {
    const filtered = pets.filter((row) => {
      return row.id !== id;
    });

    setPets(filtered);
  };

  const deleteFamilyMember = (id: string) => {
    const filtered = familyMembers.filter((row) => {
      return row.id !== id;
    });

    setFamilyMembers(filtered);
  };

  useEffect(() => {
    localStorage.setItem(
      "previousData",
      JSON.stringify(Array.from(previousData))
    );
    localStorage.setItem("steps", JSON.stringify(steps));
    localStorage.setItem("familyMembers", JSON.stringify(familyMembers));
    localStorage.setItem("ledger", JSON.stringify(ledger));
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    localStorage.setItem("pets", JSON.stringify(pets));
    localStorage.setItem(
      "adjustments",
      JSON.stringify(Array.from(adjustments.entries()))
    );
  }, [
    previousData,
    steps,
    familyMembers,
    ledger,
    userDetails,
    adjustments,
    pets,
  ]);

  // This is kept as it is useful for local testing
  // useEffect(() => {
  //   setLedger([
  //     {
  //       id: uuidv4(),
  //       dayOfMonth: 1,
  //       amount: 1000,
  //       accountFrom: "lønn",
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
                  setAdjustments={setAdjustments}
                  setPets={setPets}
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
                  pets={pets}
                  setPets={setPets}
                  deletePet={deletePet}
                  deleteFamilyMember={deleteFamilyMember}
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
                  adjustments={adjustments}
                  setAdjustments={setAdjustments}
                />
              }
            />
            <Route
              path="/resultat2"
              element={
                <Resultat
                  ledger={ledger}
                  familyMembers={familyMembers}
                  adjustments={adjustments}
                  removeLedgerRow={deleteLedgerRow}
                  completeStep={completeStep}
                  userDetails={userDetails}
                  previousData={previousData}
                  goBack={goBack}
                  pets={pets}
                  setSteps={setSteps}
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
  background-color: #f1f8f8;
  height: 100%;
  min-height: 100vh;
`;

const StyledBodyDiv = styled.div`
  text-align: left;
`;

const StyledRootContainer = styled(Container)`
  margin-bottom: 0;
  padding-bottom: 100px;
`;

export default App;
