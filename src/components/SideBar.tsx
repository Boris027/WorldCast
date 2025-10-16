import React, { useRef, useEffect } from "react";
import { listPlaylist } from "@/interfaces/listPlaylist";



const Sidebar=({ playlist }:any) => {
    console.log(playlist)
    return (
        <div style={{position:"fixed",zIndex:"100", right:"0px",width:"300px", height:"100%",overflowY:"scroll", backgroundColor:"#1A1C23"}}>
            {playlist.map((item:any,index:number)=>{
                return <button style={{display:"flex", margin:"0px",padding:"10px"}}>
                    <img src={item.logo} style={{width:"60px", height:"60px"}}></img>
                    <p>{item.name}</p>
                    </button>
            })}
        </div>
    );
}

export default Sidebar