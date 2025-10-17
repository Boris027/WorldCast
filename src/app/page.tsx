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

export default function Home() {

  async function getCountryPlaylists(country:string,subname:string){
    setPlaylist(await loadPlaylist(country))
    setCurrentcountry(country)
    sidebarVisibility("block")
    findNews(country)
  }

  async function onClickPlaylist(url:any,name:string){
    setCurrentUrl(url);
    setcurrentPlaylistname(name)
  }

  async function sidebarVisibility(state:string){
    setCurrentVisibility(state)
  }

  const [playlist,setPlaylist] = useState<listPlaylist[]>([]);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [currentPlaylistname, setcurrentPlaylistname] = useState<string | null>(null);
  const [visibility,setCurrentVisibility]=useState<string>("none")
  const [country,setCurrentcountry]=useState<string>("none")

  /*useEffect(() => {
    const initCesium = async () => {
      // Wait for Cesium's world terrain
      const terrainProvider = await Cesium.createWorldTerrainAsync();

      // Initialize viewer ONLY here, after the div exists
      const viewer = new Cesium.Viewer("cesiumContainer", { terrainProvider });

      // Optional: cleanup on unmount
      return () => viewer.destroy();
    };

    initCesium();
  }, []);*/
  /*<div id="cesiumContainer"></div> */

  return (
    /*className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20"*/
    <div>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <GlobeComponent onClickCountry={getCountryPlaylists}></GlobeComponent>

        <Sidebar playlist={playlist} onClickPlaylist={onClickPlaylist} visibility={visibility} sidebarVisibility={sidebarVisibility} country={country}></Sidebar>
        <VideoPlayer url={currentUrl} nameplaylist={currentPlaylistname} onClickClose={onClickPlaylist}></VideoPlayer>

        
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );


}
