"use client";
import React, { useRef, useEffect, useState } from "react";
import * as THREE from 'three';
import clouds from "@/assets/images/clouds.png"
import nightsky from "@/assets/images/night-sky.png"
import worldimage from "@/assets/images/earth-blue-marble.jpg"
import topology from "@/assets/images/earth-topology.png"
import dataset from "@/assets/datasets/countries.json"
import * as d3 from "d3";
import Globe from "globe.gl";

interface FeatureProperties {
  ADMIN: string;
  ISO_A2: string;
  [key: string]: any; // optional for extra properties
}

interface GlobeComponentProps {
  onClickCountry: (country: string,subname:string) => void; // callback from parent
  cloudsenabled:boolean,
  rotating:boolean,
  transparency:boolean
}



const GlobeComponent: React.FC<GlobeComponentProps> = ({ onClickCountry,cloudsenabled,rotating,transparency }) => {
  const globeContainer:any = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !globeContainer.current) return;
    if (!globeContainer.current) return;

    // Initialize Globe
    const globe = (Globe as any)()
      .globeImageUrl(worldimage.src) // realistic Earth
      .bumpImageUrl(topology.src)  // surface bumps
      .showGlobe(true)
      .showGraticules(false) // optional latitude/longitude lines
      .backgroundImageUrl(nightsky.src);
      
    globe(globeContainer.current); // attach to div
    
    // Auto-rotate
    if(rotating){
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.35;
    }
    





    const CLOUDS_IMG_URL = clouds.src; // from https://github.com/turban/webgl-earth
    const CLOUDS_ALT = 0.004;
    const CLOUDS_ROTATION_SPEED = -0.006; // deg/frame

    if(cloudsenabled){
      new THREE.TextureLoader().load(CLOUDS_IMG_URL, cloudsTexture => {
      const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(globe.getGlobeRadius() * (1 + CLOUDS_ALT), 75, 75),
        new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true })
      );
      
        globe.scene().add(clouds);
        

        (function rotateClouds() {
          clouds.rotation.y += CLOUDS_ROTATION_SPEED * Math.PI / 180;
          requestAnimationFrame(rotateClouds);
        })();
      });
    }
    




    // Deterministic color generator based on a string (e.g., ISO_A3)
const stringToColor = (str:any) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;          // 0 - 359 degrees on the color wheel
  const saturation = 70;                     // 70% saturation
  const lightness = 50;                      // 50% lightness
  let alpha=1;                           // transparency

  if(transparency){
    alpha=0;
  }else{
    alpha=1;
  }

  return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
};

    
    // Load countries
    const countries = dataset; // already imported
    const getVal = (d:any) => d.properties.POP_EST || 0; // example: use population
    const maxVal = Math.max(...countries.features.map(getVal));
    const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlGnBu).domain([0, maxVal]);



    globe
      .polygonsData(countries.features.filter(d => d.properties.ISO_A2 !== 'AQ'))
      .polygonAltitude(0.009)
      .polygonCapColor((feat:any) => stringToColor(feat.properties.ISO_A3)) // use ISO code, no population
      .polygonSideColor(() => 'rgba(0, 100, 0, 0.15)')
      .polygonStrokeColor(() => '#111')
      .polygonLabel(({ properties }: { properties: FeatureProperties }) => `
  <b>${properties.ADMIN} (${properties.ISO_A2}):</b> <br />
`)
      /*Population: <i>${d.POP_EST}</i><br/>
        GDP: <i>${d.GDP_MD_EST}</i> M$ */
      .onPolygonHover((hoverD:any) => globe
        .polygonAltitude((d: any) => d === hoverD ? 0.08 : 0.009)
        .polygonCapColor((d: { properties: { ISO_A3: any; }; }) =>
        d === hoverD ? "steelblue" : stringToColor(d.properties.ISO_A3)
      )
      )
      .onPolygonClick((d: { properties: { ADMIN: any; ISO_A2: any; }; }) => {
        // Log the country name to the console
        onClickCountry(d.properties.ADMIN,d.properties.ISO_A2)
      })
      .polygonsTransitionDuration(300);
    

      // ===== Make globe responsive =====
    const handleResize = () => {
      if (!globeContainer.current) return;
      globe.width([window.innerWidth]);
      globe.height([window.innerHeight]);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // set initial size

    return () => {
      window.removeEventListener("resize", handleResize);
    };

  }, []);

  

  return <div ref={globeContainer} style={{ display: "flex", flex: 1, width: "100%", height: "100%" }} />;
};

export default GlobeComponent;
