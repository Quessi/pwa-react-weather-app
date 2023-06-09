import React from "react";
import { RiThunderstormsLine, RiDrizzleLine } from "react-icons/ri";
import { WiRainWind } from "react-icons/wi";
import { BsSnow3, BsCloudHaze } from "react-icons/bs";
import { WiDaySunnyOvercast } from "react-icons/wi";
import styles from '../App.module.css'



const iconObject: { [key: string]: any } = {
  "2": RiThunderstormsLine,
  "3": RiDrizzleLine,
  "5": WiRainWind,
  "6": BsSnow3,
  "7": BsCloudHaze,
  "8": WiDaySunnyOvercast,
};

function GetIcon({ weather }: { weather: any }) {
  const index = weather?.[0]?.id ? weather[0].id.toString().charAt(0) : "8";
  const Icon = iconObject[index];

  return (
    <>
      <Icon className={styles.icon} />
    </>
  );
}

export default GetIcon;
