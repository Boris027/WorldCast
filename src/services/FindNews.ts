
export async function findNews(country:string,countryname:string){

    let news:any
    try{
        news=await fetch("https://api.gdeltproject.org/api/v2/doc/doc?query=sourceCountry:"+country+"&mode=ArtList&format=json&timespan=1000").then(c=>{
        return c.json()
        })
    }catch(c){
        news=await fetch("https://api.gdeltproject.org/api/v2/doc/doc?query=sourceCountry:"+countryname+"&mode=ArtList&format=json&timespan=1000").then(c=>{
        return c.json()
        })
    }
    

    if(news?.articles && Array.isArray(news.articles)){
        const finalnews=news.articles.map((c:any)=>{
            return {tvgId:c.domain,logo:c.socialimage,group:c.sourcecountry,name:c.title,url:c.url,type:"news"}
        })
        return finalnews
    }else{
        return [{tvgId:"",logo:"",group:"",name:"",url:"",type:"news"}]
    }
    


}