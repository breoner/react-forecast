import refreshIcon from "../../assets/refresh.svg";
import deleteIcon from "../../assets/delete.svg";
import { translations } from "../../data/translations";

function WeatherCard({
  city,
  weather,
  isFavorite,
  onDetails,
  onDelete,
  onRefresh,
  onToggleFavorite,
  onHourlyForecast,
  onWeeklyForecast,
  onAssistant,
  language,
}) {
  const t = translations[language];

  const locale = language === "ua" ? "uk-UA" : "en-US";

  const iconCode = weather.weather[0].icon;

  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const date = new Date(weather.dt * 1000);

  const formattedDate = date.toLocaleDateString(
    language === "ua" ? "uk-UA" : "en-GB",
  );

  const formattedDay = date.toLocaleDateString(locale, {
    weekday: "long",
  });

  const formattedTime = date.toLocaleTimeString(
    language === "ua" ? "uk-UA" : "en-GB",
    {
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  return (
    <article className="flex h-[470px] w-full max-w-[320px] flex-col items-center rounded-[20px] bg-[#E4E4E4] p-[18px] text-black transition-all duration-300 dark:bg-[#242424] dark:text-white sm:p-[20px]">
      <div className="flex w-full justify-between text-[13px] sm:text-[14px]">
        <span>{city.name}</span>
        <span>{city.country}</span>
      </div>

      <p className="mt-[15px] text-[22px] font-medium sm:text-[24px]">
        {formattedTime}
      </p>

      <div className="mt-[15px] flex w-full gap-[10px]">
        <button
          type="button"
          onClick={onHourlyForecast}
          className="flex-1 rounded-[10px] bg-[#FFB36C] px-[6px] py-[8px] text-[9px] text-black sm:text-[10px]"
        >
          {t.weather.hourly}
        </button>

        <button
          type="button"
          onClick={onWeeklyForecast}
          className="flex-1 rounded-[10px] bg-[#FFB36C] px-[6px] py-[8px] text-[9px] text-black sm:text-[10px]"
        >
          {t.weather.weekly}
        </button>
      </div>

      <button
        type="button"
        onClick={onAssistant}
        className="group mt-[10px] flex items-center gap-[7px] rounded-[10px] border border-[#FFB36C] px-[16px] py-[7px] text-[10px] font-medium hover:bg-[#FFB36C] hover:text-black"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-[15px] w-[15px]">
          <path
            d="M12 3L13.5 8.5L19 10L13.5 11.5L12 17L10.5 11.5L5 10L10.5 8.5L12 3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          <path
            d="M19 15L19.7 17.3L22 18L19.7 18.7L19 21L18.3 18.7L16 18L18.3 17.3L19 15Z"
            fill="currentColor"
          />
        </svg>

        {t.weather.assistant}
      </button>

      <div className="mt-[12px] flex items-center gap-[10px] text-[12px] sm:gap-[12px] sm:text-[14px]">
        <span>{formattedDate}</span>

        <span className="h-[20px] w-[1px] bg-black dark:bg-white" />

        <span>{formattedDay}</span>
      </div>

      <img
        src={iconUrl}
        alt={weather.weather[0].description}
        className="mt-[10px] h-[110px] w-[110px] sm:h-[120px] sm:w-[120px]"
      />

      <p className="text-[30px] font-medium sm:text-[32px]">
        {Math.round(weather.main.temp)}°C
      </p>

      <div className="mt-auto flex w-full items-center justify-between">
        <button type="button" onClick={onRefresh}>
          <img
            src={refreshIcon}
            alt=""
            className="h-[28px] w-[28px] dark:invert sm:h-[30px] sm:w-[30px]"
          />
        </button>

        <button
          type="button"
          onClick={onToggleFavorite}
          className={`flex h-[30px] w-[30px] items-center justify-center ${
            isFavorite ? "text-[#FF9D4D]" : "text-black dark:text-white"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-[25px] w-[25px]"
            fill={isFavorite ? "#FFB36C" : "transparent"}
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
            />
          </svg>
        </button>

        <button
          type="button"
          onClick={onDetails}
          className="rounded-[10px] bg-[#FFB36C] px-[20px] py-[8px] text-[10px] text-black sm:px-[24px]"
        >
          {t.weather.seeMore}
        </button>

        <button type="button" onClick={onDelete}>
          <img
            src={deleteIcon}
            alt=""
            className="h-[28px] w-[28px] dark:invert sm:h-[30px] sm:w-[30px]"
          />
        </button>
      </div>
    </article>
  );
}

export default WeatherCard;
