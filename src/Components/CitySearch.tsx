import { FormControl, Autocomplete, TextField } from '@mui/material'
import React from 'react'
import { ICityResult } from '../types'

function CitySearch({handleCityChange,handleSelection,results}:{handleCityChange:any,handleSelection:any,results:ICityResult[]}) {
  return (
    <FormControl
    sx={{
      minWidth: "12.75rem",
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
  )
}

export default CitySearch