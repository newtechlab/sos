import "./App.css";
import { Route, Routes } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import Steps, { StepsState } from "./components/Steps";
import { useEffect, useState } from "react";
import UserDetails from "./components/UserDetails";
import { InitialSteps } from "./data/StepsInitialState";
import MoneyIn from "./components/MoneyIn";
import MoneyOut from "./components/MoneyOut";
import { v4 as uuidv4 } from "uuid";

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

export interface FamilyMember {
  id: string;
  name: string;
  age: string;
}

export interface LedgerRow {
  id: string;
  dayOfMonth: number;
  amount: number;
  accountFrom: string;
  accountTo: string;
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
  const [steps, setSteps] = useState<StepsState>(InitialSteps);
  const [familyMembers, setFamilyMembers] = useState<Array<FamilyMember>>([]);
  const [ledger, setLedger] = useState<Array<LedgerRow>>([]);

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

  // This is kept as it is useful for local testing  
  useEffect(() => {
    setLedger([
      {
        id: uuidv4(),
        dayOfMonth: 1,
        amount: 1000,
        accountFrom: "salary",
        accountTo: "user",
      },
      {
        id: uuidv4(),
        dayOfMonth: 10,
        amount: 100,
        accountFrom: "user",
        accountTo: "netflix",
      },
      {
        id: uuidv4(),
        dayOfMonth: 1,
        amount: 1000,
        accountFrom: "user",
        accountTo: "coffee",
      },
      {
        id: uuidv4(),
        dayOfMonth: 15,
        amount: 167,
        accountFrom: "user",
        accountTo: "pony",
      },
    ]);
  }, []);

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
                <Home setFamilyMembers={setFamilyMembers} setLedger={setLedger} />
              }
            />
            <Route
              path="/family"
              element={
                <UserDetails
                  familyMembers={familyMembers}
                  addFamilyMember={purpleMonkeyDishWasher}
                  completeStep={completeStep}
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
