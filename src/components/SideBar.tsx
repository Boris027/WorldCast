import React, { useRef, useEffect } from "react";
import { listPlaylist } from "@/interfaces/listPlaylist";
import { List } from "react-window";

interface SidebarProps {
  playlist: listPlaylist[];
  onClickPlaylist: (url:string,name:string) => void; // callback from parent
  visibility:string,
  sidebarVisibility: (state:string)=>void,
  country:string,
  subname:string,
  channelLogos:boolean
}


const Sidebar:React.FC<SidebarProps>=({ playlist,onClickPlaylist,visibility,sidebarVisibility,country,subname,channelLogos }:any) => {
    return (
        <div style={{position:"fixed",zIndex:"100", right:"0px",width:"310px", height:"100%",overflowY:"scroll", backgroundColor:"#1A1C23", display:visibility}}>

            <div style={{display:"flex",padding:"10px", justifyContent:"space-between"}}>

                
                <p style={{}}>{country}</p>
                

                <button type="button"  onClick={()=>sidebarVisibility("none")}>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                
            </div>
            
            <div style={{display:"flex",justifyContent:"center"}}>
                <input type="text" id="input" placeholder="Channel" style={{borderColor:"white", backgroundColor:"#2E303B", borderRadius:"7px", margin:"auto", padding:"5px"}} onInput={x=>{
                    const content = (x.target as HTMLInputElement).value;
                    
                    const channelcontainer=document.getElementById("channelcontainer")
                    const buttons = Array.from(channelcontainer!.getElementsByTagName("button"));

                    buttons.forEach((btn) => {
                        // Show button if its text includes the search term, else hide it
                        if (btn.getAttribute("name")?.toLocaleLowerCase().includes(content.toLocaleLowerCase())) {
                            (btn as HTMLElement).style.display = "flex"; // or "flex" if needed
                        } else {
                            (btn as HTMLElement).style.display = "none";
                        }
                    });
                    
                    
                }}/>
            </div>

            
            <div id="channelcontainer">
                {playlist.map((item:any,index:number)=>{
                    return <button key={item.name+";"+index} name={item.name} onClick={()=>{
                        onClickPlaylist(item.url,item.name)
                    }} style={{display:"flex", margin:"0px",padding:"15px", alignItems:"center",gap:"10px"}}>
                        {channelLogos ? <img src={item.logo||null} style={{width:"60px", height:"60px"}}></img> : <img  src={`https://flagsapi.com/${subname}/flat/64.png`} style={{width:"60px", height:"60px"}}></img>}
                        <p style={{maxWidth:"250px"}}>{item.name}</p>
                        </button>
                })}
            </div>
            
        </div>
    );
}

export default Sidebar