import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StringCalculator from './StringCalculator';

test('handles an empty string', () => {
  render(<StringCalculator />);
  fireEvent.change(screen.getByLabelText(/input/i), { target: { value: '' } });
  fireEvent.click(screen.getByText(/calculate/i));
  expect(screen.getByText(/result:/i)).toHaveTextContent('Result: 0');
});

test('handles a single number', () => {
  render(<StringCalculator />);
  fireEvent.change(screen.getByLabelText(/input/i), { target: { value: '5' } });
  fireEvent.click(screen.getByText(/calculate/i));
  expect(screen.getByText(/result:/i)).toHaveTextContent('Result: 5');
});

test('handles two numbers', () => {
  render(<StringCalculator />);
  fireEvent.change(screen.getByLabelText(/input/i), { target: { value: '1,2' } });
  fireEvent.click(screen.getByText(/calculate/i));
  expect(screen.getByText(/result:/i)).toHaveTextContent('Result: 3');
});
