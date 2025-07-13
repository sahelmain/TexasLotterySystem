import React, { useState, useEffect } from "react"; 
import './style.css';
import { useNavigate } from "react-router-dom";

const ManageTickets = () => {
  const navigate = useNavigate();
  const [ticketName, setTicketName] = useState("")
  const [ticketNum, setTicketNum] = useState("")
  const [userTickets, setUserTickets] = useState([]);
  const [email, setEmail] = useState(() => window.sessionStorage.getItem('email'));
  
  const goHome = () => {
    navigate("/Home");
  };

  const fetchUserTickets = async () => {
    try {
      const allTickets = JSON.parse(localStorage.getItem('userTickets') || '[]');
      const userTickets = allTickets.filter(ticket => ticket.email === email);
      setUserTickets(userTickets);
    } catch (error) {
      console.error('Error fetching user tickets', error);
    }
  };

  useEffect(() => {
    fetchUserTickets();
  }, [email]);

  const purchaseTicket = async () => {
    if (!ticketName || !ticketNum || ticketNum.length !== 5 || isNaN(ticketNum)) {
      window.alert('Please enter a valid ticket name and 5-digit number.');
      return;
    }
    
    try {
      const existingTickets = JSON.parse(localStorage.getItem('userTickets') || '[]');
      const newTicket = {
        type: ticketName,
        number: parseInt(ticketNum),
        email: email,
        date: new Date().toISOString()
      };
      existingTickets.push(newTicket);
      localStorage.setItem('userTickets', JSON.stringify(existingTickets));
      
      window.alert(`Successfully added ${ticketName} ticket #${ticketNum}!`);
      setTicketName('');
      setTicketNum('');
      fetchUserTickets(); // Refresh the list
    } catch (error) {
      console.error("Error purchasing lottery ticket:", error);
    }
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

  const lotteryTypes = [
    'Power Ball',
    'Mega Millions', 
    'Lotto Texas',
    'Texas Two Step'
  ];

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
              <h1 className="display-4 fw-bold mb-3">⚙️ Manage Lottery Tickets</h1>
              <p className="lead">Add custom tickets and manage your lottery entries</p>
            </div>

            {/* Add New Ticket Form */}
            <div className="winning-numbers-container mb-5">
              <h3 className="text-center mb-4">➕ Add New Ticket</h3>
              <div className="row g-4">
                <div className="col-md-6">
                  <label className="form-label text-muted">Lottery Type</label>
                  <select 
                    className="form-control"
                    value={ticketName}
                    onChange={(e) => setTicketName(e.target.value)}
                  >
                    <option value="">Select lottery type...</option>
                    {lotteryTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {getTicketIcon(type)} {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label text-muted">Ticket Number (5 digits)</label>
                  <input 
                    type="number" 
                    className="form-control"
                    placeholder="Enter 5-digit ticket number"
                    value={ticketNum}
                    onChange={(e) => setTicketNum(e.target.value)}
                    min="10000"
                    max="99999"
                  />
                </div>
              </div>
              <div className="text-center mt-4">
                <button 
                  className="btn btn-primary btn-lg px-5"
                  onClick={purchaseTicket}
                  disabled={!ticketName || !ticketNum}
                >
                  🎫 Add Ticket
                </button>
              </div>
            </div>

            {/* Current Tickets */}
            <div className="winning-numbers-container">
              <h3 className="text-center mb-4">🎫 Your Current Tickets</h3>
              
              {userTickets.length === 0 ? (
                <div className="text-center p-4">
                  <p className="text-muted mb-0">No tickets found. Add your first ticket above!</p>
                </div>
              ) : (
                <div className="row g-4">
                  {userTickets.map((ticket, index) => (
                    <div key={index} className="col-md-6 col-lg-4">
                      <div className="ticket-item">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <div className="d-flex align-items-center">
                            <span className="me-2" style={{fontSize: '1.5rem'}}>
                              {getTicketIcon(ticket.type)}
                            </span>
                            <h6 className="mb-0">{ticket.type}</h6>
                          </div>
                          <span className="badge bg-primary">#{ticket.number}</span>
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center">
                          <small className="text-muted">
                            Added: {formatDate(ticket.date)}
                          </small>
                          <small className="text-success">✓ Active</small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Statistics */}
            {userTickets.length > 0 && (
              <div className="mt-5">
                <div className="winning-numbers-container">
                  <h4 className="text-center mb-4">📊 Ticket Statistics</h4>
                  <div className="row text-center">
                    <div className="col-md-3">
                      <h3 className="text-primary fw-bold">{userTickets.length}</h3>
                      <p className="text-muted mb-0">Total Tickets</p>
                    </div>
                    <div className="col-md-3">
                      <h3 className="text-success fw-bold">
                        {new Set(userTickets.map(ticket => ticket.type)).size}
                      </h3>
                      <p className="text-muted mb-0">Game Types</p>
                    </div>
                    <div className="col-md-3">
                      <h3 className="text-warning fw-bold">
                        {userTickets.filter(ticket => ticket.type === 'Power Ball').length}
                      </h3>
                      <p className="text-muted mb-0">Power Ball</p>
                    </div>
                    <div className="col-md-3">
                      <h3 className="text-info fw-bold">
                        {userTickets.filter(ticket => ticket.type === 'Mega Millions').length}
                      </h3>
                      <p className="text-muted mb-0">Mega Millions</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="mt-5">
              <div className="winning-numbers-container">
                <h4 className="text-center mb-4">ℹ️ How to Manage Tickets</h4>
                <div className="row text-center">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <span style={{fontSize: '2rem'}}>1️⃣</span>
                    </div>
                    <h6>Select Type</h6>
                    <small className="text-muted">
                      Choose from Power Ball, Mega Millions, Lotto Texas, or Texas Two Step
                    </small>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <span style={{fontSize: '2rem'}}>2️⃣</span>
                    </div>
                    <h6>Enter Number</h6>
                    <small className="text-muted">
                      Input a 5-digit ticket number (10000-99999)
                    </small>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <span style={{fontSize: '2rem'}}>3️⃣</span>
                    </div>
                    <h6>Add Ticket</h6>
                    <small className="text-muted">
                      Click add to save your custom ticket
                    </small>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <span style={{fontSize: '2rem'}}>4️⃣</span>
                    </div>
                    <h6>Check Results</h6>
                    <small className="text-muted">
                      View your tickets in Order History to see results
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

export default ManageTickets;