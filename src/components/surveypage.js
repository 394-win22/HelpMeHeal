import "survey-react/survey.css"
//import * as Survey from 'survey-react';
import { Model, Survey } from 'survey-react';
import useStore from '../Store';
import Button from '@mui/material/Button';
import swal from 'sweetalert';

const buttonStyle = {
    fontWeight: "normal",
    backgroundColor: "#b43434",
    color: 'white',
    fontSize: '1.5rem',
    marginLeft: "5rem",
    borderRadius: 2,
    '&:hover': {
        bgcolor: "#b36464"
    },
    '&:focus': {
        bgcolor: "#b36464"
    },
}

const surveyJson = {
    "completedHtml": "<h3>Thank you for completing the check-in survey.</h3> <h5>Remember to contact your doctor if you have any concerns about your recovery.</h5>",
    "completedHtmlOnCondition": [
        {
            "expression": "{pain_rating} <= 3",
            "html": "<h3>Please contact your doctor to discuss your pain.</h3>"
        }, {
            "expression": "{nps_score} > 3",
            "html": "<h3>Thank you for completing the check-in survey.</h3> <h5>Remember to contact your doctor if you have any concerns about your recovery.</h5>",
        }
    ],
    "pages": [
        {
            "name": "page1",
            "elements": [
                {
                    "type": "rating",
                    "name": "pain_rating",
                    "title": "What is your pain level today on a scale from 1 to 10?",
                    "isRequired": true,
                    "rateMin": 1,
                    "rateMax": 10,
                    "minRateDescription": "No pain",
                    "maxRateDescription": "Unbearable pain"
                }, {
                    "type": "checkbox",
                    "name": "rehab_successful",
                    "title": "Were you able to complete yesterday's rehab completely?",
                    "isRequired": true,
                    "validators": [
                        {
                            "type": "answercount",
                            "text": "Please select only one response.",
                            "maxCount": 1
                        }
                    ],
                    "choices": [
                        "Yes", "No"
                    ],
                }, {
                    "type": "comment",
                    "name": "concerns",
                    "title": "Do you have any concerns with where you are in recovery?"
                },
            ]
        }
    ],
    "showQuestionNumbers": "off"
};

const showPopupAlert = (pain) => {
    if (pain < 5) {
        swal("Happy to know", "You are on track with your progress, You got this!", "success");
    } else {
        swal("Sorry to hear that", "We have informed the doctor and you will hear back soon", "warning");
    }
}

function SurveyPage() {
    const setPage = useStore(state => state.setUserPage);
    const page = useStore(state => state.UserPage);
    const survey = new Model(surveyJson);

    return (
        <div>
            <Survey model={survey} />
            <Button onClick={() => {
                setPage("home");
                // showPopupAlert(4);
            }} sx={buttonStyle}>
                Continue
            </Button>
        </div >
    );
}

export default SurveyPage;

