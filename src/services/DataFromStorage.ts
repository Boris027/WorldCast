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
