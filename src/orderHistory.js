import React, { useState, useEffect } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
  const [email, setEmail] = useState(() => window.sessionStorage.getItem('email'));
  const [userTickets, setUserTickets] = useState([]);
  const [winningNumbers, setWinningNumbers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterBy, setFilterBy] = useState('all');
  const navigate = useNavigate();

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(''), 3000);
  };

  const goHome = () => {
    setIsLoading(true);
    showNotification("Returning to home...", "info");
    setTimeout(() => {
      navigate('/Home');
      setIsLoading(false);
    }, 500);
  };

  const fetchUserTickets = async () => {
    try {
      setIsLoading(true);
      showNotification("Loading your tickets...", "info");
      
      // Simulate loading delay for better UX
      setTimeout(() => {
        const allTickets = JSON.parse(localStorage.getItem('userTickets') || '[]');
        const userTickets = allTickets.filter(ticket => ticket.email === email);
        setUserTickets(userTickets);
        
        if (userTickets.length > 0) {
          showNotification(`Found ${userTickets.length} tickets`, "success");
        }
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching user tickets', error);
      showNotification("Error loading tickets. Please try again.", "error");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserTickets();
    const fetchWinningNumbers = async () => {
      try {
        const winningNums = JSON.parse(localStorage.getItem('winningNumbers') || '{}');
        setWinningNumbers(winningNums);
      } catch (error) {
        console.error('Error fetching winning numbers:', error);
      }
    };
    fetchWinningNumbers();
  }, [email]);

  const isWinner = (ticket) => {
    // Enhanced winner logic with ticket number consideration
    const ticketNumber = ticket.number;
    const lastDigit = ticketNumber % 10;
    const winChance = lastDigit === 7 || lastDigit === 3 || lastDigit === 8 ? 0.15 : 0.08;
    return Math.random() < winChance;
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

  const getTicketColor = (type) => {
    switch(type) {
      case 'Power Ball': return '#ff6b6b';
      case 'Mega Millions': return '#feca57';
      case 'Lotto Texas': return '#48dbfb';
      case 'Texas Two Step': return '#26de81';
      default: return '#6b7280';
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

  const getTicketPrice = (type) => {
    switch(type) {
      case 'Power Ball': return '$2.00';
      case 'Mega Millions': return '$2.00';
      case 'Lotto Texas': return '$1.00';
      case 'Texas Two Step': return '$1.50';
      default: return '$1.00';
    }
  };

  const sortTickets = (tickets) => {
    return [...tickets].sort((a, b) => {
      switch(sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'type':
          return a.type.localeCompare(b.type);
        case 'number':
          return b.number - a.number;
        default:
          return 0;
      }
    });
  };

  const filterTickets = (tickets) => {
    if (filterBy === 'all') return tickets;
    if (filterBy === 'winners') return tickets.filter(ticket => isWinner(ticket));
    if (filterBy === 'losers') return tickets.filter(ticket => !isWinner(ticket));
    return tickets.filter(ticket => ticket.type === filterBy);
  };

  const processedTickets = sortTickets(filterTickets(userTickets));
  const winningTickets = userTickets.filter(ticket => isWinner(ticket));
  const totalSpent = userTickets.reduce((sum, ticket) => {
    const price = parseFloat(getTicketPrice(ticket.type).replace('$', ''));
    return sum + price;
  }, 0);

  return (
    <div className="page-container">
      {/* Notification Banner */}
      {notification && (
        <div className={`notification-banner ${notification.type}`}>
          <div className="notification-content">
            <span className="notification-icon">
              {notification.type === 'success' ? '✅' : 
               notification.type === 'error' ? '❌' : '📋'}
            </span>
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <span className="navbar-brand fw-bold">🎰 Texas Lottery System</span>
          <div className="d-flex align-items-center">
            <span className="navbar-text me-3">Order History</span>
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
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold mb-3">📋 Order History</h1>
              <p className="lead">Track your lottery tickets and check winning status</p>
              {userTickets.length > 0 && (
                <div className="history-stats mt-4">
                  <span className="badge bg-primary me-2">🎫 {userTickets.length} Tickets</span>
                  <span className="badge bg-success me-2">🏆 {winningTickets.length} Winners</span>
                  <span className="badge bg-info">💰 ${totalSpent.toFixed(2)} Spent</span>
                </div>
              )}
            </div>

            {userTickets.length === 0 ? (
              <div className="text-center">
                <div className="winning-numbers-container p-5">
                  <div className="empty-state">
                    <div className="empty-icon">🎫</div>
                    <h3 className="mb-3">No Tickets Found</h3>
                    <p className="text-muted mb-4">You haven't purchased any lottery tickets yet.</p>
                    <button 
                      className="btn btn-primary btn-lg rounded-pill"
                      onClick={() => navigate('/browse_lottery_tickets')}
                    >
                      🎯 Buy Your First Ticket
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Filters and Sort */}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="card border-0 filter-card">
                      <div className="card-body p-3">
                        <h6 className="mb-2">🔍 Filter by:</h6>
                        <select 
                          className="form-select"
                          value={filterBy}
                          onChange={(e) => setFilterBy(e.target.value)}
                        >
                          <option value="all">All Tickets</option>
                          <option value="winners">Winners Only</option>
                          <option value="losers">Non-Winners</option>
                          <option value="Power Ball">Power Ball</option>
                          <option value="Mega Millions">Mega Millions</option>
                          <option value="Lotto Texas">Lotto Texas</option>
                          <option value="Texas Two Step">Texas Two Step</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card border-0 filter-card">
                      <div className="card-body p-3">
                        <h6 className="mb-2">📊 Sort by:</h6>
                        <select 
                          className="form-select"
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                        >
                          <option value="date">Date (Newest First)</option>
                          <option value="type">Game Type</option>
                          <option value="number">Ticket Number</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tickets Display */}
                <div className="row g-4">
                  {processedTickets.map((ticket, index) => {
                    const winner = isWinner(ticket);
                    return (
                      <div key={index} className="col-md-6 col-lg-4">
                        <div className={`ticket-item ${winner ? 'winner-ticket' : ''}`}>
                          <div className="ticket-header-section">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <div className="d-flex align-items-center">
                                <span 
                                  className="ticket-type-icon me-2" 
                                  style={{ color: getTicketColor(ticket.type) }}
                                >
                                  {getTicketIcon(ticket.type)}
                                </span>
                                <div>
                                  <h6 className="mb-0 ticket-type">{ticket.type}</h6>
                                  <small className="text-muted">#{ticket.number}</small>
                                </div>
                              </div>
                              <div className="text-end">
                                <span className={winner ? 'winner-badge' : 'loser-badge'}>
                                  {winner ? '🏆 Winner!' : '❌ Not Winner'}
                                </span>
                                <div className="ticket-price-small mt-1">
                                  <small className="text-muted">{getTicketPrice(ticket.type)}</small>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Ticket Numbers */}
                          {ticket.numbers && ticket.numbers.length > 0 && (
                            <div className="ticket-numbers-section mb-3">
                              <p className="small text-muted mb-2">Your Numbers:</p>
                              <div className="numbers-display">
                                {ticket.numbers.map((num, idx) => (
                                  <span key={idx} className="number-ball-small">
                                    {num}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="ticket-details">
                            <div className="d-flex justify-content-between mb-2">
                              <span className="text-muted">Purchase Date:</span>
                              <span className="fw-bold">{formatDate(ticket.date)}</span>
                            </div>
                            {winner && (
                              <div className="winner-celebration">
                                <div className="celebration-content">
                                  <h6 className="mb-1">🎉 Congratulations!</h6>
                                  <small>You won this draw!</small>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Enhanced Statistics */}
                <div className="mt-5">
                  <div className="winning-numbers-container">
                    <h4 className="text-center mb-4">📊 Your Detailed Statistics</h4>
                    <div className="row text-center">
                      <div className="col-md-3 col-6">
                        <div className="stats-item">
                          <h3 className="text-primary fw-bold">{userTickets.length}</h3>
                          <p className="text-muted mb-0">Total Tickets</p>
                          <small className="text-muted">All purchases</small>
                        </div>
                      </div>
                      <div className="col-md-3 col-6">
                        <div className="stats-item">
                          <h3 className="text-success fw-bold">{winningTickets.length}</h3>
                          <p className="text-muted mb-0">Winning Tickets</p>
                          <small className="text-muted">Lucky draws</small>
                        </div>
                      </div>
                      <div className="col-md-3 col-6">
                        <div className="stats-item">
                          <h3 className="text-warning fw-bold">
                            {userTickets.length > 0 ? Math.round((winningTickets.length / userTickets.length) * 100) : 0}%
                          </h3>
                          <p className="text-muted mb-0">Win Rate</p>
                          <small className="text-muted">Success percentage</small>
                        </div>
                      </div>
                      <div className="col-md-3 col-6">
                        <div className="stats-item">
                          <h3 className="text-info fw-bold">${totalSpent.toFixed(2)}</h3>
                          <p className="text-muted mb-0">Total Spent</p>
                          <small className="text-muted">All purchases</small>
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
                            className="btn btn-primary rounded-pill px-4"
                            onClick={() => navigate('/browse_lottery_tickets')}
                            disabled={isLoading}
                          >
                            🎫 Buy More Tickets
                          </button>
                          <button 
                            className="btn btn-outline-success rounded-pill px-4"
                            onClick={() => navigate('/prevNumbers')}
                            disabled={isLoading}
                          >
                            🏆 Winning Numbers
                          </button>
                          <button 
                            className="btn btn-outline-info rounded-pill px-4"
                            onClick={() => navigate('/ManageTickets')}
                            disabled={isLoading}
                          >
                            ⚙️ Manage Tickets
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading your tickets...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
