//array of backup servers in case the main api radio browser servers are down or doesnt work
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
//Function to get radio stations by country code "ES"
export async function GetRadio(countrycode:string){
    let stations
    const endpoint=`/json/stations/search?countrycode=${countrycode}&limit=100&offset=0&hidebroken=true`
    try {
        //First try to get the servers from the main api
        const url="https://all.api.radio-browser.info/json/servers"
        const servers=await (await fetch(`/api/proxy?url=${encodeURIComponent(url)}`)).json()
        for(const server of servers){
            try {
                //Try to get the stations from the main servers
                stations=await (await fetch("https://"+server.name+endpoint)).json()
                if(stations){
                  console.log(server.name+" worked")
                  break;
                }
            } catch (error) {
              //If it fails set stations to undefined
              stations=undefined
              console.log(server.name+" is not working")
            }
        }

    } catch (error) {
        //If the main api fails use the backup servers
        console.log("the server backup worked")
        for(const server of serversbackup){
            try {
                //Try to get the stations from the backup servers
                stations=await (await fetch("https://"+server.name+endpoint)).json()
                if(stations){
                    break;
                }
            } catch (error) {
                //If it fails set stations to undefined
                stations=undefined
                console.log(server.name+" is not working")
            }
        }
    }
    
    //Map the stations to the listPlaylist format if stations is not undefined
    if(stations!=undefined){
        const final=stations.map((c: { changeId: any; favicon: any; country: any; name: any; url: any })=>{
            return {tvgId:c.changeId,logo:c.favicon,group:c.country,name:c.name,url:c.url,type:"radio",region:countrycode}
        })
        return final;
    }else{
        //If the stations are undefined return empty array
        return []
    }
    


}

