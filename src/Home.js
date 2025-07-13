import React, { useEffect, useState  } from 'react';
import './Home.css'
import { useNavigate, useLocation} from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  //gets email that was passed in previous page
  const [email,setEmail] = useState(() => {return window.sessionStorage.getItem('email')}); 
  const browseTickets = () => {
    //window.alert(location.email)
    console.log(email)
    navigate("/browse_lottery_tickets", { state: email });
  }
  const manageTickets = () => {
    navigate("/manageTickets", { state: email });
  }
  const orderHistory = () => {
    navigate("/orderHistory", { state: email });
  }
  const prevWins = () => {
    navigate("/prevNumbers", { state: email });
  }
  const logOut= () => {
    navigate("/");
  }

  return (
    <div className="home-container">
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <span className="navbar-brand fw-bold">🎰 Texas Lottery System</span>
          <div className="navbar-nav ms-auto">
            <span className="navbar-text me-3">Welcome, {email}</span>
            <button className="btn btn-outline-light btn-sm" onClick={logOut}>
              Logout
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
            </div>

            {/* Feature Cards */}
            <div className="row g-4">
              <div className="col-md-6 col-lg-3">
                <div className="card h-100 shadow-sm border-0 feature-card" onClick={browseTickets}>
                  <div className="card-body text-center p-4">
                    <div className="feature-icon mb-3">🎫</div>
                    <h5 className="card-title fw-bold">Browse Tickets</h5>
                    <p className="card-text text-muted">
                      Explore and purchase lottery tickets from various games
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="card h-100 shadow-sm border-0 feature-card" onClick={manageTickets}>
                  <div className="card-body text-center p-4">
                    <div className="feature-icon mb-3">⚙️</div>
                    <h5 className="card-title fw-bold">Manage Tickets</h5>
                    <p className="card-text text-muted">
                      Add and organize your custom lottery tickets
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="card h-100 shadow-sm border-0 feature-card" onClick={orderHistory}>
                  <div className="card-body text-center p-4">
                    <div className="feature-icon mb-3">📋</div>
                    <h5 className="card-title fw-bold">Order History</h5>
                    <p className="card-text text-muted">
                      View your ticket purchases and check winning status
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="card h-100 shadow-sm border-0 feature-card" onClick={prevWins}>
                  <div className="card-body text-center p-4">
                    <div className="feature-icon mb-3">🏆</div>
                    <h5 className="card-title fw-bold">Winning Numbers</h5>
                    <p className="card-text text-muted">
                      Check previous winning numbers and results
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="row mt-5">
              <div className="col-12">
                <div className="card bg-light border-0">
                  <div className="card-body">
                    <div className="row text-center">
                      <div className="col-md-3">
                        <h3 className="text-primary fw-bold">4</h3>
                        <p className="text-muted mb-0">Lottery Games</p>
                      </div>
                      <div className="col-md-3">
                        <h3 className="text-success fw-bold">$2M+</h3>
                        <p className="text-muted mb-0">Jackpot Prize</p>
                      </div>
                      <div className="col-md-3">
                        <h3 className="text-warning fw-bold">3x</h3>
                        <p className="text-muted mb-0">Weekly Draws</p>
                      </div>
                      <div className="col-md-3">
                        <h3 className="text-info fw-bold">24/7</h3>
                        <p className="text-muted mb-0">Available</p>
                      </div>
                    </div>
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

export default Home;