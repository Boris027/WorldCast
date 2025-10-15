"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from 'three';
import Globe from "globe.gl";
import images from "@/assets/images/clouds.png"

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



  }, []);

  return <div ref={globeContainer} style={{ width: "100%", height: "100vh" }} />;
};

export default GlobeComponent;
