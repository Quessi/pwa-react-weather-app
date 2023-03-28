import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

function DateComponent() {
  const [date, setDate] = useState<any>(Date.now());
  const dateObject = new Date(date)
  const daysArray = ["Sunday",'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',]
  const monthsArray = ["Jan", 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const complete =
    daysArray[dateObject.getDay()] +
    "," +
    " " +
    monthsArray[dateObject.getMonth()] +
    " " +
    dateObject.getDate() +
    " " +
    dateObject.toLocaleTimeString();

  useEffect(() => {
    const refreshTime = setInterval(() => {
      setDate(Date.now());
    }, 1000);
    return () => {
      clearInterval(refreshTime);
    };
  }, []);

  return (
  <Box sx={{display:"flex"}}>
    <Typography variant="h6" sx={{px:1,pb:4,fontWeight:500}}>{complete}</Typography>
  </Box>
  );
}

export default DateComponent;
