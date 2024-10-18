"use client";

import { useEffect, useState } from "react";

// Define un tipo para la respuesta del clima
interface WeatherData {
  lat: number;
  lon: number;
  current: {
    temp: number;
    weather: Array<{
      description: string;
    }>;
  };
}

export default function WeatherPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const API_KEY = "AIzaSyBhXZml3hb3NLt-Kt9oh4oEYgZONZbFI84"; 

  useEffect(() => {
    async function fetchWeather() {
      const lat = 51.5074; // Londres
      const lon = -0.1278; // Londres
      const exclude = "minutely,hourly,alerts"; 

      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&units=metric&appid=${API_KEY}`
        );

        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        const data: WeatherData = await res.json();
        setWeather(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
      }
    }

    fetchWeather();
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!weather) return <p>Loading...</p>;

  return (
    <div>
      <h1>Weather</h1>
      <p>Temperature: {weather.current.temp}°C</p>
      <p>Condition: {weather.current.weather[0].description}</p>
    </div>
  );
}
