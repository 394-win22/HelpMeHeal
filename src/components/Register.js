import { useState } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from '@mui/material/Radio';
import { setData } from "../utilities/firebase";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from '@mui/material/Button';

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

const onClickRegister = (googleUser, type) => {
    // TODO remove default values
    const uid = googleUser?.uid;
    setData(`/user/${uid}/userType`, type);
    setData(`/user/${uid}/name`, googleUser?.displayName);
    setData(`/user/${uid}/startDate`, Date.now());
    setData(`/user/${uid}/email`, googleUser?.email);
    setData(`/user/${uid}/surgeryType`, 'acl');
}

const RegisterPage = ({ googleUser }) => {
    const [userType, setUserType] = useState("patient");
    return (
        <div>
            <h1>Are you a patient or doctor?</h1>
            <RadioGroup
                style={{ alignItems: "center"}}
                onChange={(e) => setUserType(e.target.value)}
                value={userType}
            >
                <FormControlLabel value="patient" label="Patient" control={<Radio />} />
                {/* <FormControlLabel value="doctor" label="Doctor" control={<Radio />} /> */}
            </RadioGroup>
            <Button onClick={() => onClickRegister(googleUser, userType)} sx={buttonStyle}>
                register
            </Button>
        </div>
    )
}

export default RegisterPage