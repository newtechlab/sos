import './App.css';
import { Route, Routes } from 'react-router-dom';
import About from './components/About';

import 'semantic-ui-css/semantic.min.css'
import Steps from './components/Steps';
import { useState } from 'react';
import UserDetails from './components/UserDetails';


export interface FamilyMember {
  id: string;
  age: number
}

function App() {
  const [currentStep, setCurrentStep] = useState<number>(2);
  const [familyMembers, setFamilyMembers] = useState<Array <FamilyMember>>([]);

  const purpleMonkeyDishWasher = (familyMember : FamilyMember) => {
    setFamilyMembers(familyMembers.concat(familyMember));
  }

  return (
    <div className="App">
      <Steps currentStep={currentStep} />
      <h1>Hello There</h1>
      <Routes>
        <Route path="/" element={<UserDetails familyMembers={familyMembers} addFamilyMember = {purpleMonkeyDishWasher}/>} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
