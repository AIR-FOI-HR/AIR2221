import { useState, useMemo, useEffect, useRef } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import Navbar from "../components/Navbar";
import axios from "axios";
import Account from "../components/Account";
import SessionCheck from "../components/SessionCheck";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

export interface Device {
  id: number;
  deviceName: string;
  lastSync: number;
  latitude: number;
  longitude: number;
}

const container = "container flex flex-col items-center h-fit";
const map_container = "w-full h-full rounded-3xl";

export default function Map() {
  const [dataDevices, setDataDevices] = useState([]);
  const mapRef = useRef<GoogleMap>();
  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 46.308849, lng: 16.33885 }),
    []
  );
  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  const fetchData = () => {
    return axios
      .get("https://air2221.mobilisis.hr/api/devices")
      .then((response) => setDataDevices(response.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {SessionCheck()}
      <Navbar />
      <Account />
      <div className="flex justify-center">
        <div className={container}>
          <h1>This is where our devices are located:</h1>
          <div className="h-[80vh] w-full">
            <GoogleMap
              zoom={10}
              center={center}
              mapContainerClassName={map_container}
              options={options}
            >
              {dataDevices &&
                dataDevices.map((device: Device) => {
                  return (
                    <Marker
                      key={device.id}
                      position={{ lat: device.latitude, lng: device.longitude }}
                    />
                  );
                })}
            </GoogleMap>
          </div>
        </div>
      </div>
    </>
  );
}
