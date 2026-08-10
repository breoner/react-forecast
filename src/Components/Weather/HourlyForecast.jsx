import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

function HourlyForecast({ forecast, onClose }) {
  if (!forecast) {
    return null;
  }

  const data = forecast.list.slice(0, 16).map((item) => {
    const date = new Date(item.dt * 1000);

    return {
      time: date.toLocaleTimeString("en-US", {
        hour: "numeric",
      }),
      temp: Math.round(item.main.temp),
    };
  });

  return (
    <div className="relative mx-auto mt-[40px] w-full max-w-[900px] rounded-[20px] bg-[#E4E4E4] p-[30px]">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close hourly forecast"
        className="absolute right-[18px] top-[14px] flex h-[30px] w-[30px] items-center justify-center rounded-full text-[26px] leading-none transition-all duration-200 hover:rotate-90 hover:bg-[#D9D9D9] active:scale-90"
      >
        ×
      </button>

      <h2 className="mb-[20px] text-[14px] font-medium">Hourly forecast</h2>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#C6C6C6" />

            <XAxis
              dataKey="time"
              tick={{ fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value}°C`}
            />

            <Tooltip formatter={(value) => [`${value}°C`, "Temperature"]} />

            <Line
              type="monotone"
              dataKey="temp"
              stroke="#FF9D4D"
              strokeWidth={2}
              dot={false}
              animationDuration={700}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default HourlyForecast;
