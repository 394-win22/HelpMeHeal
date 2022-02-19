import User from './User';
import '../App.css';
import useStore from '../Store';
import React, { useEffect, useState } from 'react';
import { useUserState, useGoogleUserState } from '../utilities/firebase';
import calculateDay from '../utilities/calculateday';
import { SignInOut } from './SignInWithGoogle';
import RegisterPage from './Register';
import Doctor from '../doctor_components/Doctor';

const GetUser = ({ googleUser }) => {

  const userType = useStore(state => state.userType);
  const setUserType = useStore(state => state.setUserType);
  const [name, setName] = useState("");
  const [surgeryType, setSurgeryType] = useState("");
  const [currentDay, setCurrentDay] = useState();
  const user = useUserState(googleUser?.uid)[0];

  const initPatient = () => {
    setName(user.name.toUpperCase());
    setSurgeryType(user.surgeryType);
    setCurrentDay(calculateDay(user.startDate));
  }

  useEffect(() => {
    if (user === undefined) return;

    if (user) {
      setUserType(user.userType)
      if (user.userType === "patient") {
        initPatient(user)
      }
    }

  }, [user]);

  function getUserType() {
    switch (userType) {
      case "patient":
        return (
          <div>
            <User name={name} surgeryType={surgeryType} currentDay={currentDay} user={user} />
          </div>
        )
      case "doctor":
        return <Doctor />
      default:
        return <p>Sorry, there's been an error.</p>
    }
  }

  return (
    <div className="App">
      <div>
        {user ?
          <div>
            <div className="app-nav">
              <SignInOut ></SignInOut>
            </div>
            {getUserType()}
          </div> :
          <div>
            <div className="app-nav">
              <SignInOut></SignInOut>
            </div>
            <RegisterPage googleUser={googleUser} />
          </div>
        }
      </div>
    </div>
  );

}
export default GetUser;