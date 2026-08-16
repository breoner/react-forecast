import { useMemo } from "react";

function useHeroWeather(featuredCity) {
  const heroWeather = useMemo(() => {
    if (!featuredCity?.weather) {
      return {
        condition: "default",
        isNight: false,
        temp: null,
        cityName: "",
      };
    }

    const weather = featuredCity.weather;

    const condition = weather.weather?.[0]?.main || "Clear";

    const currentTime = weather.dt || Math.floor(Date.now() / 1000);

    const sunrise = weather.sys?.sunrise;
    const sunset = weather.sys?.sunset;

    const isNight =
      sunrise && sunset && (currentTime < sunrise || currentTime > sunset);

    return {
      condition,
      isNight,
      temp: weather.main?.temp ?? null,
      cityName: featuredCity.place?.name || weather.name || "",
    };
  }, [featuredCity]);

  const heroTheme = useMemo(() => {
    if (heroWeather.condition === "default") {
      return "default";
    }

    if (heroWeather.isNight) {
      return "night";
    }

    switch (heroWeather.condition) {
      case "Rain":
      case "Drizzle":
        return "rain";

      case "Thunderstorm":
        return "storm";

      case "Snow":
        return "snow";

      case "Clouds":
        return "clouds";

      case "Mist":
      case "Fog":
      case "Haze":
      case "Smoke":
        return "mist";

      case "Clear":
        return "clear";

      default:
        return "default";
    }
  }, [heroWeather]);

  const heroOverlay = {
    default: "bg-black/55",

    clear: "bg-gradient-to-b from-[#15212C]/15 via-black/20 to-black/50",

    clouds: "bg-gradient-to-b from-[#25313C]/35 via-black/35 to-black/60",

    rain: "bg-gradient-to-b from-[#101820]/60 via-[#111820]/55 to-black/75",

    storm: "bg-gradient-to-b from-black/70 via-[#11131A]/70 to-black/85",

    snow: "bg-gradient-to-b from-[#526676]/25 via-[#1E2933]/35 to-black/55",

    mist: "bg-gradient-to-b from-[#56616A]/35 via-black/35 to-black/60",

    night: "bg-gradient-to-b from-[#030711]/60 via-[#07101F]/60 to-black/85",
  }[heroTheme];

  return {
    heroWeather,
    heroTheme,
    heroOverlay,
  };
}

export default useHeroWeather;
