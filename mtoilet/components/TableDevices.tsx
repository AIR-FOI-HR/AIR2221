import { useState, useEffect } from "react";
import { Device } from "../pages/Map";
import AddDevicePopup from "./AddDevicePopup";
import { deleteData } from "./DeleteMethod";
import { fetchData } from "./GetMethod";
import { changeData } from "./PutMethod";
import { beautifyDate, beautifyTime } from "./TableEvents";

export const tableStyle =
  "table-auto bg-white w-full rounded-2xl text-2xl overflow-hidden px-4";

export const trHeadStyle = "text-left text-white bg-sky-600 h-12";

export const trBodyStyle =
  "hover:animate border-solid hover:bg-sky-200 border-t-2 border-sky-500 ease-out duration-100 h-12";

const buttonEditStyle = "bg-sky-600 text-white w-full rounded-lg px-3";

const buttonDeleteStyle = "bg-red-600 text-white w-full rounded-lg px-3";

const buttonAddStyle =
  "bg-white w-fit px-4 py-1 rounded-xl mb-3 text-2xl font-bold";

export default function TableDevices() {
  const [dataDevices, setDataDevices] = useState([]);
  const [rowIdToEdit, setRowIdToEdit] = useState<number | undefined>();
  const [editName, setEditName] = useState("");
  const [editLng, setEditLng] = useState("");
  const [editLat, setEditLat] = useState("");
  const [btnAddClicked, setBtnAddClicked] = useState<boolean>();
  const [dataAdded, setDataAdded] = useState<boolean>();

  async function refreshTableDevices() {
    const dataDevicesTemp = await fetchData("devices");
    setDataDevices(dataDevicesTemp);
  }

  const onBtnEditClick = (
    id: number | undefined,
    devName: string,
    lat: number,
    lng: number
  ) => {
    setRowIdToEdit(id);
    setEditName(devName);
    setEditLat(lat.toString());
    setEditLng(lng.toString());
  };

  const onBtnDeleteClick = async (id: number | undefined) => {
    if (id) var success = await deleteData("devices", id);
    if (success) refreshTableDevices();
  };

  const saveEditedRow = async () => {
    const editedData: Device = {
      deviceName: editName,
      latitude: Number(editLat),
      longitude: Number(editLng),
    };

    console.log(rowIdToEdit);
    if (rowIdToEdit)
      var success = await changeData("devices", rowIdToEdit, editedData);
    if (success) {
      setRowIdToEdit(-1);

      const dataDevicesTemp = await fetchData("devices");
      setDataDevices(dataDevicesTemp);
      setEditName("");
      setEditLat("");
      setEditLng("");
    }
  };

  const beautifyDateAndTime = (data: number) => {
    return [beautifyDate(data), " at ", beautifyTime(data)];
  };

  useEffect(() => {
    refreshTableDevices();
  }, [dataAdded]);

  useEffect(() => {
    refreshTableDevices();
  }, []);

  const TableBody = () => {
    return (
      <tbody>
        {dataDevices.map((row: Device) =>
          rowIdToEdit != row.id ? (
            <tr key={row.id} className={trBodyStyle}>
              <td>{row.id}</td>
              <td>{row.deviceName}</td>
              <td>
                {row.lastSync ? beautifyDateAndTime(row.lastSync) : "No data"}
              </td>
              <td>{row.latitude}</td>
              <td>{row.longitude}</td>
              <td className="flex flex-row gap-2">
                <button
                  className={buttonEditStyle}
                  onClick={() =>
                    onBtnEditClick(
                      row.id,
                      row.deviceName,
                      row.latitude,
                      row.longitude
                    )
                  }
                >
                  Edit
                </button>
                <button
                  className={buttonDeleteStyle}
                  onClick={() => onBtnDeleteClick(row.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ) : (
            <tr key={row.id} className={trBodyStyle}>
              <td>{row.id}</td>
              <td>
                <input
                  placeholder={row.deviceName}
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                ></input>
              </td>
              <td>{row.lastSync ? row.lastSync : "No data"}</td>
              <td>
                <input
                  placeholder={row.latitude.toString()}
                  value={editLat}
                  onChange={(e) => setEditLat(e.target.value)}
                ></input>
              </td>
              <td>
                <input
                  placeholder={row.longitude.toString()}
                  value={editLng}
                  onChange={(e) => setEditLng(e.target.value)}
                ></input>
              </td>
              <td>
                <button className={buttonEditStyle} onClick={saveEditedRow}>
                  Save
                </button>
              </td>
            </tr>
          )
        )}
      </tbody>
    );
  };

  return (
    <>
      {btnAddClicked && (
        <AddDevicePopup
          setBtnAddClicked={setBtnAddClicked}
          setDataAdded={setDataAdded}
        />
      )}
      <div className="flex justify-center">
        <div className="container">
          <button
            className={buttonAddStyle}
            onClick={() => setBtnAddClicked(true)}
          >
            +
          </button>
          <table className={tableStyle}>
            <thead>
              <tr className={trHeadStyle}>
                <th>ID</th>
                <th>Name</th>
                <th>Last Sync Date and Time</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th></th>
              </tr>
            </thead>
            {TableBody()}
          </table>
        </div>
      </div>
    </>
  );
}
