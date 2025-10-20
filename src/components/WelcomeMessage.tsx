"use client";

import { useEffect } from "react";

interface WelcomeMessageProps {
  welcomemessageviewed:boolean,
  AcceptWelcomeMessage:()=>void;
}
const WelcomeMessage:React.FC<WelcomeMessageProps> = ({ welcomemessageviewed,AcceptWelcomeMessage }:any) => {

    
    useEffect(()=> {
        console.log("xd1")
        if(!welcomemessageviewed){
            (document.getElementById("welcomemessagecontainer") as HTMLElement).style.display="block"
        }else{
            (document.getElementById("welcomemessagecontainer") as HTMLElement).style.display="none"
        }
    },[welcomemessageviewed])

    return (
    <div id="welcomemessagecontainer" style={{zIndex:"100",width:"100%",height:"100%",backgroundColor: "rgba(0, 0, 0, 0.7)",position: "absolute",display:"none"}}>
        <div id="welcomemessage" style={{
            position: "absolute",
            zIndex: 101,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#0D1117",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.8)",
            padding: "40px 50px",
            borderRadius: "20px",
            color: "#ffffff",
            textAlign: "center",
            fontFamily: "'Poppins', sans-serif",
            maxWidth: "500px",
            lineHeight: 1.6,
            animation: "fadeIn 1s ease-out"
        }}>
            <h1 style={{
            fontSize: "2.5rem",
            marginBottom: "15px",
            color: "#3B82F6",
            textShadow: "2px 2px 8px rgba(0, 123, 255, 0.7)"
            }}>Welcome to WorldCast!</h1>

            <h2 style={{
            fontSize: "1.5rem",
            marginBottom: "20px",
            color: "#BBBBBB"
            }}>So, what can you do here?</h2>

            <ul style={{
                textAlign: "left",
                paddingLeft: "20px",
                marginBottom: "30px",
                listStyleType: "disc",   // show bullet points
                listStylePosition: "outside", // bullet outside the text
                color: "#ffffff"          // optional: make bullets visible on dark background
                }}>
                <li>Select TV, radio, or news</li>
                <li>Choose your preferred country</li>
                <li>Pick a channel, radio station, or news source</li>
                <li>Enjoy!</li>
            </ul>

            <button style={{
            padding: "12px 30px",
            fontSize: "1rem",
            fontWeight: 600,
            color: "#0D1117",
              background: "linear-gradient(135deg, #3B82F6, #2563EB)", // blue gradient
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            boxShadow: "0 6px 20px rgba(59, 130, 246, 0.6)",
            transition: "transform 0.2s, box-shadow 0.2s"
            }}
            onMouseEnter={e => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 8px 25px rgba(59, 130, 246, 0.8)"; // blue glow on hover
            }}
            onMouseLeave={e => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(59, 130, 246, 0.6)"; // normal blue glow
            }}
            onClick={c=>{
                AcceptWelcomeMessage()
            }}>
            Launch
            </button>
        </div>
    </div>
);

}

export default WelcomeMessage