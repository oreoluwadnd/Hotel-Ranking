import {
  Autocomplete,
  Libraries,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useRef, useState } from "react";
import { FormInput } from "../common/form";
import { ControllerRenderProps, UseFormSetValue } from "react-hook-form";

type Props = {
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
  field: ControllerRenderProps<
    {
      id: string;
      name: string;
      city: string;
      country: string;
      address: string;
      chainId: string | undefined;
      lat: number;
      lng: number;
      image: string | undefined;
    },
    "address"
  >;
};

export default function AutocompleteInput({ setValue, field }: Props) {
  const library: Libraries = ["places"];
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries: library,
  });

  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const autoCompleteRef = useRef<Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autoCompleteRef.current !== null) {
      const place = autocomplete?.getPlace();
      if (place && place.geometry && place.geometry.location) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setValue && setValue("lat", location.lat);
        setValue && setValue("lng", location.lng);
        const country = place.address_components?.find((component) => {
          return component.types.includes("country") ? component : null;
        });
        const city = place.address_components?.find((component) => {
          return component.types.includes("locality") ? component : null;
        });
        setValue && setValue("country", country?.long_name || "");
        setValue && setValue("city", city?.long_name || "");

        console.log(location);
      } else {
        console.log("No location available");
      }
    }
  };
  const handleInputBlur = () => {
    if (inputRef.current) {
      const inputValue = inputRef.current.value;
      setValue && setValue("address", inputValue);
    }
  };
  if (!isLoaded) {
    return null;
  }
  return (
    <Autocomplete
      onLoad={onLoad}
      onPlaceChanged={onPlaceChanged}
      ref={autoCompleteRef}
    >
      <FormInput
        ref={inputRef}
        value={field.value}
        onBlur={handleInputBlur}
        name={field.name}
        onChange={field.onChange}
        type="text"
        placeholder="Enter a location"
      />
    </Autocomplete>
  );
}
