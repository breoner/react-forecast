import feelsLikeIcon from "../../assets/weather-details/feels-like.svg";
import humidityIcon from "../../assets/weather-details/humidity.svg";
import pressureIcon from "../../assets/weather-details/pressure.svg";
import windIcon from "../../assets/weather-details/wind.svg";
import visibilityIcon from "../../assets/weather-details/visibility.svg";
import { translations } from "../../data/translations";

function WeatherDetails({
  weather,
  language,
  onClose,
}) {
  const t = translations[language];

  const visibility = weather.visibility
    ? `${(weather.visibility / 1000).toFixed(1)} km`
    : t.weather.unlimited;

  const details = [
    {
      title: t.weather.feelsLike,
      value: `${Math.round(weather.main.feels_like)}°C`,
      icon: feelsLikeIcon,
    },
    {
      title: t.weather.min,
      value: `${Math.round(weather.main.temp_min)}°C`,
      secondTitle: t.weather.max,
      secondValue: `${Math.round(weather.main.temp_max)}°C`,
    },
    {
      title: t.weather.humidity,
      value: `${weather.main.humidity}%`,
      icon: humidityIcon,
    },
    {
      title: t.weather.pressure,
      value: `${weather.main.pressure} hPa`,
      icon: pressureIcon,
    },
    {
      title: t.weather.windSpeed,
      value: `${weather.wind.speed} m/s`,
      icon: windIcon,
    },
    {
      title: t.weather.visibility,
      value: visibility,
      icon: visibilityIcon,
    },
  ];

  return (
    <div className="relative mx-auto mt-[45px] w-full max-w-[950px]">
      {/* CLOSE BUTTON */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close weather details"
        className="absolute right-0 top-0 z-20 flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-[22px] leading-none text-black transition-all duration-200 hover:rotate-90 hover:border-[#FFB36C] active:scale-90 dark:border-[#3A3A3A] dark:bg-[#262626] dark:text-white"
      >
        ×
      </button>

      {/* TITLE */}
      <div className="mb-[18px] flex items-end justify-between pr-[50px]">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-[#FF9D4D]">
            {language === "ua" ? "Деталі" : "Details"}
          </p>

          <h2 className="mt-[5px] text-[20px] font-semibold md:text-[24px]">
            {language === "ua"
              ? "Поточні умови"
              : "Current conditions"}
          </h2>
        </div>

        <p className="hidden text-[11px] text-[#777777] dark:text-[#AAAAAA] sm:block">
          {language === "ua"
            ? "Оновлюється разом із погодою"
            : "Updates with current weather"}
        </p>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-1 gap-[12px] sm:grid-cols-2 lg:grid-cols-3">
        {details.map((item, index) => (
          <div
            key={item.title}
            className="group relative overflow-hidden rounded-[20px] border border-black/5 bg-white p-[20px] shadow-[0_8px_25px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_12px_30px_rgba(0,0,0,0.09)] dark:border-white/5 dark:bg-[#1C1C1C]"
          >
            <div className="absolute right-[-35px] top-[-35px] h-[100px] w-[100px] rounded-full bg-[#FFB36C]/10 blur-[30px]" />

            <div className="relative z-10 flex items-start justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.8px] text-[#777777] dark:text-[#AAAAAA]">
                  {item.title}
                </p>

                <p className="mt-[9px] text-[28px] font-semibold tracking-[-1px] text-[#222222] dark:text-white">
                  {item.value}
                </p>

                {item.secondTitle && (
                  <div className="mt-[14px] border-t border-[#ECECEC] pt-[12px] dark:border-[#333333]">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.8px] text-[#777777] dark:text-[#AAAAAA]">
                      {item.secondTitle}
                    </p>

                    <p className="mt-[5px] text-[21px] font-semibold text-[#222222] dark:text-white">
                      {item.secondValue}
                    </p>
                  </div>
                )}
              </div>

              {item.icon && (
                <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[15px] bg-[#FFF3E8] transition-transform duration-300 group-hover:scale-105 dark:bg-[#3A2C20]">
                  <img
                    src={item.icon}
                    alt=""
                    className="h-[27px] w-[27px]"
                  />
                </div>
              )}

              {!item.icon && index === 1 && (
                <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[15px] bg-[#FFF3E8] text-[21px] font-semibold text-[#D9771E] dark:bg-[#3A2C20] dark:text-[#FFB36C]">
                  °C
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherDetails;