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

  const fetchData = () => {
    return axios
      .get("https://air2221.mobilisis.hr/api/devices")
      .then((response) => setDataDevices(response.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="container">
        <table className={tableStyle}>
          <thead>
            <tr className={trHeadStyle}>
              <th>Name</th>
              <th>Last Synchronization Time</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dataDevices.map((row: Device) => (
              <tr key={row.id} className={trBodyStyle}>
                <td>{row.deviceName}</td>
                <td>{row.lastSync ? row.lastSync : "No data"}</td>
                <td>{row.latitude}</td>
                <td>{row.longitude}</td>
                <td>
                  <button className={buttonStyle}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
