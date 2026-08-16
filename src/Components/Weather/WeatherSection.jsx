import { useLayoutEffect, useRef, useState } from "react";

import WeatherCard from "./WeatherCard";
import WeatherDetails from "./WeatherDetails";
import HourlyForecast from "./HourlyForecast";
import WeeklyForecast from "./WeeklyForecast";
import WeatherAssistant from "./WeatherAssistant";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function WeatherSection({
  cities,
  onDelete,
  onRefresh,
  onToggleFavorite,
  onSetHomeCity,
  isDark,
  language,
}) {
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [detailsCityId, setDetailsCityId] = useState(null);
  const [forecastCityId, setForecastCityId] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [showHourly, setShowHourly] = useState(false);
  const [showWeekly, setShowWeekly] = useState(false);
  const [assistantCityId, setAssistantCityId] = useState(null);
  const [assistantContentId, setAssistantContentId] = useState(null);
  const [refreshingCityId, setRefreshingCityId] = useState(null);

  const cardElementsRef = useRef(new Map());
  const previousPositionsRef = useRef(new Map());

  const setCardElement = (id, element) => {
    if (element) {
      cardElementsRef.current.set(id, element);
    } else {
      cardElementsRef.current.delete(id);
    }
  };

  const sortedCities = [...cities].sort((a, b) => {
    if (a.isHome !== b.isHome) {
      return Number(b.isHome) - Number(a.isHome);
    }

    return Number(b.isFavorite) - Number(a.isFavorite);
  });

  useLayoutEffect(() => {
    const newPositions = new Map();

    sortedCities.forEach((city) => {
      const element = cardElementsRef.current.get(city.id);

      if (!element) {
        return;
      }

      const newRect = element.getBoundingClientRect();

      newPositions.set(city.id, newRect);

      const previousRect = previousPositionsRef.current.get(city.id);

      if (!previousRect) {
        return;
      }

      const deltaY = previousRect.top - newRect.top;

      if (Math.abs(deltaY) < 1) {
        return;
      }

      element.style.transition = "none";
      element.style.transform = `translateY(${deltaY}px)`;

      element.getBoundingClientRect();

      requestAnimationFrame(() => {
        element.style.transition =
          "transform 500ms cubic-bezier(0.22, 1, 0.36, 1)";

        element.style.transform = "translateY(0px)";
      });

      const handleTransitionEnd = (event) => {
        if (event.propertyName !== "transform") {
          return;
        }

        element.style.transition = "";
        element.style.transform = "";

        element.removeEventListener("transitionend", handleTransitionEnd);
      };

      element.addEventListener("transitionend", handleTransitionEnd);
    });

    previousPositionsRef.current = newPositions;
  }, [cities]);

  if (cities.length === 0) {
    return null;
  }

  const selectedCity = cities.find((city) => city.id === detailsCityId);

  const assistantCity = cities.find((city) => city.id === assistantContentId);

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

    const apiLanguage = language === "ua" ? "uk" : "en";

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${city.place.lat}&lon=${city.place.lon}&appid=${API_KEY}&units=metric&lang=${apiLanguage}`,
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

  const handleAssistant = (id) => {
    if (assistantCityId === id) {
      setAssistantCityId(null);

      setTimeout(() => {
        setAssistantContentId(null);
      }, 500);

      return;
    }

    setAssistantContentId(id);
    setAssistantCityId(id);
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

    if (assistantCityId === id || assistantContentId === id) {
      setAssistantCityId(null);
      setAssistantContentId(null);
    }

    onDelete(id);
  };

  return (
    <section
      id="weather"
      className="scroll-mt-[80px] bg-white py-[60px] text-black transition-colors duration-300 dark:bg-[#121212] dark:text-white"
    >
      <div className="mx-auto w-full max-w-[1160px] px-[16px] md:px-[24px] xl:px-[10px]">
        <div className="flex flex-wrap justify-center gap-[25px] md:gap-[40px]">
          {sortedCities.map((city) => (
            <div
              key={city.id}
              ref={(element) => setCardElement(city.id, element)}
              className="w-full max-w-[340px]"
            >
              <WeatherCard
                city={city.place}
                weather={city.weather}
                isFavorite={city.isFavorite}
                isHome={city.isHome}
                isRefreshing={refreshingCityId === city.id}
                onDetails={() => handleDetails(city.id)}
                onDelete={() => handleDelete(city.id)}
                onRefresh={async () => {
                  if (refreshingCityId === city.id) {
                    return;
                  }

                  try {
                    setRefreshingCityId(city.id);

                    await onRefresh(city.id);
                  } finally {
                    setRefreshingCityId(null);
                  }
                }}
                onToggleFavorite={() => onToggleFavorite(city.id)}
                onSetHomeCity={() => onSetHomeCity(city.id)}
                onHourlyForecast={() => handleHourlyForecast(city)}
                onWeeklyForecast={() => handleWeeklyForecast(city)}
                onAssistant={() => handleAssistant(city.id)}
                language={language}
              />
            </div>
          ))}
        </div>

        <div
          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
            assistantCityId
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            {assistantCity && (
              <WeatherAssistant
                weather={assistantCity.weather}
                language={language}
                onClose={() => {
                  setAssistantCityId(null);

                  setTimeout(() => {
                    setAssistantContentId(null);
                  }, 500);
                }}
              />
            )}
          </div>
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
                language={language}
                onClose={() => {
                  setSelectedCityId(null);

                  setTimeout(() => {
                    setDetailsCityId(null);
                  }, 500);
                }}
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
                isDark={isDark}
                language={language}
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
                language={language}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WeatherSection;
