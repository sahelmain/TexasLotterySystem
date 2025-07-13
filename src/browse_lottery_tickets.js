import React, { useState, useEffect } from "react"; 
import './style.css';
import { useNavigate } from "react-router-dom";

const BrowseLotteryTickets = () => {
  const navigate = useNavigate();
  const [ticketName,setTicketName] = useState("")
  const [ticketNum, setTicketNum] = useState(0)
  //gets email that was passed in the previous page. Used to identify which user data is added to in database.
  const [email,setEmail] = useState(() => {return window.sessionStorage.getItem('email')});

  //gens random num
  const randomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max); 
    return Math.floor(Math.random() * (max - min + 1)+ min); 
}; 
//used so that the states stay synced up and the data that is put into database is not incorrect.
useEffect(() => {
  if (ticketName && ticketNum) {
    purchaseTicket(ticketName, ticketNum);
  }
}, [ticketName, ticketNum]);
//navs to homepage
  const goHome = () => {
    navigate("/Home",{ state: email });
  }

  const powerBall = () => {
    //gens random lottery number and sets ticketName as the name of the ticket.
    setTicketNum(randomNumber(11111, 99999));
    setTicketName("Power Ball");
  };

  const megaMillion = () => {
    //gens random lottery number and sets ticketName as the name of the ticket.
    setTicketNum(randomNumber(11111, 99999));
    setTicketName("Mega Millions");
    
  };

  const lottoTexas = () => {
    //gens random lottery number and sets ticketName as the name of the ticket.
    setTicketNum(randomNumber(11111, 99999));
    setTicketName("Lotto Texas");
   
  };

  const texasTwoStep = () => {
    //gens random lottery number and sets ticketName as the name of the ticket.
    setTicketNum(randomNumber(11111, 99999));
    setTicketName("Texas Two Step");
  };
  
  
  const purchaseTicket = async () => {
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
      
      window.alert(`Successfully purchased ${ticketName} ticket #${ticketNum}!`);
    } catch (error) {
      console.error("Error purchasing lottery ticket:", error);
    }
  };
  
  return (
    <div className="page-container">
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <span className="navbar-brand fw-bold">🎰 Texas Lottery System</span>
          <button className="btn btn-outline-light" onClick={goHome}>
            🏠 Home
          </button>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-primary mb-3">Browse Lottery Tickets</h1>
          <p className="lead text-muted">Choose your lucky numbers and win big!</p>
        </div>

        <div className="row g-4">
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 shadow-lg border-0 lottery-card powerball-card">
              <div className="card-header bg-gradient text-white text-center">
                <h4 className="mb-0">🔴 Power Ball</h4>
              </div>
              <div className="card-body text-center p-4">
                <div className="price-tag mb-3">
                  <span className="h2 fw-bold text-success">$2</span>
                </div>
                <div className="mb-3">
                  <small className="text-muted">📅 Every Wednesday & Saturday</small>
                </div>
                <p className="card-text">5 white balls (1-69) + 1 Powerball (1-26)</p>
                <button className="btn btn-primary btn-lg w-100 rounded-pill" onClick={powerBall}>
                  🎫 Buy Ticket
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card h-100 shadow-lg border-0 lottery-card mega-card">
              <div className="card-header bg-gradient text-white text-center">
                <h4 className="mb-0">🟡 Mega Millions</h4>
              </div>
              <div className="card-body text-center p-4">
                <div className="price-tag mb-3">
                  <span className="h2 fw-bold text-success">$2</span>
                </div>
                <div className="mb-3">
                  <small className="text-muted">📅 Every Tuesday & Friday</small>
                </div>
                <p className="card-text">5 white balls (1-70) + 1 Mega Ball (1-25)</p>
                <button className="btn btn-warning btn-lg w-100 rounded-pill" onClick={megaMillion}>
                  🎫 Buy Ticket
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card h-100 shadow-lg border-0 lottery-card texas-card">
              <div className="card-header bg-gradient text-white text-center">
                <h4 className="mb-0">⭐ Lotto Texas</h4>
              </div>
              <div className="card-body text-center p-4">
                <div className="price-tag mb-3">
                  <span className="h2 fw-bold text-success">$1</span>
                </div>
                <div className="mb-3">
                  <small className="text-muted">📅 Every Wednesday & Saturday</small>
                </div>
                <p className="card-text">6 balls from 1 to 54</p>
                <button className="btn btn-info btn-lg w-100 rounded-pill" onClick={lottoTexas}>
                  🎫 Buy Ticket
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card h-100 shadow-lg border-0 lottery-card twostep-card">
              <div className="card-header bg-gradient text-white text-center">
                <h4 className="mb-0">🌟 Texas Two Step</h4>
              </div>
              <div className="card-body text-center p-4">
                <div className="price-tag mb-3">
                  <span className="h2 fw-bold text-success">$1.50</span>
                </div>
                <div className="mb-3">
                  <small className="text-muted">📅 Every Monday & Thursday</small>
                </div>
                <p className="card-text">4 white balls (1-35) + 1 bonus (1-35)</p>
                <button className="btn btn-success btn-lg w-100 rounded-pill" onClick={texasTwoStep}>
                  🎫 Buy Ticket
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="card bg-light border-0 shadow-sm">
              <div className="card-body p-4">
                <h5 className="text-center mb-4">🎯 How It Works</h5>
                <div className="row text-center">
                  <div className="col-md-3">
                    <div className="step-icon mb-2">1️⃣</div>
                    <h6>Choose Game</h6>
                    <small className="text-muted">Select your favorite lottery</small>
                  </div>
                  <div className="col-md-3">
                    <div className="step-icon mb-2">2️⃣</div>
                    <h6>Buy Ticket</h6>
                    <small className="text-muted">Get your random numbers</small>
                  </div>
                  <div className="col-md-3">
                    <div className="step-icon mb-2">3️⃣</div>
                    <h6>Wait for Draw</h6>
                    <small className="text-muted">Check the drawing dates</small>
                  </div>
                  <div className="col-md-3">
                    <div className="step-icon mb-2">4️⃣</div>
                    <h6>Check Results</h6>
                    <small className="text-muted">See if you won!</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseLotteryTickets;