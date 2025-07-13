import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const navigate = useNavigate();
    //sets initial val to 0
    const [mega, setMega] = useState([]);
    const [power, setPower] = useState([]);
    const [texasLotto, setTexasLotto] = useState([]);
    const [texasStep, setTexasStep] = useState([]); 
    
    const goHome = () => {
        navigate("/Home");
    };
    
    //Gets random int between two values
    const randomNumber = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max); 
        return Math.floor(Math.random() * (max - min + 1)+ min); 
    }; 
  
    const generatePowerball = () => {
      const whiteBalls = Array.from({length: 5}, () => randomNumber(1, 69)).sort((a, b) => a - b);
      const powerball = randomNumber(1, 26);
      return { type: 'Power Ball', numbers: [...whiteBalls, powerball] };
    };

    const generateMegaMillions = () => {
      const whiteBalls = Array.from({length: 5}, () => randomNumber(1, 70)).sort((a, b) => a - b);
      const megaBall = randomNumber(1, 25);
      return { type: 'Mega Millions', numbers: [...whiteBalls, megaBall] };
    };

    const generateLottoTexas = () => {
      const balls = Array.from({length: 6}, () => randomNumber(1, 54)).sort((a, b) => a - b);
      return { type: 'Lotto Texas', numbers: balls };
    };

    const generateTexasTwoStep = () => {
      const whiteBalls = Array.from({length: 4}, () => randomNumber(1, 35)).sort((a, b) => a - b);
      const bonus = randomNumber(1, 35);
      return { type: 'Texas Two Step', numbers: [...whiteBalls, bonus] };
    };

    const onButtonClick = async () => {
      const mega = generateMegaMillions();
      const power = generatePowerball();
      const texasLotto = generateLottoTexas();
      const texasStep = generateTexasTwoStep();
      setMega(mega.numbers);
      setPower(power.numbers);
      setTexasLotto(texasLotto.numbers);
      setTexasStep(texasStep.numbers);

      try {
        // MOCK: Store winning numbers in localStorage
        const winningNumbers = {
          megamillions: mega.numbers,
          powerball: power.numbers,
          lottotexas: texasLotto.numbers,
          texastwostep: texasStep.numbers
        };
        localStorage.setItem('winningNumbers', JSON.stringify(winningNumbers));
        console.log("Winning numbers stored successfully");
      } catch (error) {
        console.error("Error storing winning numbers:", error);
      }
    }; 
    
    return ( 
        <div className="admin-container">
            {/* Header */}
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container">
                    <span className="navbar-brand fw-bold">🎰 Texas Lottery Admin</span>
                    <button className="btn btn-outline-light" onClick={goHome}>
                        🏠 Home
                    </button>
                </div>
            </nav>

            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="admin-card p-5">
                            <div className="text-center mb-5">
                                <h1 className="display-4 fw-bold mb-3">
                                    🎲 Admin Control Panel
                                </h1>
                                <p className="lead">
                                    Generate and manage winning numbers for all lottery games
                                </p>
                            </div>

                            {/* Current Winning Numbers */}
                            <div className="row g-4 mb-5">
                                <div className="col-md-6">
                                    <div className="winning-numbers-container">
                                        <h3 className="text-center mb-3">🔴 Power Ball</h3>
                                        <div className="text-center">
                                            {power.length > 0 ? (
                                                <div>
                                                    {power.map((num, index) => (
                                                        <span key={index} className="number-ball me-2">
                                                            {num}
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-muted">Click generate to see numbers</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="winning-numbers-container">
                                        <h3 className="text-center mb-3">🟡 Mega Millions</h3>
                                        <div className="text-center">
                                            {mega.length > 0 ? (
                                                <div>
                                                    {mega.map((num, index) => (
                                                        <span key={index} className="number-ball me-2">
                                                            {num}
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-muted">Click generate to see numbers</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="winning-numbers-container">
                                        <h3 className="text-center mb-3">⭐ Lotto Texas</h3>
                                        <div className="text-center">
                                            {texasLotto.length > 0 ? (
                                                <div>
                                                    {texasLotto.map((num, index) => (
                                                        <span key={index} className="number-ball me-2">
                                                            {num}
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-muted">Click generate to see numbers</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="winning-numbers-container">
                                        <h3 className="text-center mb-3">🌟 Texas Two Step</h3>
                                        <div className="text-center">
                                            {texasStep.length > 0 ? (
                                                <div>
                                                    {texasStep.map((num, index) => (
                                                        <span key={index} className="number-ball me-2">
                                                            {num}
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-muted">Click generate to see numbers</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Generate Button */}
                            <div className="text-center">
                                <button 
                                    className="btn btn-primary btn-lg px-5 py-3"
                                    onClick={onButtonClick}
                                >
                                    🎯 Generate New Winning Numbers
                                </button>
                                <p className="mt-3 text-muted">
                                    This will generate new winning numbers for all lottery games
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ); 
}; 

export default Admin;