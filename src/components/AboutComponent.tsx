import { useEffect } from "react";
import me from "@/assets/images/me.jpeg"
interface AboutComponentProps{
    aboutsectionenabled:boolean,
    setaboutsectionenabled:(value:boolean)=>void
}




const AboutComponent:React.FC<AboutComponentProps> = ({aboutsectionenabled,setaboutsectionenabled}:any) => {
    function hide(){
        setaboutsectionenabled()
    }

    useEffect(() => {
        
        if(aboutsectionenabled){
            (document.getElementById("aboutdiv") as HTMLElement).style.display="block";
        }else{
            (document.getElementById("aboutdiv") as HTMLElement).style.display="none";
        }


    },[aboutsectionenabled])


    return <div
  id="aboutdiv"
  style={{
    position: "fixed",
    zIndex: 102,
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    backgroundColor: "#1A1C23",
    color: "#F0F0F0",
    display: "none",
    overflowY: "auto",
    padding: "2rem",
    boxSizing: "border-box",
    fontFamily: "'Inter', sans-serif",
  }}
>
  {/* Close Button */}
  <button
    type="button"
    className="closebutton"
    onClick={hide}
    style={{
      position: "absolute",
      top: "1rem",
      right: "1rem",
      border: "none",
      cursor: "pointer",
      color: "#F0F0F0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <svg
      className="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
      style={{ width: "24px", height: "24px" }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>

  {/* About Section */}
  <section id="about-worldcast" style={{ maxWidth: "800px", margin: "0 auto", marginBottom: "3rem" }}>
    <h2 style={{ fontSize: "2rem", marginBottom: "1rem", textAlign: "center" }}>About WorldCast</h2>
    <p style={{ lineHeight: "1.7", marginBottom: "1rem" }}>
      <strong>WorldCast</strong> brings the world to your fingertips—listen to radio, watch TV, and read news from every corner of the globe, all for free. Our goal is to make global media accessible, fun, and effortless.
    </p>
    <h3 style={{ fontSize: "1.5rem", marginTop: "2rem", marginBottom: "1rem" }}>Our Sources</h3>
    <ul style={{ paddingLeft: "1.5rem", marginBottom: "1.5rem", lineHeight: "1.7" }}>
      <li>
        <strong>Radio:</strong> All radio stations are sourced via{" "}
        <a href="https://fi1.api.radio-browser.info/" target="_blank" rel="noopener noreferrer" style={{ color: "#4EA8DE" }}>
          Radio Browser API
        </a>.
      </li>
      <li>
        <strong>TV & IPTV:</strong> Live TV channels come from{" "}
        <a href="https://github.com/iptv-org/iptv" target="_blank" rel="noopener noreferrer" style={{ color: "#4EA8DE" }}>
          IPTV.org
        </a>{" "}
        and{" "}
        <a href="https://github.com/TVGarden/tv-garden-channel-list" target="_blank" rel="noopener noreferrer" style={{ color: "#4EA8DE" }}>
          TV-Garden
        </a>.
      </li>
      <li>
        <strong>News:</strong> Global news is provided by the{" "}
        <a href="https://www.gdeltproject.org/" target="_blank" rel="noopener noreferrer" style={{ color: "#4EA8DE" }}>
          GDELT Project
        </a>.
      </li>
    </ul>
    <p style={{ lineHeight: "1.7" }}>
      With <strong>WorldCast</strong>, you can explore content by country, scroll through curated lists, or hit the “Surprise Me” button to discover something new. No account, no hidden fees—just the world of media in one simple, intuitive app.
    </p>
  </section>
  <section id="technologies-used" style={{ maxWidth: "800px", margin: "0 auto", marginBottom: "3rem" }}>
    <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem", textAlign: "center" }}>Project Built With</h2>
    <ul style={{  lineHeight: "1.7" }}>
        <li>
        <strong>Next.js:</strong> The React framework powering the app’s frontend, routing, and server-side rendering.
        </li>
        <li>
        <strong>Three.js:</strong> Used for the interactive 3D globe to explore channels by country.
        </li>
        <li>
        <strong>HLS.js:</strong> Enables live streaming of TV channels directly in the browser.
        </li>
        <li>
        <strong>React:</strong> The core library for building the user interface.
        </li>
        <li>
        <strong>Tailwind CSS / Custom Styles:</strong> For responsive design, layouts, and visual styling.
        </li>
    </ul>
   </section>
    <section id="contact" style={{ maxWidth: "800px", margin: "0 auto", marginBottom: "3rem" }}>
  <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem", textAlign: "center" }}>Contact / Connect</h2>
  <img
    src={me.src}
    alt="Boris Gallego Rios"
    style={{
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        objectFit: "cover",
        objectPosition: "center",
        border: "2px solid #4EA8DE",
        boxShadow: "0 0 10px rgba(78,168,222,0.3)",
        display: "block",
        margin: "0 auto 1rem auto"
    }}
    />
  <p style={{ lineHeight: "1.7", marginBottom: "1rem" }}>
    Have questions, feedback, or just want to say hi? You can reach me at:
  </p>
  <p style={{ lineHeight: "1.7", marginBottom: "1rem" }}>
    <strong>Email:</strong> <a href="borisgallegorios05@gmail.com" style={{ color: "#4EA8DE" }}>borisgallegorios05@gmail.com</a>
  </p>
  <p style={{ lineHeight: "1.7", marginBottom: "1rem" }}>
    You can also connect with me on social media:
  </p>
  <ul style={{ lineHeight: "1.7", display: "flex", gap: "1.5rem", alignItems: "center" }}>
  <li>
    <a
      href="https://github.com/Boris027"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#4EA8DE", display: "flex", alignItems: "center", textDecoration: "none", gap: "0.5rem" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        width="24"
        height="24"
      >
        <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.56v-2.01c-3.2.69-3.88-1.54-3.88-1.54-.53-1.35-1.28-1.71-1.28-1.71-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.03 1.78 2.71 1.27 3.37.97.1-.75.4-1.27.72-1.56-2.55-.29-5.23-1.27-5.23-5.67 0-1.25.45-2.27 1.19-3.07-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.96.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.8 1.18 1.82 1.18 3.07 0 4.42-2.69 5.37-5.25 5.66.42.36.77 1.07.77 2.15v3.18c0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
      </svg>
      GitHub
    </a>
  </li>

  <li>
    <a
      href="https://www.linkedin.com/in/bgallegorios/"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#4EA8DE", display: "flex", alignItems: "center", textDecoration: "none", gap: "0.5rem" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        width="24"
        height="24"
      >
        <path d="M19 0h-14C2.23 0 0 2.23 0 5v14c0 2.77 2.23 5 5 5h14c2.77 0 5-2.23 5-5V5c0-2.77-2.23-5-5-5zM7.12 20.45H3.56V9.04h3.56v11.41zM5.34 7.49a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM20.45 20.45h-3.56v-5.59c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.68H9.36V9.04h3.42v1.56h.05c.48-.9 1.66-1.85 3.42-1.85 3.65 0 4.33 2.4 4.33 5.53v6.17z" />
      </svg>
      LinkedIn
    </a>
  </li>
</ul>

</section>
  {/* Legal Disclaimer */}
  <section id="legal-disclaimer" style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "3rem" }}>
    <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem", textAlign: "center" }}>Legal Disclaimer</h2>
    <p style={{ lineHeight: "1.7", marginBottom: "1rem" }}>
      <strong>WorldCast</strong> is a free, personal project created for educational and entertainment purposes. All radio, TV, and news content is sourced from third-party platforms and APIs, including{" "}
      <a href="https://fi1.api.radio-browser.info/" target="_blank" rel="noopener noreferrer" style={{ color: "#4EA8DE" }}>Radio Browser API</a>,{" "}
      <a href="https://github.com/iptv-org/iptv" target="_blank" rel="noopener noreferrer" style={{ color: "#4EA8DE" }}>IPTV.org</a>,{" "}
      <a href="https://tv.garden/" target="_blank" rel="noopener noreferrer" style={{ color: "#4EA8DE" }}>TV-Garden</a>, and{" "}
      <a href="https://www.gdeltproject.org/" target="_blank" rel="noopener noreferrer" style={{ color: "#4EA8DE" }}>GDELT Project</a>.
    </p>
    <p style={{ lineHeight: "1.7", marginBottom: "1rem" }}>
      <strong>WorldCast</strong> does not host, own, or control any of the content provided by these sources. The app simply provides access to publicly available streams and information. By using this app, you acknowledge that all rights to the content belong to their respective owners.
    </p>
    <p style={{ lineHeight: "1.7", marginBottom: "1rem" }}>
      This app is free to use, and no commercial use or profit is intended. The developer is not responsible for any inaccuracies, interruptions, or issues with the third-party content. Users are encouraged to respect copyright laws and the terms of use of the original content providers.
    </p>
    <p style={{ lineHeight: "1.7" }}>
      By accessing <strong>WorldCast</strong>, you agree to use the app responsibly and understand the nature of the content being sourced externally.
    </p>
  </section>
</div>

}

export default AboutComponent