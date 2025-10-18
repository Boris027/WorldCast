"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import * as d3 from "d3";
import Globe from "globe.gl";

import clouds from "@/assets/images/clouds.png";
import nightsky from "@/assets/images/night-sky.png";
import worldimage from "@/assets/images/earth-blue-marble.jpg";
import topology from "@/assets/images/earth-topology.png";
import dataset from "@/assets/datasets/countries.json";

interface FeatureProperties {
  ADMIN: string;
  ISO_A2: string;
  [key: string]: any;
}

interface GlobeComponentProps {
  onClickCountry: (country: string, subname: string) => void;
  cloudsenabled: boolean;
  rotating: boolean;
  transparency: boolean;
}

const GlobeComponent: React.FC<GlobeComponentProps> = ({
  onClickCountry,
  cloudsenabled,
  rotating,
  transparency,
}) => {
  const globeContainer = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any>(null);
  const cloudsRef = useRef<THREE.Mesh | null>(null);
  const frameRef = useRef<number | null>(null);

  // --- INITIALIZE GLOBE ONCE ---
  useEffect(() => {
    if (typeof window === "undefined" || !globeContainer.current) return;
    if (!globeContainer.current || globeRef.current) return;

    const globe = new (Globe as any)()
      .globeImageUrl(worldimage.src)
      .bumpImageUrl(topology.src)
      .showGlobe(true)
      .showGraticules(false)
      .backgroundImageUrl(nightsky.src);

    globe(globeContainer.current);
    globeRef.current = globe;

    

    const polygonGroup = globe.scene().children.find(
      (obj: any) => obj.name === "polygons"
    );
    (globe as any)._polygonGroup = polygonGroup; // store reference

    // Load country polygons
    const countries = dataset.features.filter((d: any) => d.properties.ISO_A2 !== "AQ");
    const maxVal = Math.max(...countries.map((d: any) => d.properties.POP_EST || 0));
    const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlGnBu).domain([0, maxVal]);

    const stringToColor = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      const hue = Math.abs(hash) % 360;
      const alpha = transparency ? 0 : 1;
      return `hsla(${hue}, 70%, 50%, ${alpha})`;
    };

    globe
      .polygonsData(countries)
      .polygonAltitude(0.009)
      .polygonCapColor((feat: any) => stringToColor(feat.properties.ISO_A3))
      .polygonSideColor(() => "rgba(0, 100, 0, 0.15)")
      .polygonStrokeColor(() => "#111")
      .polygonLabel(({ properties }: { properties: FeatureProperties }) => `
        <b>${properties.ADMIN} (${properties.ISO_A2})</b><br/>
      `)
      .onPolygonHover((hoverD: any) =>
        globe
          .polygonAltitude((d: any) => (d === hoverD ? 0.08 : 0.009))
          .polygonCapColor((d: any) =>
            d === hoverD ? "steelblue" : stringToColor(d.properties.ISO_A3)
          )
      )
      .onPolygonClick((d: any) => {
        onClickCountry(d.properties.ADMIN, d.properties.ISO_A2);
      })
      .polygonsTransitionDuration(300);

    // Handle resize
    const handleResize = () => {
      globe.width([window.innerWidth]);
      globe.height([window.innerHeight]);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (globeRef.current) {
        globe.scene().clear();
        globe.renderer().dispose();
        globeRef.current = null;
      }
    };
  }, [ transparency]);

  // --- UPDATE ROTATION ---
  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    const controls = globe.controls();
    controls.autoRotate = rotating;
    controls.autoRotateSpeed = 0.35;
  }, [rotating]);

  // --- UPDATE CLOUDS ---
  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    // cleanup old clouds if toggled off
    if (!cloudsenabled && cloudsRef.current) {
      cancelAnimationFrame(frameRef.current!);
      globe.scene().remove(cloudsRef.current);
      cloudsRef.current.geometry.dispose();
      (cloudsRef.current.material as THREE.Material).dispose();
      cloudsRef.current = null;
      return;
    }

    // add clouds if enabled and not already added
    if (cloudsenabled && !cloudsRef.current) {
      const loader = new THREE.TextureLoader();
      loader.load(clouds.src, (texture) => {
        const mesh = new THREE.Mesh(
          new THREE.SphereGeometry(globe.getGlobeRadius() * 1.004, 75, 75),
          new THREE.MeshPhongMaterial({ map: texture, transparent: true })
        );
        globe.scene().add(mesh);
        cloudsRef.current = mesh;

        function rotateClouds() {
          if (!cloudsRef.current) return;
          cloudsRef.current.rotation.y += -0.006 * Math.PI / 180;
          frameRef.current = requestAnimationFrame(rotateClouds);
        }
        rotateClouds();
      });
    }

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [cloudsenabled]);

  // --- UPDATE TRANSPARENCY ---
  useEffect(() => {
  const globe = globeRef.current;
  if (!globe || !(globe as any)._polygonsGroup) return;

  const alpha = transparency ? 0 : 1;

  (globe as any)._polygonsGroup.traverse((obj: any) => {
    if (obj.material) {
      obj.material.transparent = alpha < 1;
      obj.material.opacity = alpha;
      obj.material.needsUpdate = true;
    }
  });
}, [transparency]);




  return (
    <div
      ref={globeContainer}
      style={{ display: "flex", flex: 1, width: "100%", height: "100%", }}
    />
  );
};

export default GlobeComponent;
