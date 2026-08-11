function WeatherAssistant({ weather, onClose }) {
  const temp = weather.main.temp;
  const humidity = weather.main.humidity;
  const wind = weather.wind.speed;
  const condition = weather.weather[0].main;

  const warnings = [];

  let clothes = "";
  let umbrella = "";
  let comfortScore = 10;
  let driving = "";

  if (temp < 5) {
    clothes = "Wear a warm jacket";
  } else if (temp < 15) {
    clothes = "Wear a light jacket";
  } else {
    clothes = "Light clothes are enough";
  }

  if (
    condition === "Rain" ||
    condition === "Drizzle" ||
    condition === "Thunderstorm"
  ) {
    umbrella = "Take an umbrella";
  } else {
    umbrella = "No umbrella needed";
  }

  let outdoor = "";

  if (condition === "Rain" || condition === "Thunderstorm") {
    outdoor = "Better stay inside";
  } else if (temp >= 15 && temp <= 28 && wind < 8) {
    outdoor = "Great for outdoor activities";
  } else {
    outdoor = "Outdoor activities are okay";
  }

  if (wind >= 10) {
    warnings.push("Strong wind");
  }

  if (temp > 30) {
    warnings.push("High temperature");
  }

  if (temp < 0) {
    warnings.push("Freezing temperature");
  }

  if (wind >= 10) {
    comfortScore -= 2;
  }

  if (condition === "Rain") {
    comfortScore -= 2;
  }

  if (condition === "Thunderstorm") {
    comfortScore -= 3;
  }

  if (temp > 30) {
    comfortScore -= 2;
  }

  if (temp < 0) {
    comfortScore -= 2;
  }

  if (condition === "Thunderstorm" || condition === "Snow") {
    driving = "Dangerous driving";
  } else if (condition === "Rain" || wind >= 10) {
    driving = "Drive carefully";
  } else {
    driving = "Good driving conditions";
  }

  comfortScore = Math.max(0, comfortScore);

  return (
  <div className="relative mx-auto mt-[40px] w-full max-w-[900px] rounded-[20px] bg-[#E4E4E4] p-[30px] text-black transition-colors duration-300 dark:bg-[#242424] dark:text-white">
    <button
      type="button"
      onClick={onClose}
      aria-label="Close weather assistant"
      className="absolute right-[18px] top-[14px] flex h-[30px] w-[30px] items-center justify-center rounded-full text-[26px] leading-none transition-all duration-200 hover:rotate-90 hover:bg-[#D0D0D0] active:scale-90 dark:hover:bg-[#3A3A3A]"
    >
      ×
    </button>
    <div className="flex flex-col gap-[8px] sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-[20px] font-semibold">
          Weather Assistant
        </h2>

        <p className="mt-[5px] text-[12px] text-[#666666] dark:text-[#BDBDBD]">
          Smart recommendations based on current weather
        </p>
      </div>

      <div className="rounded-[14px] bg-[#FFB36C] px-[18px] py-[10px] text-center text-black">
        <p className="text-[10px] font-medium">
          Comfort Score
        </p>

        <p className="text-[24px] font-semibold">
          {comfortScore}/10
        </p>
      </div>
    </div>

    <div className="mt-[25px] grid grid-cols-1 gap-[15px] sm:grid-cols-2">
      <div className="rounded-[15px] bg-[#D9D9D9] p-[18px] transition-colors duration-300 dark:bg-[#303030]">
        <p className="text-[12px] text-[#666666] dark:text-[#BDBDBD]">
          Clothes
        </p>

        <p className="mt-[6px] text-[14px] font-medium">
          {clothes}
        </p>
      </div>

      <div className="rounded-[15px] bg-[#D9D9D9] p-[18px] transition-colors duration-300 dark:bg-[#303030]">
        <p className="text-[12px] text-[#666666] dark:text-[#BDBDBD]">
          Umbrella
        </p>

        <p className="mt-[6px] text-[14px] font-medium">
          {umbrella}
        </p>
      </div>

      <div className="rounded-[15px] bg-[#D9D9D9] p-[18px] transition-colors duration-300 dark:bg-[#303030]">
        <p className="text-[12px] text-[#666666] dark:text-[#BDBDBD]">
          Outdoor
        </p>

        <p className="mt-[6px] text-[14px] font-medium">
          {outdoor}
        </p>
      </div>

      <div className="rounded-[15px] bg-[#D9D9D9] p-[18px] transition-colors duration-300 dark:bg-[#303030]">
        <p className="text-[12px] text-[#666666] dark:text-[#BDBDBD]">
          Driving
        </p>

        <p className="mt-[6px] text-[14px] font-medium">
          {driving}
        </p>
      </div>
    </div>

    <div className="mt-[15px] rounded-[15px] bg-[#D9D9D9] p-[18px] transition-colors duration-300 dark:bg-[#303030]">
      <p className="text-[12px] text-[#666666] dark:text-[#BDBDBD]">
        Warnings
      </p>

      <div className="mt-[8px] flex flex-wrap gap-[8px]">
        {warnings.length > 0 ? (
          warnings.map((warning, index) => (
            <span
              key={index}
              className="rounded-full bg-[#FFB36C] px-[12px] py-[6px] text-[11px] font-medium text-black"
            >
              {warning}
            </span>
          ))
        ) : (
          <p className="text-[14px] font-medium">
            No warnings
          </p>
        )}
      </div>
    </div>
  </div>
);
}

export default WeatherAssistant;
