"use client"; // important!

import Image from "next/image";
import GlobeComponent from "@/components/GlobeComponent"
import VideoPlayer from "@/components/VideoPlayer"
import {loadPlaylist} from "@/services/FindChannelsInList"
import Sidebar from "@/components/SideBar";
import { listPlaylist } from "@/interfaces/listPlaylist";
import { useEffect, useState } from "react";
import { findNews } from "@/services/FindNews";
import * as Cesium from "cesium";
import TooglePanel from "@/components/TooglePanel";
import { GetClouds, GetTransparent, GetWorldRotation } from "@/services/DataFromStorage";
import { GetRadio } from "@/services/FindRadioCountry";
import { getCountryFromUrl, getModeFromUrl, getSubnameCountryFromUrl, setCountry, setMode, useMode } from "./router";
import AudioPlayer from "@/components/AudioPlayer";

export default function Home() {  
  useEffect(() => {
    initializate()
  }, [])

  async function getCountryPlaylists(country:string,subname:string){
    const mode=getModeFromUrl()

    //set the country in params
    setMode(mode!)
    setCountry(country,subname)
    if(mode=="tv"){
      setPlaylist(await loadPlaylist(country))
    }else if(mode=="radio"){
      setPlaylist(await GetRadio(subname))
    }else if(mode=="news"){
      setPlaylist(await findNews(subname,country))
    }
    setCurrentcountry(country)
    setshowchannelsimage(false)
    setsubname(subname)
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
    if(modexd==mode) return;
    setMode(modexd)
    setCurrentmode(modexd)

    const country=getCountryFromUrl()
    const subnameCountry=getSubnameCountryFromUrl()
    console.log(country+" "+subnameCountry)
    if (typeof country === "string" && typeof subnameCountry==="string") {
      getCountryPlaylists(country, subnameCountry);
    } 
  }


  function initializate(){

    if(getModeFromUrl()==undefined){
      setMode("tv")
    }

    const country=getCountryFromUrl()
    const subnameCountry=getSubnameCountryFromUrl()
    console.log(country+" "+subnameCountry)
    if (typeof country === "string" && typeof subnameCountry==="string") {
      
      getCountryPlaylists(country,subnameCountry)

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
  

  return (
    /*className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20"*/
    <div>

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

        <Sidebar playlist={playlist} onClickPlaylist={onClickPlaylist} visibility={visibility} sidebarVisibility={sidebarVisibility} country={country} subname={subname} channelLogos={showchannelsimage} onClickAudio={onClickAudio} mode={mode}></Sidebar>
        <VideoPlayer url={currentUrl} nameplaylist={currentPlaylistname}></VideoPlayer>
        <AudioPlayer url={currentUrlRadio} nameplaylist={currentRadiolistname}></AudioPlayer>
        <TooglePanel TooglePanelchanges={TooglePanelchanges} mode={mode} changeMode={ChangeMode}></TooglePanel>
        
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );


}
