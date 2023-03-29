import axios from "axios";


export default axios.create({
    baseURL: "https://inno-weather-relay-api.onrender.com/"
    //  baseURL: "http://localhost:3033/"
})
