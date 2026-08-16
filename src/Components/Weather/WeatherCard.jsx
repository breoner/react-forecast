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

  const description = weather.weather[0].description;

  return (
    <article className="group relative flex min-h-[500px] w-full max-w-[340px] flex-col overflow-hidden rounded-[24px] border border-black/5 bg-white p-[20px] text-black shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-[4px] hover:shadow-[0_18px_45px_rgba(0,0,0,0.12)] dark:border-white/5 dark:bg-[#1C1C1C] dark:text-white">
      <div className="absolute right-[-55px] top-[-55px] h-[150px] w-[150px] rounded-full bg-[#FFB36C]/15 blur-[45px]" />

      {/* CITY + FAVORITE */}
      <div className="relative z-10 flex w-full items-start justify-between">
        <div>
          <p className="max-w-[210px] truncate text-[17px] font-semibold">
            {city.name}
          </p>

          <p className="mt-[4px] text-[11px] font-medium text-[#555555] dark:text-[#C7C7C7]">
            {city.state ? `${city.state}, ${city.country}` : city.country}
          </p>
        </div>

        <button
          type="button"
          onClick={onToggleFavorite}
          aria-label="Toggle favorite"
          className={`flex h-[38px] w-[38px] items-center justify-center rounded-full border transition-all duration-200 hover:scale-105 active:scale-95 ${
            isFavorite
              ? "border-[#FFB36C] bg-[#FFB36C]/15 text-[#FF9D4D]"
              : "border-[#E5E5E5] bg-white text-black dark:border-[#3A3A3A] dark:bg-[#242424] dark:text-white"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-[21px] w-[21px]"
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
      </div>

      {/* TEMPERATURE */}
      <div className="relative z-10 mt-[22px] flex items-center justify-between">
        <div>
          <p className="text-[44px] font-semibold leading-none tracking-[-2px]">
            {Math.round(weather.main.temp)}°
          </p>

          <p className="mt-[7px] max-w-[170px] text-[12px] font-medium capitalize text-[#444444] dark:text-[#D4D4D4]">
            {description}
          </p>
        </div>

        <div className="flex h-[110px] w-[110px] items-center justify-center rounded-full bg-[#F7F7F7] transition-colors duration-300 dark:bg-[#242424]">
          <img
            src={iconUrl}
            alt={description}
            className="h-[100px] w-[100px]"
          />
        </div>
      </div>

      {/* TIME / DATE / DAY */}
      <div className="relative z-10 mt-[20px] grid grid-cols-3 gap-[8px]">
        <div className="rounded-[13px] bg-[#F5F5F5] px-[8px] py-[11px] text-center dark:bg-[#242424]">
          <p className="text-[9px] font-semibold uppercase tracking-[0.8px] text-[#666666] dark:text-[#AAAAAA]">
            {language === "ua" ? "Час" : "Time"}
          </p>

          <p className="mt-[4px] text-[11px] font-semibold text-[#222222] dark:text-white">
            {formattedTime}
          </p>
        </div>

        <div className="rounded-[13px] bg-[#F5F5F5] px-[8px] py-[11px] text-center dark:bg-[#242424]">
          <p className="text-[9px] font-semibold uppercase tracking-[0.8px] text-[#666666] dark:text-[#AAAAAA]">
            {language === "ua" ? "Дата" : "Date"}
          </p>

          <p className="mt-[4px] text-[11px] font-semibold text-[#222222] dark:text-white">
            {formattedDate}
          </p>
        </div>

        <div className="rounded-[13px] bg-[#F5F5F5] px-[8px] py-[11px] text-center dark:bg-[#242424]">
          <p className="text-[9px] font-semibold uppercase tracking-[0.8px] text-[#666666] dark:text-[#AAAAAA]">
            {language === "ua" ? "День" : "Day"}
          </p>

          <p className="mt-[4px] truncate text-[11px] font-semibold capitalize text-[#222222] dark:text-white">
            {formattedDay}
          </p>
        </div>
      </div>

      {/* FORECAST BUTTONS */}
      <div className="relative z-10 mt-[18px] grid grid-cols-2 gap-[10px]">
        <button
          type="button"
          onClick={onHourlyForecast}
          className="rounded-[13px] border border-[#DADADA] bg-white px-[10px] py-[11px] text-[10px] font-semibold text-[#222222] shadow-sm transition-all duration-200 hover:border-[#FFB36C] hover:bg-[#FFF7EF] active:scale-[0.98] dark:border-[#444444] dark:bg-[#292929] dark:text-white dark:hover:border-[#FFB36C] dark:hover:bg-[#332A22]"
        >
          {t.weather.hourly}
        </button>

        <button
          type="button"
          onClick={onWeeklyForecast}
          className="rounded-[13px] border border-[#DADADA] bg-white px-[10px] py-[11px] text-[10px] font-semibold text-[#222222] shadow-sm transition-all duration-200 hover:border-[#FFB36C] hover:bg-[#FFF7EF] active:scale-[0.98] dark:border-[#444444] dark:bg-[#292929] dark:text-white dark:hover:border-[#FFB36C] dark:hover:bg-[#332A22]"
        >
          {t.weather.weekly}
        </button>
      </div>

      {/* ASSISTANT */}
      <button
        type="button"
        onClick={onAssistant}
        className="relative z-10 mt-[10px] flex w-full items-center justify-center gap-[8px] rounded-[13px] bg-[#FFF0E1] px-[12px] py-[12px] text-[10px] font-semibold text-[#C96816] shadow-sm transition-all duration-200 hover:bg-[#FFB36C] hover:text-black active:scale-[0.98] dark:bg-[#3A2C20] dark:text-[#FFC083] dark:hover:bg-[#FFB36C] dark:hover:text-black"
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

      {/* BOTTOM ACTIONS */}
      <div className="relative z-10 mt-auto flex items-center gap-[8px] pt-[18px]">
        <button
          type="button"
          onClick={onRefresh}
          aria-label="Refresh weather"
          className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[12px] border border-[#DADADA] bg-white shadow-sm transition-all duration-200 hover:rotate-180 hover:border-[#FFB36C] active:scale-95 dark:border-[#444444] dark:bg-[#292929]"
        >
          <img
            src={refreshIcon}
            alt=""
            className="h-[20px] w-[20px] dark:invert"
          />
        </button>

        <button
          type="button"
          onClick={onDetails}
          className="h-[40px] flex-1 rounded-[12px] bg-[#FFB36C] px-[18px] text-[10px] font-semibold text-black shadow-[0_5px_15px_rgba(255,179,108,0.25)] transition-all duration-200 hover:bg-[#FFA95D] hover:shadow-[0_7px_18px_rgba(255,179,108,0.35)] active:scale-[0.98]"
        >
          {t.weather.seeMore}
        </button>

        <button
          type="button"
          onClick={onDelete}
          aria-label="Delete city"
          className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[12px] border border-[#DADADA] bg-white shadow-sm transition-all duration-200 hover:border-red-400 hover:bg-red-50 active:scale-95 dark:border-[#444444] dark:bg-[#292929] dark:hover:bg-red-950/30"
        >
          <img
            src={deleteIcon}
            alt=""
            className="h-[20px] w-[20px] dark:invert"
          />
        </button>
      </div>
    </article>
  );
}

export default WeatherCard;
