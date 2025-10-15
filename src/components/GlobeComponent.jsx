"use client";
import React, { useRef, useEffect } from "react";
import Globe from "globe.gl";

const GlobeComponent = () => {
  const globeContainer = useRef();

  useEffect(() => {
    if (!globeContainer.current) return;

    // Initialize Globe
    const globe = Globe()
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg") // realistic Earth
      .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")  // surface bumps
      .showGlobe(true)
      .showGraticules(true) // optional latitude/longitude lines
      .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png");
      
    globe(globeContainer.current); // attach to div
  }, []);

  return <div ref={globeContainer} style={{ width: "100%", height: "100vh" }} />;
};

export default GlobeComponent;
