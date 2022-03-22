import './App.css';
import { Route, Routes } from 'react-router-dom';
import About from './components/About';

import 'semantic-ui-css/semantic.min.css'
import Steps from './components/Steps';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Steps />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
