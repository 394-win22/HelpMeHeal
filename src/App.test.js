// App.test.js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {useData, useUserState, useGoogleUserState} from './utilities/firebase'
import App from './App';
import data from './data.json';
//import { registerables } from 'chart.js';
//import PatientGraphs from './components/PatientGraphs'
jest.mock('./utilities/firebase');
jest.mock('chart.js', () => ({
    register: ([]) => null
}));
jest.mock('./components/PatientGraphs', () => ({
    Chart: ([]) => null,
    Doughnut: () => null
}));

jest.mock('./doctor_components/PatientDetail', () => ({
    register: ([]) => null
}));


it('shows Sign In if not logged in', () => {
    useGoogleUserState.mockReturnValue([null]);
    useUserState.mockReturnValue([null]);
    render(<App />);
    const button = screen.queryByText(/SIGN IN/i);
    expect(button).toBeInTheDocument();
});

test('renders Help Me Heal link', () => {
    useGoogleUserState.mockReturnValue([null]);
    useUserState.mockReturnValue([null]);
    render(<App />);
    const linkElement = screen.getByText(/Help Me Heal/i);
    expect(linkElement).toBeInTheDocument();
});

test('fails if no logged in user', () => {
    useGoogleUserState.mockReturnValue([null]);
    useUserState.mockReturnValue([null]);
    render(<App />);
    const linkElement = screen.queryByText(/SIGN OUT/i);
    expect(linkElement).not.toBeInTheDocument();
});

test('mock user', () => {
    useGoogleUserState.mockReturnValue([data['user']['D0UBsRxynwbeW6s5Jb1PxWQJZIo1']]);
    useUserState.mockReturnValue([data['user']['D0UBsRxynwbeW6s5Jb1PxWQJZIo1'][0]]);
    // console.log(data['surgery']['acl']['phaseEndDay'])
    useData.mockReturnValue([data])
    render(<App />);
    const linkElement = screen.queryByText(/SIGN OUT/i);
    expect(linkElement).toBeInTheDocument();
});