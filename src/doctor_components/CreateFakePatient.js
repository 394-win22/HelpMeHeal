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
    const fakesurveydata = { pain_rating: 6, rehab_successful: ['No'], concerns: "I can't finish the rehab exercise, because it is so painful." }
    setData(`/user/${id}/userType`, "patient");
    setData(`/user/${id}/name`, "FakePatient");
    setData(`/user/${id}/startDate`, Date.now() - 86400000 * 5);
    setData(`/user/${id}/email`, id + "@email.com");
    setData(`/user/${id}/doctorId`, googleUser?.uid);
    setData(`/user/${id}/surgeryType`, "acl");
    setData(`/user/${googleUser?.uid}/patientId/${id}`, "FakePatient")
    setData(`/user/${id}/surveyResults/0`, fakesurveydata)
    setData(`/user/${id}/surveyResults/1`, fakesurveydata)
    setData(`/user/${id}/surveyResults/2`, fakesurveydata)
    setData(`/user/${id}/surveyResults/3`, fakesurveydata)
    setData(`/user/${id}/surveyResults/4`, fakesurveydata)
}

const CreateFakePatient = (googleUser) => {
    return (
        <Button sx={() => buttonStyle()} onClick={() => CreateFakeData(googleUser)}> CreateFakePatient </Button>
    )
}

export default CreateFakePatient;