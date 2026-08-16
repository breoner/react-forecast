import { useEffect, useState } from "react";
import Header from "./Components/Header/Header";
import Hero from "./Components/Hero/Hero";
import WeatherSection from "./Components/Weather/WeatherSection";
import NewsSection from "./Components/News/NewsSection";
import NatureSection from "./Components/Nature/NatureSection";
import Footer from "./Components/Footer/Footer";
import SeasonalDecor from "./Components/SeasonalDecor/SeasonalDecor";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [cities, setCities] = useState(() => {
    const savedCities = localStorage.getItem("cities");

    return savedCities ? JSON.parse(savedCities) : [];
  });

  const [error, setError] = useState("");

  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
  }, [cities]);

  useEffect(() => {
    const root = document.documentElement;

    if (isDark) {
      root.classList.add("dark");

      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");

      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem("language", language);

    document.documentElement.lang = language === "ua" ? "uk" : "en";
  }, [language]);

  const handleToggleTheme = () => {
    setIsDark((currentTheme) => !currentTheme);
  };

  const handleToggleLanguage = () => {
    setLanguage((currentLanguage) => (currentLanguage === "en" ? "ua" : "en"));
  };

  const handleSearch = async (place) => {
    try {
      setError("");

      const isAlreadyAdded = cities.some(
        (city) => city.place.lat === place.lat && city.place.lon === place.lon,
      );

      if (isAlreadyAdded) {
        setError(
          language === "ua"
            ? "Це місто вже додано"
            : "This city is already added",
        );

        return;
      }

      const apiLanguage = language === "ua" ? "uk" : "en";

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${place.lat}&lon=${place.lon}&appid=${API_KEY}&units=metric&lang=${apiLanguage}`,
      );

      if (!response.ok) {
        throw new Error(
          language === "ua" ? "Погоду не знайдено" : "Weather not found",
        );
      }

      const weather = await response.json();

      const newCity = {
        id: `${place.lat}-${place.lon}`,
        place,
        weather,
        isFavorite: false,
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

      const apiLanguage = language === "ua" ? "uk" : "en";

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.place.lat}&lon=${city.place.lon}&appid=${API_KEY}&units=metric&lang=${apiLanguage}`,
      );

      if (!response.ok) {
        throw new Error(
          language === "ua"
            ? "Не вдалося оновити погоду"
            : "Failed to refresh weather",
        );
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
    <div className="min-h-screen bg-white text-black transition-colors duration-300 dark:bg-[#121212] dark:text-white">
      <SeasonalDecor />

      <Header
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        language={language}
        onToggleLanguage={handleToggleLanguage}
      />

      <Hero onSearch={handleSearch} language={language} />

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
        isDark={isDark}
        language={language}
      />

      <NewsSection language={language} />

      <NatureSection cities={cities} language={language} />

      <Footer isDark={isDark} language={language} />
    </div>
  );
}

export default App;
