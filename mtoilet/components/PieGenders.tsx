import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { User } from "../pages/Authentication";
import { fetchData } from "./GetMethod";

export function PieGenders() {
  const [dataUsers, setDataUsers] = useState([]);
  const [countUserW, setcountUserW] = useState<number>();
  const [countUserM, setcountUserM] = useState<number>();

  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: ["Men", "Women"],
    datasets: [
      {
        label: "# of Votes",
        data: [countUserM, countUserW],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    var usersMale = 0;
    var usersFemale = 0;

    if (dataUsers.length > 0) {
      dataUsers.map((user: User) => {
        if (user.gender.length > 0) {
          if (user.gender == "Male") usersMale++;
          if (user.gender == "Female") usersFemale++;
        }
      });
    }

    setcountUserM(usersMale);
    setcountUserW(usersFemale);
  }, [dataUsers]);

  useEffect(() => {
    async function getData() {
      const dataUsersTemp = fetchData("users");
      setDataUsers(await dataUsersTemp);
    }

    getData();
  }, []);

  return <Pie data={data} />;
}
