import React from "react";
import './YouTubeEmbed.css';
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

    console.log("phase: "+phase);
    console.log("url: "+ data["videoUrls"][phase-1]);

    console.log("came here to load video");
    return (
        <div>
        <h1>Youtube Embed</h1>
        <YoutubeEmbed embedId={data["videoUrls"][phase-1]} />
        </div>
    );
}

export default  PlayVideo;
