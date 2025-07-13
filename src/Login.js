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

   
    

    return <div className={"container"}>
        <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>
        
        <div className="inputs">
        <div className="input">
            <span>📧</span>
                <input
                    value={email}
                    placeholder="Enter your email here"
                    onChange={ev => setEmail(ev.target.value)}
                    />
                <label className="errorLabel">{emailError}</label>
            </div>
            </div>
        {action==="Login"?<div></div>:<div className="input">
                <span>👤</span>
                <input type="text" onChange={(event) => setFirstName(event.target.value)}placeholder='Enter First Name '/>
                
            </div>
            }
        {action==="Login"?<div></div>:<div className="input">
                <span>👤</span>
                <input type="text" onChange={(event) => setLastName(event.target.value)}placeholder='Enter Last Name '/>
                
            </div>
            }
        {action==="Login"?<div></div>:<div className="input">
                <span>🏠</span>
                <input type="text" onChange={(event) => setAddress(event.target.value)}placeholder='Enter Address '/>
                
            </div>
            }

        <div className="input">
        <span>🔒</span>
            <input
                value={password}
                placeholder="Enter password"
                onChange={ev => setPassword(ev.target.value)}
                />
        </div>



        <div className="submit-container">
            <div className="submit"
                onClick={()=>{setAction("Sign Up")}}>Sign Up</div>

            <div className="submit"
                onClick={()=>{setAction("Login")}}>Login</div>


        </div>
        <div className="submit-login">
        <div className="submit"
                onClick={()=> {
                    if(action==="Login")
                    {
                        onButtonClick();
                    }
                    else{
                        signUp();
                    }
                }} >Submit</div>
        </div>
        </div>


        
        
        
    
}

export default Login