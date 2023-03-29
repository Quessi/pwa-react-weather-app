import { Box, Grid, Typography,Divider,Select, Autocomplete, TextField, FormControl } from '@mui/material'
import React,{useEffect} from 'react'
import { TbTemperatureCelsius } from "react-icons/tb";
import { BsCloudSun } from "react-icons/bs";
import useFetch from '../Hooks/useFetch';
import DateComponent from './DateComponent';
import useFormatWeatherData from '../Hooks/useFormatWeatherData';
import DataPair from './DataPair';
import codes from '../Utils/weather.json'
import GetIcon from './GetIcon';
import API from '../Utils/API';
import { ICityResult } from '../types';




function RightArea() {

    const {fetchData,fetchDataWithCoordinates, data,loading,error} = useFetch()
    const weatherData = data?.data?.weather
    const typedCodes:{[key:string]:any} = codes as unknown as object
    const weatherDataId = weatherData?.[0]?.id ? weatherData[0].id.toString() : 0
    const description = weatherDataId ? typedCodes[weatherDataId] :false
    const [city,setCity] = React.useState<string>("")
    const [results,setResults] = React.useState<ICityResult []>([])
  
    const dataItemDataPairArray = useFormatWeatherData(data)
    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(
            function(position) {
              localStorage.setItem('position',JSON.stringify((position.coords)))
              console.log(position.coords)
              return false
            },
            function(error) {
                localStorage.setItem('decision','false')
                console.log("never")
              return true
            }
          );
    }
    
    useEffect(() => {
        const decision = localStorage.getItem('decision')
        if(!decision){
            const decision:any = getLocation()
            if(decision){
                localStorage.setItem('decision','true')
                const position = JSON.parse(localStorage.getItem('position') || '{}')
                fetchDataWithCoordinates('/coordinates',{lat:position?.latitude,lon:position?.longitude})
                return
            }else{
                const value = localStorage.getItem('city') || 'london'
                fetchData('/city',{name:value})
                return
            }
        }
        if(decision === 'true'){
            const position = JSON.parse(localStorage.getItem('position') || '{}')
            fetchDataWithCoordinates('/coordinates',{lat:position?.latitude,lon:position?.longitude})
        }else{
            const value = localStorage.getItem('city') || 'london'
            fetchData('/city',{name:value})
        }
    },[])
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
      <FormControl
        sx={{
          minWidth: "18.75rem",
          mb:2,
        }}
      >
        <Autocomplete
          freeSolo
          disableClearable
          options={results.map((option: ICityResult) => option?.name)}
          onInputChange={handleCityChange}
          onChange={handleSelection}
          sx={{ fontSize: "1.6rem",backgroundColor:"#d9d9d9",borderRadius:"0.5rem" }}
          noOptionsText={"Data Unavailable"}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search city"
              InputProps={{
                ...params.InputProps,
                type: "search",
                style: { fontSize: "1rem" },
              }}
            />
          )}
        />
      </FormControl>
      <Grid
        container
        columns={48}
        sx={{ p: 5, backgroundColor: "rgb(0,0,0,0.1)", color: "#f8f8f8" }}
      >
        <Grid item xs={48} md={48} lg={23}>
          <Box>
            <Box sx={{ display: "flex" }}>
              <Typography variant="h3" sx={{ px: 1 }}>
                {data?.data?.name},
              </Typography>
              <Typography variant="h3">{data?.data?.sys?.country}</Typography>
            </Box>
            <Box>
              <DateComponent />
            </Box>
            <Box sx={{ mx: 2 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mx: 2 }}
              >
                <Box>
                  {/* <BsCloudSun style={{ fontSize: "15rem", fontWeight: "100" }} /> */}
                  <GetIcon weather={weatherData} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    my: 5,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h2" sx={{ px: 1 }}>
                      {data?.data?.main?.temp}
                    </Typography>
                    <TbTemperatureCelsius
                      style={{ fontSize: "4rem", fontWeight: "100" }}
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
              </Box>
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
              display: "flex",
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

export default RightArea

