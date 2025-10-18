import { RadioBrowserApi, StationSearchType } from 'radio-browser-api'

const api = new RadioBrowserApi('My Radio App')

export async function GetRadio(countrycode:string){

    const stations = await api.searchStations({
        countryCode: countrycode,
        limit: 100,
        offset: 0 // this is the default - can be omited
    })

    console.log(stations)

}

