import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainPage, Task, NotFound } from './components/index';

function App() {
  
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/task/:id' element={<Task />} />
      <Route path='*' element={<NotFound />} /> 
    </Routes>
  );
}

export default App;
