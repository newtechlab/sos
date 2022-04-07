import './App.css';
import { Route, Routes } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import Steps, { StepDefinition, StepGroupType, StepsState } from './components/Steps';
import { useState } from 'react';
import UserDetails from './components/UserDetails';
import { InitialSteps } from './data/StepsInitialState';
import MoneyIn from './components/MoneyIn';
import MoneyOut from './components/MoneyOut';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Resultat from './components/Resultat';
import styled from 'styled-components';
import _ from 'lodash';
import { progressStep } from './data/StepProgressor';

export interface FamilyMember {
  id: string;
  name: string;
  age: string
}

export interface LedgerRow {
  id: string,
  dayOfMonth: number,
  amount: number,
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

  const purpleMonkeyDishWasher = (familyMember : FamilyMember) => {
    setFamilyMembers(familyMembers.concat(familyMember));
  }

  const addLedgerRow = (ledgerRow: LedgerRow) => {
    setLedger(ledger.concat(ledgerRow))
  }

  const deleteLedgerRow = (id: string) => {
    const filtered = ledger.filter((row) => {
      row.id === id
    })

    setLedger(filtered);
  }

  const completeStep = () => {
    const newState = progressStep(steps)
    setSteps(newState);
    navigate(newState.steps[newState.activeStepId]?.path || "/");
  }

  return (
    <StyledRootDiv className="App">
      
      <StyledHeaderDiv>
        <h1>Familieoversikt</h1>
        <Steps steps={steps} />
      </StyledHeaderDiv>

      {/* <h1>Hello There</h1> */}
      <StyledBodyDiv>
        <Routes>
          <Route path="/" element={
            <UserDetails 
              familyMembers={familyMembers} 
              addFamilyMember = {purpleMonkeyDishWasher}
              completeStep={completeStep}
            />} />
          <Route path="/penger-inn" element={<MoneyIn 
            ledger={ledger} 
            addLedgerRow={addLedgerRow} 
            removeLedgerRow={deleteLedgerRow} 
            completeStep={completeStep}
          />} 
          />
          <Route path="/penger-ut" element={<MoneyOut 
            ledger={ledger} 
            addLedgerRow={addLedgerRow} 
            removeLedgerRow={deleteLedgerRow} 
            completeStep={completeStep}
          />} />
          <Route path="/resultat" element={<Resultat 
            ledger={ledger} 
            removeLedgerRow={deleteLedgerRow} 
            completeStep={completeStep}
          />} />
        </Routes>
      </StyledBodyDiv>
    </StyledRootDiv>
  );
}

const StyledRootDiv = styled.div`
    background-color: #F1F8F8;
    height: 100%;
    min-height: 100vh;
`

const StyledBodyDiv = styled.div`
    text-align: left;
    padding-top: 40px;
    padding-bottom: 40px;
`

const StyledHeaderDiv = styled.div`
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #FFF !important;
`

export default App;
