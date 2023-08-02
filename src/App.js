import React from 'react';
import { Routes, Route } from "react-router-dom"

import AccordianStyle from './features/AccordianStyle';



function App() {
  return (
      <div>
        <Routes>
        
        
        <Route path="/" element={ <AccordianStyle/> } />

        </Routes>
      </div>
  );
}

export default App;
