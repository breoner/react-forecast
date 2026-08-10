import feelsLikeIcon from "../../assets/weather-details/feels-like.svg";
import humidityIcon from "../../assets/weather-details/humidity.svg";
import pressureIcon from "../../assets/weather-details/pressure.svg";
import windIcon from "../../assets/weather-details/wind.svg";
import visibilityIcon from "../../assets/weather-details/visibility.svg";

function WeatherDetails({ weather }) {
  const visibility = weather.visibility
    ? `${(weather.visibility / 1000).toFixed(1)} km`
    : "Unlimited";

  const details = [
    {
      title: "Feels like",
      value: `${Math.round(weather.main.feels_like)}°C`,
      icon: feelsLikeIcon,
    },
    {
      title: "Min °C",
      value: `${Math.round(weather.main.temp_min)}°C`,
      secondTitle: "Max °C",
      secondValue: `${Math.round(weather.main.temp_max)}°C`,
    },
    {
      title: "Humidity",
      value: `${weather.main.humidity}%`,
      icon: humidityIcon,
    },
    {
      title: "Pressure",
      value: `${weather.main.pressure} hPa`,
      icon: pressureIcon,
    },
    {
      title: "Wind speed",
      value: `${weather.wind.speed} m/s`,
      icon: windIcon,
    },
    {
      title: "Visibility",
      value: visibility,
      icon: visibilityIcon,
    },
  ];

  return (
    <div className="mx-auto mt-[60px] w-full max-w-[900px] rounded-[20px] bg-[#E4E4E4] p-[30px]">
      <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-2 md:grid-cols-3">
        {details.map((item) => (
          <div
            key={item.title}
            className="flex min-h-[170px] flex-col items-center justify-center rounded-[10px] bg-[#D9D9D9] px-[15px] py-[20px] text-center"
          >
            <p className="text-[14px] font-medium">{item.title}</p>

            <p className="mt-[8px] text-[24px] font-medium">{item.value}</p>

            {item.secondTitle && (
              <>
                <p className="mt-[12px] text-[14px] font-medium">
                  {item.secondTitle}
                </p>

                <p className="mt-[5px] text-[24px] font-medium">
                  {item.secondValue}
                </p>
              </>
            )}

            {item.icon && (
              <img
                src={item.icon}
                alt=""
                className="mt-[15px] h-[40px] w-[40px]"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherDetails;
