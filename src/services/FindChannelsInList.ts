'use client';
import { listPlaylist } from "@/interfaces/listPlaylist";
import metadata from "@/assets/datasets/countries_metadata.json"
let finallist:listPlaylist[]=[]

//function which loads the playlist
export async function loadPlaylist(country:string,subname:string) {
  let lists
  //check if the country is in the list and if it has channels, if it has it loads the channels from the directory
  //if it doesnt work it uses the iptv api
  if(metadata.hasOwnProperty(subname)){
    const key = subname as keyof typeof metadata;
    const countryMetadata = metadata[key];
    if(countryMetadata.hasChannels){
      const moduleJSON = (await import(`@/assets/playlist/tv-tested/${subname.toLowerCase()}.json`)).default;
      //console.log(moduleJSON)
      //map and return the checked channels
      lists=moduleJSON.map((c: { name: any; nanoid: any; iptv_urls:any[]; youtube_urls:any[] })=>{
        let finalurl
        if(c.youtube_urls.length>0){
          finalurl=c.youtube_urls[0]
        }else{
          finalurl=c.iptv_urls[0]
        }

        return {
          name:c.name,
          tvgId:c.nanoid,
          logo: "",
          group: country,
          url:finalurl,
          type:"tv",
          region:subname
        }
      })

    }else{
      //if the country doesnt have channels load from iptv api
      lists= await getPlayList(country,subname)
    }
  }else{
    //if the country doesnt exist in metadata load from iptv api
    lists= await getPlayList(country,subname)
  }

  return lists
}

//Function to get playlist from iptv api
async function getPlayList(country:string,subname:string){
  //Fix country names
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
  //Load the full list only once
  if(Object.keys(finallist).length === 0){

    finallist=await convertM3UtoJSON("https://iptv-org.github.io/iptv/index.country.m3u",subname)
    
  }
  //Filter by country
  const list2=finallist.filter(c=>c.group==country)
  return list2
  
}


//Function to convert M3U to JSON
async function convertM3UtoJSON(url: string,subname:string): Promise<listPlaylist[]> {
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
        type:"tv",
        region:subname
      });
    }
  }
  return channels;
}