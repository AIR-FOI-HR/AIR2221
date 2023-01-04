import axios from "axios";
import { useState, useEffect } from "react";
import { Device } from "../pages/Map";

const tableStyle =
  "table-auto bg-white w-full rounded-2xl text-2xl overflow-hidden px-4";

const trHeadStyle = "text-left text-white bg-sky-600 h-12";

const trBodyStyle =
  "hover:animate border-solid hover:bg-sky-200 border-t-2 border-sky-500 ease-out duration-100 h-12";

const buttonStyle = "bg-sky-600 text-white w-full rounded-lg";

export default function TableDevices() {
  const [dataDevices, setDataDevices] = useState([]);
  const [btnEditClicked, setBtnEditClicked] = useState(false);
  const [rowIdToEdit, setRowIdToEdit] = useState(-1);
  const [inputName, setinputName] = useState("");
  const [inputLng, setinputLng] = useState("");
  const [inputLat, setinputLat] = useState("");

  const toggleBtnEditClicked = (rowId: number) => {
    if (btnEditClicked) setRowIdToEdit(-1);
    else setRowIdToEdit(rowId);
    setBtnEditClicked((btnEditClicked) => !btnEditClicked);
  };

  const fetchData = () => {
    return axios
      .get("https://air2221.mobilisis.hr/api/devices")
      .then((response) => setDataDevices(response.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const TableBody = () => {
    return (
      <tbody>
        {dataDevices.map((row: Device) =>
          rowIdToEdit != row.id ? (
            <tr key={row.id} className={trBodyStyle}>
              <td>{row.id}</td>
              <td>{row.deviceName}</td>
              <td>{row.lastSync ? row.lastSync : "No data"}</td>
              <td>{row.latitude}</td>
              <td>{row.longitude}</td>
              <td>
                <button
                  className={buttonStyle}
                  onClick={() => toggleBtnEditClicked(row.id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ) : (
            <tr key={row.id} className={trBodyStyle}>
              <td>{row.id}</td>
              <td>
                <input
                  placeholder={row.deviceName}
                  value={inputName}
                  onChange={(e) => setinputName(e.target.value)}
                ></input>
              </td>
              <td>{row.lastSync ? row.lastSync : "No data"}</td>
              <td>
                <input
                  placeholder={row.latitude.toString()}
                  value={inputLat}
                  onChange={(e) => setinputLat(e.target.value)}
                ></input>
              </td>
              <td>
                <input
                  placeholder={row.longitude.toString()}
                  value={inputLng}
                  onChange={(e) => setinputLng(e.target.value)}
                ></input>
              </td>
              <td>
                <button
                  className={buttonStyle}
                  onClick={() => toggleBtnEditClicked(row.id)}
                >
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
    <div className="flex justify-center">
      <div className="container">
        <table className={tableStyle}>
          <thead>
            <tr className={trHeadStyle}>
              <th>ID</th>
              <th>Name</th>
              <th>Last Synchronization Time</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th></th>
            </tr>
          </thead>
          {TableBody()}
        </table>
      </div>
    </div>
  );
}
