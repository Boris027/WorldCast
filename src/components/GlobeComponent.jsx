"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from 'three';
import Globe from "globe.gl";
import images from "@/assets/images/clouds.png"
import dataset from "@/assets/datasets/countries.json"
import * as d3 from "d3";

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
    
    // Auto-rotate
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.35;


    const CLOUDS_IMG_URL = images.src; // from https://github.com/turban/webgl-earth
    const CLOUDS_ALT = 0.004;
    const CLOUDS_ROTATION_SPEED = -0.006; // deg/frame

    console.log(images.src)
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




    // Deterministic color generator based on a string (e.g., ISO_A3)
const stringToColor = str => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;          // 0 - 359 degrees on the color wheel
  const saturation = 70;                     // 70% saturation
  const lightness = 50;                      // 50% lightness
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

    
    // Load countries
    const countries = dataset; // already imported
    const getVal = d => d.properties.POP_EST || 0; // example: use population
    const maxVal = Math.max(...countries.features.map(getVal));
    const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlGnBu).domain([0, maxVal]);

    globe
      .polygonsData(countries.features.filter(d => d.properties.ISO_A2 !== 'AQ'))
      .polygonAltitude(0.06)
      .polygonCapColor(feat => stringToColor(feat.properties.ISO_A3)) // use ISO code, no population
      .polygonSideColor(() => 'rgba(0, 100, 0, 0.15)')
      .polygonStrokeColor(() => '#111')
      .polygonLabel(({ properties: d }) => `
        <b>${d.ADMIN} (${d.ISO_A2}):</b> <br />
      `)
      /*Population: <i>${d.POP_EST}</i><br/>
        GDP: <i>${d.GDP_MD_EST}</i> M$ */
      .onPolygonHover(hoverD => globe
        .polygonAltitude(d => d === hoverD ? 0.12 : 0.06)
        .polygonCapColor(d =>
        d === hoverD ? "steelblue" : stringToColor(d.properties.ISO_A3)
      )
      )
      .polygonsTransitionDuration(300);
    
  }, []);

  return <div ref={globeContainer} style={{ width: "100vw", height: "100vh" }} />;
};

export default GlobeComponent;
