import { useEffect, useRef, useState } from "react";
import searchIcon from "../../assets/search.svg";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function HeroSearch({ onSearch, language, t }) {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);

  const searchWrapperRef = useRef(null);

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

  const clearSearch = () => {
    setCity("");
    setSelectedPlace(null);
    setSuggestions([]);
    setHasSearched(false);
    setActiveSuggestionIndex(-1);
    setIsFocused(false);
  };

  const handleChange = (event) => {
    setCity(event.target.value);
    setSelectedPlace(null);
    setIsFocused(true);
  };

  const handleSelectCity = (place) => {
    const cityName = `${place.name}${
      place.state ? `, ${place.state}` : ""
    }${place.country ? `, ${place.country}` : ""}`;

    setCity(cityName);
    setSelectedPlace(place);
    setSuggestions([]);
    setIsFocused(false);
    setActiveSuggestionIndex(-1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedPlace) {
      onSearch(selectedPlace);
      clearSearch();

      return;
    }

    if (!city.trim()) {
      return;
    }

    if (activeSuggestionIndex >= 0 && suggestions[activeSuggestionIndex]) {
      const place = suggestions[activeSuggestionIndex];

      onSearch(place);
      clearSearch();

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

      if (!data.length) {
        return;
      }

      onSearch(data[0]);
      clearSearch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (event) => {
    if (!suggestions.length) {
      if (event.key === "Escape") {
        setIsFocused(false);
      }

      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      setActiveSuggestionIndex((current) =>
        current >= suggestions.length - 1 ? 0 : current + 1,
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setActiveSuggestionIndex((current) =>
        current <= 0 ? suggestions.length - 1 : current - 1,
      );
    }

    if (event.key === "Escape") {
      setIsFocused(false);
      setActiveSuggestionIndex(-1);
    }
  };

  const showDropdown = isFocused && city.trim().length >= 2 && !selectedPlace;

  return (
    <div
      ref={searchWrapperRef}
      className="relative z-[100] mt-[42px] w-full max-w-[670px] md:mt-[50px]"
    >
      {/* SEARCH */}

      <form
        onSubmit={handleSubmit}
        className={`flex h-[58px] w-full items-center rounded-[19px] border p-[6px] shadow-[0_18px_45px_rgba(0,0,0,0.20)] backdrop-blur-xl transition-all duration-300
          bg-white/95
          dark:bg-[#1C1C1C]/95
          ${
            isFocused
              ? "border-[#FFB36C] shadow-[0_18px_50px_rgba(255,179,108,0.18)]"
              : "border-white/20 dark:border-white/10"
          }
        `}
      >
        {/* SEARCH ICON */}

        <div className="ml-[13px] flex h-[30px] w-[30px] shrink-0 items-center justify-center text-[#777777] dark:text-[#AAAAAA]">
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
          className="h-full min-w-0 flex-1 bg-transparent px-[8px] text-[12px] font-medium text-black outline-none placeholder:text-[#8A8A8A] md:text-[14px] dark:text-white dark:placeholder:text-[#777777]"
        />

        {/* LOADING */}

        {isLoadingSuggestions && (
          <div className="mr-[7px] flex h-[32px] w-[32px] shrink-0 items-center justify-center">
            <span className="h-[15px] w-[15px] animate-spin rounded-full border-2 border-[#D7D7D7] border-t-[#FF9D4D] dark:border-[#555555] dark:border-t-[#FF9D4D]" />
          </div>
        )}

        {/* CLEAR */}

        {city && !isLoadingSuggestions && (
          <button
            type="button"
            onClick={clearSearch}
            aria-label="Clear search"
            className="mr-[7px] flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[9px] text-[18px] text-[#777777] transition-all duration-200 hover:bg-[#F1F1F1] hover:text-black active:scale-90 dark:text-[#AAAAAA] dark:hover:bg-[#303030] dark:hover:text-white"
          >
            ×
          </button>
        )}

        {/* SUBMIT */}

        <button
          type="submit"
          aria-label={t.hero.searchButton}
          className="flex h-[46px] w-[48px] shrink-0 items-center justify-center rounded-[14px] bg-[#FFB36C] shadow-[0_5px_14px_rgba(255,179,108,0.3)] transition-all duration-200 hover:-translate-y-[1px] hover:bg-[#FFA95D] active:scale-95"
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
        <div className="absolute left-0 top-[calc(100%+10px)] z-[200] w-full overflow-hidden rounded-[18px] border border-black/[0.08] bg-white text-black shadow-[0_22px_60px_rgba(0,0,0,0.28)] dark:border-white/10 dark:bg-[#1C1C1C] dark:text-white">
          {/* LOADING */}

          {isLoadingSuggestions && (
            <div className="flex items-center gap-[10px] px-[18px] py-[16px]">
              <span className="h-[15px] w-[15px] animate-spin rounded-full border-2 border-[#D9D9D9] border-t-[#FF9D4D] dark:border-[#555555] dark:border-t-[#FF9D4D]" />

              <p className="text-[11px] font-medium text-[#777777] dark:text-[#AAAAAA]">
                {language === "ua" ? "Шукаємо міста..." : "Searching cities..."}
              </p>
            </div>
          )}

          {/* RESULTS */}

          {!isLoadingSuggestions && suggestions.length > 0 && (
            <>
              <div className="border-b border-[#EEEEEE] px-[16px] py-[10px] dark:border-white/10">
                <p className="text-[9px] font-semibold uppercase tracking-[1px] text-[#999999] dark:text-[#888888]">
                  {language === "ua" ? "Результати" : "Results"}
                </p>
              </div>

              {/* SCROLLABLE LIST */}

              <ul className="max-h-[250px] overflow-y-auto overscroll-contain p-[6px] hero-search-scroll">
                {suggestions.map((place, index) => {
                  const isActive = activeSuggestionIndex === index;

                  return (
                    <li key={`${place.lat}-${place.lon}-${index}`}>
                      <button
                        type="button"
                        onMouseEnter={() => setActiveSuggestionIndex(index)}
                        onClick={() => handleSelectCity(place)}
                        className={`flex w-full items-center gap-[12px] rounded-[12px] px-[12px] py-[11px] text-left transition-all duration-150 ${
                          isActive
                            ? "bg-[#FFF3E8] dark:bg-[#3A2C20]"
                            : "hover:bg-[#F6F6F6] dark:hover:bg-[#292929]"
                        }`}
                      >
                        {/* LOCATION ICON */}

                        <div
                          className={`flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[11px] transition-colors duration-150 ${
                            isActive
                              ? "bg-[#FFB36C] text-black"
                              : "bg-[#F2F2F2] text-[#777777] dark:bg-[#292929] dark:text-[#AAAAAA]"
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
                          <p className="truncate text-[12px] font-semibold text-black md:text-[13px] dark:text-white">
                            {place.name}
                          </p>

                          <p className="mt-[2px] truncate text-[9px] font-medium text-[#777777] md:text-[10px] dark:text-[#AAAAAA]">
                            {place.state ||
                              (language === "ua" ? "Місто" : "City")}
                          </p>
                        </div>

                        {/* COUNTRY */}

                        {place.country && (
                          <span className="shrink-0 rounded-full bg-[#F2F2F2] px-[9px] py-[5px] text-[9px] font-semibold text-[#666666] dark:bg-[#303030] dark:text-[#C7C7C7]">
                            {place.country}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </>
          )}

          {/* NOTHING FOUND */}

          {!isLoadingSuggestions && hasSearched && suggestions.length === 0 && (
            <div className="px-[20px] py-[25px] text-center">
              <p className="text-[12px] font-semibold text-black dark:text-white">
                {language === "ua" ? "Місто не знайдено" : "City not found"}
              </p>

              <p className="mt-[4px] text-[9px] text-[#777777] dark:text-[#AAAAAA]">
                {language === "ua"
                  ? "Спробуйте іншу назву."
                  : "Try another city name."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default HeroSearch;
