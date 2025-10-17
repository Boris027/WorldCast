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

export default function Home() {

  async function getCountryPlaylists(country:string,subname:string){
    setPlaylist(await loadPlaylist(country))
    setCurrentcountry(country)
    setshowchannelsimage(false)
    setsubname(subname)
    sidebarVisibility("block")
    //findNews(country)
  }

  async function onClickPlaylist(url:any,name:string){
    setCurrentUrl(url);
    setcurrentPlaylistname(name)
  }

  async function sidebarVisibility(state:string){
    setCurrentVisibility(state)
  }

  async function TooglePanelchanges(){

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
  const [rotation,setrotation]=useState<boolean>(false)
  //Clouds enabled
  const [clouds,setclouds]=useState<boolean>(false)
  //Transparency Country
  const [transparency,settransparency]=useState<boolean>(false)
  

  return (
    /*className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20"*/
    <div>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <GlobeComponent onClickCountry={getCountryPlaylists} rotating={rotation} cloudsenabled={clouds} transparency={transparency}></GlobeComponent>

        <Sidebar playlist={playlist} onClickPlaylist={onClickPlaylist} visibility={visibility} sidebarVisibility={sidebarVisibility} country={country} subname={subname} channelLogos={showchannelsimage}></Sidebar>
        <VideoPlayer url={currentUrl} nameplaylist={currentPlaylistname} onClickClose={onClickPlaylist}></VideoPlayer>
        <TooglePanel></TooglePanel>
        
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );


}
