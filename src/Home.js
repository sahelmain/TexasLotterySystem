import React, { useEffect, useState  } from 'react';
import './Home.css'
import { useNavigate, useLocation} from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email,setEmail] = useState(() => {return window.sessionStorage.getItem('email')}); 
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState('');

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleNavigation = async (path, message) => {
    setIsLoading(true);
    showNotification(message);
    
    // Add a small delay for better UX
    setTimeout(() => {
      navigate(path, { state: email });
      setIsLoading(false);
    }, 500);
  };

  const browseTickets = () => {
    handleNavigation("/browse_lottery_tickets", "Loading lottery tickets...");
  };

  const manageTickets = () => {
    handleNavigation("/manageTickets", "Loading ticket management...");
  };

  const orderHistory = () => {
    handleNavigation("/orderHistory", "Loading your order history...");
  };

  const prevWins = () => {
    handleNavigation("/prevNumbers", "Loading winning numbers...");
  };

  const logOut = () => {
    setIsLoading(true);
    showNotification("Logging out...");
    setTimeout(() => {
      window.sessionStorage.removeItem('email');
      navigate("/");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="home-container">
      {/* Notification Banner */}
      {notification && (
        <div className="notification-banner">
          <div className="notification-content">
            <span className="notification-icon">🎰</span>
            <span>{notification}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <span className="navbar-brand fw-bold">🎰 Texas Lottery System</span>
          <div className="navbar-nav ms-auto">
            <span className="navbar-text me-3">Welcome, <strong>{email}</strong></span>
            <button 
              className="btn btn-outline-light btn-sm" 
              onClick={logOut}
              disabled={isLoading}
              aria-label="Logout from system"
            >
              {isLoading ? '⏳' : '🚪'} Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold text-primary mb-3">
                Welcome to the Texas Lottery System
              </h1>
              <p className="lead text-muted">
                Your gateway to exciting lottery games and winning opportunities
              </p>
              <div className="welcome-stats mt-4">
                <span className="badge bg-primary me-2">🎯 6 Features Available</span>
                <span className="badge bg-success me-2">💰 $2M+ Jackpots</span>
                <span className="badge bg-warning me-2">🛒 Bulk Purchase</span>
                <span className="badge bg-info">💫 Favorites System</span>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="row g-4">
              <div className="col-md-6 col-lg-4">
                <div 
                  className="card h-100 shadow-sm border-0 feature-card" 
                  onClick={browseTickets}
                  role="button"
                  tabIndex="0"
                  aria-label="Browse and purchase lottery tickets"
                  onKeyPress={(e) => e.key === 'Enter' && browseTickets()}
                >
                  <div className="card-body text-center p-4">
                    <div className="feature-icon mb-3">🎫</div>
                    <h5 className="card-title fw-bold">Browse Tickets</h5>
                    <p className="card-text text-muted">
                      Explore and purchase lottery tickets from various games
                    </p>
                    <div className="card-action-hint">
                      <small className="text-primary">Click to explore →</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div 
                  className="card h-100 shadow-sm border-0 feature-card" 
                  onClick={() => handleNavigation("/multi-purchase", "Loading multi-ticket purchase...")}
                  role="button"
                  tabIndex="0"
                  aria-label="Buy multiple tickets at once with bulk discounts"
                  onKeyPress={(e) => e.key === 'Enter' && handleNavigation("/multi-purchase", "Loading multi-ticket purchase...")}
                >
                  <div className="card-body text-center p-4">
                    <div className="feature-icon mb-3">🛒</div>
                    <h5 className="card-title fw-bold">Multi-Purchase</h5>
                    <p className="card-text text-muted">
                      Buy multiple tickets at once with bulk discounts
                    </p>
                    <div className="card-action-hint">
                      <small className="text-primary">Click to buy bulk →</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div 
                  className="card h-100 shadow-sm border-0 feature-card" 
                  onClick={() => handleNavigation("/favorites", "Loading your favorites...")}
                  role="button"
                  tabIndex="0"
                  aria-label="Manage your favorite lottery numbers"
                  onKeyPress={(e) => e.key === 'Enter' && handleNavigation("/favorites", "Loading your favorites...")}
                >
                  <div className="card-body text-center p-4">
                    <div className="feature-icon mb-3">💫</div>
                    <h5 className="card-title fw-bold">Favorite Numbers</h5>
                    <p className="card-text text-muted">
                      Save and play your lucky numbers anytime
                    </p>
                    <div className="card-action-hint">
                      <small className="text-primary">Click to manage →</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div 
                  className="card h-100 shadow-sm border-0 feature-card" 
                  onClick={orderHistory}
                  role="button"
                  tabIndex="0"
                  aria-label="View your ticket purchase history"
                  onKeyPress={(e) => e.key === 'Enter' && orderHistory()}
                >
                  <div className="card-body text-center p-4">
                    <div className="feature-icon mb-3">📋</div>
                    <h5 className="card-title fw-bold">Order History</h5>
                    <p className="card-text text-muted">
                      View your ticket purchases and check winning status
                    </p>
                    <div className="card-action-hint">
                      <small className="text-primary">Click to view →</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div 
                  className="card h-100 shadow-sm border-0 feature-card" 
                  onClick={() => handleNavigation("/stats", "Loading your statistics...")}
                  role="button"
                  tabIndex="0"
                  aria-label="View detailed lottery statistics and analytics"
                  onKeyPress={(e) => e.key === 'Enter' && handleNavigation("/stats", "Loading your statistics...")}
                >
                  <div className="card-body text-center p-4">
                    <div className="feature-icon mb-3">📊</div>
                    <h5 className="card-title fw-bold">Statistics</h5>
                    <p className="card-text text-muted">
                      Detailed analytics and performance insights
                    </p>
                    <div className="card-action-hint">
                      <small className="text-primary">Click to analyze →</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div 
                  className="card h-100 shadow-sm border-0 feature-card" 
                  onClick={prevWins}
                  role="button"
                  tabIndex="0"
                  aria-label="Check previous winning numbers"
                  onKeyPress={(e) => e.key === 'Enter' && prevWins()}
                >
                  <div className="card-body text-center p-4">
                    <div className="feature-icon mb-3">🏆</div>
                    <h5 className="card-title fw-bold">Winning Numbers</h5>
                    <p className="card-text text-muted">
                      Check previous winning numbers and results
                    </p>
                    <div className="card-action-hint">
                      <small className="text-primary">Click to check →</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="row mt-5">
              <div className="col-12">
                <div className="card bg-light border-0">
                  <div className="card-body">
                    <h4 className="text-center mb-4">🎯 System Statistics</h4>
                    <div className="row text-center">
                      <div className="col-md-3">
                        <div className="stats-item">
                          <h3 className="text-primary fw-bold">6</h3>
                          <p className="text-muted mb-0">Features</p>
                          <small className="text-muted">Complete lottery management system</small>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="stats-item">
                          <h3 className="text-success fw-bold">$2M+</h3>
                          <p className="text-muted mb-0">Jackpot Prize</p>
                          <small className="text-muted">Current maximum jackpot amount</small>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="stats-item">
                          <h3 className="text-warning fw-bold">50</h3>
                          <p className="text-muted mb-0">Max Bulk Buy</p>
                          <small className="text-muted">Tickets in single purchase</small>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="stats-item">
                          <h3 className="text-info fw-bold">24/7</h3>
                          <p className="text-muted mb-0">Available</p>
                          <small className="text-muted">Purchase tickets anytime</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="row mt-5">
              <div className="col-12">
                <div className="card border-0 quick-actions-card">
                  <div className="card-body text-center p-4">
                    <h5 className="mb-4">🚀 Quick Actions</h5>
                    <div className="d-flex justify-content-center gap-3 flex-wrap">
                      <button 
                        className="btn btn-primary btn-lg rounded-pill px-4"
                        onClick={browseTickets}
                        disabled={isLoading}
                      >
                        🎫 Buy Tickets
                      </button>
                      <button 
                        className="btn btn-outline-primary btn-lg rounded-pill px-4"
                        onClick={() => handleNavigation("/multi-purchase", "Loading multi-purchase...")}
                        disabled={isLoading}
                      >
                        🛒 Bulk Buy
                      </button>
                      <button 
                        className="btn btn-outline-success btn-lg rounded-pill px-4"
                        onClick={() => handleNavigation("/favorites", "Loading favorites...")}
                        disabled={isLoading}
                      >
                        💫 Favorites
                      </button>
                      <button 
                        className="btn btn-outline-info btn-lg rounded-pill px-4"
                        onClick={() => handleNavigation("/stats", "Loading statistics...")}
                        disabled={isLoading}
                      >
                        📊 Stats
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
            <p className="mt-3">Please wait...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;