import metadata from "@/assets/datasets/countries_metadata.json"
import { stringify } from "querystring";

export function SetWorldRotation(type:boolean){
    if (typeof window === "undefined") return true;
    localStorage.setItem("rotation",type+"")
}

export function GetWorldRotation():boolean{
    if (typeof window === "undefined") return true;
    const rotation=localStorage.getItem("rotation")
    

    if(rotation!=undefined){
        return JSON.parse(rotation)
    }else{
        SetWorldRotation(true)
        return true;
    }

}

export function SetClouds(type:boolean){
    if (typeof window === "undefined") return true;
    localStorage.setItem("clouds",type+"")
}

export function GetClouds():boolean{
    if (typeof window === "undefined") return true;
    const clouds=localStorage.getItem("clouds")

    if(clouds!=undefined){
        return JSON.parse(clouds)
    }else{
        SetClouds(true)
        return true;
    }

}


export function SetTransparent(type:boolean){
    if (typeof window === "undefined") return true;
    localStorage.setItem("transparent",type+"")
}

export function GetTransparent():boolean{
    if (typeof window === "undefined") return true;
    const transparent=localStorage.getItem("transparent")
    if(transparent!=undefined){
        return JSON.parse(transparent)
    }else{
        SetTransparent(false)
        return false;
    }

}

export function GetWelcomeMessage():boolean{
    if (typeof window === "undefined") return true;
    const transparent=localStorage.getItem("welcomemessage")
    if(transparent!=undefined){
        return JSON.parse(transparent)
    }else{
        SetTransparent(false)
        return false;
    }
}

export function SetWelcomeMessage(type:any){
    if (typeof window === "undefined") return true;
    localStorage.setItem("welcomemessage",type+"")
}


export function GetCapital(subname:string){
    if(metadata.hasOwnProperty(subname)){
        const key = subname as keyof typeof metadata;
        const countryMetadata = metadata[key];
        return countryMetadata.capital
    }
}

export function GetTimeZone(subname:string){
    if(metadata.hasOwnProperty(subname)){
        const key = subname as keyof typeof metadata;
        const countryMetadata = metadata[key];
        return countryMetadata.timeZone
    }
}

export function SetFavoriteChannels(name:string,channelurl:string,type:string,countrysubname:string){
    if (typeof window === "undefined") return true;
    const content=GetFavoriteChannels()
    content.push({name:name,url:channelurl,type:type,region:countrysubname,favorite:true})
    localStorage.setItem("favoritechannels",JSON.stringify(content))
}

export function RemoveFavoriteChannel(name:string){
    if (typeof window === "undefined") return true;
    const content=GetFavoriteChannels()
    const newcontent=content.filter((c: { name: any; })=>{return c.name!=name})
    localStorage.setItem("favoritechannels",JSON.stringify(newcontent))
}

export function GetFavoriteChannels(){
    if (typeof window === "undefined") return true;

    const content=localStorage.getItem("favoritechannels")
    if(content!=null && content!="" && content!=undefined){
        return JSON.parse(content);
    }else{
        localStorage.setItem("favoritechannels",JSON.stringify([]))
        return []
    }
}


export function SetFavoriteRadios(name:string,channelurl:string,iconurl:string,type:string,countrysubname:string){
    if (typeof window === "undefined") return true;
    const content=GetFavoriteRadios()
    content.push({name:name,url:channelurl,icon:iconurl,type:type,favorite:true,region:countrysubname})
    localStorage.setItem("favoriteradios",JSON.stringify(content))
}

export function RemoveFavoriteRadio(name:string){
    if (typeof window === "undefined") return true;
    const content=GetFavoriteRadios()
    const newcontent=content.filter((c: { name: any; })=>{return c.name!=name})
    localStorage.setItem("favoriteradios",JSON.stringify(newcontent))
}

export function GetFavoriteRadios(){
    if (typeof window === "undefined") return true;

    const content=localStorage.getItem("favoriteradios")
    if(content!=null && content!="" && content!=undefined){
        return JSON.parse(content);
    }else{
        localStorage.setItem("favoriteradios",JSON.stringify([]))
        return []
    }
}
