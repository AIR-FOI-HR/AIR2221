import { useState, useEffect } from "react";
import { User } from "../pages/Authentication";
import { Device } from "../pages/Map";
import { fetchData } from "./GetMethod";
import { tableStyle, trHeadStyle, trBodyStyle } from "./TableDevices";

export interface Event {
  id?: number;
  date: number;
  userId: number;
  deviceId: number;
}

export const beautifyDate = (date: number) => {
  var dateRaw = date.toString().substring(0, 10);
  var year = dateRaw.substring(0, 4);
  var month = dateRaw.substring(5, 7);
  var day = dateRaw.substring(8, 10);

  return [day, "/", month, "/", year];
};

export const beautifyTime = (time: number) => {
  return time.toString().substring(11, 19);
};

export default function TableDevices() {
  const [dataEvents, setDataEvents] = useState([]);
  const [dataDevices, setDataDevices] = useState([]);
  const [dataUsers, setDataUsers] = useState([]);

  const getUsername = (userId: number) => {
    var username = "Error";

    dataUsers.map((user: User) => {
      if (user.id == userId) username = user.username;
    });

    return username;
  };

  const getDeviceName = (deviceId: number) => {
    var deviceName = "Error";

    dataDevices.map((device: Device) => {
      if (device.id == deviceId) deviceName = device.deviceName;
    });

    return deviceName;
  };

  useEffect(() => {
    async function fetchDataEvents() {
      const dataEventsTemp = await fetchData("events");
      setDataEvents(dataEventsTemp);
    }

    async function fetchDataDevices() {
      const dataDevicesTemp = await fetchData("devices");
      setDataDevices(dataDevicesTemp);
    }

    async function fetchDataUsers() {
      const dataUsersTemp = await fetchData("users");
      setDataUsers(dataUsersTemp);
    }

    fetchDataEvents();
    fetchDataDevices();
    fetchDataUsers();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="container">
        <table className={tableStyle}>
          <thead>
            <tr className={trHeadStyle}>
              <th>ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Username</th>
              <th>Device Name</th>
            </tr>
          </thead>
          <tbody>
            {dataEvents.map((row: Event) => (
              <tr key={row.id} className={trBodyStyle}>
                <td>{row.id}</td>
                <td>{row.date ? beautifyDate(row.date) : "No data"}</td>
                <td>{row.date ? beautifyTime(row.date) : "No data"}</td>
                <td>{getUsername(row.userId)}</td>
                <td>{getDeviceName(row.deviceId)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
