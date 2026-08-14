import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { translations } from "../../data/translations";

function HourlyForecast({ forecast, onClose, isDark, language }) {
  if (!forecast) {
    return null;
  }

  const t = translations[language];

  const locale = language === "ua" ? "uk-UA" : "en-US";

  const data = forecast.list.slice(0, 16).map((item) => ({
    timestamp: item.dt,
    temp: Math.round(item.main.temp),
  }));

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);

    return date.toLocaleTimeString(locale, {
      hour: "numeric",
    });
  };

  const textColor = isDark ? "#E5E5E5" : "#666666";

  const gridColor = isDark ? "#3A3A3A" : "#C6C6C6";

  const tooltipBg = isDark ? "#242424" : "#FFFFFF";

  const tooltipBorder = isDark ? "#444444" : "#D9D9D9";

  return (
    <div className="relative mx-auto mt-[40px] w-full max-w-[900px] rounded-[20px] bg-[#E4E4E4] p-[30px] text-black dark:bg-[#242424] dark:text-white">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-[18px] top-[14px] text-[26px]"
      >
        ×
      </button>

      <h2 className="mb-[20px] text-[14px] font-medium">{t.weather.hourly}</h2>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke={gridColor} />

            <XAxis
              dataKey="timestamp"
              tick={{
                fontSize: 10,
                fill: textColor,
              }}
              tickFormatter={formatTime}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{
                fontSize: 10,
                fill: textColor,
              }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value}°C`}
            />

            <Tooltip
              cursor={false}
              labelFormatter={formatTime}
              formatter={(value) => [`${value}°C`, t.weather.temperature]}
              contentStyle={{
                backgroundColor: tooltipBg,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: "10px",
                color: textColor,
              }}
            />

            <Line
              type="monotone"
              dataKey="temp"
              stroke="#FF9D4D"
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 5,
                fill: "#FF9D4D",
                stroke: isDark ? "#242424" : "#FFFFFF",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default HourlyForecast;
