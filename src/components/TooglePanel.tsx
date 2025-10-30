import { GetClouds, GetTransparent, GetWorldRotation, SetClouds, SetTransparent, SetWorldRotation } from "@/services/DataFromStorage";
import { useEffect, useState } from "react";
//Define the props for the toggle panel
interface TooglePanelProps {
  TooglePanelchanges: () => void; // callback from parent
  mode:string,
  changeMode:(mode:string)=>void
  setaboutsectionenabled:(value:boolean)=>void
  clickopenfavorites:()=>void
}
//Toggle panel component
const TooglePanel:React.FC<TooglePanelProps>=({ TooglePanelchanges,mode,changeMode,setaboutsectionenabled,clickopenfavorites }:any)=>{
    //States for toggles
    const [checked, setChecked] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    //Use effect to get initial states
    useEffect(() => {
        async function getStates(){
            setChecked(GetWorldRotation())
            setChecked2(GetClouds())
            setChecked3(GetTransparent())
        }

        getStates()
        
        changeActivation(mode)
    },[])
    //Function to change button activation
    function changeActivation(modexd:string){
        if(modexd=="tv"){
            document.getElementById("tv")?.classList.replace("text-gray-700","text-white")
            document.getElementById("tv")?.classList.replace("bg-gray-200","bg-blue-500")
            document.getElementById("radio")?.classList.replace("bg-blue-500","bg-gray-200")
            document.getElementById("radio")?.classList.replace("text-white","text-gray-700")
            document.getElementById("news")?.classList.replace("bg-blue-500","bg-gray-200")
            document.getElementById("news")?.classList.replace("text-white","text-gray-700")
        }else if(modexd=="radio"){
            document.getElementById("radio")?.classList.replace("text-gray-700","text-white")
            document.getElementById("radio")?.classList.replace("bg-gray-200","bg-blue-500")
            document.getElementById("tv")?.classList.replace("bg-blue-500","bg-gray-200")
            document.getElementById("tv")?.classList.replace("text-white","text-gray-700")
            document.getElementById("news")?.classList.replace("bg-blue-500","bg-gray-200")
            document.getElementById("news")?.classList.replace("text-white","text-gray-700")
        }else if(modexd=="news"){
            document.getElementById("news")?.classList.replace("text-gray-700","text-white")
            document.getElementById("news")?.classList.replace("bg-gray-200","bg-blue-500")
            document.getElementById("tv")?.classList.replace("bg-blue-500","bg-gray-200")
            document.getElementById("tv")?.classList.replace("text-white","text-gray-700")
            document.getElementById("radio")?.classList.replace("bg-blue-500","bg-gray-200")
            document.getElementById("radio")?.classList.replace("text-white","text-gray-700")
        }else if(modexd=="favorites"){
            document.getElementById("news")?.classList.replace("bg-blue-500","bg-gray-200")
            document.getElementById("news")?.classList.replace("text-white","text-gray-700")
            document.getElementById("tv")?.classList.replace("bg-blue-500","bg-gray-200")
            document.getElementById("tv")?.classList.replace("text-white","text-gray-700")
            document.getElementById("radio")?.classList.replace("bg-blue-500","bg-gray-200")
            document.getElementById("radio")?.classList.replace("text-white","text-gray-700")
        }
        
    }

    

    return <div style={{display:"flex",flexDirection:"column",gap:"10px", position:"fixed", bottom:"20px",left:"20px",alignItems:"flex-start",pointerEvents:"none"}}>

        <button style={{textAlign:"left",cursor:"pointer",alignSelf: "flex-start",pointerEvents:"auto"}} onClick={c=>{
            clickopenfavorites()
            changeActivation("favorites")
            }}>
            <div style={{display:"flex",alignItems:"end",gap:"10px"}}>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4EA8DE"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                >
                <polygon points="12 2 15 11 23 11 17 16 19 24 12 19 5 24 7 16 1 11 9 11" />
                </svg>

                <p style={{display:"inline"}}>Favorites</p>
            </div>
        </button>

        <button style={{textAlign:"left",cursor:"pointer",alignSelf: "flex-start",pointerEvents:"auto"}} onClick={c=>{
            setaboutsectionenabled(true)
            }}>
            <div style={{display:"flex",alignItems:"end",gap:"10px"}}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4EA8DE"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <p style={{display:"inline"}}>About</p>
            </div>
        </button>
        
        <label className="inline-flex items-center cursor-pointer" style={{pointerEvents:"auto"}}>
            <input type="checkbox"  value="" className="sr-only peer" checked={checked} onChange={(e) => {
                setChecked(e.target.checked)
                SetWorldRotation(e.target.checked)
                TooglePanelchanges()
                }}/>
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Rotating</span>
        </label>

        <label className="inline-flex items-center cursor-pointer" style={{pointerEvents:"auto"}}>
            <input type="checkbox"  value="" className="sr-only peer" checked={checked2} onChange={(e) => {
                setChecked2(e.target.checked)
                SetClouds(e.target.checked)
                TooglePanelchanges()
                }}/>
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Clouds</span>
        </label>

        <label className="inline-flex items-center cursor-pointer" style={{pointerEvents:"auto",display:"none"}}>
            <input disabled type="checkbox"  value="" className="sr-only peer" checked={checked3} onChange={(e) => {
                setChecked3(e.target.checked)
                SetTransparent(e.target.checked)
                TooglePanelchanges()}}/>
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Transparent Country</span>
        </label>

        <div className="w-max mx-auto mt-10" style={{margin:"auto",pointerEvents:"auto"}} >
            <div className="flex rounded-full border border-gray-300 overflow-hidden">
                
                <button id="tv" className="toggle-btn px-6 py-2 bg-gray-200 text-gray-700 cursor-pointer" data-value="tv" onClick={c=>{
                    changeMode("tv")
                    changeActivation("tv")
                }}>TV</button>
                <button id="radio" className="toggle-btn px-6 py-2 bg-gray-200 text-gray-700 cursor-pointer" data-value="radio" onClick={c=>{
                    changeMode("radio")
                    changeActivation("radio")
                }}>Radio</button>
                <button id="news" className="toggle-btn px-6 py-2 bg-gray-200 text-gray-700 cursor-pointer" data-value="news" onClick={c=>{
                    changeMode("news")
                    changeActivation("news")
                }}>News</button>
            </div>
        </div>
        

    </div>

}

export default TooglePanel