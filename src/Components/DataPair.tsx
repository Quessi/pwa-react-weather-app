import React from "react";
import { Box, Typography } from "@mui/material";
import { IDataItemPair } from "../types";
import { TbTemperatureCelsius } from 'react-icons/tb'



function DataPair({mainData}:{mainData:IDataItemPair}) {
    const Icon1 = !!mainData?.data1?.Icon
    const Icon2 = !!mainData?.data2?.Icon 
    return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box sx={{ m: 2 }}>
          <Typography variant="h5">
            {mainData?.data1?.data}
            {Icon1 ? <TbTemperatureCelsius/> : mainData?.data1?.unit}
          </Typography>
          <Typography variant="h6" sx={{ color: "#d9d9d9" }}>
            {mainData?.data1?.description}
          </Typography>
        </Box>
        <Box sx={{ m: 2 }}>
          <Typography variant="h5">
            { mainData?.data2?.data}
            {Icon2 ? <TbTemperatureCelsius/> : mainData?.data2?.unit}
          </Typography>
          <Typography variant="h6" sx={{ color: "#d9d9d9" }}>
            {mainData?.data2?.description}
          </Typography>
        </Box>

      </Box>
    </>
  );
}

export default DataPair;
