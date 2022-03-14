import "survey-react/survey.css"
import { Model, Survey } from 'survey-react';
import useStore from '../Store';
import swal from 'sweetalert';
import { setData } from "../utilities/firebase";
import './surveypage.css'
import calculateDay from '../utilities/calculateday';
const showPopupAlert = (pain, concerns, phase1) => {
    if (phase1) {
        if (!concerns) {
            swal("Happy to know", "You are on track with your progress, You got this!", "success");
        } else {
            swal("Sorry to hear that", "We have informed the doctor and you will hear back soon", "warning");
        }
    }
    else {
        if (pain < 5) {
            swal("Happy to know", "You are on track with your progress, You got this!", "success");
        } else {
            swal("Sorry to hear that", "We have informed the doctor and you will hear back soon", "warning");
        }
    }
}

var surveyValueChanged = function (sender, options) {
    var el = document.getElementById(options.name);
    if (el) {
        el.value = options.value;
    }
};

function SurveyPage({ currentDay, googleUser, data }) {
    const surveyJson = (currentDay === 1) ? data["survey"]["day1"] : data["survey"]["day2"];
    const newStartTime = Date.now() - (currentDay - 1) * 86400000;
    const setPage = useStore(state => state.setUserPage);
    const survey = new Model(surveyJson);
    survey
        .onComplete
        .add(function (sender) {
            setData(`/user/${googleUser?.uid}/surveyResults/${currentDay - 1}`, sender.data);
            //for test purpose to set currentday after fill in survey because using next day button
            if (currentDay > calculateDay(data["user"][`${googleUser?.uid}`]["startDate"])) {
                setData(`/user/${googleUser?.uid}/startDate`, newStartTime);
            }

            showPopupAlert(sender.data.pain_rating, sender.data.concerns.includes("Yes"), currentDay <= data["surgery"]["acl"]["phaseEndDay"][1]);
            setPage("home");
        });

    var myCss = {
        navigationButton: "button-btn-lg",
    };

    return (
        <div>
            <Survey model={survey} onValueChanged={surveyValueChanged} css={myCss} />
        </div >
    );
}

export default SurveyPage;

