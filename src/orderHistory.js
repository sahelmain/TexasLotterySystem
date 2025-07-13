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

  const getTicketIcon = (type) => {
    switch(type) {
      case 'Power Ball': return '🔴';
      case 'Mega Millions': return '🟡';
      case 'Lotto Texas': return '⭐';
      case 'Texas Two Step': return '🌟';
      default: return '🎫';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
              <h1 className="display-4 fw-bold mb-3">📋 Order History</h1>
              <p className="lead">Track your lottery tickets and check winning status</p>
            </div>

            {userTickets.length === 0 ? (
              <div className="text-center">
                <div className="winning-numbers-container p-5">
                  <h3 className="mb-3">🎫 No Tickets Found</h3>
                  <p className="text-muted mb-4">You haven't purchased any lottery tickets yet.</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => navigate('/browse_lottery_tickets')}
                  >
                    🎯 Buy Your First Ticket
                  </button>
                </div>
              </div>
            ) : (
              <div className="row g-4">
                {userTickets.map((ticket, index) => {
                  const winner = isWinner(ticket);
                  return (
                    <div key={index} className="col-md-6 col-lg-4">
                      <div className="ticket-item">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <div className="d-flex align-items-center">
                            <span className="me-2" style={{fontSize: '1.5rem'}}>
                              {getTicketIcon(ticket.type)}
                            </span>
                            <h5 className="mb-0">{ticket.type}</h5>
                          </div>
                          <span className={winner ? 'winner-badge' : 'loser-badge'}>
                            {winner ? '🏆 Winner!' : '❌ Not Winner'}
                          </span>
                        </div>
                        
                        <div className="mb-3">
                          <div className="d-flex justify-content-between">
                            <span className="text-muted">Ticket #:</span>
                            <span className="fw-bold">{ticket.number}</span>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span className="text-muted">Date:</span>
                            <span>{formatDate(ticket.date)}</span>
                          </div>
                        </div>

                        {winner && (
                          <div className="text-center p-3 rounded" style={{
                            background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                            color: 'white'
                          }}>
                            <h6 className="mb-1">🎉 Congratulations!</h6>
                            <small>You won this draw!</small>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Statistics */}
            {userTickets.length > 0 && (
              <div className="mt-5">
                <div className="winning-numbers-container">
                  <h4 className="text-center mb-4">📊 Your Statistics</h4>
                  <div className="row text-center">
                    <div className="col-md-3">
                      <h3 className="text-primary fw-bold">{userTickets.length}</h3>
                      <p className="text-muted mb-0">Total Tickets</p>
                    </div>
                    <div className="col-md-3">
                      <h3 className="text-success fw-bold">
                        {userTickets.filter(ticket => isWinner(ticket)).length}
                      </h3>
                      <p className="text-muted mb-0">Winning Tickets</p>
                    </div>
                    <div className="col-md-3">
                      <h3 className="text-warning fw-bold">
                        {Math.round((userTickets.filter(ticket => isWinner(ticket)).length / userTickets.length) * 100)}%
                      </h3>
                      <p className="text-muted mb-0">Win Rate</p>
                    </div>
                    <div className="col-md-3">
                      <h3 className="text-info fw-bold">
                        {new Set(userTickets.map(ticket => ticket.type)).size}
                      </h3>
                      <p className="text-muted mb-0">Game Types</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
