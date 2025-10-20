"use client";
import React, { useRef, useEffect } from "react";
import Hls from "hls.js";
import { plane } from "three/examples/jsm/Addons.js";

interface VideoPlayerProps {
  url:any,
  nameplaylist:any
}

function stopvideo(){
  const video=(document.getElementById("videoplayer") as HTMLVideoElement)
  if(video){
    video.pause()
  }
  const videocontainer=(document.getElementById("videocontainer") as HTMLElement)
  if(videocontainer){
    videocontainer.style.display="none"
  }
}

function playvideo(){
  const radio=(document.getElementById("videoplayer") as HTMLVideoElement)
  if(radio){
    radio.autoplay=true
  }
  const videocontainer=(document.getElementById("videocontainer") as HTMLElement)
  if(videocontainer){
    videocontainer.style.display="block"
  }
}



const VideoPlayer:React.FC<VideoPlayerProps> = ({ url,onClickClose,nameplaylist }:any) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!url) return;

    (document.getElementById("videoplayer") as HTMLVideoElement).style.display="block";
    (document.getElementById("errorvideo") as HTMLElement).style.display="none";

    if(url && nameplaylist){
      playvideo()
    }else{
      stopvideo()
    }

    const video:any = videoRef.current;
    if (Hls.isSupported()) {
      const hls = new Hls();
      
      
      hls.loadSource(url);

      hls.on(Hls.Events.ERROR, (event, data) => {
        (document.getElementById("videoplayer") as HTMLVideoElement).style.display="none";
        (document.getElementById("errorvideo") as HTMLElement).style.display="flex";
      });

      hls.attachMedia(video);
    
      
      
      /*hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());*/
      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
      /*video.addEventListener("loadedmetadata", () => video.play());*/
    }
  }, [url,nameplaylist]);

  if(url==null){
    return;
  }

  


  return <div id="videocontainer"  style={{position: "absolute",top: "50%",left: "50%",transform: "translate(-50%, -50%)",backgroundColor:"#1A1C23",boxShadow:"0 4px 12px rgba(0, 0, 0, 0.6)",padding:"20px",borderRadius:"15px", zIndex:"101",width:"90%",maxWidth:"720px"}}>
    
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"10px"}}>
      <h1>{nameplaylist}</h1>
      <button type="button" className="closebutton" onClick={()=>{
        stopvideo()}
        }>
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    
    <div id="videoplayercontainer" style={{maxWidth:"720",height:"400px"}}>
      <video id="videoplayer" ref={videoRef} controls style={{maxWidth:"720", height:"100%",backgroundColor:"black",width:"100%"}}/>
      <h1 id="errorvideo" style={{display:"none",height:"100%",alignItems:"center",justifyContent:"center"}}>Content no avaliable</h1>
    </div>
  </div>
};

export default VideoPlayer;
