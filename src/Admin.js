import React, { useState } from "react"; 

const Admin = () => {
    //sets initial val to 0
    const [mega, setMega] = useState(0);
    const [power, setPower] = useState(0);
    const [texasLotto, setTexasLotto] = useState(0);
    const [texasStep, setTexasStep] = useState(0); 
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
        <div className="wrapper"> 
            <div className="num">Winning numbers for Mega Millions: {mega.join(', ')}</div>
            <div className="num">Winning numbers for Power Ball: {power.join(', ')}</div>
            <div className="num">Winning numbers for Lotto Texas: {texasLotto.join(', ')}</div>
            <div className="num">Winning numbers for Texas Two Step: {texasStep.join(', ')}</div>
            <button onClick={onButtonClick}>
              Generate and Store New Winning Numbers
            </button>
        </div> 
    ); 
}; 

export default Admin;