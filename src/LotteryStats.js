import React, { useState, useEffect } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

const LotteryStats = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(() => window.sessionStorage.getItem('email'));
  const [userTickets, setUserTickets] = useState([]);
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState('');
  const [selectedGame, setSelectedGame] = useState('all');

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

  const fetchUserTickets = () => {
    try {
      const allTickets = JSON.parse(localStorage.getItem('userTickets') || '[]');
      const userTickets = allTickets.filter(ticket => ticket.email === email);
      setUserTickets(userTickets);
      calculateStats(userTickets);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const calculateStats = (tickets) => {
    const gameStats = {};
    const gameTypes = ['Power Ball', 'Mega Millions', 'Lotto Texas', 'Texas Two Step'];
    
    gameTypes.forEach(type => {
      const gameTickets = tickets.filter(ticket => ticket.type === type);
      const winners = gameTickets.filter(ticket => isWinner(ticket));
      
      gameStats[type] = {
        totalTickets: gameTickets.length,
        winners: winners.length,
        winRate: gameTickets.length > 0 ? (winners.length / gameTickets.length * 100).toFixed(1) : 0,
        totalSpent: gameTickets.reduce((sum, ticket) => sum + getTicketPrice(ticket.type), 0),
        mostPlayedNumbers: getMostPlayedNumbers(gameTickets),
        recentActivity: gameTickets.slice(-5).reverse()
      };
    });

    const totalStats = {
      totalTickets: tickets.length,
      totalWinners: tickets.filter(ticket => isWinner(ticket)).length,
      totalSpent: tickets.reduce((sum, ticket) => sum + getTicketPrice(ticket.type), 0),
      averageWinRate: tickets.length > 0 ? (tickets.filter(ticket => isWinner(ticket)).length / tickets.length * 100).toFixed(1) : 0,
      favoriteGame: getMostPlayedGame(tickets),
      playingStreak: calculatePlayingStreak(tickets),
      monthlySpending: calculateMonthlySpending(tickets)
    };

    setStats({ games: gameStats, total: totalStats });
  };

  const isWinner = (ticket) => {
    const ticketNumber = ticket.number;
    const lastDigit = ticketNumber % 10;
    const winChance = lastDigit === 7 || lastDigit === 3 || lastDigit === 8 ? 0.15 : 0.08;
    return Math.random() < winChance;
  };

  const getTicketPrice = (type) => {
    switch(type) {
      case 'Power Ball': return 2.00;
      case 'Mega Millions': return 2.00;
      case 'Lotto Texas': return 1.00;
      case 'Texas Two Step': return 1.50;
      default: return 1.00;
    }
  };

  const getMostPlayedNumbers = (tickets) => {
    const numberCounts = {};
    tickets.forEach(ticket => {
      if (ticket.numbers) {
        ticket.numbers.forEach(num => {
          numberCounts[num] = (numberCounts[num] || 0) + 1;
        });
      }
    });
    
    return Object.entries(numberCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([num, count]) => ({ number: num, count }));
  };

  const getMostPlayedGame = (tickets) => {
    const gameCounts = {};
    tickets.forEach(ticket => {
      gameCounts[ticket.type] = (gameCounts[ticket.type] || 0) + 1;
    });
    
    return Object.entries(gameCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'None';
  };

  const calculatePlayingStreak = (tickets) => {
    if (tickets.length === 0) return 0;
    
    const sortedTickets = tickets.sort((a, b) => new Date(b.date) - new Date(a.date));
    let streak = 0;
    let currentDate = new Date();
    
    for (let ticket of sortedTickets) {
      const ticketDate = new Date(ticket.date);
      const daysDiff = Math.floor((currentDate - ticketDate) / (1000 * 60 * 60 * 24));
      
      if (daysDiff <= 7) {
        streak++;
        currentDate = ticketDate;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const calculateMonthlySpending = (tickets) => {
    const monthlyData = {};
    tickets.forEach(ticket => {
      const date = new Date(ticket.date);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      monthlyData[monthKey] = (monthlyData[monthKey] || 0) + getTicketPrice(ticket.type);
    });
    
    return Object.entries(monthlyData)
      .sort(([a], [b]) => b.localeCompare(a))
      .slice(0, 6)
      .map(([month, amount]) => ({ month, amount }));
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

  const getGameColor = (type) => {
    switch(type) {
      case 'Power Ball': return '#ff6b6b';
      case 'Mega Millions': return '#feca57';
      case 'Lotto Texas': return '#48dbfb';
      case 'Texas Two Step': return '#26de81';
      default: return '#6b7280';
    }
  };

  useEffect(() => {
    setIsLoading(true);
    showNotification("Loading your statistics...", "info");
    setTimeout(() => {
      fetchUserTickets();
      setIsLoading(false);
    }, 1000);
  }, [email]);

  const filteredStats = selectedGame === 'all' ? stats.games : { [selectedGame]: stats.games?.[selectedGame] };

  return (
    <div className="page-container">
      {/* Notification Banner */}
      {notification && (
        <div className={`notification-banner ${notification.type}`}>
          <div className="notification-content">
            <span className="notification-icon">
              {notification.type === 'success' ? '✅' : 
               notification.type === 'error' ? '❌' : '📊'}
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
            <span className="navbar-text me-3">Statistics Dashboard</span>
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
          <div className="col-md-12">
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold mb-3">📊 Lottery Statistics</h1>
              <p className="lead">Comprehensive analysis of your lottery playing patterns</p>
            </div>

            {/* Overall Statistics */}
            {stats.total && (
              <div className="winning-numbers-container mb-5">
                <h4 className="text-center mb-4">🎯 Overall Performance</h4>
                <div className="row text-center">
                  <div className="col-md-2 col-6">
                    <div className="stats-item">
                      <h3 className="text-primary fw-bold">{stats.total.totalTickets}</h3>
                      <p className="text-muted mb-0">Total Tickets</p>
                      <small className="text-muted">All time</small>
                    </div>
                  </div>
                  <div className="col-md-2 col-6">
                    <div className="stats-item">
                      <h3 className="text-success fw-bold">{stats.total.totalWinners}</h3>
                      <p className="text-muted mb-0">Winners</p>
                      <small className="text-muted">Lucky draws</small>
                    </div>
                  </div>
                  <div className="col-md-2 col-6">
                    <div className="stats-item">
                      <h3 className="text-warning fw-bold">{stats.total.averageWinRate}%</h3>
                      <p className="text-muted mb-0">Win Rate</p>
                      <small className="text-muted">Success rate</small>
                    </div>
                  </div>
                  <div className="col-md-2 col-6">
                    <div className="stats-item">
                      <h3 className="text-info fw-bold">${stats.total.totalSpent.toFixed(2)}</h3>
                      <p className="text-muted mb-0">Total Spent</p>
                      <small className="text-muted">Investment</small>
                    </div>
                  </div>
                  <div className="col-md-2 col-6">
                    <div className="stats-item">
                      <h3 className="text-primary fw-bold">{stats.total.playingStreak}</h3>
                      <p className="text-muted mb-0">Playing Streak</p>
                      <small className="text-muted">Recent activity</small>
                    </div>
                  </div>
                  <div className="col-md-2 col-6">
                    <div className="stats-item">
                      <h3 className="text-success fw-bold">{getGameIcon(stats.total.favoriteGame)}</h3>
                      <p className="text-muted mb-0">Favorite Game</p>
                      <small className="text-muted">{stats.total.favoriteGame}</small>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Game Filter */}
            <div className="row mb-4">
              <div className="col-md-6 mx-auto">
                <div className="card border-0 filter-card">
                  <div className="card-body p-3">
                    <h6 className="mb-2">🎮 Filter by Game:</h6>
                    <select 
                      className="form-select"
                      value={selectedGame}
                      onChange={(e) => setSelectedGame(e.target.value)}
                    >
                      <option value="all">All Games</option>
                      <option value="Power Ball">🔴 Power Ball</option>
                      <option value="Mega Millions">🟡 Mega Millions</option>
                      <option value="Lotto Texas">⭐ Lotto Texas</option>
                      <option value="Texas Two Step">🌟 Texas Two Step</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Game-Specific Statistics */}
            {stats.games && (
              <div className="row g-4">
                {Object.entries(filteredStats).map(([gameType, gameStats]) => (
                  <div key={gameType} className="col-md-6 col-lg-6">
                    <div className="ticket-item">
                      <div className="ticket-header-section">
                        <div className="d-flex align-items-center mb-3">
                          <span 
                            className="ticket-type-icon me-3" 
                            style={{ color: getGameColor(gameType), fontSize: '2rem' }}
                          >
                            {getGameIcon(gameType)}
                          </span>
                          <div>
                            <h5 className="mb-0 ticket-type">{gameType}</h5>
                            <small className="text-muted">Game Statistics</small>
                          </div>
                        </div>
                      </div>
                      
                      <div className="row text-center mb-3">
                        <div className="col-3">
                          <div className="stats-item">
                            <h4 className="text-primary fw-bold">{gameStats.totalTickets}</h4>
                            <small className="text-muted">Tickets</small>
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="stats-item">
                            <h4 className="text-success fw-bold">{gameStats.winners}</h4>
                            <small className="text-muted">Winners</small>
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="stats-item">
                            <h4 className="text-warning fw-bold">{gameStats.winRate}%</h4>
                            <small className="text-muted">Win Rate</small>
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="stats-item">
                            <h4 className="text-info fw-bold">${gameStats.totalSpent.toFixed(2)}</h4>
                            <small className="text-muted">Spent</small>
                          </div>
                        </div>
                      </div>

                      {/* Most Played Numbers */}
                      {gameStats.mostPlayedNumbers.length > 0 && (
                        <div className="ticket-numbers-section mb-3">
                          <p className="small text-muted mb-2">Most Played Numbers:</p>
                          <div className="d-flex gap-2 flex-wrap">
                            {gameStats.mostPlayedNumbers.map((item, idx) => (
                              <div key={idx} className="d-flex align-items-center">
                                <span className="number-ball-small me-1">{item.number}</span>
                                <small className="text-muted">×{item.count}</small>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Recent Activity */}
                      {gameStats.recentActivity.length > 0 && (
                        <div className="ticket-details">
                          <p className="small text-muted mb-2">Recent Activity:</p>
                          <div className="d-flex flex-column gap-1">
                            {gameStats.recentActivity.slice(0, 3).map((ticket, idx) => (
                              <div key={idx} className="d-flex justify-content-between">
                                <small className="text-muted">#{ticket.number}</small>
                                <small className="text-muted">{new Date(ticket.date).toLocaleDateString()}</small>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Monthly Spending Chart */}
            {stats.total?.monthlySpending && stats.total.monthlySpending.length > 0 && (
              <div className="winning-numbers-container mt-5">
                <h4 className="text-center mb-4">📈 Monthly Spending Trend</h4>
                <div className="row">
                  {stats.total.monthlySpending.map((item, idx) => (
                    <div key={idx} className="col-md-2 col-4 text-center">
                      <div className="stats-item">
                        <h5 className="text-primary fw-bold">${item.amount.toFixed(2)}</h5>
                        <small className="text-muted">{item.month}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="row mt-5">
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
                        🎫 Buy Tickets
                      </button>
                      <button 
                        className="btn btn-outline-primary rounded-pill px-4"
                        onClick={() => navigate('/orderHistory')}
                        disabled={isLoading}
                      >
                        📊 View History
                      </button>
                      <button 
                        className="btn btn-outline-success rounded-pill px-4"
                        onClick={() => navigate('/favorites')}
                        disabled={isLoading}
                      >
                        💫 Favorites
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
            <p className="mt-3">Analyzing your statistics...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LotteryStats; 