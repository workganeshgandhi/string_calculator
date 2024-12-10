import React, { useState } from 'react';

const StringCalculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(0);

  const calculate = () => {
    if (input === '') {
      setResult(0);
    } else {
      const numbers = input.split(',').map(Number);
      const sum = numbers.reduce((acc, num) => acc + num, 0);
      setResult(sum);
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
      <p>Result: {result}</p>
    </div>
  );
};

export default StringCalculator;
