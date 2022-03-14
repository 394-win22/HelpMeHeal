import React from "react";
import './YouTubeEmbed.css';


const YoutubeEmbed = ({ embedId, start, end }) => {
  let url = "";
  if (start === undefined || end === undefined) {
    url = `https://www.youtube.com/embed/${embedId}`;
  } else {
    url = `https://www.youtube.com/embed/${embedId}?start=${start}&end=${end}`;
  }

  console.log(url);

  return (
    <div className="video-responsive">
      <iframe
        width="853"
        height="480"
        src={url}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
}

export default YoutubeEmbed;