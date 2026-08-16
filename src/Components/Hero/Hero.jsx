import { useEffect, useRef, useState } from "react";
import searchIcon from "../../assets/search.svg";
import heroBg from "../../assets/hero-bg.png";
import { translations } from "../../data/translations";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function Hero({ onSearch, language }) {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  const [hasSearched, setHasSearched] = useState(false);

  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  const [isFocused, setIsFocused] = useState(false);

  const searchWrapperRef = useRef(null);

  const t = translations[language];

  /*
    ----------------------------
    DATE
    ----------------------------
  */

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

  /*
    ----------------------------
    CITY SUGGESTIONS
    ----------------------------
  */

  useEffect(() => {
    if (city.trim().length < 2 || selectedPlace) {
      setSuggestions([]);
      setIsLoadingSuggestions(false);
      setHasSearched(false);
      setActiveSuggestionIndex(-1);

      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        setIsLoadingSuggestions(true);

        setHasSearched(false);

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

        setHasSearched(true);

        setActiveSuggestionIndex(-1);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);

          setSuggestions([]);

          setHasSearched(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingSuggestions(false);
        }
      }
    }, 250);

    return () => {
      clearTimeout(timer);

      controller.abort();
    };
  }, [city, selectedPlace]);

  /*
    ----------------------------
    CLICK OUTSIDE
    ----------------------------
  */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(event.target)
      ) {
        setIsFocused(false);

        setActiveSuggestionIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /*
    ----------------------------
    CLEAR SEARCH
    ----------------------------
  */

  const clearSearch = () => {
    setCity("");
    setSelectedPlace(null);
    setSuggestions([]);
    setHasSearched(false);
    setActiveSuggestionIndex(-1);
    setIsFocused(false);
  };

  /*
    ----------------------------
    INPUT
    ----------------------------
  */

  const handleChange = (event) => {
    setCity(event.target.value);

    setSelectedPlace(null);

    setIsFocused(true);
  };

  const handleClear = () => {
    clearSearch();
  };

  /*
    ----------------------------
    SELECT CITY
    ----------------------------
  */

  const handleSelectCity = (place) => {
    const cityName = `${place.name}${place.state ? `, ${place.state}` : ""}${
      place.country ? `, ${place.country}` : ""
    }`;

    setCity(cityName);

    setSelectedPlace(place);

    setSuggestions([]);

    setIsFocused(false);

    setActiveSuggestionIndex(-1);
  };

  /*
    ----------------------------
    SUBMIT
    ----------------------------
  */

  const handleSubmit = async (event) => {
    event.preventDefault();

    /*
      City already selected
      from suggestions
    */

    if (selectedPlace) {
      onSearch(selectedPlace);

      clearSearch();

      return;
    }

    if (!city.trim()) {
      return;
    }

    /*
      City selected with
      keyboard arrows
    */

    if (activeSuggestionIndex >= 0 && suggestions[activeSuggestionIndex]) {
      const place = suggestions[activeSuggestionIndex];

      onSearch(place);

      clearSearch();

      return;
    }

    /*
      User typed a city and
      pressed Enter/Search
    */

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

      onSearch(place);

      clearSearch();
    } catch (error) {
      console.error(error);
    }
  };

  /*
    ----------------------------
    KEYBOARD
    ----------------------------
  */

  const handleKeyDown = (event) => {
    if (!suggestions.length) {
      if (event.key === "Escape") {
        setIsFocused(false);
      }

      return;
    }

    /*
      DOWN
    */

    if (event.key === "ArrowDown") {
      event.preventDefault();

      setActiveSuggestionIndex((current) =>
        current >= suggestions.length - 1 ? 0 : current + 1,
      );
    }

    /*
      UP
    */

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setActiveSuggestionIndex((current) =>
        current <= 0 ? suggestions.length - 1 : current - 1,
      );
    }

    /*
      ESCAPE
    */

    if (event.key === "Escape") {
      setIsFocused(false);

      setActiveSuggestionIndex(-1);
    }
  };

  const showDropdown = isFocused && city.trim().length >= 2 && !selectedPlace;

  /*
    ----------------------------
    RENDER
    ----------------------------
  */

  return (
    <section
      className="relative min-h-[500px] overflow-hidden bg-cover bg-center font-['Montserrat'] text-white md:min-h-[560px]"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-black/55" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/25" />

      {/* CONTENT */}

      <div className="relative z-10 mx-auto flex min-h-[500px] w-full max-w-[1160px] flex-col items-center px-[16px] pb-[55px] pt-[55px] md:min-h-[560px] md:px-[24px] md:pt-[70px] xl:px-[10px] xl:pt-[85px]">
        {/* HERO TEXT */}

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

        {/* SEARCH */}

        <div
          ref={searchWrapperRef}
          className="relative mt-[42px] w-full max-w-[670px] md:mt-[50px]"
        >
          <form
            onSubmit={handleSubmit}
            className={`flex h-[58px] w-full items-center rounded-[19px] border bg-white/95 p-[6px] shadow-[0_18px_45px_rgba(0,0,0,0.20)] backdrop-blur-xl transition-all duration-300 ${
              isFocused
                ? "border-[#FFB36C] shadow-[0_18px_50px_rgba(255,179,108,0.18)]"
                : "border-white/20"
            }`}
          >
            {/* LEFT SEARCH ICON */}

            <div className="ml-[13px] flex h-[30px] w-[30px] shrink-0 items-center justify-center text-[#777777]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-[18px] w-[18px]"
              >
                <circle cx="11" cy="11" r="7" />

                <path strokeLinecap="round" d="m20 20-4-4" />
              </svg>
            </div>

            {/* INPUT */}

            <input
              type="text"
              placeholder={t.hero.search}
              value={city}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              className="h-full min-w-0 flex-1 bg-transparent px-[8px] text-[12px] font-medium text-black outline-none placeholder:text-[#8A8A8A] md:text-[14px]"
            />

            {/* LOADING */}

            {isLoadingSuggestions && (
              <div className="mr-[7px] flex h-[32px] w-[32px] shrink-0 items-center justify-center">
                <span className="h-[15px] w-[15px] animate-spin rounded-full border-2 border-[#D7D7D7] border-t-[#FF9D4D]" />
              </div>
            )}

            {/* CLEAR */}

            {city && !isLoadingSuggestions && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Clear search"
                className="mr-[7px] flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[9px] text-[18px] text-[#777777] transition-all duration-200 hover:bg-[#F1F1F1] hover:text-black active:scale-90"
              >
                ×
              </button>
            )}

            {/* SUBMIT */}

            <button
              type="submit"
              aria-label={t.hero.searchButton}
              className="flex h-[46px] w-[48px] shrink-0 items-center justify-center rounded-[14px] bg-[#FFB36C] shadow-[0_5px_14px_rgba(255,179,108,0.3)] transition-all duration-200 hover:-translate-y-[1px] hover:bg-[#FFA95D] hover:shadow-[0_7px_18px_rgba(255,179,108,0.4)] active:scale-95"
            >
              <img
                src={searchIcon}
                alt=""
                className="h-[20px] w-[20px] md:h-[22px] md:w-[22px]"
              />
            </button>
          </form>

          {/* DROPDOWN */}

          {showDropdown && (
            <div className="absolute left-0 top-[calc(100%+10px)] z-30 w-full overflow-hidden rounded-[18px] border border-black/[0.08] bg-white text-black shadow-[0_18px_50px_rgba(0,0,0,0.20)]">
              {/* LOADING */}

              {isLoadingSuggestions && (
                <div className="flex items-center gap-[10px] px-[18px] py-[16px]">
                  <span className="h-[15px] w-[15px] animate-spin rounded-full border-2 border-[#D9D9D9] border-t-[#FF9D4D]" />

                  <p className="text-[11px] font-medium text-[#777777]">
                    {language === "ua"
                      ? "Шукаємо міста..."
                      : "Searching cities..."}
                  </p>
                </div>
              )}

              {/* RESULTS */}

              {!isLoadingSuggestions && suggestions.length > 0 && (
                <>
                  <div className="border-b border-[#EEEEEE] px-[16px] py-[10px]">
                    <p className="text-[9px] font-semibold uppercase tracking-[1px] text-[#999999]">
                      {language === "ua" ? "Результати" : "Results"}
                    </p>
                  </div>

                  <ul className="p-[6px]">
                    {suggestions.map((place, index) => {
                      const isActive = activeSuggestionIndex === index;

                      return (
                        <li key={`${place.lat}-${place.lon}-${index}`}>
                          <button
                            type="button"
                            onMouseEnter={() => setActiveSuggestionIndex(index)}
                            onClick={() => handleSelectCity(place)}
                            className={`flex w-full items-center gap-[12px] rounded-[12px] px-[12px] py-[11px] text-left transition-all duration-150 ${
                              isActive ? "bg-[#FFF3E8]" : "hover:bg-[#F6F6F6]"
                            }`}
                          >
                            {/* LOCATION */}

                            <div
                              className={`flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[11px] ${
                                isActive
                                  ? "bg-[#FFB36C] text-black"
                                  : "bg-[#F2F2F2] text-[#777777]"
                              }`}
                            >
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                className="h-[17px] w-[17px]"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
                                />

                                <circle cx="12" cy="10" r="2.5" />
                              </svg>
                            </div>

                            {/* CITY */}

                            <div className="min-w-0 flex-1">
                              <p className="truncate text-[12px] font-semibold md:text-[13px]">
                                {place.name}
                              </p>

                              <p className="mt-[2px] truncate text-[9px] font-medium text-[#777777] md:text-[10px]">
                                {place.state ||
                                  (language === "ua" ? "Місто" : "City")}
                              </p>
                            </div>

                            {/* COUNTRY */}

                            {place.country && (
                              <span className="shrink-0 rounded-full bg-[#F2F2F2] px-[9px] py-[5px] text-[9px] font-semibold text-[#666666]">
                                {place.country}
                              </span>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>

                  {/* KEYBOARD HINT */}

                  <div className="flex items-center gap-[10px] border-t border-[#EEEEEE] px-[16px] py-[9px] text-[8px] font-medium text-[#999999]">
                    <span>↑ ↓</span>

                    <span>{language === "ua" ? "Навігація" : "Navigate"}</span>

                    <span>Enter</span>

                    <span>{language === "ua" ? "Вибрати" : "Select"}</span>

                    <span>Esc</span>

                    <span>{language === "ua" ? "Закрити" : "Close"}</span>
                  </div>
                </>
              )}

              {/* NO RESULTS */}

              {!isLoadingSuggestions &&
                hasSearched &&
                suggestions.length === 0 && (
                  <div className="flex flex-col items-center px-[20px] py-[25px] text-center">
                    <div className="flex h-[44px] w-[44px] items-center justify-center rounded-[14px] bg-[#FFF0E1] text-[#D9771E]">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        className="h-[21px] w-[21px]"
                      >
                        <circle cx="11" cy="11" r="7" />

                        <path strokeLinecap="round" d="m20 20-4-4" />
                      </svg>
                    </div>

                    <p className="mt-[10px] text-[12px] font-semibold">
                      {language === "ua"
                        ? "Місто не знайдено"
                        : "City not found"}
                    </p>

                    <p className="mt-[4px] text-[9px] text-[#777777]">
                      {language === "ua"
                        ? "Спробуйте іншу назву."
                        : "Try another city name."}
                    </p>
                  </div>
                )}
            </div>
          )}
        </div>

        {/* FEATURES */}

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
