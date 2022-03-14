// App.test.js
import { render, screen } from '@testing-library/react';
//import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import {useData, useUserState, useGoogleUserState} from './utilities/firebase'
import App from './App';
import data from './data.json';
import Welcome from './components/Welcome';
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

const fakePatient = {
    "email": "Fake-PatientData@email.com",
    "name": "Fake Patient",
    "startDate": 1646583369397,
    "surgeryType": "acl",
    "surveyResults": [
        {
            "concerns": "No",
            "pain_rating": 1,
            "rehab_successful": "Yes"
        }
    ]
};

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

test('user logs in', () => {
    const user = fakePatient;
    useGoogleUserState.mockReturnValue([user]);
    useUserState.mockReturnValue([user[0]]);
    useData.mockReturnValue([data])
    render(<App />);
    const linkElement = screen.queryByText(/SIGN OUT/i);
    expect(linkElement).toBeInTheDocument();
});

test('user data there', () => {
    const user = fakePatient;
    user["name"] = "David Hello";
    useGoogleUserState.mockReturnValue([user]);
    useUserState.mockReturnValue([user[0]]);
    useData.mockReturnValue([data])
    render(<Welcome phase={null} username={user['name']} surgeryType={user['surgeryType']} 
                    firebaseData={data} phaseEndDay={{}} isMobile={false} daysDict={{}}/>
                    );

    const linkElement = screen.getByText(/Welcome back David Hello!/i);
    expect(linkElement).toBeInTheDocument();
});

//Welcome = ({ phase, username, surgeryType, firebaseData, currentDay, daysDict, phaseEndDay, isMobile }) 