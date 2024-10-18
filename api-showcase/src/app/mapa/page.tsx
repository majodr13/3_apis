"use client";

import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 51.5074, // Latitud de Londres
  lng: -0.1278, // Longitud de Londres
};

export default function MapsPage() {
  const API_KEY = "AIzaSyBhXZml3hb3NLt-Kt9oh4oEYgZONZbFI84";

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      ></GoogleMap>
    </LoadScript>
  );
}
