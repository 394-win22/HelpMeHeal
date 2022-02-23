import React from "react";
import YoutubeEmbed from "./YouTubeEmbed";

const PlayVideo = ({ currentDay, data }) => {

    console.log("data: "+data);
    let phase;
    let phaseEndDay = data["phaseEndDay"];

    for (const [key, value] of Object.entries(phaseEndDay)) {
        if (currentDay <= value) {
            phase = key;
            break;
        }
    }

    return (
        <div>
        <h1>Please do these exercises</h1>
        <YoutubeEmbed embedId={data["videoUrls"][phase-1]} />
        </div>
    );
}

export default  PlayVideo;
