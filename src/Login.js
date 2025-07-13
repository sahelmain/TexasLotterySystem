import React, { useState } from "react";
import './Login.css'
import { useNavigate } from "react-router-dom";
// Icons removed for simplicity - using text placeholders instead

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")

    const [action,setAction] = useState("Login")
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const navigate = useNavigate();
    const [admin, setAdmin] =useState("user")
    

    
    const signUp = () => {
        // ensure all fields are filled
        if (""===email || ""===password || ""===firstName || ""===lastName || ""===address) {
            window.alert("Please fill in all fields");
            return;
        }
    
        // Check if the email is valid (you can add more robust email validation)
        if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Invalid email");
            return;
        }
    
        // MOCK: Simulate successful signup
        window.alert("Signup successful! You can now log in.");
        setAction("Login");
    };

    const onButtonClick = () => {
        // MOCK: Simple validation for testing
        if (""===email || ""===password) {
            window.alert("Please enter both email and password");
            return;
        }

        // Check if the email is valid
        if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Invalid email");
            return;
        }

        // MOCK: Store email for session
        window.sessionStorage.setItem('email', email);
        
        // MOCK: Check if admin (for testing, admin@test.com is admin)
        if (email === "admin@test.com") {
            navigate("../Admin");
        } else {
            navigate("../Home", { state: email });
        }
    }
        

    //Check if the given email ID already exists in database
    const checkAccountExists = (callback) => {
        // MOCK: Always return false for testing
        callback(false);
    }

    return (
        <div className="login-page">
            <div className="container-fluid vh-100">
                <div className="row h-100">
                    {/* Left Side - Welcome */}
                    <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center welcome-side">
                        <div className="text-center text-white">
                            <h1 className="display-3 fw-bold mb-4">🎰</h1>
                            <h2 className="fw-bold mb-3">Texas Lottery System</h2>
                            <p className="lead">Your gateway to exciting lottery games and winning opportunities</p>
                            <div className="mt-4">
                                <div className="d-flex justify-content-center gap-3">
                                    <span className="badge bg-light text-dark p-2">🎫 4 Games</span>
                                    <span className="badge bg-light text-dark p-2">💰 Big Prizes</span>
                                    <span className="badge bg-light text-dark p-2">🏆 Win Daily</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="col-lg-6 d-flex align-items-center justify-content-center">
                        <div className="login-container">
                            <div className="text-center mb-4">
                                <h2 className="fw-bold text-primary">{action}</h2>
                                <p className="text-muted">
                                    {action === "Login" ? "Welcome back! Please sign in to your account." : "Create your account to get started."}
                                </p>
                            </div>

                            <form className="login-form">
                                <div className="mb-3">
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0">📧</span>
                                        <input
                                            type="email"
                                            className="form-control border-start-0"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={ev => setEmail(ev.target.value)}
                                        />
                                    </div>
                                    {emailError && <small className="text-danger">{emailError}</small>}
                                </div>

                                {action === "Sign Up" && (
                                    <>
                                        <div className="mb-3">
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0">👤</span>
                                                <input
                                                    type="text"
                                                    className="form-control border-start-0"
                                                    placeholder="First Name"
                                                    onChange={(event) => setFirstName(event.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0">👤</span>
                                                <input
                                                    type="text"
                                                    className="form-control border-start-0"
                                                    placeholder="Last Name"
                                                    onChange={(event) => setLastName(event.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0">🏠</span>
                                                <input
                                                    type="text"
                                                    className="form-control border-start-0"
                                                    placeholder="Address"
                                                    onChange={(event) => setAddress(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="mb-4">
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0">🔒</span>
                                        <input
                                            type="password"
                                            className="form-control border-start-0"
                                            placeholder="Password"
                                            value={password}
                                            onChange={ev => setPassword(ev.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="d-grid gap-2 mb-3">
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-lg"
                                        onClick={() => {
                                            if(action === "Login") {
                                                onButtonClick();
                                            } else {
                                                signUp();
                                            }
                                        }}
                                    >
                                        {action === "Login" ? "Sign In" : "Create Account"}
                                    </button>
                                </div>

                                <div className="text-center">
                                    <p className="mb-0">
                                        {action === "Login" ? "Don't have an account? " : "Already have an account? "}
                                        <button
                                            type="button"
                                            className="btn btn-link p-0"
                                            onClick={() => setAction(action === "Login" ? "Sign Up" : "Login")}
                                        >
                                            {action === "Login" ? "Sign Up" : "Sign In"}
                                        </button>
                                    </p>
                                </div>

                                {action === "Login" && (
                                    <div className="mt-4 p-3 bg-light rounded">
                                        <small className="text-muted">
                                            <strong>Demo Credentials:</strong><br/>
                                            Regular User: any email + any password<br/>
                                            Admin Access: admin@test.com + any password
                                        </small>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login