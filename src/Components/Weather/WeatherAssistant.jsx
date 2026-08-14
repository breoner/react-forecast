import { translations } from "../../data/translations";

function WeatherAssistant({ weather, onClose, language }) {
  const t = translations[language];

  const temp = weather.main.temp;
  const wind = weather.wind.speed;
  const condition = weather.weather[0].main;

  const warnings = [];

  let clothes = "";
  let umbrella = "";
  let outdoor = "";
  let driving = "";
  let comfortScore = 10;

  if (temp < 5) {
    clothes = t.assistant.warmJacket;
  } else if (temp < 15) {
    clothes = t.assistant.lightJacket;
  } else {
    clothes = t.assistant.lightClothes;
  }

  if (
    condition === "Rain" ||
    condition === "Drizzle" ||
    condition === "Thunderstorm"
  ) {
    umbrella = t.assistant.takeUmbrella;
  } else {
    umbrella = t.assistant.noUmbrella;
  }

  if (condition === "Rain" || condition === "Thunderstorm") {
    outdoor = t.assistant.stayInside;
  } else if (temp >= 15 && temp <= 28 && wind < 8) {
    outdoor = t.assistant.greatOutdoor;
  } else {
    outdoor = t.assistant.okayOutdoor;
  }

  if (wind >= 10) {
    warnings.push(t.assistant.strongWind);

    comfortScore -= 2;
  }

  if (temp > 30) {
    warnings.push(t.assistant.highTemperature);

    comfortScore -= 2;
  }

  if (temp < 0) {
    warnings.push(t.assistant.freezingTemperature);

    comfortScore -= 2;
  }

  if (condition === "Rain") {
    comfortScore -= 2;
  }

  if (condition === "Thunderstorm") {
    comfortScore -= 3;
  }

  if (condition === "Thunderstorm" || condition === "Snow") {
    driving = t.assistant.dangerousDriving;
  } else if (condition === "Rain" || wind >= 10) {
    driving = t.assistant.carefulDriving;
  } else {
    driving = t.assistant.goodDriving;
  }

  comfortScore = Math.max(0, comfortScore);

  return (
    <div className="relative mx-auto mt-[40px] w-full max-w-[900px] rounded-[20px] bg-[#E4E4E4] p-[30px] text-black dark:bg-[#242424] dark:text-white">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-[18px] top-[14px] text-[26px]"
      >
        ×
      </button>

      <div className="flex flex-col gap-[8px] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-[20px] font-semibold">{t.assistant.title}</h2>

          <p className="mt-[5px] text-[12px] text-[#666666] dark:text-[#BDBDBD]">
            {t.assistant.subtitle}
          </p>
        </div>

        <div className="rounded-[14px] bg-[#FFB36C] px-[18px] py-[10px] text-center text-black">
          <p className="text-[10px] font-medium">{t.assistant.comfort}</p>

          <p className="text-[24px] font-semibold">{comfortScore}/10</p>
        </div>
      </div>

      <div className="mt-[25px] grid grid-cols-1 gap-[15px] sm:grid-cols-2">
        {[
          [t.assistant.clothes, clothes],
          [t.assistant.umbrella, umbrella],
          [t.assistant.outdoor, outdoor],
          [t.assistant.driving, driving],
        ].map(([title, value]) => (
          <div
            key={title}
            className="rounded-[15px] bg-[#D9D9D9] p-[18px] dark:bg-[#303030]"
          >
            <p className="text-[12px] text-[#666666] dark:text-[#BDBDBD]">
              {title}
            </p>

            <p className="mt-[6px] text-[14px] font-medium">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-[15px] rounded-[15px] bg-[#D9D9D9] p-[18px] dark:bg-[#303030]">
        <p className="text-[12px] text-[#666666] dark:text-[#BDBDBD]">
          {t.assistant.warnings}
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
            <p className="text-[14px] font-medium">{t.assistant.noWarnings}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WeatherAssistant;
