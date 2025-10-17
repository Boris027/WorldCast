export async function SetWorldRotation(type:boolean){
    cookieStore.set("rotation",type+"")
}

export async function GetWorldRotation():Promise<boolean>{
    const rotation=await cookieStore.get("rotation")

    if(rotation?.value!=undefined){
        return JSON.parse(rotation.value)
    }else{
        await SetWorldRotation(true)
        return true;
    }

}

export async function SetClouds(type:boolean){
    cookieStore.set("clouds",type+"")
}

export async function GetClouds():Promise<boolean>{
    const clouds=await cookieStore.get("clouds")

    if(clouds?.value!=undefined){
        return JSON.parse(clouds.value)
    }else{
        await SetClouds(true)
        return true;
    }

}


export async function SetTransparent(type:boolean){
    cookieStore.set("transparent",type+"")
}

export async function GetTransparent():Promise<boolean>{
    const transparent=await cookieStore.get("transparent")
    if(transparent?.value!=undefined){
        return JSON.parse(transparent.value)
    }else{
        await SetTransparent(false)
        return false;
    }

}
