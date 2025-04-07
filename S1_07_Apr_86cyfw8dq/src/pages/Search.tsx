import { useState } from "react";
import { TextField, Button, Container } from "@mui/material";
import axios from "axios";
import WeatherCard from "../components/WeatherCard";
import { useWeather } from "../hooks/useWeather";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

const Search = () => {
  const [city, setCity] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );

  const { current, forecast } = useWeather(
    coords?.lat || 0,
    coords?.lon || 0
  );

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      const { lat, lon } = res.data.coord;
      setCoords({ lat, lon });
    } catch (err) {
      console.error("City not found:", err);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Button component={Link} to="/" variant="outlined" sx={{ mt: 2, mb: 2 }}>
        Home
      </Button>
      <TextField
        label="Enter City"
        variant="outlined"
        fullWidth
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <Button onClick={handleSearch}  variant="contained" sx={{ mt: 2,textAlign: 'center', width: '100%', mb: 2 }}>
        Search
      </Button>

    
      {current && forecast.length > 0 && (
        <WeatherCard current={current} forecast={forecast} />
      )}
    </Container>
  );
};

export default Search;
