import React from "react";
import { RiThunderstormsLine, RiDrizzleLine } from "react-icons/ri";
import { WiRainWind } from "react-icons/wi";
import { BsSnow3, BsCloudHaze, BsSun } from "react-icons/bs";

const iconObject: { [key: string]: any } = {
  "2": RiThunderstormsLine,
  "3": RiDrizzleLine,
  "5": WiRainWind,
  "6": BsSnow3,
  "7": BsCloudHaze,
  "8": BsSun,
};

function GetIcon({ weather }: { weather: any }) {
  const index = weather?.[0]?.id ? weather[0].id.toString().charAt(0) : "8";
  const Icon = iconObject[index];

  return (
    <>
      <Icon style={{ fontSize: "12rem", fontWeight: "100" }} />
    </>
  );
}

export default GetIcon;
