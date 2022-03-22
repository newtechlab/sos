import './App.css';
import { Route, Routes } from 'react-router-dom';
import About from './components/About';

import 'semantic-ui-css/semantic.min.css'
import Steps from './components/Steps';
import { useState } from 'react';
import UserDetails from './components/UserDetails';


export interface FamilyMember {
  age: number
}

export interface User {
  familyMembers: Array <FamilyMember>;
}


function App() {
  const [currentStep, setCurrentStep] = useState<number>(2);
  const [userDetails, setUserDetails] = useState<User|undefined>(undefined);

  const purpleMonkeyDishWasher = (familyMember : FamilyMember) => {
    const fm = new Array<FamilyMember>();
    fm.push(familyMember)
    const u: User = {
      familyMembers: fm
    }
    setUserDetails (u)
  }


  return (
    <div className="App">
      <Steps currentStep={currentStep} />
      <h1>Hello, {userDetails}</h1>
      <Routes>
        <Route path="/" element={<UserDetails user={userDetails} addFamilyMember = {purpleMonkeyDishWasher} setUserDetails={setUserDetails}/>} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
