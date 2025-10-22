'use client';

import { useState, useEffect } from 'react';

/**
 * Reactive hook to manage the current mode and URL.
 */
export function useMode(defaultMode = 'tv') {
  const [mode, setMode] = useState(defaultMode);

  // Initialize mode from URL or default
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const m: string | null = params.get("mode");
    if (m=="tv" || m=="radio" || m=="news" || m=="favorites") {
      setMode(m);
    } else {
      // Set default mode in URL if not present
      params.set('mode', defaultMode);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, '', newUrl);
      setMode(defaultMode);
    }
  }, [defaultMode]);

  // Change the mode and update URL without reloading
  const changeMode = (newMode: string) => {
    setMode(newMode);

    const params = new URLSearchParams(window.location.search);
    params.set('mode', newMode);

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
  };

  // Get the current mode
  const getMode = () => mode;

  return { mode, changeMode, getMode };
}

/**
 * Standalone function to update the mode in URL without a component
 */
export function setMode(newMode: string) {
  if (typeof window === "undefined" ) return;
  const params = new URLSearchParams(window.location.search);
  params.set('mode', newMode);

  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, '', newUrl);
}

/**
 * Standalone function to get the current mode from URL
 */
export function getModeFromUrl(defaultMode = 'tv') {
  if (typeof window === "undefined" ) return;
  const params = new URLSearchParams(window.location.search);
  const finalmode= params.get('mode') || defaultMode;

  if(params.get('mode')){
    return finalmode
  }else{
    setMode(defaultMode)
    return finalmode
  }

}

/**
 * Standalone function to update the COuntry in URL without a component
 */
export function setCountry(newCountry: string,subname:string) {
  if (typeof window === "undefined" ) return;
  const params = new URLSearchParams(window.location.search);
  if(newCountry=="" && subname==""){
    params.delete("country")
  }else{
    params.set('country', newCountry+"-"+subname);
  }

  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, '', newUrl);
}

export function getCountryFromUrl():string | null | undefined {
  if (typeof window === "undefined" ) return;
  const params = new URLSearchParams(window.location.search);
  return params.get('country')?.split("-")[0];
}

export function getSubnameCountryFromUrl():string | null | undefined {
  if (typeof window === "undefined" ) return;
  const params = new URLSearchParams(window.location.search);
  return params.get('country')?.split("-")[1];
}