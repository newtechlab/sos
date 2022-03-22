import './App.css';
import { Route, Routes } from 'react-router-dom';
import About from './components/About';

import 'semantic-ui-css/semantic.min.css'
import Steps from './components/Steps';
import { useState } from 'react';
import UserDetails from './components/UserDetails';

function App() {
  const [currentStep, setCurrentStep] = useState<number>(2);
  const [userDetails, setUserDetails] = useState<string|undefined>(undefined);
  return (
    <div className="App">
      <Steps currentStep={currentStep} />
      <h1>Hello, {userDetails}</h1>
      <Routes>
        <Route path="/" element={<UserDetails  setUserDetails={setUserDetails}/>} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
