import User from './components/User';
import './App.css';
import useStore from './Store';
import React, { useEffect, useState } from 'react';
import { useUserState } from './utilities/firebase';
import calculateDay from './utilities/calculateday';

function App() {
  const userType = useStore(state => state.userType);
  const setUserType = useStore(state => state.setUserType);

  const user = useUserState()[0];
  const [name, setName] = useState("");
  const [surgeryType, setSurgeryType] = useState("");
  const [currentDay, setCurrentDay] = useState();

  const initPatient = (user) => {
    setName(user.name);
    setSurgeryType(user.surgeryType);
    setCurrentDay(calculateDay(user.startDate));
  }

  const defaultUser = () => {
    setName("Edward");
    setSurgeryType("acl");
  }

  useEffect(() => {
    if (user === undefined) return;
    // Object.entries(user).map((entry) => {
    //   entry[1].email === user.email ? initUser(entry[1]) : defaultUser();
    // })
    setUserType(user.userType)
    if (user.userType === "patient") {
      initPatient(user)
    }
  }, [user]);

  function getUserType() {
    switch (userType) {
      case "patient":
        return (
          <div>
            < User name={name} surgeryType={surgeryType} currentDay={currentDay} />
          </div>
        )
      case "doctor":
        return <></>
      default:
        return <p>Sorry, there's been an error.</p>
    }
  }

  return (
    <div className="App">

      <div className="app-header">
        <img className="logo" src="bannerlogo.jpg" />
        <h1>Help Me Heal</h1>
      </div>

      <div>
        {getUserType()}
      </div>
    </div>
  );
}

export default App;
