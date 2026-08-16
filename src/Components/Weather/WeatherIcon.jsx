function WeatherIcon({
  iconUrl,
  description,
  condition,
}) {
  const normalizedCondition =
    condition?.toLowerCase() || "";

  const isClear =
    normalizedCondition === "clear";

  const isClouds =
    normalizedCondition === "clouds";

  const isRain =
    normalizedCondition === "rain" ||
    normalizedCondition === "drizzle";

  const isSnow =
    normalizedCondition === "snow";

  const isStorm =
    normalizedCondition === "thunderstorm";

  return (
    <div className="relative flex h-[110px] w-[110px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#F7F7F7] transition-colors duration-300 dark:bg-[#242424]">
      {/* CLEAR GLOW */}

      {isClear && (
        <>
          <div className="weather-icon-sun-glow absolute h-[75px] w-[75px] rounded-full bg-[#FFB36C]/20 blur-[18px]" />

          <div className="weather-icon-sun-glow-delayed absolute h-[55px] w-[55px] rounded-full bg-[#FFD49D]/25 blur-[12px]" />
        </>
      )}

      {/* CLOUDS */}

      {isClouds && (
        <>
          <div className="weather-icon-cloud absolute left-[-30px] top-[28px] h-[30px] w-[65px] rounded-full bg-[#BFC7CF]/15 blur-[10px]" />

          <div className="weather-icon-cloud-delayed absolute right-[-35px] top-[55px] h-[25px] w-[60px] rounded-full bg-[#BFC7CF]/10 blur-[9px]" />
        </>
      )}

      {/* RAIN */}

      {isRain &&
        Array.from({ length: 5 }).map(
          (_, index) => (
            <span
              key={index}
              className="weather-icon-rain absolute top-[65px] h-[11px] w-[1px] rounded-full bg-[#6BA7D6]/70 dark:bg-[#8FC9F3]/70"
              style={{
                left: `${31 + index * 10}%`,
                animationDelay: `${
                  -index * 0.17
                }s`,
              }}
            />
          ),
        )}

      {/* SNOW */}

      {isSnow &&
        Array.from({ length: 6 }).map(
          (_, index) => (
            <span
              key={index}
              className="weather-icon-snow absolute top-[60px] rounded-full bg-[#A8CFE8] dark:bg-white/80"
              style={{
                left: `${25 + index * 11}%`,
                width: `${
                  3 + (index % 2)
                }px`,
                height: `${
                  3 + (index % 2)
                }px`,
                animationDelay: `${
                  -index * 0.45
                }s`,
              }}
            />
          ),
        )}

      {/* STORM */}

      {isStorm && (
        <div className="weather-icon-lightning absolute inset-0 bg-[#FFF1C9]/30 opacity-0" />
      )}

      {/* OPENWEATHER ICON */}

      <img
        src={iconUrl}
        alt={description}
        className={`relative z-10 h-[100px] w-[100px] ${
          isClouds
            ? "weather-main-cloud"
            : ""
        }`}
      />
    </div>
  );
}

export default WeatherIcon;