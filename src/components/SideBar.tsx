import React, { useRef, useEffect } from "react";
import { listPlaylist } from "@/interfaces/listPlaylist";

interface SidebarProps {
  playlist: listPlaylist[];
  onClickPlaylist: (url:string) => void; // callback from parent
}

const Sidebar:React.FC<SidebarProps>=({ playlist,onClickPlaylist }:any) => {
    console.log(playlist)
    return (
        <div style={{position:"fixed",zIndex:"100", right:"0px",width:"auto", height:"100%",overflowY:"scroll", backgroundColor:"#1A1C23"}}>
            {playlist.map((item:any,index:number)=>{
                return <button key={item.name} onClick={()=>{
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