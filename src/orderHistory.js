import React, { useState, useEffect } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
  const [email, setEmail] = useState(() => window.sessionStorage.getItem('email'));
  const [userTickets, setUserTickets] = useState([]);
  const [winningNumbers, setWinningNumbers] = useState({});
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/Home');
  };

  const fetchUserTickets = async () => {
    try {
      // MOCK: Get tickets from localStorage
      const allTickets = JSON.parse(localStorage.getItem('userTickets') || '[]');
      const userTickets = allTickets.filter(ticket => ticket.email === email);
      setUserTickets(userTickets);
    } catch (error) {
      console.error('Error fetching user tickets', error);
    }
  };

  // email is set at the beginning so useEffect immediately runs and fetches the user's tickets lists them.
  useEffect(() => {
    fetchUserTickets();
    const fetchWinningNumbers = async () => {
      try {
        // MOCK: Get winning numbers from localStorage
        const winningNums = JSON.parse(localStorage.getItem('winningNumbers') || '{}');
        setWinningNumbers(winningNums);
      } catch (error) {
        console.error('Error fetching winning numbers:', error);
      }
    };
    fetchWinningNumbers();
  }, [email]);

  const isWinner = (ticket) => {
    // MOCK: Simple random winner check for demo purposes
    // In real implementation, this would compare actual lottery numbers
    return Math.random() < 0.1; // 10% chance of winning for demo
  };

  //iterates over userTickets and creates a list item for each number and type
  const myList = userTickets.map((item, index) => (
    <li key={index}>
      {item.type} #{item.number}: {isWinner(item) ? 'Winner!' : 'Not a Winning Number'}
    </li>
  ));

  return (
    <div>
      <div className="topnav">
        <div className="homeRoute">
          <button className="button" onClick={goHome}>
            Home
          </button>
        </div>
      </div>

      <h1>Order History</h1>

      <div className="order-history">
        <h2>Your Lottery Tickets:</h2>
        <ul>{myList}</ul>
      </div>
    </div>
  );
};

export default OrderHistory;
