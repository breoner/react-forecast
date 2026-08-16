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
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const textColor = isDark ? "#D4D4D4" : "#555555";

  const gridColor = isDark ? "#333333" : "#E7E7E7";

  const tooltipBg = isDark ? "#202020" : "#FFFFFF";

  const tooltipBorder = isDark ? "#3A3A3A" : "#E5E5E5";

  return (
    <div className="relative mx-auto mt-[45px] w-full max-w-[950px] overflow-hidden rounded-[24px] border border-black/5 bg-white p-[20px] shadow-[0_12px_35px_rgba(0,0,0,0.07)] transition-colors duration-300 dark:border-white/5 dark:bg-[#1C1C1C] md:p-[28px]">
      <div className="absolute right-[-70px] top-[-70px] h-[180px] w-[180px] rounded-full bg-[#FFB36C]/10 blur-[55px]" />

      <button
        type="button"
        onClick={onClose}
        aria-label="Close hourly forecast"
        className="absolute right-[16px] top-[14px] z-20 flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-[22px] leading-none text-black transition-all duration-200 hover:rotate-90 hover:border-[#FFB36C] active:scale-90 dark:border-[#3A3A3A] dark:bg-[#262626] dark:text-white"
      >
        ×
      </button>

      <div className="relative z-10 mb-[25px]">
        <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-[#FF9D4D]">
          {language === "ua" ? "Прогноз" : "Forecast"}
        </p>

        <h2 className="mt-[5px] text-[20px] font-semibold text-black dark:text-white md:text-[24px]">
          {t.weather.hourly}
        </h2>

        <p className="mt-[6px] text-[11px] text-[#666666] dark:text-[#AFAFAF]">
          {language === "ua"
            ? "Зміна температури протягом найближчих годин"
            : "Temperature changes over the next hours"}
        </p>
      </div>

      <div className="relative z-10 h-[300px] w-full md:h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 15,
              left: -10,
              bottom: 0,
            }}
          >
            <CartesianGrid
              stroke={gridColor}
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="timestamp"
              tick={{
                fontSize: 10,
                fill: textColor,
              }}
              tickFormatter={formatTime}
              axisLine={false}
              tickLine={false}
              minTickGap={20}
            />

            <YAxis
              tick={{
                fontSize: 10,
                fill: textColor,
              }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value}°`}
              width={35}
            />

            <Tooltip
              cursor={{
                stroke: "#FFB36C",
                strokeDasharray: "4 4",
              }}
              labelFormatter={formatTime}
              formatter={(value) => [`${value}°C`, t.weather.temperature]}
              contentStyle={{
                backgroundColor: tooltipBg,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: "12px",
                color: textColor,
                fontSize: "11px",
                boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
              }}
              labelStyle={{
                color: textColor,
                fontWeight: 600,
              }}
            />

            <Line
              type="monotone"
              dataKey="temp"
              stroke="#FF9D4D"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 5,
                fill: "#FF9D4D",
                stroke: isDark ? "#1C1C1C" : "#FFFFFF",
                strokeWidth: 3,
              }}
              animationDuration={700}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default HourlyForecast;
