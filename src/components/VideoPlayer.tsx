"use client";
import React, { useRef, useEffect } from "react";
import Hls from "hls.js";

interface VideoPlayerProps {
  url:any
  onClickClose: (url:any) => void; // callback from parent
}


const VideoPlayer:React.FC<VideoPlayerProps> = ({ url,onClickClose }:any) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!url) return;

    const video:any = videoRef.current;
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

  if(url==null){
    console.log("xdd")
    return;
  }


  return <div style={{position: "absolute",top: "50%",left: "50%",transform: "translate(-50%, -50%)",backgroundColor:"#1A1C23",padding:"20px",borderRadius:"15px", zIndex:"101"}}>
    <button onClick={() => onClickClose(null)}>Close</button>
    <video autoPlay ref={videoRef} controls width="720" height="400px" style={{maxWidth:"720", maxHeight:"400px"}} />
  </div>
};

export default VideoPlayer;
