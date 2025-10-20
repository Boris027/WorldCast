"use client";

import { useEffect } from "react";

interface AudioPlayerProps {
  url:any,
  nameplaylist:any
}

function stopradio(){
  const radio=(document.getElementById("radioplayer") as HTMLAudioElement)
  if(radio){
    radio.pause()
  }
  const audiocontainer=(document.getElementById("audiocontainer") as HTMLElement)
  if(audiocontainer){
    audiocontainer.style.display="none"
  }
}

function playradio(){
  const radio=(document.getElementById("radioplayer") as HTMLAudioElement)
  if(radio){
    radio.autoplay=true
    radio.play()
  }
  const audiocontainer=(document.getElementById("audiocontainer") as HTMLElement)
  if(audiocontainer){
    audiocontainer.style.display="block"
  }
}



const AudioPlayer:React.FC<AudioPlayerProps> = ({ url,nameplaylist }:any) => {

  useEffect(() => {
    if(url && nameplaylist){
      playradio()
    }else{
      stopradio()
    }
  },[url,nameplaylist])


    return <div id="audiocontainer"
    style={{position: "absolute",top: "20px",left: "20px",backgroundColor:"#1A1C23",boxShadow:"0 4px 12px rgba(0, 0, 0, 0.6)",padding:"20px",borderRadius:"15px", zIndex:"101", display:"none"}}>

        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingBottom:"15px"}}>
          <h1>{nameplaylist}</h1>

          
          <button type="button" className="closebutton" onClick={()=>{
            stopradio()
          }}>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <audio id="radioplayer" src={url} autoPlay controls></audio>
    </div>
}

export default AudioPlayer