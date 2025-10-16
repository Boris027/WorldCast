"use client"; // important!

import Image from "next/image";
import GlobeComponent from "@/components/GlobeComponent"
import VideoPlayer from "@/components/VideoPlayer"
import {loadPlaylist} from "@/services/FindChannelsInList"
import Sidebar from "@/components/SideBar";
import { listPlaylist } from "@/interfaces/listPlaylist";
import { useState } from "react";
import { findNews } from "@/services/FindNews";
export default function Home() {

  async function getCountryPlaylists(country:string,subname:string){
    setPlaylist(await loadPlaylist(country))
    findNews(country)
  }

  async function onClickPlaylist(url:string){
    console.log(url)
  }

  const [playlist,setPlaylist] = useState<listPlaylist[]>([]);


  return (
    /*className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20"*/
    <div>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <GlobeComponent onClickCountry={getCountryPlaylists}></GlobeComponent>
        
        <Sidebar playlist={playlist} onClickPlaylist={onClickPlaylist}></Sidebar>
        <VideoPlayer url={"https://streaming004.gestec-video.com/hls/MIJAS.m3u8"} ></VideoPlayer>
        

        
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
