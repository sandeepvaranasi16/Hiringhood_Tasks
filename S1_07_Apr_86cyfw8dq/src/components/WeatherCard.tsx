import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import WaterIcon from "@mui/icons-material/Water";
import AirIcon from "@mui/icons-material/Air";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import SunnySnowingIcon from "@mui/icons-material/SunnySnowing";
import LocationOnIcon from "@mui/icons-material/LocationOn";
const WeatherCard = ({
  current,
  forecast,
}: {
  current: any;
  forecast: any[];
}) => {
  const iconCode = current.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <Card  sx={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid #1976d2",
        padding: "20px",
        boxShadow: "-4px 4px 8px rgba(0, 94, 255, 0.34)",
        borderRadius: "15px",
        mb: 6
      }}>
      <CardContent
       >
        <Typography variant="h5" gutterBottom>
          <LocationOnIcon color="error" fontSize="large" /> {current.name},{" "}
          {current.sys.country}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }} gap={2}>
          <img src={iconUrl} alt="weather icon" style={{ width: "200px" }} />
          <Box>
            <Typography variant="h4" sx={{ color: "#1976d2" }}>
              <DeviceThermostatIcon fontSize="medium" /> {current.main.temp}°C -{" "}
              {current.weather[0].description}
            </Typography>
            <Typography variant="h5">
              <WaterIcon fontSize="medium" /> Humidity: {current.main.humidity}%
            </Typography>
            <Typography variant="h5">
              <AirIcon fontSize="medium" /> Wind: {current.wind.speed} m/s
            </Typography>
            <Typography variant="h5">
              <WbSunnyIcon fontSize="medium" color="warning" /> Sunrise:{" "}
              {new Date(current.sys.sunrise * 1000).toLocaleTimeString()}
            </Typography>
            <Typography variant="h5">
              <SunnySnowingIcon fontSize="medium" color="disabled" /> Sunset:{" "}
              {new Date(current.sys.sunset * 1000).toLocaleTimeString()}
            </Typography>
          </Box>
        </Box>

        <Typography variant="h6" sx={{ mt: 4, textAlign: "center" }}>
          6-Day Forecast
        </Typography>

        <Grid
          container
          spacing={2}
          sx={{
            mt: 1,
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "space-around",
          }}>
          {forecast.map((day, idx) => (
            <Grid key={idx}>
              <Card
                sx={{
                  boxShadow: "-4px 4px 4px 0 rgba(127, 93, 0, 0.2)",
                  border: "1px solid rgb(210, 87, 25)",
                  borderRadius: "15px",
                }}>
                <CardContent>
                  <Typography>{new Date(day.date).toDateString()}</Typography>
                  <Typography>
                    <DeviceThermostatIcon color="info" /> {day.temp}°C
                  </Typography>
                  <Typography>
                    <WaterIcon color="info" /> {day.humidity}%
                  </Typography>
                  <Typography>
                    <AirIcon color="info" /> {day.wind} m/s
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
