import { useEffect, useState } from "react";
import searchIcon from "../../assets/search.svg";
import heroBg from "../../assets/hero-bg.png";
import { translations } from "../../data/translations";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function Hero({ onSearch, language }) {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const t = translations[language];

  const now = new Date();

  const locale = language === "ua" ? "uk-UA" : "en-US";

  const monthYear = now.toLocaleDateString(locale, {
    month: "long",
    year: "numeric",
  });

  const weekDay = now.toLocaleDateString(locale, {
    weekday: "long",
  });

  const day = now.getDate();

  const getDaySuffix = (dayNumber) => {
    if (language === "ua") {
      return "";
    }

    if (dayNumber >= 11 && dayNumber <= 13) {
      return "th";
    }

    switch (dayNumber % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const formattedDay =
    language === "ua"
      ? `${weekDay}, ${day}`
      : `${weekDay}, ${day}${getDaySuffix(day)}`;

  useEffect(() => {
    if (city.trim().length < 2 || selectedPlace) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
            city,
          )}&limit=5&appid=${API_KEY}`,
          {
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error("Failed to load cities");
        }

        const data = await response.json();

        setSuggestions(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setSuggestions([]);
        }
      }
    }, 180);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [city, selectedPlace]);

  const handleChange = (event) => {
    setCity(event.target.value);
    setSelectedPlace(null);
  };

  const handleSelectCity = (place) => {
    const cityName = `${place.name}${
      place.state ? `, ${place.state}` : ""
    }${place.country ? `, ${place.country}` : ""}`;

    setCity(cityName);
    setSelectedPlace(place);
    setSuggestions([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedPlace) {
      onSearch(selectedPlace);
      return;
    }

    if (!city.trim()) {
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
          city,
        )}&limit=1&appid=${API_KEY}`,
      );

      if (!response.ok) {
        throw new Error("Failed to find city");
      }

      const data = await response.json();

      if (data.length === 0) {
        return;
      }

      const place = data[0];

      handleSelectCity(place);
      onSearch(place);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section
      className="relative min-h-[500px] overflow-hidden bg-cover bg-center font-['Montserrat'] text-white md:min-h-[560px]"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      <div className="absolute inset-0 bg-black/55" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/25" />

      <div className="relative z-10 mx-auto flex min-h-[500px] w-full max-w-[1160px] flex-col items-center px-[16px] pb-[55px] pt-[55px] md:min-h-[560px] md:px-[24px] md:pt-[70px] xl:px-[10px] xl:pt-[85px]">
        <div className="flex flex-col items-center text-center">
          <div className="rounded-full border border-white/20 bg-white/10 px-[14px] py-[7px] text-[10px] font-medium backdrop-blur-md md:text-[11px]">
            {monthYear}
          </div>

          <h1 className="mt-[18px] max-w-[720px] text-[30px] font-semibold leading-[1.1] tracking-[-0.5px] sm:text-[36px] md:text-[44px] xl:text-[52px]">
            {t.hero.title}
          </h1>

          <p className="mt-[16px] max-w-[570px] text-[12px] font-medium leading-[1.7] text-white/80 sm:text-[13px] md:text-[15px]">
            {t.hero.description}
          </p>

          <div className="mt-[18px] flex items-center gap-[10px] text-[11px] text-white/70 md:text-[12px]">
            <span>{formattedDay}</span>

            <span className="h-[4px] w-[4px] rounded-full bg-[#FFB36C]" />

            <span>{monthYear}</span>
          </div>
        </div>

        <div className="relative mt-[42px] w-full max-w-[650px] md:mt-[50px]">
          <form
            onSubmit={handleSubmit}
            className="flex h-[54px] w-full rounded-[18px] border border-white/20 bg-white/95 p-[6px] shadow-[0_18px_45px_rgba(0,0,0,0.20)] backdrop-blur-xl transition-all duration-300 focus-within:border-[#FFB36C]"
          >
            <input
              type="text"
              placeholder={t.hero.search}
              value={city}
              onChange={handleChange}
              className="h-full min-w-0 flex-1 bg-transparent px-[16px] text-[12px] font-medium text-black outline-none placeholder:text-[#777777] md:px-[20px] md:text-[14px]"
            />

            <button
              type="submit"
              aria-label={t.hero.searchButton}
              className="flex h-full w-[48px] shrink-0 items-center justify-center rounded-[13px] bg-[#FFB36C] transition-all duration-200 hover:bg-[#FFA95D] active:scale-95"
            >
              <img
                src={searchIcon}
                alt=""
                className="h-[20px] w-[20px] md:h-[22px] md:w-[22px]"
              />
            </button>
          </form>

          {suggestions.length > 0 && (
            <ul className="absolute left-0 top-[calc(100%+8px)] z-30 w-[calc(100%-54px)] overflow-hidden rounded-[14px] border border-[#E5E7EB] bg-white py-[5px] text-black shadow-xl">
              {suggestions.map((place, index) => (
                <li key={`${place.lat}-${place.lon}-${index}`}>
                  <button
                    type="button"
                    onClick={() => handleSelectCity(place)}
                    className="w-full px-[18px] py-[11px] text-left text-[12px] transition-colors duration-200 hover:bg-[#F3F4F6] md:text-[13px]"
                  >
                    <span className="font-medium">{place.name}</span>

                    <span className="text-[#777777]">
                      {place.state ? `, ${place.state}` : ""}
                      {place.country ? `, ${place.country}` : ""}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-auto flex flex-wrap justify-center gap-[10px] pt-[35px]">
          <div className="rounded-[12px] border border-white/15 bg-white/10 px-[15px] py-[9px] text-[10px] backdrop-blur-md md:text-[11px]">
            {language === "ua" ? "Швидкий пошук міста" : "Quick city search"}
          </div>

          <div className="rounded-[12px] border border-white/15 bg-white/10 px-[15px] py-[9px] text-[10px] backdrop-blur-md md:text-[11px]">
            {language === "ua" ? "Актуальна погода" : "Current weather"}
          </div>

          <div className="rounded-[12px] border border-white/15 bg-white/10 px-[15px] py-[9px] text-[10px] backdrop-blur-md md:text-[11px]">
            {language === "ua"
              ? "Прогноз та рекомендації"
              : "Forecast & recommendations"}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
