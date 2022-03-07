// App.test.js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

test('renders Help Me Heal link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Help Me Heal/i);
  expect(linkElement).toBeInTheDocument();
});