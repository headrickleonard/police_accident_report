"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import dynamic from 'next/dynamic';

interface MapProps {
  center: [number, number];
  zoom: number;
  markerPosition: [number, number] | null;
  markerPopup: string | null;
}

// Separate component for map updates
function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
}

// Create the map component
function MapComponent({ center, zoom, markerPosition, markerPopup }: MapProps) {
  const customIcon = useMemo(() => 
    new L.Icon({
      iconUrl: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -38],
    })
  , []);

  // Initialize the map only once when the component mounts
  const mapElement = useMemo(
    () => (
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        className="rounded-md"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {markerPosition && (
          <Marker position={markerPosition} icon={customIcon}>
            {markerPopup && <Popup>{markerPopup}</Popup>}
          </Marker>
        )}
        <MapUpdater center={center} zoom={zoom} />
      </MapContainer>
    ),
    // Only re-render if these dependencies change
    [center, zoom, markerPosition, markerPopup, customIcon]
  );

  return (
    <div className="h-full w-full min-h-[300px]">
      {mapElement}
    </div>
  );
}

// Export a dynamic component with SSR disabled
const Map = dynamic(() => Promise.resolve(MapComponent), {
  ssr: false
});

export default Map;