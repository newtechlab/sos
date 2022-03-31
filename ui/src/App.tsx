import './App.css';
import { Route, Routes } from 'react-router-dom';
import _ from 'lodash';

import { useNavigate } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import Steps, { StepDefinition } from './components/Steps';
import { useState } from 'react';
import UserDetails from './components/UserDetails';
import { StepsInitialState } from './data/StepsInitialState';
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
import { stepReducer } from './data/StepReducer';

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
  const [steps, setSteps] = useState<Array<StepDefinition>>(StepsInitialState);
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

  const completeStep = (): void => {
    const newSteps: Array<StepDefinition> = _.reduce( steps, stepReducer, new Array<StepDefinition>() )
    setSteps(newSteps);

    const currentStep = newSteps.find((s) => s.active === true )
    navigate(currentStep?.path || "/");
  }

  return (
    <div className="App">
      <h1>Familieoversikt</h1>
      <Steps steps={steps} />
      {/* <h1>Hello There</h1> */}
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
    </div>
  );
}

export default App;
