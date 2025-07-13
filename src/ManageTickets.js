import React, { useState, useEffect } from "react"; 
import './style.css';
import { useNavigate } from "react-router-dom";

const ManageTickets = () => {
  const navigate = useNavigate();
  const [ticketName,setTicketName] = useState("")
  const [ticketNum, setTicketNum] = useState(0)
  //gets email that was passed in the previous page. Used to identify which user data is added to in database.
  const [email,setEmail] = useState(() => {return window.sessionStorage.getItem('email')});
  const goHome = () => {
    navigate("/Home");
  }
  const purchaseTicket = async () => {
    if (!ticketName || isNaN(ticketNum) || ticketNum < 10000 || ticketNum > 99999) {
      window.alert('Please enter a valid ticket name and 5-digit number.');
      return;
    }
    try {
      // MOCK: Store ticket in localStorage for testing
      const existingTickets = JSON.parse(localStorage.getItem('userTickets') || '[]');
      const newTicket = {
        type: ticketName,
        number: ticketNum,
        email: email,
        date: new Date().toISOString()
      };
      existingTickets.push(newTicket);
      localStorage.setItem('userTickets', JSON.stringify(existingTickets));
      
      window.alert(`Successfully added ${ticketName} ticket #${ticketNum}!`);
      setTicketName('');
      setTicketNum(0);
    } catch (error) {
      console.error("Error purchasing lottery ticket:", error);
    }
  };
  return (
    <div>
      <div className="topnav">
      <div className="homeRoute">
          <button className="button" onClick={goHome}>
          Home
          </button>
          </div>
      </div>

      <h1>Manage Lottery Tickets</h1>
      <h2>Current Lottery Tickets</h2>
      <h2>Add New Ticket</h2>
        <input type="text" onChange={(event) => setTicketName(event.target.value)}placeholder='Enter a ticket name eg Power Ball '/>
        <input type="number" onChange={(event) => setTicketNum(event.target.value)}placeholder='Enter a 5 digit Ticket Num '/>
        <button className="button" onClick={purchaseTicket}>Add Ticket</button>
    </div>
  );
};

export default ManageTickets;