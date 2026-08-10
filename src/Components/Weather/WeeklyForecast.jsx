function WeeklyForecast({ forecast, onClose }) {
  if (!forecast) {
    return null;
  }

  const groupedDays = forecast.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000);
    const key = date.toLocaleDateString("en-CA");

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(item);

    return acc;
  }, {});

  const days = Object.values(groupedDays).map((items) => {
    const middleItem = items[Math.floor(items.length / 2)];

    return {
      dt: middleItem.dt,
      min: Math.min(...items.map((item) => item.main.temp_min)),
      max: Math.max(...items.map((item) => item.main.temp_max)),
      icon: middleItem.weather[0].icon,
      description: middleItem.weather[0].description,
    };
  });

  return (
    <div className="relative mx-auto mt-[40px] w-full max-w-[900px] rounded-[20px] bg-[#E4E4E4] p-[30px]">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close weekly forecast"
        className="absolute right-[18px] top-[14px] flex h-[30px] w-[30px] items-center justify-center rounded-full text-[26px] leading-none transition-all duration-200 hover:rotate-90 hover:bg-[#D0D0D0] active:scale-90"
      >
        ×
      </button>

      <h2 className="mb-[20px] text-[14px] font-medium">5-day forecast</h2>

      <div className="flex flex-col gap-[8px]">
        {days.map((day, index) => {
          const date = new Date(day.dt * 1000);

          const formattedDate = date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          });

          const iconUrl = `https://openweathermap.org/img/wn/${day.icon}@2x.png`;

          return (
            <div
              key={day.dt}
              className="grid grid-cols-[1fr_auto_1fr] items-center rounded-[8px] bg-[#D9D9D9] px-[20px] py-[6px] transition-all duration-200 hover:translate-x-[3px] hover:bg-[#D3D3D3]"
              style={{
                animationDelay: `${index * 60}ms`,
              }}
            >
              <p className="text-[12px]">{formattedDate}</p>

              <div className="flex items-center gap-[10px]">
                <img
                  src={iconUrl}
                  alt={day.description}
                  className="h-[35px] w-[35px]"
                />

                <p className="text-[12px]">
                  {Math.round(day.max)}°/
                  {Math.round(day.min)}°C
                </p>
              </div>

              <p className="text-right text-[12px] capitalize">
                {day.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeeklyForecast;
