
export async function findNews(country:string,countryname:string){
    let news:any
    //Fetch news from gdelt api
    try{
        //try to use the countryname first "Spain" instead of "ES"
        const url="https://api.gdeltproject.org/api/v2/doc/doc?query=sourceCountry:"+countryname+"&mode=ArtList&format=json&timespan=1000"
        /*const googlenews=await fetch(`https://news.google.com/rss?hl=en&gl=${country}&ceid=${country}:en`)
        console.log(googlenews)*/
            news=await fetch(url).then(c=>{
            //transform to json
            return c.json()
        })
    }catch(c){
        try{
            //try to use the country first "ES" instead of "Spain"
            const url="https://api.gdeltproject.org/api/v2/doc/doc?query=sourceCountry:"+country+"&mode=ArtList&format=json&timespan=1000"
            news=await fetch(url).then(c=>{
                //transform to json
                return c.json()
            })
        }catch(x){
            //if all fails return null
            news=null
        }
        
    }
    
    //map the news to the listPlaylist format
    if(news?.articles && Array.isArray(news.articles)){
        const finalnews=news.articles.map((c:any)=>{
            return {tvgId:c.domain,logo:c.socialimage,group:c.sourcecountry,name:c.title,url:c.url,type:"news",region:country}
        })
        //console.log(finalnews)
        return finalnews
    }else{
        //if no news found return empty array
        return []
    }
    


}