import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { Device } from "../pages/Map";
import { tableStyle, trHeadStyle } from "./TableDevices";
import { postData } from "./PostMethod";

type LatLngLiteral = google.maps.LatLngLiteral;

type Props = {
  setBtnAddClicked: Dispatch<SetStateAction<boolean | undefined>>;
  setDataAdded: Dispatch<SetStateAction<boolean | undefined>>;
};

function AddDevicePopup({ setBtnAddClicked, setDataAdded }: Props) {
  const [addName, setAddName] = useState("");
  const [addLatLng, setAddLatLng] = useState<LatLngLiteral>();

  const addData = async (newDevice: Device) => {
    var success = await postData("devices", newDevice);
    if (success) setDataAdded(true);
  };

  const onBtnCancelClick = () => {
    setBtnAddClicked(false);
    clearAddInputs();
  };

  const clearAddInputs = () => {
    setAddName("");
    setAddLatLng(undefined);
  };

  const onBtnAddClick = () => {
    setBtnAddClicked(false);

    const newDevice: Device = {
      deviceName: addName,
      latitude: addLatLng?.lat!,
      longitude: addLatLng?.lng!,
    };

    addData(newDevice);
  };

  const mapOnClick = (latt: number, lngg: number) => {
    const value = { lat: latt, lng: lngg };
    setAddLatLng(value);
  };

  return (
    <>
      <div className="fixed top-0 h-full w-full bg-black opacity-70"></div>
      <div className="fixed top-1/2 left-1/2 flex h-2/3 w-1/2 -translate-y-1/2 -translate-x-1/2 flex-col items-center justify-center rounded-2xl bg-white text-xl">
        <div className="h-[60vh] w-full">
          <GoogleMap
            zoom={10}
            center={addLatLng ? addLatLng : { lat: 46.308849, lng: 16.33885 }}
            mapContainerClassName="w-full h-full rounded-3xl"
            options={{
              disableDefaultUI: true,
              clickableIcons: false,
            }}
            onClick={(e) => mapOnClick(e.latLng?.lat()!, e.latLng?.lng()!)}
          >
            <Marker
              position={addLatLng!}
              draggable
              onDragEnd={(e) => mapOnClick(e.latLng?.lat()!, e.latLng?.lng()!)}
            />
          </GoogleMap>
        </div>
        <table className={tableStyle}>
          <thead>
            <tr className={trHeadStyle}>
              <th>Device name:</th>
              <th>Latitude:</th>
              <th>Longitude:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  required={true}
                  placeholder="Enter device name"
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                ></input>
              </td>
              <td>{addLatLng ? addLatLng?.lat : "Choose location on map"}</td>
              <td>{addLatLng ? addLatLng?.lng : "Choose location on map"}</td>
            </tr>
          </tbody>
        </table>
        <div className="my-5 flex w-full flex-row justify-center gap-5">
          <button
            className="w-20 rounded-lg bg-sky-600 text-xl text-white"
            onClick={onBtnAddClick}
          >
            Save
          </button>
          <button
            className="w-20 rounded-lg bg-red-600 text-xl text-white"
            onClick={onBtnCancelClick}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default AddDevicePopup;
