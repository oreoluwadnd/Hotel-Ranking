import React, { ReactNode } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

interface GoogleMapsLoaderProps {
  children: ReactNode;
}

const GoogleMapsLoader: React.FC<GoogleMapsLoaderProps> = ({ children }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });
  if (!isLoaded) {
    return null;
  }
  return children;
};

export default GoogleMapsLoader;
