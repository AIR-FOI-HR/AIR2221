import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { fetchData } from "./GetMethod";
import { Event } from "./TableEvents";

export function ChartDevicesUsed() {
  const [dataEvents, setDataEvents] = useState<Array<Event>>([]);
  const [labels, setlabels] = useState<Array<number>>([]);
  const [chartValues, setChartValues] = useState<Array<number>>([]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
      },
    },
  };

  const getEventDeviceIds = () => {
    var eventDeviceIds: number[] = [];
    dataEvents.map((event: Event) => {
      eventDeviceIds.push(event.deviceId);
    });

    getIdsOccurences(eventDeviceIds);
  };

  const getIdsOccurences = (eventDeviceIds: number[]) => {
    const counts: any = {};

    for (const num of eventDeviceIds) {
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }

    let idsOccurences = [];
    for (var deviceId in counts) {
      idsOccurences.push([deviceId, counts[deviceId]]);
    }

    idsOccurences.sort(function (b, a) {
      return a[1] - b[1];
    });

    var chartLabelsTemp: number[] = [];
    var chartValuesTemp: number[] = [];

    idsOccurences.map((occurence: Array<number>) => {
      chartLabelsTemp.push(occurence[0]);
      chartValuesTemp.push(occurence[1]);
    });

    setlabels(chartLabelsTemp);
    setChartValues(chartValuesTemp);
  };

  var i = -1;

  const getOneValue = () => {
    i++;
    return chartValues[i];
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Number of Events",
        data: labels.map(() => getOneValue()),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  useEffect(() => {
    async function getData() {
      const dataEventsTemp = fetchData("events");
      setDataEvents(await dataEventsTemp);
    }

    getData();
  }, []);

  useEffect(() => {
    getEventDeviceIds();
  }, [dataEvents]);

  return <Bar data={data} options={options} />;
}
