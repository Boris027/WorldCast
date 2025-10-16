import React, { useRef, useEffect } from "react";
import { listPlaylist } from "@/interfaces/listPlaylist";

interface SidebarProps {
  playlist: listPlaylist[];
  onClickPlaylist: (url:string) => void; // callback from parent
  visibility:string,
  sidebarVisibility: (state:string)=>void,
}


const Sidebar:React.FC<SidebarProps>=({ playlist,onClickPlaylist,visibility,sidebarVisibility }:any) => {
    return (
        <div style={{position:"fixed",zIndex:"100", right:"0px",width:"310px", height:"100%",overflowY:"scroll", backgroundColor:"#1A1C23", display:visibility}}>
            <button onClick={()=>sidebarVisibility("none")}>Close</button>

            {
                playlist && playlist.length>0?(<p>{playlist[0].group}</p>):(<p></p>)
            }
            
            {playlist.map((item:any,index:number)=>{
                return <button key={item.name+item.url} onClick={()=>{
                    console.log(item.name)
                    onClickPlaylist(item.url)
                }} style={{display:"flex", margin:"0px",padding:"15px", alignItems:"center",gap:"10px"}}>
                    <img src={item.logo+index} style={{width:"60px", height:"60px"}}></img>
                    <p style={{maxWidth:"250px"}}>{item.name}</p>
                    </button>
            })}
        </div>
    );
}

export default Sidebar