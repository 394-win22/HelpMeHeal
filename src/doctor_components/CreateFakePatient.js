import Button from "@mui/material/Button";
import { setData } from "../utilities/firebase";
import { getRefByPush } from "../utilities/firebase";
const buttonStyle = () => ({
    mx: 2,
    width: '20vw',
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
})

const CreateFakeData = ({ googleUser }) => {
    const id = "Fake" + getRefByPush('/');
    setData(`/user/${id}/userType`, "patient");
    setData(`/user/${id}/name`, "FakePatient");
    setData(`/user/${id}/startDate`, Date.now());
    setData(`/user/${id}/email`, id + "@email.com");
    setData(`/user/${id}/doctorId`, googleUser?.uid);
    setData(`/user/${id}/surgeryType`, "acl");
    setData(`/user/${googleUser?.uid}/patientId/${id}`, "FakePatient")
}

const CreateFakePatient = (googleUser) => {
    return (
        <Button sx={() => buttonStyle()} onClick={() => CreateFakeData(googleUser)}> CreatePatient </Button>
    )
}

export default CreateFakePatient;