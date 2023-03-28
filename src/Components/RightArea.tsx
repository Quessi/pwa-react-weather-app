import { Box, Grid, Typography,Divider } from '@mui/material'
import React,{useEffect} from 'react'
import { TbTemperatureCelsius } from "react-icons/tb";
import { BsCloudSun } from "react-icons/bs";
import useFetch from '../Hooks/useFetch';
import DateComponent from './DateComponent';



function RightArea() {

    const {fetchData, data,loading,error} = useFetch()
    const mainData = data?.data?.main
    const weatherData = data?.data?.weather
    const windData = data?.data?.wind
    const sysData = data?.data?.sys

    useEffect(() => {
        fetchData('/city',{name:"Accra"})
    },[])

  return (
    <div>
      <Grid container columns={48} sx={{p:5,backgroundColor:"rgb(0,0,0,0.1)",color:"#f8f8f8"}}>
      <Grid item xs={48} md={23} >
          <Box>
            <Box sx={{ display: "flex" }}>
              <Typography variant="h3" sx={{ px: 1 }}>
                {data?.data?.name},
              </Typography>
              <Typography variant="h3">{data?.data?.sys?.country}</Typography>
            </Box>
            <Box><DateComponent/></Box>
            <Box>
              <Box sx={{display:"flex",justifyContent:"space-between",mx:2}}>
                <Box>
                <BsCloudSun style={{ fontSize: "15rem", fontWeight: "100" }} />
                </Box>
                <Box sx={{display:"flex",flexDirection:"column",justifyContent:"space-between",my:5}}>
                <Box sx={{display:"flex",alignItems:"center"}}>
                <Typography variant="h2" sx={{ px: 1 }}>
                  {data?.data?.main?.temp}
                </Typography>
                <TbTemperatureCelsius style={{ fontSize: "4rem", fontWeight: "100" }}/> 
                </Box>
                <Typography variant="h3" sx={{ px: 1 }}>
                  {data?.data?.weather[0]?.description}
                </Typography>
                </Box>
              </Box>

            </Box>
          </Box>
        </Grid>
        <Grid item xs={0} md={2}>
        <Divider orientation = "vertical" sx={{backgroundColor:"#d9d9d9",width:"1px"}} />
        </Grid>
        <Grid item xs={48} md={23} >
          <Box sx={{display:"flex",justifyContent:"space-between",height:"100%",py:5}}>
          <Box sx={{display:"flex",justifyContent:"space-between",flexDirection:"column",height:"100%"}}>
            <Box sx={{m:2}}>
            <Typography variant='h5'>{mainData?.temp_max}<TbTemperatureCelsius/></Typography>
            <Typography variant='h6' sx={{color:"#d9d9d9"}}>High</Typography>
            </Box>
            <Box sx={{m:2}}>
            <Typography variant='h5'>{mainData?.temp_min}<TbTemperatureCelsius/></Typography>
            <Typography variant='h6' sx={{color:"#d9d9d9"}}>Low</Typography>
            </Box>
          </Box>
          <Box sx={{display:"flex",justifyContent:"space-between",flexDirection:"column",height:"100%"}}>
          <Box sx={{m:2}}>
            <Typography variant='h5'>{windData?.speed}</Typography>
            <Typography variant='h6' sx={{color:"#d9d9d9"}}>Wind</Typography>
            </Box>
            <Box sx={{m:2}}>
            <Typography variant='h5'>{windData?.deg}</Typography>
            <Typography variant='h6' sx={{color:"#d9d9d9"}}>Direction</Typography>
            </Box>
          </Box>
          <Box sx={{display:"flex",justifyContent:"space-between",flexDirection:"column",height:"100%"}}>
          <Box sx={{m:2}}>
            <Typography variant='h5'>{sysData?.sunset}</Typography>
            <Typography variant='h6' sx={{color:"#d9d9d9"}}>Sunset</Typography>
            </Box>
            <Box sx={{m:2}}>
            <Typography variant='h5'>{sysData?.sunrise}</Typography>
            <Typography variant='h6' sx={{color:"#d9d9d9"}}>Sunrise</Typography>
            </Box>
          </Box>

          </Box>
        </Grid>

        <Box></Box>
      </Grid>
    </div>
  );
}

export default RightArea