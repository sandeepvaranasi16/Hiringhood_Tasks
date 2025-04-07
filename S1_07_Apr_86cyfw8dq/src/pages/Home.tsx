import { useEffect, useState } from "react";
import { CircularProgress, Container, Typography } from "@mui/material";
import { useWeather } from "../hooks/useWeather";
import WeatherCard from "../components/WeatherCard";

const Home = () => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      (err) => {
        console.error("Geolocation error:", err);
      }
    );
  }, []);

  const { current, forecast, loading } = useWeather(
    coords?.lat || 0,
    coords?.lon || 0
  );

  if (loading || !current) return <CircularProgress sx={{ m: 4 }} />;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom textAlign={"center"}>
        Current Location Weather
      </Typography>
      <WeatherCard current={current} forecast={forecast} />
    </Container>
  );
};

export default Home;
