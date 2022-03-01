import User from './User';
import '../App.css';
import React, { useEffect, useState } from 'react';
import { useUserState, setData } from '../utilities/firebase';
import calculateDay from '../utilities/calculateday';
import calculateFirstLogin from '../utilities/calculateFirstLogin';
import { SignInOut } from './SignInWithGoogle';
import RegisterPage from './Register';
import Doctor from '../doctor_components/Doctor';

const GetUser = ({ googleUser, isMobile }) => {

  const [name, setName] = useState("");
  const [surgeryType, setSurgeryType] = useState("");
  const [currentDay, setCurrentDay] = useState();
  const user = useUserState(googleUser?.uid)[0];
  

  useEffect(() => {
    if (user === undefined) return;

    const initPatient = () => {
      setName(user.name.toUpperCase());
      setSurgeryType(user.surgeryType);
      setCurrentDay(calculateDay(user.startDate));
    }

    const initDoctor = () => {
      setName(user.name.toUpperCase());
    }

    if (user) {
      if (user.userType === "patient") {
        initPatient()
        
      }
      if (user.userType === "doctor") {
        initDoctor()
      }
    }

  }, [user]);


  function getUserType() {
    switch (user.userType) {
      case "patient":
        return (
          <div>
            <User name={name} surgeryType={surgeryType} currentDay={currentDay} user={user} googleUser={googleUser} isMobile={isMobile} setCurrentDay={setCurrentDay} />
          </div>
        )
      case "doctor":
        return <Doctor name={name} googleUser={googleUser} user={user} />
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