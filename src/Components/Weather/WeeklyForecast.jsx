import { translations } from "../../data/translations";

function WeeklyForecast({ forecast, onClose, language }) {
  if (!forecast) {
    return null;
  }

  const t = translations[language];

  const locale = language === "ua" ? "uk-UA" : "en-US";

  const dailyForecasts = [];

  forecast.list.forEach((item) => {
    const date = new Date(item.dt * 1000);

    const dateKey = date.toLocaleDateString("en-CA");

    const hour = date.getHours();

    const existingDay = dailyForecasts.find((day) => day.dateKey === dateKey);

    if (!existingDay) {
      dailyForecasts.push({
        ...item,
        dateKey,
      });

      return;
    }

    const existingHour = new Date(existingDay.dt * 1000).getHours();

    if (Math.abs(hour - 12) < Math.abs(existingHour - 12)) {
      const index = dailyForecasts.findIndex((day) => day.dateKey === dateKey);

      dailyForecasts[index] = {
        ...item,
        dateKey,
      };
    }
  });

  const days = dailyForecasts.slice(0, 5);

  return (
    <div className="relative mx-auto mt-[45px] w-full max-w-[950px] overflow-hidden rounded-[24px] border border-black/5 bg-white p-[20px] shadow-[0_12px_35px_rgba(0,0,0,0.07)] transition-colors duration-300 dark:border-white/5 dark:bg-[#1C1C1C] md:p-[28px]">
      {/* Decorative glow */}

      <div className="absolute right-[-70px] top-[-70px] h-[180px] w-[180px] rounded-full bg-[#FFB36C]/10 blur-[55px]" />

      {/* CLOSE */}

      <button
        type="button"
        onClick={onClose}
        aria-label="Close weekly forecast"
        className="absolute right-[16px] top-[14px] z-20 flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-[22px] leading-none text-black transition-all duration-200 hover:rotate-90 hover:border-[#FFB36C] active:scale-90 dark:border-[#3A3A3A] dark:bg-[#262626] dark:text-white"
      >
        ×
      </button>

      {/* TITLE */}

      <div className="relative z-10 mb-[25px]">
        <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-[#FF9D4D]">
          {language === "ua" ? "Прогноз" : "Forecast"}
        </p>

        <h2 className="mt-[5px] text-[20px] font-semibold text-black dark:text-white md:text-[24px]">
          {t.weather.weekly}
        </h2>

        <p className="mt-[6px] text-[11px] text-[#555555] dark:text-[#BDBDBD]">
          {language === "ua"
            ? "Погода на найближчі дні"
            : "Weather for the next few days"}
        </p>
      </div>

      {/* DAYS */}

      <div className="relative z-10 grid grid-cols-1 gap-[10px] sm:grid-cols-2 lg:grid-cols-5">
        {days.map((item) => {
          const date = new Date(item.dt * 1000);

          const dayName = date.toLocaleDateString(locale, {
            weekday: "short",
          });

          const formattedDate = date.toLocaleDateString(locale, {
            day: "numeric",
            month: "short",
          });

          const iconCode = item.weather[0].icon;

          const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

          const description = item.weather[0].description;

          return (
            <div
              key={item.dt}
              className="group flex min-h-[215px] flex-col items-center rounded-[18px] border border-[#E8E8E8] bg-[#FAFAFA] px-[12px] py-[17px] text-center transition-all duration-300 hover:-translate-y-[3px] hover:border-[#FFB36C] hover:bg-[#FFF9F3] hover:shadow-[0_10px_25px_rgba(0,0,0,0.07)] dark:border-[#343434] dark:bg-[#242424] dark:hover:border-[#FFB36C] dark:hover:bg-[#2B2723]"
            >
              {/* DAY */}

              <p className="text-[12px] font-semibold capitalize text-[#222222] dark:text-white">
                {dayName}
              </p>

              <p className="mt-[3px] text-[9px] font-medium text-[#666666] dark:text-[#AAAAAA]">
                {formattedDate}
              </p>

              {/* ICON */}

              <div className="mt-[8px] flex h-[68px] w-[68px] items-center justify-center rounded-full bg-white transition-transform duration-300 group-hover:scale-105 dark:bg-[#2D2D2D]">
                <img
                  src={iconUrl}
                  alt={description}
                  className="h-[66px] w-[66px]"
                />
              </div>

              {/* TEMPERATURE */}

              <p className="mt-[7px] text-[22px] font-semibold tracking-[-0.5px] text-[#222222] dark:text-white">
                {Math.round(item.main.temp)}°
              </p>

              {/* DESCRIPTION */}

              <p className="mt-[4px] line-clamp-2 text-[9px] font-medium capitalize leading-[1.4] text-[#555555] dark:text-[#BDBDBD]">
                {description}
              </p>
            </div>
          );
        })}
      </div>

      {/* INFO */}

      <div className="relative z-10 mt-[18px] flex items-center gap-[7px] rounded-[12px] bg-[#FFF5EB] px-[13px] py-[10px] text-[9px] font-medium text-[#A85D1D] dark:bg-[#332A22] dark:text-[#FFC083]">
        <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#FFB36C]" />

        {language === "ua"
          ? "Для кожного дня показано прогноз, найближчий до полудня."
          : "Each day shows the forecast closest to midday."}
      </div>
    </div>
  );
}

export default WeeklyForecast;
