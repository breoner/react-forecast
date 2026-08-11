import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

function HourlyForecast({ forecast, onClose, isDark }) {
  if (!forecast) {
    return null;
  }

  const data = forecast.list.slice(0, 16).map((item) => {
    return {
      timestamp: item.dt,
      temp: Math.round(item.main.temp),
    };
  });

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
    });
  };

  const textColor = isDark ? "#E5E5E5" : "#666666";
  const gridColor = isDark ? "#3A3A3A" : "#C6C6C6";
  const tooltipBg = isDark ? "#242424" : "#FFFFFF";
  const tooltipBorder = isDark ? "#444444" : "#D9D9D9";

  return (
    <div className="relative mx-auto mt-[40px] w-full max-w-[900px] rounded-[20px] bg-[#E4E4E4] p-[30px] text-black transition-colors duration-300 dark:bg-[#242424] dark:text-white">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close hourly forecast"
        className="absolute right-[18px] top-[14px] flex h-[30px] w-[30px] items-center justify-center rounded-full text-[26px] leading-none transition-all duration-200 hover:rotate-90 hover:bg-[#D9D9D9] active:scale-90 dark:hover:bg-[#3A3A3A]"
      >
        ×
      </button>

      <h2 className="mb-[20px] text-[14px] font-medium">Hourly forecast</h2>

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
              formatter={(value) => [`${value}°C`, "Temperature"]}
              contentStyle={{
                backgroundColor: tooltipBg,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: "10px",
                color: textColor,
              }}
              labelStyle={{
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
              animationDuration={700}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default HourlyForecast;
