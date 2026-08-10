import { useEffect, useState } from "react";
import Header from "./Components/Header/Header";
import Hero from "./Components/Hero/Hero";
import WeatherSection from "./Components/Weather/WeatherSection";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [cities, setCities] = useState(() => {
    const savedCities = localStorage.getItem("cities");

    return savedCities ? JSON.parse(savedCities) : [];
  });
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
  }, [cities]);

  const handleSearch = async (place) => {
    try {
      setError("");

      const isAlreadyAdded = cities.some(
        (city) => city.place.lat === place.lat && city.place.lon === place.lon,
      );

      if (isAlreadyAdded) {
        setError("This city is already added");
        return;
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${place.lat}&lon=${place.lon}&appid=${API_KEY}&units=metric`,
      );

      if (!response.ok) {
        throw new Error("Weather not found");
      }

      const weather = await response.json();

      const newCity = {
        id: `${place.lat}-${place.lon}`,
        place,
        weather,
      };

      setCities((prevCities) => [...prevCities, newCity]);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteCity = (id) => {
    setCities((prevCities) => prevCities.filter((city) => city.id !== id));
  };

  const handleToggleFavorite = (id) => {
    setCities((prevCities) =>
      prevCities.map((city) =>
        city.id === id
          ? {
              ...city,
              isFavorite: !city.isFavorite,
            }
          : city,
      ),
    );
  };

  const handleRefreshCity = async (id) => {
    const city = cities.find((city) => city.id === id);

    if (!city) {
      return;
    }

    try {
      setError("");

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.place.lat}&lon=${city.place.lon}&appid=${API_KEY}&units=metric`,
      );

      if (!response.ok) {
        throw new Error("Failed to refresh weather");
      }

      const weather = await response.json();

      setCities((prevCities) =>
        prevCities.map((item) =>
          item.id === id
            ? {
                ...item,
                weather,
              }
            : item,
        ),
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Header />

      <Hero onSearch={handleSearch} />

      {error && (
        <p className="mt-[20px] text-center text-[14px] text-red-500">
          {error}
        </p>
      )}

      <WeatherSection
        cities={cities}
        onDelete={handleDeleteCity}
        onRefresh={handleRefreshCity}
        onToggleFavorite={handleToggleFavorite}
      />
    </>
  );
}

export default App;
