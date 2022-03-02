import React from "react";
import YoutubeEmbed from "./YouTubeEmbed";
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';

const buttonStyle = () => ({
    mx: 2,
    fontSize: '1.1vw',
    width: '6vw',
    marginBottom: '2%',
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

const PlayVideo = ({ phase, data }) => {
    return (
        <Grow in={true} {...({ timeout: 1500 })}>
            <div>
                <h1>Please do these exercises to go along with phase {phase}:</h1>
                <YoutubeEmbed embedId={data["videoUrls"][phase - 1]}></YoutubeEmbed>
                <Button variant="contained" sx={() => buttonStyle()} onClick={() => localStorage.setItem("videoCheck", true)}>Done</Button>
            </div>
        </Grow>
    );
}

export default PlayVideo;
