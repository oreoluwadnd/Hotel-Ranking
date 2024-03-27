import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { UseFormSetValue } from "react-hook-form";
import { useState } from "react";
import { hotelForm } from "./details";

type MapProps = {
  setValue: UseFormSetValue<hotelForm>;
};

function LocationMarker({ setValue }: MapProps) {
  const [position, setPosition] = useState<LatLngExpression | null>(null);

  useMapEvents({
    click(e) {
      setValue("lat", e.latlng.lat);
      setValue("lng", e.latlng.lng);
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>{position.toString()}</Popup>
    </Marker>
  );
}

const MapComponent = ({ setValue }: MapProps) => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker setValue={setValue} />
    </MapContainer>
  );
};

export default MapComponent;
