import axios from "axios";

export const deleteData = (table: string, id: number) => {
  return axios
    .delete("https://air2221.mobilisis.hr/api/" + table + "/" + id)
    .then((response) => {
      if (response.status == 200) {
        return true;
      }
    });
};
