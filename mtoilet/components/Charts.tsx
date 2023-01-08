import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { User } from "../pages/Authentication";
import { PieGenders } from "./PieGenders";
import { PieEventsByGender } from "./PieEventsByGenders";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const dataChart = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => [1, 2, 3, 4, 5, 6, 7]),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => [1, 2, 3, 4, 5, 6, 7]),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export function Charts() {
  const [dataUsers, setDataEvents] = useState([]);
  const [countUserW, setcountUserW] = useState<number>();
  const [countUserM, setcountUserM] = useState<number>();

  const fetchData = () => {
    return axios
      .get("https://air2221.mobilisis.hr/api/users")
      .then((response) => setDataEvents(response.data));
  };

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
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-2/4 flex-row items-center justify-center">
        <div className="w-full">
          <PieGenders />
        </div>
        <div className="w-full">
          <PieEventsByGender />
        </div>
        {/* </div>
      <div className="flex w-2/4 flex-row items-center justify-center">
        <div className="w-full">
          <Pie data={data} />
        </div>
        <div className="w-full">
          <Pie data={data} />
        </div> */}
      </div>
    </div>
  );
}
