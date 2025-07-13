import React, { useState, useEffect } from "react"; 
import './style.css';
import { useNavigate } from "react-router-dom";

const BrowseLotteryTickets = () => {
  const navigate = useNavigate();
  const [ticketName, setTicketName] = useState("");
  const [ticketNum, setTicketNum] = useState(0);
  const [email, setEmail] = useState(() => {return window.sessionStorage.getItem('email')});
  const [isLoading, setIsLoading] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(null);
  const [notification, setNotification] = useState('');

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(''), 4000);
  };

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
    setIsLoading(true);
    showNotification("Returning to home...", "info");
    setTimeout(() => {
      navigate("/Home", { state: email });
      setIsLoading(false);
    }, 500);
  };

  const generateTicketNumbers = (type) => {
    let numbers = [];
    switch(type) {
      case "Power Ball":
        // 5 white balls (1-69) + 1 Powerball (1-26)
        for(let i = 0; i < 5; i++) {
          numbers.push(randomNumber(1, 69));
        }
        numbers.push(randomNumber(1, 26)); // Powerball
        break;
      case "Mega Millions":
        // 5 white balls (1-70) + 1 Mega Ball (1-25)
        for(let i = 0; i < 5; i++) {
          numbers.push(randomNumber(1, 70));
        }
        numbers.push(randomNumber(1, 25)); // Mega Ball
        break;
      case "Lotto Texas":
        // 6 balls from 1 to 54
        for(let i = 0; i < 6; i++) {
          numbers.push(randomNumber(1, 54));
        }
        break;
      case "Texas Two Step":
        // 4 white balls (1-35) + 1 bonus (1-35)
        for(let i = 0; i < 4; i++) {
          numbers.push(randomNumber(1, 35));
        }
        numbers.push(randomNumber(1, 35)); // Bonus
        break;
      default:
        numbers = [randomNumber(11111, 99999)];
    }
    return numbers;
  };

  const handleTicketPurchase = async (type, price) => {
    setIsLoading(true);
    showNotification(`Generating ${type} numbers...`, "info");
    
    // Simulate processing time for better UX
    setTimeout(() => {
      const numbers = generateTicketNumbers(type);
      const ticketId = randomNumber(100000, 999999);
      
      setTicketNum(ticketId);
      setTicketName(type);
      
      // Show success message with numbers
      setPurchaseSuccess({
        type,
        numbers,
        ticketId,
        price
      });
      
      showNotification(`${type} ticket purchased successfully!`, "success");
      setIsLoading(false);
    }, 1500);
  };

  const powerBall = () => {
    handleTicketPurchase("Power Ball", "$2");
  };

  const megaMillion = () => {
    handleTicketPurchase("Mega Millions", "$2");
  };

  const lottoTexas = () => {
    handleTicketPurchase("Lotto Texas", "$1");
  };

  const texasTwoStep = () => {
    handleTicketPurchase("Texas Two Step", "$1.50");
  };
  
  const purchaseTicket = async (ticketName, ticketNum) => {
    try {
      // MOCK: Store ticket in localStorage for testing
      const existingTickets = JSON.parse(localStorage.getItem('userTickets') || '[]');
      const newTicket = {
        type: ticketName,
        number: ticketNum,
        email: email,
        date: new Date().toISOString(),
        numbers: purchaseSuccess?.numbers || []
      };
      existingTickets.push(newTicket);
      localStorage.setItem('userTickets', JSON.stringify(existingTickets));
      
    } catch (error) {
      console.error("Error purchasing lottery ticket:", error);
      showNotification("Error purchasing ticket. Please try again.", "error");
    }
  };

  const dismissSuccess = () => {
    setPurchaseSuccess(null);
  };

  const getGameInfo = (type) => {
    const gameInfo = {
      "Power Ball": {
        icon: "🔴",
        color: "danger",
        description: "5 white balls (1-69) + 1 Powerball (1-26)",
        jackpot: "$40 Million",
        odds: "1 in 292,201,338"
      },
      "Mega Millions": {
        icon: "🟡",
        color: "warning", 
        description: "5 white balls (1-70) + 1 Mega Ball (1-25)",
        jackpot: "$20 Million",
        odds: "1 in 302,575,350"
      },
      "Lotto Texas": {
        icon: "⭐",
        color: "info",
        description: "6 balls from 1 to 54",
        jackpot: "$5 Million",
        odds: "1 in 25,827,165"
      },
      "Texas Two Step": {
        icon: "🌟",
        color: "success",
        description: "4 white balls (1-35) + 1 bonus (1-35)",
        jackpot: "$200,000",
        odds: "1 in 1,832,600"
      }
    };
    return gameInfo[type] || {};
  };
  
  return (
    <div className="page-container">
      {/* Notification Banner */}
      {notification && (
        <div className={`notification-banner ${notification.type}`}>
          <div className="notification-content">
            <span className="notification-icon">
              {notification.type === 'success' ? '✅' : 
               notification.type === 'error' ? '❌' : '🎰'}
            </span>
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <span className="navbar-brand fw-bold">🎰 Texas Lottery System</span>
          <div className="d-flex align-items-center">
            <span className="navbar-text me-3">Browse Tickets</span>
            <button 
              className="btn btn-outline-light" 
              onClick={goHome}
              disabled={isLoading}
              aria-label="Return to home page"
            >
              {isLoading ? '⏳' : '🏠'} Home
            </button>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-primary mb-3">Browse Lottery Tickets</h1>
          <p className="lead text-muted">Choose your lucky numbers and win big!</p>
          <div className="game-stats mt-4">
            <span className="badge bg-primary me-2">🎯 4 Games Available</span>
            <span className="badge bg-success me-2">💰 Jackpots up to $40M</span>
            <span className="badge bg-info">🕒 Drawings 3x per week</span>
          </div>
        </div>

        <div className="row g-4">
          {/* Power Ball */}
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
                <div className="game-details mb-3">
                  <p className="card-text mb-2">5 white balls (1-69) + 1 Powerball (1-26)</p>
                  <div className="small text-muted">
                    <div>🏆 Jackpot: $40 Million</div>
                    <div>📊 Odds: 1 in 292M</div>
                  </div>
                </div>
                <button 
                  className="btn btn-primary btn-lg w-100 rounded-pill" 
                  onClick={powerBall}
                  disabled={isLoading}
                  aria-label="Purchase Power Ball ticket for $2"
                >
                  {isLoading ? '⏳ Processing...' : '🎫 Buy Ticket'}
                </button>
              </div>
            </div>
          </div>

          {/* Mega Millions */}
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
                <div className="game-details mb-3">
                  <p className="card-text mb-2">5 white balls (1-70) + 1 Mega Ball (1-25)</p>
                  <div className="small text-muted">
                    <div>🏆 Jackpot: $20 Million</div>
                    <div>📊 Odds: 1 in 302M</div>
                  </div>
                </div>
                <button 
                  className="btn btn-warning btn-lg w-100 rounded-pill" 
                  onClick={megaMillion}
                  disabled={isLoading}
                  aria-label="Purchase Mega Millions ticket for $2"
                >
                  {isLoading ? '⏳ Processing...' : '🎫 Buy Ticket'}
                </button>
              </div>
            </div>
          </div>

          {/* Lotto Texas */}
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
                <div className="game-details mb-3">
                  <p className="card-text mb-2">6 balls from 1 to 54</p>
                  <div className="small text-muted">
                    <div>🏆 Jackpot: $5 Million</div>
                    <div>📊 Odds: 1 in 25M</div>
                  </div>
                </div>
                <button 
                  className="btn btn-info btn-lg w-100 rounded-pill" 
                  onClick={lottoTexas}
                  disabled={isLoading}
                  aria-label="Purchase Lotto Texas ticket for $1"
                >
                  {isLoading ? '⏳ Processing...' : '🎫 Buy Ticket'}
                </button>
              </div>
            </div>
          </div>

          {/* Texas Two Step */}
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
                <div className="game-details mb-3">
                  <p className="card-text mb-2">4 white balls (1-35) + 1 bonus (1-35)</p>
                  <div className="small text-muted">
                    <div>🏆 Jackpot: $200,000</div>
                    <div>📊 Odds: 1 in 1.8M</div>
                  </div>
                </div>
                <button 
                  className="btn btn-success btn-lg w-100 rounded-pill" 
                  onClick={texasTwoStep}
                  disabled={isLoading}
                  aria-label="Purchase Texas Two Step ticket for $1.50"
                >
                  {isLoading ? '⏳ Processing...' : '🎫 Buy Ticket'}
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
                    <small className="text-muted">Select your favorite lottery game</small>
                  </div>
                  <div className="col-md-3">
                    <div className="step-icon mb-2">2️⃣</div>
                    <h6>Buy Ticket</h6>
                    <small className="text-muted">Get your random numbers instantly</small>
                  </div>
                  <div className="col-md-3">
                    <div className="step-icon mb-2">3️⃣</div>
                    <h6>Wait for Draw</h6>
                    <small className="text-muted">Check the drawing dates and times</small>
                  </div>
                  <div className="col-md-3">
                    <div className="step-icon mb-2">4️⃣</div>
                    <h6>Check Results</h6>
                    <small className="text-muted">See if you won in Order History!</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="card border-0 quick-actions-card">
              <div className="card-body text-center p-4">
                <h6 className="mb-3">🚀 Quick Actions</h6>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <button 
                    className="btn btn-outline-primary rounded-pill px-4"
                    onClick={() => navigate('/multi-purchase')}
                    disabled={isLoading}
                  >
                    🛒 Bulk Purchase
                  </button>
                  <button 
                    className="btn btn-outline-success rounded-pill px-4"
                    onClick={() => navigate('/favorites')}
                    disabled={isLoading}
                  >
                    💫 Favorites
                  </button>
                  <button 
                    className="btn btn-outline-info rounded-pill px-4"
                    onClick={() => navigate('/stats')}
                    disabled={isLoading}
                  >
                    📊 Statistics
                  </button>
                  <button 
                    className="btn btn-outline-warning rounded-pill px-4"
                    onClick={() => navigate('/orderHistory')}
                    disabled={isLoading}
                  >
                    📋 History
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {purchaseSuccess && (
        <div className="modal-overlay" onClick={dismissSuccess}>
          <div className="success-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h4>🎉 Ticket Purchased Successfully!</h4>
              <button className="btn-close" onClick={dismissSuccess} aria-label="Close modal">×</button>
            </div>
            <div className="modal-body">
              <div className="ticket-preview">
                <div className="ticket-header">
                  <h5>{getGameInfo(purchaseSuccess.type).icon} {purchaseSuccess.type}</h5>
                  <span className="ticket-price">{purchaseSuccess.price}</span>
                </div>
                <div className="ticket-numbers">
                  <p className="mb-2">Your Numbers:</p>
                  <div className="numbers-display">
                    {purchaseSuccess.numbers.map((num, index) => (
                      <span key={index} className="number-ball">
                        {num}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="ticket-info">
                  <p><strong>Ticket ID:</strong> #{purchaseSuccess.ticketId}</p>
                  <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                  <p><strong>Next Draw:</strong> Check drawing schedule</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={dismissSuccess}>
                Got it! 🎯
              </button>
              <button 
                className="btn btn-outline-primary" 
                onClick={() => {
                  dismissSuccess();
                  navigate('/orderHistory');
                }}
              >
                View History 📊
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Processing your ticket...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseLotteryTickets;