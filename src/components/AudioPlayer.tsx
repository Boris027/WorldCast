"use client";

import Hls from "hls.js";
import { useEffect } from "react";

interface AudioPlayerProps {
  url:any,
  nameplaylist:any,
  setradiourl:(url:string)=>void
}




function error(){
  const radio=(document.getElementById("radioplayer") as HTMLAudioElement)
  const errormessage=(document.getElementById("radioerrormessage") as HTMLElement)
  if(radio && errormessage){
    radio.style.display="none"
    errormessage.style.display="flex"
  }
}



const AudioPlayer:React.FC<AudioPlayerProps> = ({ url,nameplaylist,setradiourl }:any) => {


  function playradio(url:string){
  const radio=(document.getElementById("radioplayer") as HTMLAudioElement)
    if(radio){
      //radio.autoplay=true
      //radio.play()
      if (url.endsWith('.m3u8')){
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(radio);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log('HLS audio manifest loaded, playing...');
          radio.play().catch(console.error);
        });
      }else{
        radio.autoplay=true
        radio.play()
      }
      
    }
    const audiocontainer=(document.getElementById("audiocontainer") as HTMLElement)
    if(audiocontainer){
      audiocontainer.style.display="block"
    }
  }

  function stopradio(){
    const radio=(document.getElementById("radioplayer") as HTMLAudioElement)
    if(radio){
      radio.pause()
      setradiourl(null)
    }
    const audiocontainer=(document.getElementById("audiocontainer") as HTMLElement)
    if(audiocontainer){
      audiocontainer.style.display="none"
    }
  }


  useEffect(() => {
    const radio=(document.getElementById("radioplayer") as HTMLAudioElement)
    const errormessage=(document.getElementById("radioerrormessage") as HTMLElement)
    if(radio && errormessage){
      radio.style.display="block"
      errormessage.style.display="none"
    }
    if(url && nameplaylist){
      playradio(url)
    }else{
      stopradio()
    }
  },[url,nameplaylist])


    return <div id="audiocontainer"
    style={{position: "absolute",top: "20px",left: "20px",backgroundColor:"#1A1C23",boxShadow:"0 4px 12px rgba(0, 0, 0, 0.6)",padding:"20px",borderRadius:"15px", zIndex:"101", display:"none",minWidth:"300px"}}>

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
        <audio id="radioplayer" style={{width:"100%"}} src={url} autoPlay controls onError={c=>{
          error()
        }}></audio>
        <h1 id="radioerrormessage" style={{display:"none",justifyContent:"center",alignItems:"center",width:"300px",height:"54px"}}>Radio not avaliable</h1>
    </div>
}

export default AudioPlayer