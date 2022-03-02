import React from "react";
import YoutubeEmbed from "./YouTubeEmbed";
import Button from '@mui/material/Button';

const buttonStyle = () => ({
    mx: 2,
    fontSize: '3vw',
    width: '12vw',
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

const PlayVideo = ({ phase, data, setVideoCheck }) => {
    return (
        <div >
            <h1>Please do these exercises to go along with phase {phase}:</h1>
            <YoutubeEmbed embedId={data["videoUrls"][phase - 1]}></YoutubeEmbed>
            <Button variant="contained" sx={() => buttonStyle()} onClick={() => setVideoCheck(true)}>Done</Button>
        </div>
    );
}

export default PlayVideo;
