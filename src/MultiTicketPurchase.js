import React, { useState, useEffect } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

const MultiTicketPurchase = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(() => window.sessionStorage.getItem('email'));
  const [selectedGame, setSelectedGame] = useState('Power Ball');
  const [quantity, setQuantity] = useState(1);
  const [quickPickMode, setQuickPickMode] = useState(true);
  const [customNumbers, setCustomNumbers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState('');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(''), 4000);
  };

  const goHome = () => {
    setIsLoading(true);
    showNotification("Returning to home...", "info");
    setTimeout(() => {
      navigate('/Home');
      setIsLoading(false);
    }, 500);
  };

  const gameInfo = {
    "Power Ball": {
      icon: "🔴",
      price: 2.00,
      description: "5 white balls (1-69) + 1 Powerball (1-26)",
      maxNumbers: 6,
      ranges: [69, 69, 69, 69, 69, 26]
    },
    "Mega Millions": {
      icon: "🟡",
      price: 2.00,
      description: "5 white balls (1-70) + 1 Mega Ball (1-25)",
      maxNumbers: 6,
      ranges: [70, 70, 70, 70, 70, 25]
    },
    "Lotto Texas": {
      icon: "⭐",
      price: 1.00,
      description: "6 balls from 1 to 54",
      maxNumbers: 6,
      ranges: [54, 54, 54, 54, 54, 54]
    },
    "Texas Two Step": {
      icon: "🌟",
      price: 1.50,
      description: "4 white balls (1-35) + 1 bonus (1-35)",
      maxNumbers: 5,
      ranges: [35, 35, 35, 35, 35]
    }
  };

  const generateQuickPick = (gameType) => {
    const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    let numbers = [];
    
    switch(gameType) {
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

  const addToCart = () => {
    if (quantity < 1 || quantity > 50) {
      showNotification("Quantity must be between 1 and 50", "error");
      return;
    }

    const tickets = [];
    for (let i = 0; i < quantity; i++) {
      const numbers = quickPickMode ? generateQuickPick(selectedGame) : [...customNumbers];
      tickets.push({
        id: Date.now() + i,
        game: selectedGame,
        numbers: numbers,
        price: gameInfo[selectedGame].price,
        type: quickPickMode ? 'Quick Pick' : 'Custom'
      });
    }

    setCart([...cart, ...tickets]);
    showNotification(`Added ${quantity} ${selectedGame} ticket(s) to cart`, "success");
    setQuantity(1);
    setCustomNumbers([]);
  };

  const removeFromCart = (ticketId) => {
    setCart(cart.filter(ticket => ticket.id !== ticketId));
    showNotification("Ticket removed from cart", "info");
  };

  const clearCart = () => {
    setCart([]);
    showNotification("Cart cleared", "info");
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((sum, ticket) => sum + ticket.price, 0);
    const discount = getDiscount(cart.length);
    return {
      subtotal: subtotal,
      discount: discount,
      total: subtotal - discount
    };
  };

  const getDiscount = (ticketCount) => {
    if (ticketCount >= 20) return ticketCount * 0.20; // 20 cents per ticket
    if (ticketCount >= 10) return ticketCount * 0.10; // 10 cents per ticket
    if (ticketCount >= 5) return ticketCount * 0.05; // 5 cents per ticket
    return 0;
  };

  const purchaseAllTickets = () => {
    if (cart.length === 0) {
      showNotification("Your cart is empty", "error");
      return;
    }

    setIsLoading(true);
    showNotification(`Processing ${cart.length} ticket(s)...`, "info");

    setTimeout(() => {
      const existingTickets = JSON.parse(localStorage.getItem('userTickets') || '[]');
      
      cart.forEach(cartTicket => {
        const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const ticketId = randomNumber(100000, 999999);
        
        const newTicket = {
          type: cartTicket.game,
          number: ticketId,
          email: email,
          date: new Date().toISOString(),
          numbers: cartTicket.numbers,
          isMultiPurchase: true,
          purchaseType: cartTicket.type
        };
        existingTickets.push(newTicket);
      });

      localStorage.setItem('userTickets', JSON.stringify(existingTickets));
      
      const total = calculateTotal();
      showNotification(`Successfully purchased ${cart.length} tickets for $${total.total.toFixed(2)}!`, "success");
      setCart([]);
      setIsLoading(false);
    }, 2000);
  };

  const updateCustomNumber = (index, value) => {
    const newNumbers = [...customNumbers];
    newNumbers[index] = parseInt(value) || 0;
    setCustomNumbers(newNumbers);
  };

  const initializeCustomNumbers = (gameType) => {
    const maxNumbers = gameInfo[gameType].maxNumbers;
    setCustomNumbers(new Array(maxNumbers).fill(0));
  };

  useEffect(() => {
    if (!quickPickMode) {
      initializeCustomNumbers(selectedGame);
    }
  }, [selectedGame, quickPickMode]);

  const pricing = calculateTotal();

  return (
    <div className="page-container">
      {/* Notification Banner */}
      {notification && (
        <div className={`notification-banner ${notification.type}`}>
          <div className="notification-content">
            <span className="notification-icon">
              {notification.type === 'success' ? '✅' : 
               notification.type === 'error' ? '❌' : '🛒'}
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
            <span className="navbar-text me-3">Multi-Ticket Purchase</span>
            <button 
              className="btn btn-outline-light me-2" 
              onClick={() => setShowCart(!showCart)}
              disabled={isLoading}
            >
              🛒 Cart ({cart.length})
            </button>
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
        <div className="row">
          <div className="col-md-8">
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold mb-3">🛒 Multi-Ticket Purchase</h1>
              <p className="lead">Buy multiple tickets at once with bulk discounts</p>
            </div>

            {/* Game Selection */}
            <div className="winning-numbers-container mb-4">
              <h4 className="text-center mb-4">🎮 Select Game</h4>
              <div className="row g-3">
                {Object.entries(gameInfo).map(([game, info]) => (
                  <div key={game} className="col-md-6 col-lg-3">
                    <div 
                      className={`card lottery-card ${selectedGame === game ? 'border-primary' : ''}`}
                      onClick={() => setSelectedGame(game)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="card-body text-center p-3">
                        <div style={{ fontSize: '2rem' }}>{info.icon}</div>
                        <h6 className="mt-2 mb-1">{game}</h6>
                        <small className="text-muted">${info.price.toFixed(2)}</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Purchase Options */}
            <div className="winning-numbers-container mb-4">
              <h4 className="text-center mb-4">⚙️ Purchase Options</h4>
              
              {/* Quick Pick vs Custom */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="form-check">
                    <input 
                      className="form-check-input" 
                      type="radio" 
                      name="pickMode" 
                      id="quickPick"
                      checked={quickPickMode}
                      onChange={() => setQuickPickMode(true)}
                    />
                    <label className="form-check-label" htmlFor="quickPick">
                      <strong>🎲 Quick Pick</strong> - Random numbers
                    </label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-check">
                    <input 
                      className="form-check-input" 
                      type="radio" 
                      name="pickMode" 
                      id="customPick"
                      checked={!quickPickMode}
                      onChange={() => setQuickPickMode(false)}
                    />
                    <label className="form-check-label" htmlFor="customPick">
                      <strong>✏️ Custom Numbers</strong> - Choose your own
                    </label>
                  </div>
                </div>
              </div>

              {/* Custom Numbers Input */}
              {!quickPickMode && (
                <div className="mb-4">
                  <label className="form-label">Choose Your Numbers:</label>
                  <div className="row g-2">
                    {customNumbers.map((number, index) => (
                      <div key={index} className="col-2">
                        <input 
                          type="number" 
                          className="form-control text-center"
                          placeholder={`1-${gameInfo[selectedGame].ranges[index]}`}
                          min="1"
                          max={gameInfo[selectedGame].ranges[index]}
                          value={number || ''}
                          onChange={(e) => updateCustomNumber(index, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                  <small className="text-muted">{gameInfo[selectedGame].description}</small>
                </div>
              )}

              {/* Quantity */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <label className="form-label">Quantity (1-50):</label>
                  <input 
                    type="number" 
                    className="form-control"
                    min="1"
                    max="50"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  />
                </div>
                <div className="col-md-6 d-flex align-items-end">
                  <button 
                    className="btn btn-primary btn-lg w-100"
                    onClick={addToCart}
                    disabled={isLoading}
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Bulk Discount Info */}
            <div className="winning-numbers-container">
              <h5 className="text-center mb-3">💰 Bulk Discount Rates</h5>
              <div className="row text-center">
                <div className="col-md-3">
                  <div className="stats-item">
                    <h6 className="text-muted">5+ Tickets</h6>
                    <p className="text-success fw-bold">5¢ off each</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="stats-item">
                    <h6 className="text-muted">10+ Tickets</h6>
                    <p className="text-success fw-bold">10¢ off each</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="stats-item">
                    <h6 className="text-muted">20+ Tickets</h6>
                    <p className="text-success fw-bold">20¢ off each</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="stats-item">
                    <h6 className="text-muted">Max Purchase</h6>
                    <p className="text-info fw-bold">50 tickets</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shopping Cart */}
          <div className="col-md-4">
            <div className="winning-numbers-container sticky-top">
              <h4 className="text-center mb-4">🛒 Shopping Cart</h4>
              
              {cart.length === 0 ? (
                <div className="text-center">
                  <div className="empty-icon">🛒</div>
                  <p className="text-muted">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="cart-items mb-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {cart.map((ticket) => (
                      <div key={ticket.id} className="d-flex justify-content-between align-items-center mb-2 p-2 border rounded">
                        <div className="flex-grow-1">
                          <small className="fw-bold">{gameInfo[ticket.game].icon} {ticket.game}</small>
                          <div className="d-flex gap-1 mt-1">
                            {ticket.numbers.slice(0, 3).map((num, idx) => (
                              <span key={idx} className="badge bg-primary">{num}</span>
                            ))}
                            {ticket.numbers.length > 3 && <span className="badge bg-secondary">+{ticket.numbers.length - 3}</span>}
                          </div>
                        </div>
                        <div className="text-end">
                          <div className="fw-bold">${ticket.price.toFixed(2)}</div>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeFromCart(ticket.id)}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Summary */}
                  <div className="border-top pt-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Subtotal ({cart.length} tickets):</span>
                      <span>${pricing.subtotal.toFixed(2)}</span>
                    </div>
                    {pricing.discount > 0 && (
                      <div className="d-flex justify-content-between mb-2 text-success">
                        <span>Bulk Discount:</span>
                        <span>-${pricing.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="d-flex justify-content-between mb-3 fw-bold border-top pt-2">
                      <span>Total:</span>
                      <span>${pricing.total.toFixed(2)}</span>
                    </div>

                    <div className="d-grid gap-2">
                      <button 
                        className="btn btn-success btn-lg"
                        onClick={purchaseAllTickets}
                        disabled={isLoading || cart.length === 0}
                      >
                        {isLoading ? '⏳ Processing...' : '💳 Purchase All'}
                      </button>
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={clearCart}
                        disabled={isLoading || cart.length === 0}
                      >
                        🗑️ Clear Cart
                      </button>
                    </div>
                  </div>
                </>
              )}
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
            <p className="mt-3">Processing your purchase...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiTicketPurchase; 