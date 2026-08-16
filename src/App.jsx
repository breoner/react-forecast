import { useEffect, useState } from "react";
import Header from "./Components/Header/Header";
import Hero from "./Components/Hero/Hero";
import WeatherSection from "./Components/Weather/WeatherSection";
import NewsSection from "./Components/News/NewsSection";
import NatureSection from "./Components/Nature/NatureSection";
import Footer from "./Components/Footer/Footer";
import SeasonalDecor from "./Components/SeasonalDecor/SeasonalDecor";
import Toast from "./Components/Toast/Toast";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [cities, setCities] = useState(() => {
    const savedCities = localStorage.getItem("cities");

    return savedCities ? JSON.parse(savedCities) : [];
  });

  const [toast, setToast] = useState({
    message: "",
    type: "info",
  });

  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  /*
    ========================================
    TOAST
    ========================================
  */

  const showToast = (message, type = "info") => {
    setToast({
      message,
      type,
    });
  };

  const closeToast = () => {
    setToast({
      message: "",
      type: "info",
    });
  };

  /*
    ========================================
    LOCAL STORAGE
    ========================================
  */

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

  /*
    ========================================
    SETTINGS
    ========================================
  */

  const handleToggleTheme = () => {
    setIsDark((currentTheme) => !currentTheme);
  };

  const handleToggleLanguage = () => {
    setLanguage((currentLanguage) => (currentLanguage === "en" ? "ua" : "en"));
  };

  /*
    ========================================
    SEARCH / ADD CITY
    ========================================
  */

  const handleSearch = async (place) => {
    try {
      const isAlreadyAdded = cities.some(
        (city) => city.place.lat === place.lat && city.place.lon === place.lon,
      );

      if (isAlreadyAdded) {
        showToast(
          language === "ua"
            ? "Це місто вже додано"
            : "This city is already added",
          "error",
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
        isHome: false,
      };

      setCities((prevCities) => [...prevCities, newCity]);

      showToast(
        language === "ua" ? `${place.name} додано` : `${place.name} added`,
        "success",
      );
    } catch (error) {
      showToast(
        error.message ||
          (language === "ua" ? "Сталася помилка" : "Something went wrong"),
        "error",
      );
    }
  };

  /*
    ========================================
    DELETE CITY
    ========================================
  */

  const handleDeleteCity = (id) => {
    const cityToDelete = cities.find((city) => city.id === id);

    setCities((prevCities) => prevCities.filter((city) => city.id !== id));

    if (cityToDelete) {
      showToast(
        language === "ua"
          ? `${cityToDelete.place.name} видалено`
          : `${cityToDelete.place.name} removed`,
        "info",
      );
    }
  };

  /*
    ========================================
    FAVORITE
    ========================================
  */

  const handleToggleFavorite = (id) => {
    const city = cities.find((city) => city.id === id);

    if (!city) {
      return;
    }

    const nextFavorite = !city.isFavorite;

    setCities((prevCities) =>
      prevCities.map((item) =>
        item.id === id
          ? {
              ...item,
              isFavorite: nextFavorite,
            }
          : item,
      ),
    );

    showToast(
      language === "ua"
        ? nextFavorite
          ? `${city.place.name} додано в обране`
          : `${city.place.name} видалено з обраного`
        : nextFavorite
          ? `${city.place.name} added to favorites`
          : `${city.place.name} removed from favorites`,
      "info",
    );
  };

  /*
    ========================================
    HOME CITY
    ========================================
  */

  const handleSetHomeCity = (id) => {
    const city = cities.find((city) => city.id === id);

    if (!city) {
      return;
    }

    if (city.isHome) {
      showToast(
        language === "ua"
          ? `${city.place.name} вже є головним містом`
          : `${city.place.name} is already your home city`,
        "info",
      );

      return;
    }

    setCities((prevCities) =>
      prevCities.map((item) => ({
        ...item,
        isHome: item.id === id,
      })),
    );

    showToast(
      language === "ua"
        ? `${city.place.name} тепер головне місто`
        : `${city.place.name} is now your home city`,
      "success",
    );
  };

  /*
    ========================================
    REFRESH WEATHER
    ========================================
  */

  const handleRefreshCity = async (id) => {
    const city = cities.find((city) => city.id === id);

    if (!city) {
      return;
    }

    try {
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

      showToast(
        language === "ua"
          ? `${city.place.name}: погоду оновлено`
          : `${city.place.name}: weather updated`,
        "success",
      );
    } catch (error) {
      showToast(
        error.message ||
          (language === "ua"
            ? "Не вдалося оновити погоду"
            : "Failed to refresh weather"),
        "error",
      );
    }
  };

  /*
    ========================================
    HERO CITY
    ========================================
  */

  const homeCity =
    cities.find((city) => city.isHome) ||
    cities.find((city) => city.isFavorite) ||
    cities[0] ||
    null;

  return (
    <div className="min-h-screen bg-white text-black transition-colors duration-300 dark:bg-[#121212] dark:text-white">
      <SeasonalDecor />

      <Toast message={toast.message} type={toast.type} onClose={closeToast} />

      <Header
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        language={language}
        onToggleLanguage={handleToggleLanguage}
      />

      <Hero
        onSearch={handleSearch}
        language={language}
        featuredCity={homeCity}
      />

      <WeatherSection
        cities={cities}
        onDelete={handleDeleteCity}
        onRefresh={handleRefreshCity}
        onToggleFavorite={handleToggleFavorite}
        onSetHomeCity={handleSetHomeCity}
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
