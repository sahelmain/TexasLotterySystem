import { useState, useEffect } from 'react';
import './style.css';
import { useNavigate } from "react-router-dom";

const PreviousWinningNumbers = () => {
  const [email, setEmail] = useState(() => window.sessionStorage.getItem('email'));
  const navigate = useNavigate();
  const [previousWins, setPreviousWins] = useState([]);

  const goHome = () => {
    navigate("/Home");
  };

  const getGameIcon = (type) => {
    switch(type) {
      case 'Power Ball': return '🔴';
      case 'Mega Millions': return '🟡';
      case 'Lotto Texas': return '⭐';
      case 'Texas Two Step': return '🌟';
      default: return '🎫';
    }
  };

  const getGameDescription = (type) => {
    switch(type) {
      case 'Power Ball': return '5 white balls (1-69) + 1 Powerball (1-26)';
      case 'Mega Millions': return '5 white balls (1-70) + 1 Mega Ball (1-25)';
      case 'Lotto Texas': return '6 balls (1-54)';
      case 'Texas Two Step': return '4 white balls (1-35) + 1 bonus (1-35)';
      default: return '';
    }
  };

  const getGameGradient = (type) => {
    switch(type) {
      case 'Power Ball': return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      case 'Mega Millions': return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
      case 'Lotto Texas': return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
      case 'Texas Two Step': return 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
      default: return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
  };

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
    <div className="page-container">
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <span className="navbar-brand fw-bold">🎰 Texas Lottery System</span>
          <button className="btn btn-outline-light" onClick={goHome}>
            🏠 Home
          </button>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold mb-3">🏆 Previous Winning Numbers</h1>
              <p className="lead">Check the latest winning numbers for all lottery games</p>
            </div>

            {previousWins.length === 0 ? (
              <div className="text-center">
                <div className="winning-numbers-container p-5">
                  <h3 className="mb-3">🎲 No Winning Numbers Yet</h3>
                  <p className="text-muted mb-4">
                    Winning numbers haven't been generated yet. 
                    {email === 'admin@test.com' ? ' Visit the admin panel to generate them.' : ' Please check back later.'}
                  </p>
                  {email === 'admin@test.com' && (
                    <button 
                      className="btn btn-primary"
                      onClick={() => navigate('/Admin')}
                    >
                      🎯 Generate Winning Numbers
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="row g-4">
                {previousWins.map((win, index) => (
                  <div key={index} className="col-md-6">
                    <div className="winning-numbers-container">
                      <div className="d-flex align-items-center mb-4">
                        <span className="me-3" style={{fontSize: '2rem'}}>
                          {getGameIcon(win.type)}
                        </span>
                        <div>
                          <h3 className="mb-1">{win.type}</h3>
                          <p className="text-muted mb-0 small">
                            {getGameDescription(win.type)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="mb-3">
                          {win.numbers.map((num, numIndex) => (
                            <span 
                              key={numIndex} 
                              className="number-ball me-2 mb-2"
                              style={{
                                background: getGameGradient(win.type),
                                display: 'inline-flex'
                              }}
                            >
                              {num}
                            </span>
                          ))}
                        </div>
                        
                        <div className="p-3 rounded" style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                          <small className="text-muted">
                            Draw Date: {new Date().toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Information Section */}
            <div className="mt-5">
              <div className="winning-numbers-container">
                <h4 className="text-center mb-4">ℹ️ How to Check Your Tickets</h4>
                <div className="row text-center">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <span style={{fontSize: '2rem'}}>1️⃣</span>
                    </div>
                    <h6>Find Your Ticket</h6>
                    <small className="text-muted">
                      Go to Order History to see your purchased tickets
                    </small>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <span style={{fontSize: '2rem'}}>2️⃣</span>
                    </div>
                    <h6>Compare Numbers</h6>
                    <small className="text-muted">
                      Match your ticket numbers with the winning numbers above
                    </small>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <span style={{fontSize: '2rem'}}>3️⃣</span>
                    </div>
                    <h6>Check Status</h6>
                    <small className="text-muted">
                      The system automatically shows if you won or not
                    </small>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <span style={{fontSize: '2rem'}}>4️⃣</span>
                    </div>
                    <h6>Claim Prize</h6>
                    <small className="text-muted">
                      Winners will be notified and can claim their prizes
                    </small>
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

export default PreviousWinningNumbers;