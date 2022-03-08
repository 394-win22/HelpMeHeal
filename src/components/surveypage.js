import "survey-react/survey.css"
import { Model, Survey } from 'survey-react';
import useStore from '../Store';
import swal from 'sweetalert';
import { setData } from "../utilities/firebase";
import './surveypage.css'
import calculateDay from '../utilities/calculateday';
const showPopupAlert = (pain) => {
    if (pain < 5) {
        swal("Happy to know", "You are on track with your progress, You got this!", "success");
    } else {
        swal("Sorry to hear that", "We have informed the doctor and you will hear back soon", "warning");
    }
}

var surveyValueChanged = function (sender, options) {
    var el = document.getElementById(options.name);
    if (el) {
        el.value = options.value;
    }
};

function SurveyPage({ currentDay, googleUser, data }) {
    //Now is day1 if we want to have different survey everyday we will use currentDay
    const surveyJson = (currentDay === 1) ? data["survey"]["day1"] : data["survey"]["day2"];
    const newStartTime = Date.now() - (currentDay - 1) * 86400000;
    // console.log(googleUser)
    const setPage = useStore(state => state.setUserPage);
    const survey = new Model(surveyJson);
    survey
        .onComplete
        .add(function (sender) {
            setData(`/user/${googleUser?.uid}/surveyResults/${currentDay - 1}`, sender.data);
            //for test purpose
            if (currentDay > calculateDay(data["user"][`${googleUser?.uid}`]["startDate"])) {
                setData(`/user/${googleUser?.uid}/startDate`, newStartTime);
            }
            //console.log(sender.data);
            showPopupAlert(sender.data.pain_rating);
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

