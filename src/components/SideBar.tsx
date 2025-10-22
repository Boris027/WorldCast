import React, { useEffect, useState } from "react";
import { listPlaylist } from "@/interfaces/listPlaylist";
import { GetCapital, GetTimeZone } from "@/services/DataFromStorage";
import { DateTime } from "luxon";
import { setCountry } from "@/app/router";

interface SidebarProps {
  playlist: listPlaylist[];
  onClickPlaylist: (url:string,name:string) => void; // callback from parent
  visibility:string;
  sidebarVisibility: (state:string)=>void;
  country:string;
  subname:string;
  channelLogos:boolean;
  onClickAudio:(url:string,name:string) => void;
  mode:string;
  AddElementToFavorites:(name:string, url:string, type:string,region:string)=>void;
}





const Sidebar:React.FC<SidebarProps>=({ playlist,onClickPlaylist,visibility,sidebarVisibility,country,subname,channelLogos,onClickAudio,mode,AddElementToFavorites }:any) => {
    const [valueInput,setvalueInput]=useState<string>("")
    const [capital,setcapital]=useState<string>("")
    const [time, setTime] = useState("99:99");
    function clearinput(){
        setvalueInput("")
    }

    useEffect(() => {
        const capital=GetCapital(subname)
        setcapital("")
        setTime("99:99")
        let interval: number | null = null; 
        if(capital){
            setcapital(capital)
        }else{
            setTime("Favorites")
        }
        const timezone=GetTimeZone(subname)
        if (timezone) {
            interval = window.setInterval(() => {
            const now = DateTime.now().setZone(timezone); 
            setTime(now.toFormat("HH:mm"));           
            }, 1000);
        }

        //console.log(playlist)
        console.log(playlist)
        if(playlist.length==0 ){
            (document.getElementById("nocontentavaliable") as HTMLElement).style.display="block"
        }else{
            (document.getElementById("nocontentavaliable") as HTMLElement).style.display="none";
        }
        
        if(mode=="tv"){
            (document.getElementById("input") as HTMLInputElement).style.display="block";
            (document.getElementById("input") as HTMLInputElement).placeholder = "Channel";
        }else if(mode=="radio"){
            (document.getElementById("input") as HTMLInputElement).style.display="block";
            (document.getElementById("input") as HTMLInputElement).placeholder = "Radio";
        }else if(mode=="news"){
            (document.getElementById("input") as HTMLInputElement).style.display="block";
            (document.getElementById("input") as HTMLInputElement).placeholder = "News";
        }else if(mode=="favorites"){
            (document.getElementById("input") as HTMLInputElement).style.display="none";
        }
        setvalueInput("")

        return () => {
            if (interval) clearInterval(interval);
        };

    },[playlist,mode])

    function onclickitem(url:string,name:string,type:string){
        if(type=="tv"){
            onClickPlaylist(url,name)
        }else if(type=="radio"){
            onClickAudio(url,name)
        }else if(type=="news"){
            //console.log(url+"sad")
            window.open(url)
        }
    }

    return (
        <div id="sidebar" style={{position:"fixed",zIndex:"100", right:"0px",width:"22%", height:"100%",overflowY:"scroll",overflowX:"hidden", backgroundColor:"#1A1C23", display:visibility}}>
            
            <div style={{display:"flex",padding:"10px", justifyContent:"space-between",paddingBottom:"0px"}}>
                <p style={{fontSize:"22px",color:"#4EA8DE",}}>{time}</p>
                <button type="button" className="closebutton"  onClick={()=>{
                        sidebarVisibility("none")
                        clearinput()
                    }}>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div style={{display:"flex",padding:"10px", justifyContent:"space-between",paddingTop:"0px"}}>

                
                <div style={{display:"flex",alignItems:"baseline",gap:"5px"}}>
                    <p style={{fontSize:"22px",color:"#4EA8DE"}}>{country}</p>
                    <p>{capital}</p>
                </div>

                
            </div>
            
            <div style={{display:"flex",justifyContent:"center"}}>
                <input type="text" id="input" value={valueInput} placeholder="Channel" style={{borderColor:"white", backgroundColor:"#2E303B", borderRadius:"7px", margin:"auto", padding:"5px",width:"60%",marginBottom:"10px"}} onInput={x=>{
                    const content = (x.target as HTMLInputElement).value;
                    
                    const channelcontainer=document.getElementById("channelcontainer")
                    const buttons = Array.from(channelcontainer!.getElementsByTagName("button"));
                    setvalueInput(content)

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

                {playlist[0]?.url && playlist.map((item:any,index:number)=>{
                    return <button className="listoption" key={item.name+";"+index} name={item.name} onClick={()=>{
                        onclickitem(item.url,item.name,item.type)
                    }} style={{display:"flex", margin:"0px",padding:"15px", alignItems:"center",gap:"10px"}}>
                        {channelLogos ? <img src={item.logo||null} style={{width:"60px", height:"60px"}}></img> : <img  src={`https://flagsapi.com/${item.region}/flat/64.png`} style={{width:"60px", height:"60px"}}></img>}
                        <p style={{width:"100%"}}>{item.name}</p>


                        
                            {mode!="news" && (
                            <div onClick={c=>{
                                c.stopPropagation()
                                const response=AddElementToFavorites(item.name,item.url,playlist[0].type,subname)
                                const svg = c.currentTarget.querySelector("svg polygon");
                                if(response==1 && svg){
                                    svg.setAttribute("fill", "#4EA8DE");
                                }else if(response==-1 && svg && mode=="favorites"){
                                    svg.setAttribute("fill", "none"); // Remove fill
                                    const button = c.currentTarget.closest("button");
                                    if (button) {
                                        (button as HTMLElement).style.display = "none";
                                    }
                                    
                                }
                                else if(response==-1 && svg){
                                    svg.setAttribute("fill", "none"); // Remove fill
                                }

                            }} 
                            style={{zIndex:"102",fontSize:"12px"} 
                                    
                            }>
                                <svg
                                className="starfavorites"
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#4EA8DE"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                >
                                <polygon points="12 2 15 11 23 11 17 16 19 24 12 19 5 24 7 16 1 11 9 11" 
                                fill={item.favorite ? "#4EA8DE" : "none"}/>
                                </svg>
                            </div>
                        )}
                            

                        </button>
                        
                })}

                <h1 id="nocontentavaliable" style={{display:"none",textAlign:"center"}}>No content avaliable</h1>
            </div>
            
        </div>
    );
}

export default Sidebar

