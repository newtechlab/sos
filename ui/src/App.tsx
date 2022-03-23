import './App.css';
import { Route, Routes } from 'react-router-dom';
import About from './components/About';
import _ from 'lodash';

import 'semantic-ui-css/semantic.min.css'
import Steps, { StepDefinition } from './components/Steps';
import { useState } from 'react';
import UserDetails from './components/UserDetails';
import { StepsInitialState } from './data/StepsInitialState';

export interface FamilyMember {
  id: string;
  age: number
}

interface ReduceType {
  previouslyActiveStep: number,
  newSteps: Array<StepDefinition>
}

function App() {
  const [steps, setSteps] = useState<Array<StepDefinition>>(StepsInitialState);
  const [familyMembers, setFamilyMembers] = useState<Array <FamilyMember>>([]);

  const purpleMonkeyDishWasher = (familyMember : FamilyMember) => {
    setFamilyMembers(familyMembers.concat(familyMember));
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
  }

  return (
    <div className="App">
      <h1>Familieoversikt</h1>
      <Steps steps={steps} />
      <h1>Hello There</h1>
      <Routes>
        <Route path="/" element={
          <UserDetails 
            familyMembers={familyMembers} 
            addFamilyMember = {purpleMonkeyDishWasher}
            completeStep={completeStep}
          />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
