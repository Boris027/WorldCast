"use client";
import React, { useRef, useEffect } from "react";
import Hls from "hls.js";
import { plane } from "three/examples/jsm/Addons.js";

interface VideoPlayerProps {
  url:any,
  nameplaylist:any
  onClickClose: (url:any,name:string) => void; // callback from parent
}


const VideoPlayer:React.FC<VideoPlayerProps> = ({ url,onClickClose,nameplaylist }:any) => {
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
    return;
  }

  


  return <div style={{position: "absolute",top: "50%",left: "50%",transform: "translate(-50%, -50%)",backgroundColor:"#1A1C23",padding:"20px",borderRadius:"15px", zIndex:"101"}}>
    
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingBottom:"15px"}}>
      <h1>{nameplaylist}</h1>
      <button type="button"  onClick={()=>{
        onClickClose(null)}
        }>
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <video autoPlay ref={videoRef} controls width="720" height="400px" style={{maxWidth:"720", maxHeight:"400px",backgroundColor:"black"}} />
  </div>
};

export default VideoPlayer;
