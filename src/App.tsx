import React from "react";
import RightArea from "./Components/MainArea";
import { Box } from "@mui/material";
import { Container } from "@mui/material";
import MuiThemeLayout from "./Layouts/MuiThemeLayout";
import styles from './App.module.css'


function App() {
  return (
    <MuiThemeLayout>
      <Box className = {styles.header} sx={{height:"100vh",display:"flex",alignItems:"center"}}>
        <Container maxWidth="xl">
          <RightArea />
        </Container>
      </Box>
    </MuiThemeLayout>
  );
}

export default App;
