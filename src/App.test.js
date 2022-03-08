// App.test.js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {useData, useUserState} from './utilities/firebase'
import App from './App';

//jest.mock('./utilities/firebase');

it('shows Sign In if not logged in', () => {
  render(<App />);
  const button = screen.queryByText(/SIGN IN/i);
  expect(button).toBeInTheDocument();
});

test('renders Help Me Heal link', () => {
    render(<App />);
    const linkElement = screen.getByText(/Help Me Heal/i);
    expect(linkElement).toBeInTheDocument();
});

test('fails if no logged in user', () => {
    render(<App />);
    const linkElement = screen.queryByText(/SIGN OUT/i);
    expect(linkElement).not.toBeInTheDocument();
});

test('mock user', () => {
    render(<App />);
    const linkElement = screen.queryByText(/SIGN OUT/i);
    expect(linkElement).not.toBeInTheDocument();
});