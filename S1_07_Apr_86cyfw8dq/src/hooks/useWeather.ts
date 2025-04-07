import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

export const useWeather = (lat: number, lon: number) => {
  const [current, setCurrent] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const currentRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        const forecastRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        setCurrent(currentRes.data);

        // Group forecast data by day
        const dailyData = forecastRes.data.list.reduce(
          (acc: any, entry: any) => {
            const date = entry.dt_txt.split(" ")[0];
            if (!acc[date]) acc[date] = [];
            acc[date].push(entry);
            return acc;
          },
          {}
        );

        const dailyAverages = Object.keys(dailyData).map((date) => {
          const temps = dailyData[date].map((d: any) => d.main.temp);
          const humidities = dailyData[date].map((d: any) => d.main.humidity);
          const winds = dailyData[date].map((d: any) => d.wind.speed);

          return {
            date,
            temp: (
              temps.reduce((a: number, b: number) => a + b, 0) / temps.length
            ).toFixed(1),
            humidity: (
              humidities.reduce((a: number, b: number) => a + b, 0) /
              humidities.length
            ).toFixed(1),
            wind: (
              winds.reduce((a: number, b: number) => a + b, 0) / winds.length
            ).toFixed(1),
          };
        });

        setForecast(dailyAverages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (lat && lon) fetchWeather();
  }, [lat, lon]);

  return { current, forecast, loading };
};
