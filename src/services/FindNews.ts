
export async function findNews(country:String){

    const news=await fetch("https://api.gdeltproject.org/api/v2/doc/doc?query=sourceCountry:"+country+"&mode=ArtList&format=json&timespan=1000").then(c=>{
        return c.json()
    })
    console.log(news)

    return news
}