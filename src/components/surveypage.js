import "survey-react/survey.css"
import { Model, Survey } from 'survey-react';
import useStore from '../Store';
import Button from '@mui/material/Button';
import swal from 'sweetalert';
import { setData } from "../utilities/firebase";
import React, { useState } from "react";
import './surveypage.css'

const buttonStyle = {
    fontWeight: "normal",
    backgroundColor: "#b43434",
    color: 'white',
    fontSize: '1rem',
    padding: 1,
    borderRadius: 2,
    marginBottom: "10vh",
    '&:hover': {
        bgcolor: "#b36464"
    },
    '&:focus': {
        bgcolor: "#b36464"
    },
}

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

function SurveyPage({ currentDay, user, googleUser, data }) {
    //Now is day1 if we want to have different survey everyday we will use currentDay
    const surveyJson = data["survey"]["day1"]
    console.log(googleUser)
    const setPage = useStore(state => state.setUserPage);
    const page = useStore(state => state.UserPage);
    const survey = new Model(surveyJson);
    survey
        .onComplete
        .add(function (sender) {
            setData(`/user/${googleUser?.uid}/surveyResults/${currentDay - 1}`, sender.data);
            console.log(sender.data);
            showPopupAlert(sender.data.pain_rating);
            setPage("home");
        });

    var myCss = {
        navigationButton: "button-btn-lg",
    };

    return (
        <div>
            <Survey model={survey} onValueChanged={surveyValueChanged} css={myCss} />
            <Button onClick={() => setPage("home")} sx={buttonStyle}>
                Cancel
            </Button>
        </div >
    );
}

export default SurveyPage;

