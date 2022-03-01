import React from "react";
import YoutubeEmbed from "./YouTubeEmbed";

const PlayVideo = ({ phase, data, setVideoCheck }) => {

    return (
        <div>
            <h1>Please do these exercises to go along with phase {phase}:</h1>
            <YoutubeEmbed embedId={data["videoUrls"][phase - 1]} />
        </div>
    );
}

export default PlayVideo;
