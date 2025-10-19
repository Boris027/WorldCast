"use client";
interface AudioPlayerProps {
  url:any,
  nameplaylist:any
}


const AudioPlayer:React.FC<AudioPlayerProps> = ({ url,nameplaylist }:any) => {
    return <div style={{position: "absolute",top: "10%",left: "10%",transform: "translate(-50%, -50%)",backgroundColor:"#1A1C23",padding:"20px",borderRadius:"15px", zIndex:"101",}}>
        <h1>{nameplaylist}</h1>
        <audio src={url} autoPlay controls></audio>

    </div>
}

export default AudioPlayer