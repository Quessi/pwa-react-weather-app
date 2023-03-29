import { TbTemperatureCelsius } from 'react-icons/tb'
import { IDataItemPair } from '../types';


function useFormatWeatherData(data:any) {

    const mainData = data?.data?.main
    const windData = data?.data?.wind
    const sysData = data?.data?.sys


    const dataItemDataPairArray:IDataItemPair [] = [
      {
        data1: {
          data: mainData?.temp_max,
          description: "High",
          Icon: TbTemperatureCelsius,
        },
        data2: {
          data: mainData?.temp_min,
          description: "Low",
          Icon: TbTemperatureCelsius,
        },
      },
      {
        data1: {
          data: windData?.speed,
          description: "Wind",
          unit:  " m/s" ,
        },
        data2: {
          data: windData?.deg,
          description: "Direction",
          unit: " deg",
        },
      },
      {
        data1: {
          data: sysData?.sunset
            ? new Date(sysData?.sunset).toLocaleTimeString()
            : "__ : __ : __",
          description: "Sunset",
        },
        data2: {
          data: sysData?.sunrise
            ? new Date(sysData?.sunrise).toLocaleTimeString()
            : "__ : __ : __",
          description: "Sunrise",
        },
      },
    ];
      return dataItemDataPairArray

}

export default useFormatWeatherData