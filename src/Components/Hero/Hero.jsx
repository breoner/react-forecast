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

  const getDaySuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return "th";
    }

    switch (day % 10) {
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
    const cityName = `${place.name}${place.state ? `, ${place.state}` : ""}${
      place.country ? `, ${place.country}` : ""
    }`;

    setCity(cityName);
    setSelectedPlace(place);
    setSuggestions([]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedPlace) {
      onSearch(selectedPlace);
      return;
    }

    if (suggestions.length > 0) {
      const place = suggestions[0];

      handleSelectCity(place);
      onSearch(place);
    }
  };

  return (
    <section
      className="relative h-[595px] bg-cover bg-center font-['Montserrat'] text-white"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0 bg-black/48" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[313px] flex-col items-center px-[10px] md:max-w-[564px] xl:max-w-[1160px]">
        <h1 className="pt-[55px] text-center text-[16px] font-semibold md:pt-[50px] md:text-[20px] xl:pt-[105px] xl:text-[40px]">
          Weather dashboard
        </h1>

        <div className="mt-[40px] flex items-center justify-center md:mt-[45px] xl:mt-[80px]">
          <p className="w-[155px] text-right text-[12px] font-medium md:w-[172px] md:text-[14px] xl:w-[345px] xl:text-[24px]">
            Create your personal list of favorite cities and always be aware of
            the weather.
          </p>

          <div className="mx-[20px] h-[100px] w-[2px] shrink-0 bg-white md:mx-[38px] md:h-[110px] xl:mx-[50px] xl:h-[144px] xl:w-[3px]" />

          <p className="w-[110px] text-left text-[12px] font-medium md:w-[120px] md:text-[14px] xl:w-[190px] xl:text-[24px]">
            {monthYear}
            <br />
            {formattedDay}
          </p>
        </div>

        <div className="relative mt-[65px] w-[250px] md:mt-[76px] md:w-[402px] xl:mt-[75px] xl:w-[625px]">
          <form
            onSubmit={handleSubmit}
            className="flex h-[30px] md:h-[27px] xl:h-[42px]"
          >
            <input
              type="text"
              placeholder="Search location..."
              value={city}
              onChange={handleChange}
              className="h-full min-w-0 flex-1 rounded-l-[7px] bg-[#D9D9D9] px-[12px] text-[10px] font-medium text-black outline-none md:rounded-l-[10px] md:px-[20px] xl:px-[30px] xl:text-[14px]"
            />

            <button
              type="submit"
              className="flex h-[30px] w-[32px] shrink-0 items-center justify-center rounded-r-[7px] border-l-2 border-black bg-[#FFB36C] md:h-[27px] md:w-[29px] md:rounded-r-[10px] xl:h-[42px] xl:w-[45px]"
            >
              <img
                src={searchIcon}
                alt="Search"
                className="h-[15px] w-[15px] md:h-[16px] md:w-[16px] xl:h-[25px] xl:w-[25px]"
              />
            </button>
          </form>

          {suggestions.length > 0 && (
            <ul className="absolute left-0 top-full z-20 mt-[3px] w-[calc(100%-32px)] overflow-hidden rounded-[8px] bg-white text-black shadow-lg md:w-[calc(100%-29px)] xl:w-[calc(100%-45px)]">
              {suggestions.map((place, index) => (
                <li key={`${place.lat}-${place.lon}-${index}`}>
                  <button
                    type="button"
                    onClick={() => handleSelectCity(place)}
                    className="w-full px-[12px] py-[7px] text-left text-[10px] hover:bg-[#E8E8E8] md:px-[20px] xl:text-[14px]"
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
