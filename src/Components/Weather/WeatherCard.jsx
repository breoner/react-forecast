import refreshIcon from "../../assets/refresh.svg";
import deleteIcon from "../../assets/delete.svg";

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
}) {
  const iconCode = weather.weather[0].icon;

  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const date = new Date(weather.dt * 1000);

  const formattedDate = date.toLocaleDateString("en-GB");

  const formattedDay = date.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const formattedTime = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article className="flex h-[430px] w-[320px] flex-col items-center rounded-[20px] bg-[#E4E4E4] px-[30px] py-[20px]">
      <div className="flex w-full justify-between text-[14px]">
        <span>{city.name}</span>
        <span>{city.country}</span>
      </div>

      <p className="mt-[20px] text-[24px] font-medium">{formattedTime}</p>

      <div className="mt-[15px] flex gap-[20px]">
        <button
          type="button"
          onClick={onHourlyForecast}
          className="rounded-[10px] bg-[#FFB36C] px-[18px] py-[8px] text-[10px]"
        >
          Hourly forecast
        </button>

        <button
          type="button"
          onClick={onWeeklyForecast}
          className="rounded-[10px] bg-[#FFB36C] px-[18px] py-[8px] text-[10px]"
        >
          Weekly forecast
        </button>
      </div>

      <div className="mt-[15px] flex items-center gap-[12px] text-[14px]">
        <span>{formattedDate}</span>

        <span className="h-[20px] w-[1px] bg-black" />

        <span>{formattedDay}</span>
      </div>

      <img
        src={iconUrl}
        alt={weather.weather[0].description}
        className="mt-[15px] h-[120px] w-[120px]"
      />

      <p className="text-[32px] font-medium">
        {Math.round(weather.main.temp)}°C
      </p>

      <div className="mt-auto flex w-full items-center justify-between">
        <button
          type="button"
          onClick={onRefresh}
          className="transition-transform duration-300 hover:rotate-180"
        >
          <img
            src={refreshIcon}
            alt="Refresh"
            className="transition-transform duration-200 hover:scale-110 active:scale-90"
          />
        </button>

        <button
          type="button"
          onClick={onToggleFavorite}
          className="flex h-[30px] w-[30px] items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-90"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-[26px] w-[26px] transition-all duration-300 ease-out"
            fill={isFavorite ? "#FFB36C" : "transparent"}
            stroke={isFavorite ? "#FF9D4D" : "black"}
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
          className="rounded-[10px] bg-[#FFB36C] px-[24px] py-[8px] text-[10px] transition-all duration-200 hover:scale-[1.04] hover:bg-[#FFA95D] active:scale-95"
        >
          See more
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="flex h-[30px] w-[30px] items-center justify-center"
        >
          <img src={deleteIcon} alt="Delete" className="h-[30px] w-[30px]" />
        </button>
      </div>
    </article>
  );
}

export default WeatherCard;
