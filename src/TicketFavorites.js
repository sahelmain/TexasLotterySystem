import React, { useState, useEffect } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

const TicketFavorites = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(() => window.sessionStorage.getItem('email'));
  const [favorites, setFavorites] = useState([]);
  const [newFavorite, setNewFavorite] = useState({
    name: '',
    type: '',
    numbers: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState('');

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

  const fetchFavorites = () => {
    try {
      const allFavorites = JSON.parse(localStorage.getItem('userFavorites') || '[]');
      const userFavorites = allFavorites.filter(fav => fav.email === email);
      setFavorites(userFavorites);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [email]);

  const generateNumbers = (type) => {
    const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    let numbers = [];
    
    switch(type) {
      case "Power Ball":
        for(let i = 0; i < 5; i++) {
          numbers.push(randomNumber(1, 69));
        }
        numbers.push(randomNumber(1, 26));
        break;
      case "Mega Millions":
        for(let i = 0; i < 5; i++) {
          numbers.push(randomNumber(1, 70));
        }
        numbers.push(randomNumber(1, 25));
        break;
      case "Lotto Texas":
        for(let i = 0; i < 6; i++) {
          numbers.push(randomNumber(1, 54));
        }
        break;
      case "Texas Two Step":
        for(let i = 0; i < 4; i++) {
          numbers.push(randomNumber(1, 35));
        }
        numbers.push(randomNumber(1, 35));
        break;
    }
    return numbers;
  };

  const saveFavorite = () => {
    if (!newFavorite.name || !newFavorite.type) {
      showNotification("Please enter a name and select a lottery type", "error");
      return;
    }

    const numbers = generateNumbers(newFavorite.type);
    const favorite = {
      id: Date.now(),
      name: newFavorite.name,
      type: newFavorite.type,
      numbers: numbers,
      email: email,
      created: new Date().toISOString()
    };

    try {
      const allFavorites = JSON.parse(localStorage.getItem('userFavorites') || '[]');
      allFavorites.push(favorite);
      localStorage.setItem('userFavorites', JSON.stringify(allFavorites));
      
      showNotification("Favorite numbers saved successfully!", "success");
      setNewFavorite({ name: '', type: '', numbers: [] });
      fetchFavorites();
    } catch (error) {
      console.error('Error saving favorite:', error);
      showNotification("Error saving favorite. Please try again.", "error");
    }
  };

  const deleteFavorite = (id) => {
    try {
      const allFavorites = JSON.parse(localStorage.getItem('userFavorites') || '[]');
      const updatedFavorites = allFavorites.filter(fav => fav.id !== id);
      localStorage.setItem('userFavorites', JSON.stringify(updatedFavorites));
      
      showNotification("Favorite deleted successfully!", "success");
      fetchFavorites();
    } catch (error) {
      console.error('Error deleting favorite:', error);
      showNotification("Error deleting favorite. Please try again.", "error");
    }
  };

  const playFavorite = (favorite) => {
    setIsLoading(true);
    showNotification(`Playing your favorite: ${favorite.name}`, "info");
    
    // Simulate ticket purchase with favorite numbers
    setTimeout(() => {
      const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
      const ticketId = randomNumber(100000, 999999);
      
      const existingTickets = JSON.parse(localStorage.getItem('userTickets') || '[]');
      const newTicket = {
        type: favorite.type,
        number: ticketId,
        email: email,
        date: new Date().toISOString(),
        numbers: favorite.numbers,
        isFavorite: true
      };
      existingTickets.push(newTicket);
      localStorage.setItem('userTickets', JSON.stringify(existingTickets));
      
      showNotification("Ticket purchased with favorite numbers!", "success");
      setIsLoading(false);
    }, 1500);
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

  return (
    <div className="page-container">
      {/* Notification Banner */}
      {notification && (
        <div className={`notification-banner ${notification.type}`}>
          <div className="notification-content">
            <span className="notification-icon">
              {notification.type === 'success' ? '✅' : 
               notification.type === 'error' ? '❌' : '💫'}
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
            <span className="navbar-text me-3">Favorite Numbers</span>
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
              <h1 className="display-4 fw-bold mb-3">💫 Favorite Numbers</h1>
              <p className="lead">Save your lucky numbers and play them anytime</p>
            </div>

            {/* Add New Favorite */}
            <div className="winning-numbers-container mb-5">
              <h4 className="text-center mb-4">➕ Create New Favorite</h4>
              <div className="row g-4">
                <div className="col-md-6">
                  <label className="form-label text-muted">Favorite Name</label>
                  <input 
                    type="text" 
                    className="form-control"
                    placeholder="e.g., Lucky Numbers, Birthday Special"
                    value={newFavorite.name}
                    onChange={(e) => setNewFavorite({...newFavorite, name: e.target.value})}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-muted">Lottery Type</label>
                  <select 
                    className="form-control"
                    value={newFavorite.type}
                    onChange={(e) => setNewFavorite({...newFavorite, type: e.target.value})}
                  >
                    <option value="">Select lottery type...</option>
                    <option value="Power Ball">🔴 Power Ball</option>
                    <option value="Mega Millions">🟡 Mega Millions</option>
                    <option value="Lotto Texas">⭐ Lotto Texas</option>
                    <option value="Texas Two Step">🌟 Texas Two Step</option>
                  </select>
                </div>
              </div>
              <div className="text-center mt-4">
                <button 
                  className="btn btn-primary btn-lg rounded-pill px-4"
                  onClick={saveFavorite}
                  disabled={isLoading}
                >
                  💫 Save Favorite Numbers
                </button>
              </div>
            </div>

            {/* Favorites List */}
            {favorites.length === 0 ? (
              <div className="text-center">
                <div className="winning-numbers-container p-5">
                  <div className="empty-state">
                    <div className="empty-icon">💫</div>
                    <h3 className="mb-3">No Favorites Yet</h3>
                    <p className="text-muted mb-4">Create your first favorite number set above!</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row g-4">
                {favorites.map((favorite) => (
                  <div key={favorite.id} className="col-md-6 col-lg-4">
                    <div className="ticket-item">
                      <div className="ticket-header-section">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <div className="d-flex align-items-center">
                            <span className="ticket-type-icon me-2">
                              {getGameIcon(favorite.type)}
                            </span>
                            <div>
                              <h6 className="mb-0 ticket-type">{favorite.name}</h6>
                              <small className="text-muted">{favorite.type}</small>
                            </div>
                          </div>
                          <div className="text-end">
                            <span className="badge bg-primary">💫 Favorite</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Numbers Display */}
                      <div className="ticket-numbers-section mb-3">
                        <p className="small text-muted mb-2">Your Lucky Numbers:</p>
                        <div className="numbers-display">
                          {favorite.numbers.map((num, idx) => (
                            <span key={idx} className="number-ball-small">
                              {num}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="ticket-details">
                        <div className="d-flex justify-content-between mb-3">
                          <span className="text-muted">Created:</span>
                          <span className="fw-bold">{new Date(favorite.created).toLocaleDateString()}</span>
                        </div>
                        
                        <div className="d-flex gap-2">
                          <button 
                            className="btn btn-success btn-sm flex-fill"
                            onClick={() => playFavorite(favorite)}
                            disabled={isLoading}
                          >
                            🎫 Play These Numbers
                          </button>
                          <button 
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => deleteFavorite(favorite.id)}
                            disabled={isLoading}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
                        onClick={() => navigate('/prevNumbers')}
                        disabled={isLoading}
                      >
                        🏆 Winning Numbers
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
            <p className="mt-3">Processing your favorite numbers...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketFavorites; 