import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Admin from './Admin';
import Home from './Home';
import Login from './Login';
import Company from './Pages/Company';
import Complex from './Pages/Complex';
import Rooms from './Pages/Rooms';
import Banks from './Pages/Banks';

const App = () => {
  return (
    <>
    <Routes>

      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/admin' element={<Admin />} />
      <Route path='/admin/company' element={<Company />} />
      <Route path='/admin/complex' element={<Complex />} />
      <Route path='/admin/rooms' element={<Rooms />} />
      <Route path='/admin/banks' element={<Banks />} />

    </Routes>
    </>
  );
};

export default App;