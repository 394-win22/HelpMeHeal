import React from "react";
import YoutubeEmbed from "./YouTubeEmbed";
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import useStore from '../Store';
import swal from 'sweetalert';

const buttonStyle = () => ({
    mx: 2,
    fontSize: '1.1vw',
    width: '6vw',
    marginBottom: '2rem',
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

const showPopupAlert = (setPage) => {
    swal({
        title: "Have you finished today's exercise？",
        text: "Please make sure you have finished today's exercise!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((done) => {
            if (done) {
                swal("Congratulations on finishing exercise and keep going!", {
                    icon: "success",
                });
                localStorage.setItem("videoCheck", true)
            } else {
                swal("Completing the exercises will help you heal, please keep doing it！", {
                    icon: "error",
                });
                localStorage.setItem("videoCheck", false)
            }
            setPage("home");
        });
}

const PlayVideo = ({ currentDay, phase, data }) => {
    const setPage = useStore(state => state.setUserPage);
    const embedURL = data["videoUrls"][phase - 1];
    const startTime = data["days"][currentDay]["start"];
    const endTime = data["days"][currentDay]["end"];
    console.log("PlayVideo: " + embedURL + " start: " + startTime + " end: " + endTime);

    return (
        <Grow in={true} {...({ timeout: 1500 })}>
            <div>
                <h1 style={{ marginLeft: '0%' }}>Phase {phase} Exercises</h1>
                <h3>Today exercise is from {Math.floor(startTime / 60)}:{startTime - Math.floor(startTime / 60) * 60} to {Math.floor(endTime / 60)}:{endTime - Math.floor(endTime / 60) * 60}</h3>
                <h3>Press Done button after finishing the exercise</h3>
                <Button variant="contained" sx={() => buttonStyle()} onClick={() => showPopupAlert(setPage)}>Done</Button>
                <YoutubeEmbed embedId={embedURL} start={startTime} end={endTime}></YoutubeEmbed>
            </div>
        </Grow>
    );
}

export default PlayVideo;
