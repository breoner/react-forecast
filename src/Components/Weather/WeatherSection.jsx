import { useState } from "react";
import WeatherCard from "./WeatherCard";
import WeatherDetails from "./WeatherDetails";
import HourlyForecast from "./HourlyForecast";
import WeeklyForecast from "./WeeklyForecast";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function WeatherSection({
  cities,
  onDelete,
  onRefresh,
  onToggleFavorite,
}) {
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [detailsCityId, setDetailsCityId] = useState(null);

  const [forecastCityId, setForecastCityId] = useState(null);
  const [forecast, setForecast] = useState(null);

  const [showHourly, setShowHourly] = useState(false);
  const [showWeekly, setShowWeekly] = useState(false);

  if (cities.length === 0) {
    return null;
  }

  const selectedCity = cities.find(
    (city) => city.id === detailsCityId
  );

  const handleDetails = (id) => {
    if (selectedCityId === id) {
      setSelectedCityId(null);

      setTimeout(() => {
        setDetailsCityId(null);
      }, 500);

      return;
    }

    setDetailsCityId(id);
    setSelectedCityId(id);
  };

  const loadForecast = async (city) => {
    if (forecastCityId === city.id && forecast) {
      return forecast;
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${city.place.lat}&lon=${city.place.lon}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Failed to load forecast");
    }

    const data = await response.json();

    setForecastCityId(city.id);
    setForecast(data);

    return data;
  };

  const handleHourlyForecast = async (city) => {
    try {
      await loadForecast(city);

      if (forecastCityId !== city.id) {
        setShowWeekly(false);
      }

      setShowHourly(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleWeeklyForecast = async (city) => {
    try {
      await loadForecast(city);

      if (forecastCityId !== city.id) {
        setShowHourly(false);
      }

      setShowWeekly(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id) => {
    if (selectedCityId === id || detailsCityId === id) {
      setSelectedCityId(null);
      setDetailsCityId(null);
    }

    if (forecastCityId === id) {
      setForecastCityId(null);
      setForecast(null);
      setShowHourly(false);
      setShowWeekly(false);
    }

    onDelete(id);
  };

  const sortedCities = [...cities].sort(
    (a, b) =>
      Number(b.isFavorite) - Number(a.isFavorite)
  );

  return (
    <section className="bg-white py-[60px]">
      <div className="mx-auto w-full max-w-[1160px] px-[10px]">
        <div className="flex flex-wrap justify-center gap-[40px]">
          {sortedCities.map((city) => (
            <WeatherCard
              key={city.id}
              city={city.place}
              weather={city.weather}
              isFavorite={city.isFavorite}
              onDetails={() => handleDetails(city.id)}
              onDelete={() => handleDelete(city.id)}
              onRefresh={() => onRefresh(city.id)}
              onToggleFavorite={() =>
                onToggleFavorite(city.id)
              }
              onHourlyForecast={() =>
                handleHourlyForecast(city)
              }
              onWeeklyForecast={() =>
                handleWeeklyForecast(city)
              }
            />
          ))}
        </div>

        <div
          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
            selectedCityId
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            {selectedCity && (
              <WeatherDetails
                weather={selectedCity.weather}
              />
            )}
          </div>
        </div>

        <div
          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
            showHourly && forecast
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            {forecast && (
              <HourlyForecast
                forecast={forecast}
                onClose={() => setShowHourly(false)}
              />
            )}
          </div>
        </div>

        <div
          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
            showWeekly && forecast
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            {forecast && (
              <WeeklyForecast
                forecast={forecast}
                onClose={() => setShowWeekly(false)}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WeatherSection;