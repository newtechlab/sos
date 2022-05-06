import "./App.css";
import { Route, Routes } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import Steps, { StepsState } from "./components/Steps";
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
import { progressStep } from "./data/StepProgressor";
import ResultatInteract from "./components/ResultatInteract";
import { Container } from "semantic-ui-react";
import Home from "./components/Home";
// import { useEffect } from "react";

export interface FamilyMember {
  id: string;
  name: string;
  age: string;
}

export enum TransactionCategory {
  Housing = "HOUSING",
  Transportation = "TRANSPORTATION",
  Food = "FOOD",
  Utilities = "UTILITIES",
  Clothing = "CLOTHING",
  Medical_Healthcare = "MEDICAL_HEALTHCARE",
  Insurance = "INSURANCE",
  Household_Items = "HOUSEHOLD_ITEMS",
  Personal = "PERSONAL",
  Debt = "DEBT",
  Retirement = "RETIREMENT",
  Education = "EDUCATION",
  Savings = "SAVINGS",
  Gifts_Donations = "GIFTS_DONATIONS",
  Entertainment = "ENTERTAINMENT",
  Income = "INCOME",
  Undefined = "UNDEFINED"
}

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const navigate = useNavigate();
  const [previousData, setPreviousData] = useState<any[]>([]);
  const [steps, setSteps] = useState<StepsState>(InitialSteps);
  const [familyMembers, setFamilyMembers] = useState<Array<FamilyMember>>([]);
  const [ledger, setLedger] = useState<Array<LedgerRow>>([]);
  const [goal, setGoal] = useState<Goal>({ name: "", amount: 0 });

  const purpleMonkeyDishWasher = (familyMember: FamilyMember) => {
    setFamilyMembers(familyMembers.concat(familyMember));
  };

  const addLedgerRow = (ledgerRow: LedgerRow) => {
    setLedger(ledger.concat(ledgerRow));
  };

  const deleteLedgerRow = (id: string) => {
    const filtered = ledger.filter((row) => {
      row.id === id;
    });

    setLedger(filtered);
  };

  // // This is kept as it is useful for local testing  
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
  //       category: TransactionCategory.Entertainment
  //     },
  //     {
  //       id: uuidv4(),
  //       dayOfMonth: 1,
  //       amount: 1000,
  //       accountFrom: "user",
  //       accountTo: "coffee",
  //       category: TransactionCategory.Food
  //     },
  //     {
  //       id: uuidv4(),
  //       dayOfMonth: 15,
  //       amount: 167,
  //       accountFrom: "user",
  //       accountTo: "pony",
  //       category: TransactionCategory.Food
  //     },
  //   ]);
  // }, []);

  const completeStep = () => {
    const newState = progressStep(steps);
    setSteps(newState);
    navigate(newState.steps[newState.activeStepId]?.path || "/");
  };

  const activeStep = steps.steps.find((s) => s.id === steps.activeStepId);

  return (
    <StyledRootDiv className="App">
      <StyledOverridesDiv>
        <StyledHeaderDiv>
          <Container>
            <h1>{activeStep?.heading}</h1>
            {activeStep && activeStep?.description && (
              <p> {activeStep?.description} </p>
            )}
            <Steps steps={steps} />
          </Container>
        </StyledHeaderDiv>

        <StyledBodyDiv>
          <Routes>
            <Route
              path="/"
              element={
                <Home 
                  setPreviousData={setPreviousData}
                  setFamilyMembers={setFamilyMembers} 
                  setLedger={setLedger} 
                  setGoal={setGoal}
                />
              }
            />
            <Route
              path="/family"
              element={
                <UserDetails
                  familyMembers={familyMembers}
                  addFamilyMember={purpleMonkeyDishWasher}
                  completeStep={completeStep}
                  setGoal={setGoal}
                  goal={goal}
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
                  goal={goal}
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
                  goal={goal}
                  previousData={previousData}
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
  padding-top: 40px;
  padding-bottom: 40px;
`;

const StyledHeaderDiv = styled.div`
  text-align: left;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #fff !important;
`;

export default App;
