import {
  Autocomplete,
  Libraries,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useRef, useState } from "react";
import { FormInput } from "./common/form";
import { ControllerRenderProps, UseFormSetValue } from "react-hook-form";

type Props = {
  setValue?: UseFormSetValue<{
    location: string;
    lat: number;
    radius: number;
    lng: number;
  }>;
  lat: number;
  lng: number;
  field: ControllerRenderProps<
    {
      location: string;
      lat: number;
      lng: number;
      radius: number;
    },
    "location"
  >;
};

export default function FacebookAutocompleteInput({ setValue, field }: Props) {
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

        console.log(location);
      } else {
        console.log("No location available");
      }
    }
  };
  const handleInputBlur = () => {
    if (inputRef.current) {
      const inputValue = inputRef.current.value;
      setValue && setValue("location", inputValue);
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
        placeholder="Enter a location and select from the dropdown"
      />
    </Autocomplete>
  );
}
