import React from "react";
import { PieGenders } from "./PieGenders";
import { PieEventsByGender } from "./PieEventsByGenders";
import { ChartDevicesUsed } from "./ChartDevicesUsed";

export function Charts() {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <div className="mb-10 flex w-2/4 flex-row items-center justify-center">
        <div className="w-full text-center">
          <span className=" text-2xl text-white">
            Number of male / female Accounts
          </span>
          <PieGenders />
        </div>
        <div className="w-full text-center">
          <span className=" text-2xl text-white">
            Number of male / female Events
          </span>
          <PieEventsByGender />
        </div>
      </div>
      <div className="flex w-2/4 flex-row items-center justify-center">
        <div className="w-full text-center">
          <span className="text-2xl text-white">
            Number of events occured on each Device
          </span>
          <ChartDevicesUsed />
        </div>
      </div>
    </div>
  );
}
