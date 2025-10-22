"use client"; // important!

import Image from "next/image";
import GlobeComponent from "@/components/GlobeComponent"
import VideoPlayer from "@/components/VideoPlayer"
import {loadPlaylist} from "@/services/FindChannelsInList"
import Sidebar from "@/components/SideBar";
import { listPlaylist } from "@/interfaces/listPlaylist";
import { useEffect, useState } from "react";
import { findNews } from "@/services/FindNews";
import TooglePanel from "@/components/TooglePanel";
import { GetClouds, GetFavoriteChannels, GetFavoriteRadios, GetTransparent, GetWelcomeMessage, GetWorldRotation, RemoveFavoriteChannel, RemoveFavoriteRadio, SetFavoriteChannels, SetFavoriteRadios, SetWelcomeMessage } from "@/services/DataFromStorage";
import { GetRadio } from "@/services/FindRadioCountry";
import { getCountryFromUrl, getModeFromUrl, getSubnameCountryFromUrl, setCountry, setMode, useMode } from "./router";
import AudioPlayer from "@/components/AudioPlayer";
import iconapp from "@/assets/images/iconapp.png"
import WelcomeMessage from "@/components/WelcomeMessage";
import AboutComponent from "@/components/AboutComponent";
export default function Home() {  

  useEffect(() => {
    initializate()
  }, [])

  async function getCountryPlaylists(country:string,subname:string){
    const mode=getModeFromUrl()
    console.log(mode)
    //set the country in params
    setMode(mode!)
    if(mode!="favorites"){
     setCountry(country,subname) 
    }

    
    if(mode=="tv"){
      const playlist=await loadPlaylist(country,subname)
      const favoriteplaylist=GetFavoriteChannels()

      playlist.map((c: { name: any; favorite: boolean; })=>{
        const channel=favoriteplaylist.find((x: { name: any; })=>x.name==c.name)
        if(channel){
          c.favorite=true;
          return c;
        }else{
          c.favorite=false;
          return c;
        }
      })

      setPlaylist(playlist)
    }else if(mode=="radio"){

      const radiolist=await GetRadio(subname)
      const favoriteradiolist=GetFavoriteRadios()
      
      radiolist.map((c: { name: any; favorite: boolean; })=>{
        const channel=favoriteradiolist.find((x: { name: any; })=>x.name==c.name)
        if(channel){
          c.favorite=true;
          return c;
        }else{
          c.favorite=false;
          return c;
        }
      })

      setPlaylist(radiolist)
    }else if(mode=="news"){
      setPlaylist(await findNews(subname,country))
    }else if(mode=="favorites"){
      ChangeMode("favorites")
      setCurrentcountry("")
      let finalrray:any[]=[]
      finalrray =finalrray.concat(GetFavoriteChannels())
      finalrray =finalrray.concat(GetFavoriteRadios())
      console.log(finalrray)
      setPlaylist(finalrray)
    }

    if(mode!="favorites"){
     setCurrentcountry(country)
     setsubname(subname)
    }
    
    setshowchannelsimage(false)
    sidebarVisibility("block")
    //findNews(country)

    //GetRadio(subname)
  }

  //when you click a playlist in the sidebar in the tv mode
  async function onClickPlaylist(url:any,name:string){
    //to pause and hide the radio player
    setCurrentUrlRadio(null)
    setcurrentRadiolistname(null)
    //to enable and reproduce the tv player
    setCurrentUrl(url);
    setcurrentPlaylistname(name)
  }
  //when you click a radio in the sidebar in the radio mode
  async function onClickAudio(url:any,name:string){
    //to pause and hide the tv player
    setCurrentUrl(null);
    setcurrentPlaylistname(null)
    //to enable and reproduce the radio player
    setCurrentUrlRadio(url)
    setcurrentRadiolistname(name)
  }
  //to hide or show the sidebar
  async function sidebarVisibility(state:string){
    setCurrentVisibility(state)
  }
  //to scan an change things in the TooglPanel
  async function TooglePanelchanges(){
    if(GetWorldRotation()!=rotation){
      setrotation(!rotation)
    }

    if(GetClouds()!=clouds){
      setclouds(!clouds)
    }

    if(GetTransparent()!=transparency){
      settransparency(!transparency)
    }
  }
  //To change the mode between TV, RADIO, NEWS
  async function ChangeMode(modexd:string){
    //if(modexd==mode) return;
    if(getModeFromUrl()=="favorites"){
      setCurrentVisibility("none")
      setCountry("","")
    }
    setMode(modexd)
    setCurrentmode(modexd)

    const country=getCountryFromUrl()
    const subnameCountry=getSubnameCountryFromUrl()
    if (typeof country === "string" && typeof subnameCountry==="string") {
      getCountryPlaylists(country, subnameCountry);
    } 
  }

  function AcceptWelcomeMessage(){
    SetWelcomeMessage(true)
    setwelcomemessageviewed(true)
  }

  function clickopenfavorites(){
    setMode("favorites")
    setCountry("","")
    setsubname("")
    setCurrentcountry("")
    getCountryPlaylists("","")
  }

  function AddElementToFavorites(name:string,url:string,type:string,region:string){
    
    if(type=="tv"){

      const channels=GetFavoriteChannels()

      const exists = channels.some((c: { name: string }) => c.name === name);
      if (exists) {
        RemoveFavoriteChannel(name);
        return -1
      }else{
        SetFavoriteChannels(name,url,type,region)
        return 1;
      }


      
    }else if(type=="radio"){
      const radios=GetFavoriteRadios()

      const exists = radios.some((c: { name: string }) => c.name === name);
      if (exists) {
        RemoveFavoriteRadio(name);
        return -1
      }else{
        SetFavoriteRadios(name,url,type,region)
        return 1;
      }
    }

  }


  function initializate(){

    
    if(getModeFromUrl()==undefined){
      setMode("tv")
    }

    const country=getCountryFromUrl()
    const subnameCountry=getSubnameCountryFromUrl()
    if (typeof country === "string" && typeof subnameCountry==="string") {
      getCountryPlaylists(country,subnameCountry)
    } else{
      getCountryPlaylists("","")
    }
  }



  
  
  //url which will be reproduced by the videoplayer
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  //url which will be reproduced by the radiooplayer
  const [currentUrlRadio, setCurrentUrlRadio] = useState<string | null>(null);
  //playlist name
  const [currentPlaylistname, setcurrentPlaylistname] = useState<string | null>(null);
  //Radiolist name
  const [currentRadiolistname, setcurrentRadiolistname] = useState<string | null>(null);
  //the sidebar visibility
  const [visibility,setCurrentVisibility]=useState<string>("none")
  //the name of the country selected
  const [country,setCurrentcountry]=useState<string>("none")
  //boolean if you want to load each channel logo
  const [showchannelsimage,setshowchannelsimage]=useState<boolean>(false)
  //the subname of each country for example "ES" for Spain
  const [subname,setsubname]=useState<string>("none")
  //Planet rotation
  const [rotation,setrotation]=useState<boolean | null>(GetWorldRotation())
  //Clouds enabled
  const [clouds,setclouds]=useState<boolean | null>(GetClouds())
  //Transparency Country
  const [transparency,settransparency]=useState<boolean | null>(GetTransparent())
  //Mode (tv,radio,news)
  const [mode,setCurrentmode]=useState<string>(getModeFromUrl()!)
  //playlist with all the channels
  const [playlist,setPlaylist] = useState<listPlaylist[]>([]);
  //it has the state true or false depending if we have accepted the welcome message
  const [welcomemessageviewed,setwelcomemessageviewed] = useState<boolean>(GetWelcomeMessage());
  //it is true or false depending if you want to see the about section or not
  const [aboutsectionenabled,setaboutsectionenabled] = useState<boolean>(false);
  

  return (
    /*className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20"*/
    <div>

      <img src={iconapp.src} style={{position:"absolute",zIndex:"100",width:"60px", left:"20px",top:"20px",cursor:"pointer"}} onClick={c=>{
        window.location.reload()
      }}></img>
      <main id="main" className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {rotation !== null && clouds !== null && transparency !== null ? (
          <GlobeComponent
            onClickCountry={getCountryPlaylists}
            rotating={rotation}
            cloudsenabled={clouds}
            transparency={transparency}
          />
        ) : (
          <p>Loading globe...</p>
        )}

        <Sidebar playlist={playlist} onClickPlaylist={onClickPlaylist} visibility={visibility} sidebarVisibility={sidebarVisibility} country={country} subname={subname} channelLogos={showchannelsimage} onClickAudio={onClickAudio} mode={mode} AddElementToFavorites={AddElementToFavorites}></Sidebar>
        <VideoPlayer url={currentUrl} nameplaylist={currentPlaylistname} setvideourl={setCurrentUrl}></VideoPlayer>
        <AudioPlayer url={currentUrlRadio} nameplaylist={currentRadiolistname} setradiourl={setCurrentUrlRadio}></AudioPlayer>
        <TooglePanel TooglePanelchanges={TooglePanelchanges} mode={mode} changeMode={ChangeMode} setaboutsectionenabled={setaboutsectionenabled} clickopenfavorites={clickopenfavorites}></TooglePanel>
        <AboutComponent aboutsectionenabled={aboutsectionenabled} setaboutsectionenabled={setaboutsectionenabled}></AboutComponent>
        <WelcomeMessage welcomemessageviewed={welcomemessageviewed} AcceptWelcomeMessage={AcceptWelcomeMessage}></WelcomeMessage>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );


}
