import React, { useState } from 'react';

const StringCalculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(0);
  const [error, setError] = useState('');

  const calculate = () => {
    try {
      setError('');
      if (input === '') {
        setResult(0);
      } else {
        let numbersString = input;
        let delimiter = /[,\n]/; // Default delimiter is comma or newline

        // Check for custom delimiter
        if (numbersString.startsWith('//')) {
          const delimiterEndIndex = numbersString.indexOf('\n');
          delimiter = new RegExp(numbersString.substring(2, delimiterEndIndex));
          numbersString = numbersString.substring(delimiterEndIndex + 1);
        }
        
        // Split the numbers string by the delimiter
        const numbers = numbersString.split(delimiter).map(Number);
        const negativeNumbers = numbers.filter(num => num < 0);
        
        if (negativeNumbers.length > 0) {
          throw new Error(`negative numbers not allowed ${negativeNumbers.join(', ')}`);
        }

        const sum = numbers.reduce((acc, num) => acc + num, 0);
        setResult(sum);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>String Calculator</h1>
      <input 
        type="text" 
        aria-label="input" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
      />
      <button onClick={calculate}>Calculate</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Result: {result}</p>
    </div>
  );
};

export default StringCalculator;
