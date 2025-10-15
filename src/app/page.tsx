"use client"; // important!

import Image from "next/image";
import GlobeComponent from "@/components/GlobeComponent"
import VideoPlayer from "@/components/VideoPlayer"
export default function Home() {

  function printcountry(country:string,subname:string){
    console.log(country)
    console.log(subname)
  }

  return (
    /*className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20"*/
    <div>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <GlobeComponent onClickCountry={printcountry}></GlobeComponent>
        <VideoPlayer url={"https://streaming004.gestec-video.com/hls/MIJAS.m3u8"} ></VideoPlayer>

        
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
