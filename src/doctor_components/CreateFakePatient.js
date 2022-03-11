import Button from "@mui/material/Button";
import { setData } from "../utilities/firebase";
import { getRefByPush } from "../utilities/firebase";
const buttonStyle = (isMobile) => ({
    mx: 2,
    fontSize: "0.8rem",
    width: '12rem',
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

function getRandomInt(max, offset) {
    return Math.floor(Math.random() * max + offset);
}

const FakeFirstName = ["Peter", "Matthew", "Thomas", "Nancy", "Francesca", "Matthew"];
const FakeLastName = ["Smith", "Johnson", "Quinn", "Adams", "Redding", "Johnson"];
const concerns = ["I can't finish the rehab exercise, because it is so painful.", "I don't know how to do. Help me plz", "I think it is too hard.", "My knee is painful!"]
const CreateFakeData = ({ googleUser }) => {

    const id = "Fake" + getRefByPush('/');
    const fakesurveydata0 = { pain_rating: getRandomInt(3, 0), rehab_successful: 'Yes', concerns: "No" }
    const fakesurveydata1 = { pain_rating: getRandomInt(4, 7), rehab_successful: 'No', concerns: "Yes", concerns_description: concerns[getRandomInt(3, 0)] }
    const fakesurveydata2 = { pain_rating: getRandomInt(3, 0), rehab_successful: 'Yes', concerns: "No" }
    const fakesurveydata3 = { pain_rating: getRandomInt(4, 7), rehab_successful: 'No', concerns: "Yes", concerns_description: concerns[getRandomInt(3, 0)] }
    const fakesurveydata4 = { pain_rating: getRandomInt(4, 7), rehab_successful: 'No', concerns: "Yes", concerns_description: concerns[getRandomInt(3, 0)] }
    const fakesurveydata5 = { pain_rating: getRandomInt(4, 7), rehab_successful: 'No', concerns: "Yes", concerns_description: concerns[getRandomInt(3, 0)] }
    let name = FakeFirstName[getRandomInt(5, 0)] + " " + FakeLastName[getRandomInt(5, 0)];
    setData(`/user/${id}/userType`, "patient");
    setData(`/user/${id}/name`, name);
    setData(`/user/${id}/startDate`, Date.now() - 86400000 * 5);
    setData(`/user/${id}/email`, id + "@email.com");
    setData(`/user/${id}/doctorId`, googleUser?.uid);
    setData(`/user/${id}/surgeryType`, "acl");
    setData(`/user/${googleUser?.uid}/patientId/${id}`, name)
    setData(`/user/${id}/surveyResults/0`, fakesurveydata0)
    setData(`/user/${id}/surveyResults/1`, fakesurveydata1)
    setData(`/user/${id}/surveyResults/2`, fakesurveydata2)
    setData(`/user/${id}/surveyResults/3`, fakesurveydata3)
    setData(`/user/${id}/surveyResults/4`, fakesurveydata4)
    setData(`/user/${id}/surveyResults/5`, fakesurveydata5)
}

const CreateFakePatient = (googleUser) => {
    return (
        <Button sx={() => buttonStyle()} onClick={() => CreateFakeData(googleUser)}> Create Fake for Test </Button>
    )
}

export default CreateFakePatient;