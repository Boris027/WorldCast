import { RadioBrowserApi, StationSearchType } from 'radio-browser-api'

const api = new RadioBrowserApi('My Radio App')


export async function GetRadio(countrycode:string){

    let stations
    try {
        stations = await api.searchStations({
        countryCode: countrycode,
        limit: 100,
        offset: 0 // this is the default - can be omited
    })
    } catch (error) {
        stations=undefined
    }
    

    if(stations!=undefined){
        const final=stations.map(c=>{
            return {tvgId:c.changeId,logo:c.favicon,group:c.country,name:c.name,url:c.url,type:"radio"}
        })
        return final;
    }else{
        return [{tvgId:null,logo:null,group:null,name:null,url:null,type:"radio"}]
    }
    


}

