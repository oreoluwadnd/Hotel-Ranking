import { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { UseFormSetValue } from "react-hook-form";

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

const addressComponentTypes: AddressComponentTypes = {
  street_number: "streetNumber",
  route: "streetName",
  locality: "city",
  administrative_area_level_1: "state",
  admnistrative_area_level_2: "state1",
  country: "country",
  postal_code: "zipCode",
};

interface Address {
  streetNumber?: string;
  streetName?: string;
  city?: string;
  state?: string;
  state1?: string;
  country?: string;
  zipCode?: string;
}

interface AddressComponentTypes {
  [key: string]: keyof Address;
}

type LanLng = {
  lat: number;
  lng: number;
};

const NewMapComponent = ({ setValue, lat, lng }: MapProps) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries: ["places"],
  });
  const [marker, setMarker] = useState<LanLng | undefined>(undefined);

  useEffect(() => {
    if (lat && lng) {
      setMarker({ lat, lng });
    }
  }, [lat, lng]);

  const handleMapClick = async (event: google.maps.MapMouseEvent) => {
    const lat = event?.latLng?.lat();
    const lng = event?.latLng?.lng();
    const geocoder = new window.google.maps.Geocoder();
    const result = await geocoder.geocode({
      location: { lat: lat ?? 0, lng: lng ?? 0 },
    });

    if (result.results.length > 0) {
      const address: Address = {};
      result.results[0].address_components.forEach((component) => {
        const componentType = component.types[0];
        const addressProperty = addressComponentTypes[componentType];
        if (addressProperty) {
          address[addressProperty] = component.long_name;
        }
      });
      const fullAddress = `${
        address.streetNumber
          ? `${address.streetNumber} ${address.streetName},`
          : ""
      }
 ${address.city ? `${address.city},` : ""}
 ${address.state ? `${address.state}` : ""}
 ${address.zipCode ? ` ${address.zipCode},` : ""}
 ${address.country ? `${address.country}` : ""}`;

      if (setValue) {
        setValue("address", fullAddress);
        setValue("city", address.city || "");
        setValue("country", address.country || "");
      }
      setMarker({ lat: lat || 0, lng: lng || 0 });
    }
  };

  if (!isLoaded) {
    return <div className="w-full h-96 bg-gray-800 animate-pulse"></div>;
  }
  return (
    <GoogleMap
      mapContainerStyle={{ height: "400px" }} // Set width to 100%
      zoom={14}
      clickableIcons
      center={marker || { lat: lat, lng: lng }}
      onClick={handleMapClick}
    >
      {marker && (
        <Marker
          icon={{
            url: "/hotel.png",
            scaledSize: new window.google.maps.Size(50, 50),
          }}
          position={marker || { lat: lat, lng: lng }}
        />
      )}
    </GoogleMap>
  );
};

export default NewMapComponent;
