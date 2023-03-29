import { Box, Grid, Typography,Divider,} from '@mui/material'
import React,{useEffect} from 'react'
import { TbTemperatureCelsius } from "react-icons/tb";
import useFetch from '../Hooks/useFetch';
import DateComponent from './DateComponent';
import useFormatWeatherData from '../Hooks/useFormatWeatherData';
import DataPair from './DataPair';
import codes from '../Utils/weather.json'
import GetIcon from './GetIcon';
import API from '../Utils/API';
import { ICityResult } from '../types';
import CitySearch from './CitySearch';
import useGetUserLocation from '../Hooks/useGetUserLocation';
import styles from '../App.module.css'






function MainArea() {

    const {fetchData,fetchDataWithCoordinates, data,loading,error} = useFetch()
    const weatherData = data?.data?.weather
    const typedCodes:{[key:string]:any} = codes as unknown as object
    const weatherDataId = weatherData?.[0]?.id ? weatherData[0].id.toString() : 0
    const description = weatherDataId ? typedCodes[weatherDataId] :false
    const [city,setCity] = React.useState<string>("")
    const [results,setResults] = React.useState<ICityResult []>([])
    const {getCurrentLocation} = useGetUserLocation()
  
    const dataItemDataPairArray = useFormatWeatherData(data)

    
    useEffect(() => {
      const userLocation = async () => {
        try {
          const userLocation: any = await getCurrentLocation();
          const position = {
            lat: userLocation?.coords?.latitude,
            lon: userLocation?.coords?.longitude,
          };
          localStorage.setItem("previous-location", JSON.stringify(position));
          fetchDataWithCoordinates("/coordinates", { ...position });
        } catch (e) {
          const prevLocation: any = JSON.parse(
            localStorage.getItem("previous-location") || "{}"
          );
          if (prevLocation?.lat && prevLocation?.lon) {
            fetchDataWithCoordinates("/coordinates", { ...prevLocation });
          } else {
            const value = localStorage.getItem("city") || "london";
            fetchData("/city", { name: value });
          }
        }
      };
      userLocation();
    }, []);
    const handleCityChange = (e:any) =>{
        setCity(e.target.value)
        searchCities()
    
      }
    const searchCities = async()=>{
        if(!city || city?.length<2) return
        const res = await API.get(`/find-city?name=${city}`)
        setResults(res?.data?.data?.slice(0,5))
      }
      const handleSelection = (e:any,value:string)=>{
        localStorage.setItem('city',value)
        fetchData('/city',{name:value})
   
      }

  return (
    <div>

      <CitySearch results={results} handleCityChange={handleCityChange} handleSelection={handleSelection}/>
      <Grid
        container
        columns={48}
        sx={{ p: 5, backgroundColor: "rgb(0,0,0,0.1)", color: "#f8f8f8" }}
      >
        <Grid item xs={48} md={48} lg={23}>
          <Box>
            {!!data?.data?.name && 
            (<Box sx={{ display: "flex" }}>
              <Typography variant="h3" sx={{ px: 1 }}>
                {data?.data?.name},
              </Typography>
              <Typography variant="h3">{data?.data?.sys?.country}</Typography>
            </Box>)}
            <Box>
              <DateComponent />
            </Box>
            <Box sx={{ mx: 1 }}>
              <Grid container columns={12}
                
              >
                <Grid item xs={12} sm={6} lg={6}>
                  <Box sx={{display:"flex",alignItems:"center",height:"100%", width:"100%", justifyContent:"center"}}>
                    {/* <BsCloudSun style={{ fontSize: "15rem", fontWeight: "100" }} /> */}
                    <GetIcon weather={weatherData} />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} lg={6}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    my: 5,
                    width:"100%"
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h2" sx={{ px: 1 }}>
                      {data?.data?.main?.temp}
                    </Typography>
                    <TbTemperatureCelsius
                      className={styles.icon2}
                    />
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{ px: 1, textTransform: "capitalize" }}
                  >
                    {description ||
                      weatherData?.[0]?.description ||
                      "Unknown weather"}
                  </Typography>
                </Box>

                </Grid>


              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={0} md={0} lg={2}>
          <Divider
            orientation="vertical"
            sx={{ backgroundColor: "#d9d9d9", width: "1px" }}
          />
        </Grid>
        <Grid item xs={48} md={48} lg={23}>
          <Box
            sx={{
              display:{xs:"none",sm:"flex"},
              justifyContent: "space-between",
              height: "100%",
              py: 5,
            }}
          >
            {dataItemDataPairArray.map((item, index) => (
              <DataPair mainData={item} />
            ))}
          </Box>
        </Grid>

        <Box></Box>
      </Grid>
    </div>
  );
}

export default MainArea

