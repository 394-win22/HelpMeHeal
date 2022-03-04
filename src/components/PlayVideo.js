import React from "react";
import YoutubeEmbed from "./YouTubeEmbed";
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import swal from 'sweetalert';
const buttonStyle = () => ({
    mx: 2,
    fontSize: '1.1vw',
    width: '6vw',
    marginBottom: '30rem',
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

const showPopupAlert = () => {
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
        });
}

const PlayVideo = ({ phase, data }) => {

    return (
        <Grow in={true} {...({ timeout: 1500 })}>
            <div>
                <h1 style={{ marginLeft: '0%' }}>Phase {phase} Exercises</h1>
                <YoutubeEmbed embedId={data["videoUrls"][phase - 1]}></YoutubeEmbed>
                <Button variant="contained" sx={() => buttonStyle()} onClick={() => showPopupAlert()}>Done</Button>
            </div>
        </Grow>
    );
}

export default PlayVideo;
