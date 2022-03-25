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

export interface FamilyMember {
  id: string;
  name: string;
  age: string
}

interface ReduceType {
  previouslyActiveStep: number,
  newSteps: Array<StepDefinition>
}

export interface LedgerRow {
  id: string,
  dayOfMonth: number,
  amount: number,
  accountFrom: string;
  accountTo: string;
}

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
    const s: ReduceType = {
      previouslyActiveStep: -1,
      newSteps: []
    };

    const callbackFn = (accumulation: Array<StepDefinition>, current: StepDefinition): Array<StepDefinition> => {
      const prevItem: StepDefinition | undefined = (accumulation && accumulation.length > 0) ? accumulation[accumulation.length-1] : undefined
      const prevItemCompleted = prevItem ? prevItem.completed : false;
      const thisIsCompleted = current.active || current.completed;
      const newStep: StepDefinition = {
        ...current,
        completed: thisIsCompleted,
        active: prevItemCompleted && !thisIsCompleted
      } 
      return accumulation.concat(newStep);
    }

    const newSteps: Array<StepDefinition> = _.reduce( steps, callbackFn, new Array<StepDefinition>() )
    setSteps(newSteps);
    navigate('penger-inn');
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
        <Route path="/penger-inn" element={<MoneyIn ledger={ledger} addLedgerRow={addLedgerRow} removeLedgerRow={deleteLedgerRow} />} />
        <Route path="/penger-ut" element={<MoneyOut />} />
      </Routes>
    </div>
  );
}

export default App;
