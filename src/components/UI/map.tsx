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

type MapProps = {
  setValue?: UseFormSetValue<{
    id: string;
    name: string;
    city: string;
    country: string;
    address: string;
    chainId: string | undefined;
    lat: number;
    lng: number;
    image: string | undefined;
  }>;
  lat: number;
  lng: number;
};
function LocationMarker({ setValue, lat, lng }: MapProps) {
  const [position, setPosition] = useState<LatLngExpression | null>(null);

  useMapEvents({
    click(e) {
      if (setValue) {
        setValue("lat", e.latlng.lat);
        setValue("lng", e.latlng.lng);
        setPosition(e.latlng);
      }
    },
  });

  return (
    <Marker position={position || [lat, lng]}>
      <Popup>{position?.toString()}</Popup>
    </Marker>
  );
}

const MapComponent = ({ setValue, lat, lng }: MapProps) => {
  return (
    <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker setValue={setValue} lat={lat} lng={lng} />
    </MapContainer>
  );
};

export default MapComponent;
