import  {useState, useEffect } from 'react';
import './style.css';
import { useNavigate } from "react-router-dom";
//this page is for visual only. The numbers are not real winning numbers and would need to be replaced. 
const PreviousWinningNumbers = () => {
  const [email,setEmail] = useState(() => {return window.sessionStorage.getItem('email')});
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/Home");
  }
  const [previousWins, setPreviousWins] = useState([]);

  useEffect(() => {
    const fetchPreviousWins = async () => {
      try {
        // MOCK: Get winning numbers from localStorage
        const winningNums = JSON.parse(localStorage.getItem('winningNumbers') || '{}');
        const formattedWins = [];
        
        if (winningNums.powerball) {
          formattedWins.push({ type: 'Power Ball', numbers: winningNums.powerball });
        }
        if (winningNums.megamillions) {
          formattedWins.push({ type: 'Mega Millions', numbers: winningNums.megamillions });
        }
        if (winningNums.lottotexas) {
          formattedWins.push({ type: 'Lotto Texas', numbers: winningNums.lottotexas });
        }
        if (winningNums.texastwostep) {
          formattedWins.push({ type: 'Texas Two Step', numbers: winningNums.texastwostep });
        }
        
        setPreviousWins(formattedWins);
      } catch (error) {
        console.error('Error fetching previous wins:', error);
      }
    };
    fetchPreviousWins();
  }, []);

  return (
    <div>
      <div className="topnav">
      <div className="homeRoute">
          <button className="button" onClick={goHome}>
          Home</button>
          </div>
      </div>
      <h1>Previous Winning Numbers</h1>
      <div className="winning-numbers">
        {previousWins.map((win, index) => (
          <p key={index}>{win.type}: {win.numbers.join(', ')}</p>
        ))}
      </div>
    </div>
  );
};

export default PreviousWinningNumbers;