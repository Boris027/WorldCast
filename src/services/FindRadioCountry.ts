const serversbackup=[
  {
    "ip": "2a01:4f9:c012:3620::1",
    "name": "fi1.api.radio-browser.info"
  },
  {
    "ip": "2a01:4f8:c2c:f004::1",
    "name": "de2.api.radio-browser.info"
  },
  {
    "ip": "2a0a:4cc0:c0:27c1::1",
    "name": "de1.api.radio-browser.info"
  },
  {
    "ip": "37.27.202.89",
    "name": "fi1.api.radio-browser.info"
  },
  {
    "ip": "152.53.85.3",
    "name": "de1.api.radio-browser.info"
  },
  {
    "ip": "162.55.180.156",
    "name": "de2.api.radio-browser.info"
  }
]

export async function GetRadio(countrycode:string){
    let stations
    const endpoint=`/json/stations/search?countrycode=${countrycode}&limit=100&offset=0&hidebroken=true`
    try {
        //const servers=await (await fetch("https://all.api.radio-browser.info/json/servers")).json()
        const url="https://all.api.radio-browser.info/json/servers"
        const servers=await (await fetch(`/api/proxy?url=${encodeURIComponent(url)}`)).json()
        //stations = await api.searchStations({
        //countryCode: countrycode,
        //limit: 100,
        //offset: 0 // this is the default - can be omited
        //})    
        for(const server of servers){
            try {
                stations=await (await fetch("https://"+server.name+endpoint)).json()
                if(stations){
                    console.log(server.name+" worked")
                    break;
                }
            } catch (error) {
                stations=undefined
                console.log(server.name+" is not working")
            }
        }

    } catch (error) {
        console.log("the server backup worked")
        for(const server of serversbackup){
            try {
                stations=await (await fetch("https://"+server.name+endpoint)).json()
                if(stations){
                    break;
                }
            } catch (error) {
                stations=undefined
                console.log(server.name+" is not working")
            }
        }
    }
    

    if(stations!=undefined){
        const final=stations.map((c: { changeId: any; favicon: any; country: any; name: any; url: any })=>{
            return {tvgId:c.changeId,logo:c.favicon,group:c.country,name:c.name,url:c.url,type:"radio",region:countrycode}
        })
        return final;
    }else{
        return []
    }
    


}

