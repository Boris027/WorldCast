import { GetClouds, GetTransparent, GetWorldRotation, SetClouds, SetTransparent, SetWorldRotation } from "@/services/DataFromStorage";
import { useEffect, useState } from "react";

interface TooglePanelProps {
  TooglePanelchanges: () => void; // callback from parent
}

const TooglePanel:React.FC<TooglePanelProps>=({ TooglePanelchanges }:any)=>{

    const [checked, setChecked] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);

    useEffect(() => {
        async function getStates(){
            setChecked(await GetWorldRotation())
            setChecked2(await GetClouds())
            setChecked3(await GetTransparent())
        }

        getStates()
        
    },[])

    

    return <div style={{display:"flex",flexDirection:"column",gap:"10px", position:"fixed", bottom:"10px",left:"20px"}}>

        
        <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox"  value="" className="sr-only peer" checked={checked} onChange={(e) => {
                setChecked(e.target.checked)
                SetWorldRotation(e.target.checked)
                TooglePanelchanges()
                }}/>
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Rotating</span>
        </label>

        <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox"  value="" className="sr-only peer" checked={checked2} onChange={(e) => {
                setChecked2(e.target.checked)
                SetClouds(e.target.checked)
                TooglePanelchanges()
                }}/>
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Clouds</span>
        </label>

        <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox"  value="" className="sr-only peer" checked={checked3} onChange={(e) => {
                setChecked3(e.target.checked)
                SetTransparent(e.target.checked)
                TooglePanelchanges()}}/>
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Transparent Country</span>
        </label>

        <div className="w-max mx-auto mt-10">
            <div className="flex rounded-full border border-gray-300 overflow-hidden">
                <button className="toggle-btn px-6 py-2 bg-blue-500 text-white" data-value="tv">TV</button>
                <button className="toggle-btn px-6 py-2 bg-gray-200 text-gray-700" data-value="radio">Radio</button>
                <button className="toggle-btn px-6 py-2 bg-gray-200 text-gray-700" data-value="news">News</button>
            </div>
        </div>
        

    </div>

}

export default TooglePanel