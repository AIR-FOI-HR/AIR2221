import axios from "axios";
import { User } from "../pages/Authentication";
import { Device } from "../pages/Map";
import { Event } from "./TableEvents";

export const postData = (table: string, data: User | Device | Event) => {
  return axios
    .post("https://air2221.mobilisis.hr/api/" + table, data)
    .then((response) => {
      if (response.status == 200) {
        return true;
      }
    });
};
