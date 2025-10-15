"use client";
import React, { useRef, useEffect } from "react";
import Hls from "hls.js";

const VideoPlayer = ({ url }) => {
  const videoRef = useRef();

  useEffect(() => {
    if (!url) return;

    const video = videoRef.current;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
      /*hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());*/
      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
      /*video.addEventListener("loadedmetadata", () => video.play());*/
    }
  }, [url]);

  return <video ref={videoRef} controls width="720" />;
};

export default VideoPlayer;
