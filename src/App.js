import { useState } from 'react';
import './App.css';
import Button from './components/Button';
import Input from './components/Input';

const App = () => {
  const [text, setText] = useState(""); // Expression entered by the user
  const [result, setResult] = useState(""); // Result of the calculation

  const addToText = (val) => {
    setText((prevText) => prevText + val); // Append the clicked value to the expression
  };

  const clearButton = () => {
    setText(""); // Clear the expression
    setResult(""); // Clear the result
  };

  // Custom function to calculate the result without using eval()
  const calculate = () => {
    try {
      // Step 1: Handle multiplication and division first
      let tempText = text.replace(/\d+(\.\d+)?([*/])\d+(\.\d+)?/g, (match) => {
        let [num1, operator, num2] = match.split(/([*/])/);
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        if (operator === "*") return num1 * num2;
        if (operator === "/") return num1 / num2;
        return match;
      });

      // Step 2: Handle addition and subtraction
      let result = 0;
      const tokens = tempText.split(/([+-])/); // Split by + or -
      let currentOp = "+";

      tokens.forEach((token) => {
        if (token === "+" || token === "-") {
          currentOp = token;
        } else {
          const value = parseFloat(token);
          if (currentOp === "+") {
            result += value;
          } else if (currentOp === "-") {
            result -= value;
            
          }
        }
      });

      setResult(result); // Set the result in the state
    } catch (error) {
      setResult("Error"); // If there's an error (e.g., invalid expression), show "Error"
    }
  };

  const buttonColor = "#f2a33c";

  return (
    <div className="App">
      <div className="calc-wrapper">
        <Input text={text} result={result} />
        <span className='result'></span>
        <div className="row">
          <Button symbol="7" handleClick={addToText} />
          <Button symbol="8" handleClick={addToText} />
          <Button symbol="9" handleClick={addToText} />
          <Button symbol="AC" color={buttonColor} handleClick={clearButton} />
        </div>
        <div className="row">
          <Button symbol="4" handleClick={addToText} />
          <Button symbol="5" handleClick={addToText} />
          <Button symbol="6" handleClick={addToText} />
          <Button symbol="*" color={buttonColor} handleClick={addToText} />
        </div>
        <div className="row">
          <Button symbol="1" handleClick={addToText} />
          <Button symbol="2" handleClick={addToText} />
          <Button symbol="3" handleClick={addToText} />
          <Button symbol="+" color={buttonColor} handleClick={addToText} />
        </div>
        <div className="row">
          <Button symbol="0" handleClick={addToText} />
          <Button symbol="." handleClick={addToText} />
          <Button symbol="/" color={buttonColor} handleClick={addToText} />
          <Button symbol="-" color={buttonColor} handleClick={addToText} />
        </div>
        <Button symbol="=" handleClick={calculate} />
      </div>
    </div>
  );
};

export default App;
