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
import { getModeFromUrl, setMode, useMode } from "./router";
import { mode } from "d3";

export default function Home() {

  //initializate to tv
  useMode()

  async function getCountryPlaylists(country:string,subname:string){
    setPlaylist(await loadPlaylist(country))
    setCurrentcountry(country)
    setshowchannelsimage(false)
    setsubname(subname)
    sidebarVisibility("block")
    //findNews(country)

    //GetRadio(subname)
  }

  async function onClickPlaylist(url:any,name:string){
    setCurrentUrl(url);
    setcurrentPlaylistname(name)
  }

  async function sidebarVisibility(state:string){
    setCurrentVisibility(state)
  }

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

  async function ChangeMode(modexd:string){
    if(modexd==mode) return;
    console.log("hello")
    setMode(modexd)
    setCurrentmode(modexd)
  }

  //playlist with all the channels
  const [playlist,setPlaylist] = useState<listPlaylist[]>([]);
  //url which will be reproduced by the videoplayer
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  //playlist name
  const [currentPlaylistname, setcurrentPlaylistname] = useState<string | null>(null);
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

        <Sidebar playlist={playlist} onClickPlaylist={onClickPlaylist} visibility={visibility} sidebarVisibility={sidebarVisibility} country={country} subname={subname} channelLogos={showchannelsimage}></Sidebar>
        <VideoPlayer url={currentUrl} nameplaylist={currentPlaylistname} onClickClose={onClickPlaylist}></VideoPlayer>
        <TooglePanel TooglePanelchanges={TooglePanelchanges} mode={mode} changeMode={ChangeMode}></TooglePanel>
        
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );


}
