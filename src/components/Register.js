import React, { useEffect, useState } from "react";
import { Loading } from "./Loading";
import { Error404 } from "./404";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from '@mui/material/Radio';
import { useData, setData } from "../utilities/firebase";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const buttonStyle = {
    mx: 2,
    width: 1 / 14,
    margin: '1%',
    bgcolor: "#b43434",
    borderRadius: 2,
    color: "rgb(255, 255, 255)",
    '&:hover': {
        bgcolor: "#b36464"
    },
    '&:focus': {
        bgcolor: "#b36464"
    },
}

const ValidatePatientCode = (patientCode, userData) => {
    let patientCodeParse = patientCode.split("+")
    console.log(patientCodeParse[0])
    console.log(userData[patientCodeParse[0]])
    return userData[patientCodeParse[0]] && userData[patientCodeParse[0]]['userType'] === 'doctor' && patientCodeParse[1] === 'acl'
}

const onClickRegister = (googleUser, type, patientCode, userData) => {
    // TODO remove default values
    // const patientCode = document.querySelector('#patientCode').value;
    let patientCodeParse = patientCode.split("+")
    const uid = googleUser?.uid;
    if (ValidatePatientCode(patientCode, userData) && type === 'patient') {
        setData(`/user/${uid}/userType`, type);
        setData(`/user/${uid}/name`, googleUser?.displayName);
        setData(`/user/${uid}/startDate`, Date.now());
        setData(`/user/${uid}/email`, googleUser?.email);
        setData(`/user/${uid}/doctorId`, patientCodeParse[0]);
        setData(`/user/${uid}/surgeryType`, patientCodeParse[1]);
        setData(`/user/${patientCodeParse[0]}/patientId/${uid}`, googleUser?.displayName)
    }
    if (type === 'doctor') {
        setData(`/user/${uid}/userType`, type);
        setData(`/user/${uid}/name`, googleUser?.displayName);
        setData(`/user/${uid}/email`, googleUser?.email);
    }
}

const RegisterPage = ({ googleUser }) => {
    const [userType, setUserType] = useState("patient");
    const [textValue, setTextValue] = useState("")
    const [userData, loadingData, errorData] = useData("/user");
    useEffect(() => {
        if (userData === undefined) return;

    }, [userData]);

    if (errorData) return <Error404 />;
    if (loadingData) return <Loading />;

    return (
        <div>
            <h1>Are you a patient or doctor?</h1>
            <RadioGroup
                style={{ alignItems: "center" }}
                onChange={(e) => setUserType(e.target.value)}
                value={userType}
            >
                <FormControlLabel value="patient" label="Patient" control={<Radio />} />
                <FormControlLabel value="doctor" label="Doctor" control={<Radio />} />
            </RadioGroup>
            <TextField id='patientCode'
                label="PatientCode"
                name='patient_code'
                variant="outlined"
                required
                disabled={userType === 'doctor' ? true : false}
                error={userType === 'patient' ? !ValidatePatientCode(textValue, userData) : false}
                helperText='Please enter code provided by doctor.'
                onChange={e => {
                    setTextValue(e.target.value)
                }}
            />
            <br />
            <Button onClick={() => onClickRegister(googleUser, userType, textValue, userData)} sx={buttonStyle}>
                register
            </Button>
        </div>
    )
}

export default RegisterPage