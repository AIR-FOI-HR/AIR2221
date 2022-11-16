import { useLoadScript } from "@react-google-maps/api";
import Map from "./Map";

export default function MapLoader() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDEOpUR139wqi5ibVHyqCCLMMjYHdWybSU",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}
