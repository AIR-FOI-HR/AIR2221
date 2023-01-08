import axios from "axios";
import { User } from "../pages/Authentication";
import { Device } from "../pages/Map";
import { Event } from "./TableEvents";

export const changeData = (
  table: string,
  id: number,
  data: User | Device | Event
) => {
  return axios
    .put("https://air2221.mobilisis.hr/api/" + table + "/" + id, data)
    .then((response) => {
      if (response.status == 200) {
        return true;
      }
    });
};
