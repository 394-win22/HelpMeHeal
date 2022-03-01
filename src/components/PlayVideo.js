import React from "react";
import YoutubeEmbed from "./YouTubeEmbed";
import calculatePhase from "../utilities/calculatePhase";
const PlayVideo = ({ currentDay, data, setVideoCheck }) => {

    let phase = calculatePhase(currentDay, data["phaseEndDay"]);

    return (
        <div>
            <h1>Please do these exercises to go along with phase {phase}:</h1>
            <YoutubeEmbed embedId={data["videoUrls"][phase - 1]} />
        </div>
    );
}

export default PlayVideo;
