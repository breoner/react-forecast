import { useEffect, useState } from "react";
import searchIcon from "../../assets/search.svg";
import heroBg from "../../assets/hero-bg.png";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function Hero({ onSearch }) {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const now = new Date();

  const monthYear = now.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const weekDay = now.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const day = now.getDate();

  const getDaySuffix = (dayNumber) => {
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

  const formattedDay = `${weekDay}, ${day}${getDaySuffix(day)}`;

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
    }, 150);

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
      className="relative h-[520px] bg-cover bg-center font-['Montserrat'] text-white md:h-[595px]"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      <div className="absolute inset-0 bg-black/48" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1160px] flex-col items-center px-[16px] md:px-[24px] xl:px-[10px]">
        <h1 className="pt-[55px] text-center text-[22px] font-semibold md:pt-[50px] md:text-[26px] xl:pt-[105px] xl:text-[40px]">
          Weather dashboard
        </h1>

        <div className="mt-[45px] flex w-full max-w-[500px] items-center justify-center md:mt-[50px] xl:mt-[80px] xl:max-w-none">
          <p className="w-[46%] text-right text-[11px] font-medium leading-[1.5] sm:text-[12px] md:w-[220px] md:text-[14px] xl:w-[345px] xl:text-[24px]">
            Create your personal list of favorite cities and always be aware of
            the weather.
          </p>

          <div className="mx-[16px] h-[95px] w-[2px] shrink-0 bg-white sm:mx-[22px] md:mx-[38px] md:h-[110px] xl:mx-[50px] xl:h-[144px] xl:w-[3px]" />

          <p className="w-[38%] text-left text-[11px] font-medium leading-[1.6] sm:text-[12px] md:w-[145px] md:text-[14px] xl:w-[190px] xl:text-[24px]">
            {monthYear}
            <br />
            {formattedDay}
          </p>
        </div>

        <div className="relative mt-[55px] w-full max-w-[320px] md:mt-[76px] md:max-w-[402px] xl:mt-[75px] xl:max-w-[625px]">
          <form
            onSubmit={handleSubmit}
            className="flex h-[38px] md:h-[36px] xl:h-[42px]"
          >
            <input
              type="text"
              placeholder="Search location..."
              value={city}
              onChange={handleChange}
              className="h-full min-w-0 flex-1 rounded-l-[8px] bg-[#D9D9D9] px-[14px] text-[11px] font-medium text-black outline-none placeholder:text-[#555555] md:rounded-l-[10px] md:px-[20px] md:text-[12px] xl:px-[30px] xl:text-[14px]"
            />

            <button
              type="submit"
              aria-label="Search city"
              className="flex h-full w-[42px] shrink-0 items-center justify-center rounded-r-[8px] border-l-2 border-black bg-[#FFB36C] transition-colors duration-200 hover:bg-[#FFA95D] md:w-[42px] md:rounded-r-[10px] xl:w-[45px]"
            >
              <img
                src={searchIcon}
                alt=""
                className="h-[18px] w-[18px] xl:h-[25px] xl:w-[25px]"
              />
            </button>
          </form>

          {suggestions.length > 0 && (
            <ul className="absolute left-0 top-full z-20 mt-[3px] w-[calc(100%-42px)] overflow-hidden rounded-[8px] bg-white text-black shadow-lg xl:w-[calc(100%-45px)]">
              {suggestions.map((place, index) => (
                <li key={`${place.lat}-${place.lon}-${index}`}>
                  <button
                    type="button"
                    onClick={() => handleSelectCity(place)}
                    className="w-full px-[14px] py-[9px] text-left text-[11px] transition-colors hover:bg-[#E8E8E8] md:px-[20px] md:text-[12px] xl:text-[14px]"
                  >
                    {place.name}
                    {place.state ? `, ${place.state}` : ""}
                    {place.country ? `, ${place.country}` : ""}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export default Hero;
