import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {useState} from 'react'
import Home from './Home';
import Login from './Login';
import Admin from './Admin';
import './App.css';
import BrowseLotteryTickets from './browse_lottery_tickets';
import ManageTickets from './ManageTickets';
import PreviousWinningNumbers from './prevNumbers';
import OrderHistory from './orderHistory';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [email, setEmail] = useState("")

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} /> 
          <Route path="/Admin" element={<Admin />} />
          <Route path="/browse_lottery_tickets" element={<BrowseLotteryTickets />} /> 
          <Route path="/ManageTickets" element={<ManageTickets />} />
          <Route path="/prevNumbers" element={<PreviousWinningNumbers />} />
          <Route path="/orderHistory" element={<OrderHistory />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
