import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Event } from "./TableEvents";
import { User } from "../pages/Authentication";
import { fetchData } from "./GetMethod";

export function PieEventsByGender() {
  const [dataEvents, setDataEvents] = useState([]);
  const [dataUsers, setDataUsers] = useState<Array<User>>([]);
  const [userIds, setUserIds] = useState<Array<number>>();
  const [countUserM, setcountUserM] = useState<number>();
  const [countUserW, setcountUserW] = useState<number>();

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

  const onUserIdsUpdate = () => {
    var countUserM = 0;
    var countUserW = 0;

    if (dataUsers != undefined && userIds != undefined) {
      for (let y = 0; y < userIds.length; y++) {
        for (let i = 0; i < dataUsers.length; i++) {
          if (userIds[y] == dataUsers[i].id) {
            if (dataUsers[i].gender == "Male") countUserM++;
            if (dataUsers[i].gender == "Female") countUserW++;
          }
        }
      }
    }

    setcountUserM(countUserM);
    setcountUserW(countUserW);
  };

  useEffect(() => {
    var userIdsTemp: number[] = [];

    if (dataEvents.length > 0) {
      dataEvents.map((event: Event) => {
        userIdsTemp.push(event.userId);
      });
      setUserIds(userIdsTemp);
    }
  }, [dataEvents]);

  useEffect(() => {
    onUserIdsUpdate();
  }, [userIds]);

  useEffect(() => {
    async function getData() {
      const dataUsersTemp = fetchData("users");
      setDataUsers(await dataUsersTemp);

      const dataEventsTemp = fetchData("events");
      setDataEvents(await dataEventsTemp);
    }

    getData();
  }, []);

  return <Pie data={data} />;
}
