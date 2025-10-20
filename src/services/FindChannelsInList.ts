'use client';
import { listPlaylist } from "@/interfaces/listPlaylist";
import path from "path"; 
import { useEffect, useState } from 'react';
import { any } from "three/tsl";
import metadata from "@/assets/datasets/countries_metadata.json"
let finallist:listPlaylist[]=[]


export async function loadPlaylist(country:string,subname:string) {
  let lists
  if(metadata.hasOwnProperty(subname)){
    const key = subname as keyof typeof metadata;
    const countryMetadata = metadata[key];
    console.log(countryMetadata)
    if(countryMetadata.hasChannels){
      const moduleJSON = (await import(`@/assets/playlist/tv-tested/${subname.toLowerCase()}.json`)).default;
      
      lists=moduleJSON.map((c: { name: any; nanoid: any; iptv_urls:any[] })=>{
        return {
          name:c.name,
          tvgId:c.nanoid,
          logo: "",
          group: country,
          url:c.iptv_urls[0],
          type:"tv"
        }
      })

    }else{
      lists= await getPlayList(country,subname)
    }
  }else{
    lists= await getPlayList(country,subname)
  }

  return lists
}

async function getPlayList(country:string,subname:String){

  if(country=="United States of America"){
    country="United States"
  }else if(country=="Macedonia"){
    country="North Macedonia"
  }else if(country=="Republic of Serbia"){
    country="Serbia"
  }else if(country=="Czechia"){
    country="Czech Republic"
  }else if(country=="United Republic of Tanzania"){
    country="Tanzania"
  }else if(country=="Turkey"){
    country="Turkiye"
  }

  if(Object.keys(finallist).length === 0){

    finallist=await convertM3UtoJSON("https://iptv-org.github.io/iptv/index.country.m3u")
    
  }

  const list2=finallist.filter(c=>c.group==country)
  return list2
  
}



async function convertM3UtoJSON(url: string): Promise<listPlaylist[]> {
  const res = await fetch(url);
  const text = await res.text();
  const lines = text.split('\n');

  const channels: listPlaylist[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith('#EXTINF')) {
      const tvgIdMatch = line.match(/tvg-id="(.*?)"/);
      const logoMatch = line.match(/tvg-logo="(.*?)"/);
      const groupMatch = line.match(/group-title="(.*?)"/);

      // Name = text after the last comma
      const lastComma = line.lastIndexOf(',');
      const name = lastComma !== -1 ? line.slice(lastComma + 1).trim() : 'Unknown';

      // Find the next non-empty, non-comment line as the URL
      let url = '';
      for (let j = i + 1; j < lines.length; j++) {
        const nextLine = lines[j].trim();
        if (nextLine && !nextLine.startsWith('#')) {
          url = nextLine;
          break;
        }
      }

      channels.push({
        name,
        tvgId: tvgIdMatch ? tvgIdMatch[1] : null,
        logo: logoMatch ? logoMatch[1] : null,
        group: groupMatch ? groupMatch[1] : null,
        url,
        type:"tv"
      });
    }
  }
  return channels;
}

async function convertM3UtoJSON1(url:string):Promise<listPlaylist[]> {
  const res = await fetch(url);
  const text = await res.text();
  const lines = text.split('\n');

  const channels = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith('#EXTINF')) {
      const nameMatch = line.match(/,(.*)$/);
      const name = nameMatch ? nameMatch[1].trim() : 'Unknown';
      const tvgIdMatch = line.match(/tvg-id="(.*?)"/);
      const logoMatch = line.match(/tvg-logo="(.*?)"/);
      const groupMatch = line.match(/group-title="(.*?)"/);
      const url = lines[i + 1]?.trim();

      channels.push({
        name,
        tvgId: tvgIdMatch ? tvgIdMatch[1] : null,
        logo: logoMatch ? logoMatch[1] : null,
        group: groupMatch ? groupMatch[1] : null,
        url,
        type:"tv"
      });
    }
  }
  return channels;
}

