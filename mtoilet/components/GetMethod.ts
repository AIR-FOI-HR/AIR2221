import axios from "axios";

export const fetchData = (table: string) => {
  return axios
    .get("https://air2221.mobilisis.hr/api/" + table)
    .then((response) => {
      if (response.status == 200) {
        return response.data;
      }
    });
};
