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

test('throws an error for a single negative number', () => {
  render(<StringCalculator />);
  fireEvent.change(screen.getByLabelText(/input/i), { target: { value: '1,-2,3' } });
  fireEvent.click(screen.getByText(/calculate/i));
  expect(screen.getByText(/negative numbers not allowed -2/i)).toBeInTheDocument();
});

test('throws an error for multiple negative numbers', () => {
  render(<StringCalculator />);
  fireEvent.change(screen.getByLabelText(/input/i), { target: { value: '1,-2,3,-4' } });
  fireEvent.click(screen.getByText(/calculate/i));
  expect(screen.getByText(/negative numbers not allowed -2, -4/i)).toBeInTheDocument();
});

test('handles new lines as delimiters', () => {
  render(<StringCalculator />);
  fireEvent.change(screen.getByLabelText(/input/i), { target: { value: '1\n2,3' } });
  fireEvent.click(screen.getByText(/calculate/i));
  expect(screen.getByText(/result:/i)).toHaveTextContent('Result: 6');
});

test('supports custom delimiters', () => {
  render(<StringCalculator />);
  fireEvent.change(screen.getByLabelText(/input/i), { target: { value: '//;\n1;2' } });
  fireEvent.click(screen.getByText(/calculate/i));
  expect(screen.getByText(/result:/i)).toHaveTextContent('Result: 3');
});
