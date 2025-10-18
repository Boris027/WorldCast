import { RadioBrowserApi, StationSearchType } from 'radio-browser-api'

const api = new RadioBrowserApi('My Radio App')


export async function GetRadio(countrycode:string){

    const stations = await api.searchStations({
        countryCode: countrycode,
        limit: 100,
        offset: 0 // this is the default - can be omited
    })

    if(stations!=undefined){
        const final=stations.map(c=>{
        return {tvgId:c.changeId,logo:c.favicon,group:c.country,name:c.name,url:c.url}
        })
        return final;
    }else{
        return [{tvgId:"",logo:"",group:"",name:"",url:""}]
    }
    


}

