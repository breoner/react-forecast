import { translations } from "../../data/translations";

function WeatherAssistant({ weather, onClose, language }) {
  const t = translations[language];

  const temp = weather.main.temp;
  const feelsLike = weather.main.feels_like;
  const humidity = weather.main.humidity;
  const wind = weather.wind.speed;
  const visibility = weather.visibility ?? 10000;
  const condition = weather.weather[0].main;

  const isRain = condition === "Rain" || condition === "Drizzle";

  const isThunderstorm = condition === "Thunderstorm";
  const isSnow = condition === "Snow";

  const warnings = [];

  /*
    ----------------------------
    CLOTHES
    ----------------------------
  */

  let clothes = "";

  if (feelsLike <= -30) {
    clothes =
      language === "ua"
        ? "Екстремальний холод. Потрібен спеціальний зимовий одяг та повний захист відкритої шкіри."
        : "Extreme cold. Specialized winter clothing and full protection of exposed skin are required.";
  } else if (feelsLike <= -15) {
    clothes =
      language === "ua"
        ? "Дуже тепла куртка, шапка, рукавички та зимове взуття."
        : "Wear a very warm jacket, hat, gloves and winter footwear.";
  } else if (feelsLike < 5) {
    clothes = t.assistant.warmJacket;
  } else if (feelsLike < 15) {
    clothes = t.assistant.lightJacket;
  } else if (feelsLike >= 32) {
    clothes =
      language === "ua"
        ? "Легкий одяг, головний убір та захист від сонця."
        : "Wear light clothing, sun protection and a hat.";
  } else {
    clothes = t.assistant.lightClothes;
  }

  /*
    ----------------------------
    UMBRELLA
    ----------------------------
  */

  let umbrella = "";

  if (isRain || isThunderstorm) {
    umbrella = t.assistant.takeUmbrella;
  } else if (isSnow) {
    umbrella =
      language === "ua"
        ? "Парасоля не обов'язкова, але підготуйтеся до снігу."
        : "An umbrella is optional, but be prepared for snow.";
  } else {
    umbrella = t.assistant.noUmbrella;
  }

  /*
    ----------------------------
    WARNINGS
    ----------------------------
  */

  if (feelsLike <= -40) {
    warnings.push(
      language === "ua"
        ? "Екстремально небезпечний холод"
        : "Extremely dangerous cold",
    );
  } else if (feelsLike <= -20) {
    warnings.push(language === "ua" ? "Сильний мороз" : "Severe frost");
  } else if (feelsLike < 0) {
    warnings.push(t.assistant.freezingTemperature);
  }

  if (feelsLike >= 40) {
    warnings.push(language === "ua" ? "Екстремальна спека" : "Extreme heat");
  } else if (feelsLike > 30) {
    warnings.push(t.assistant.highTemperature);
  }

  if (wind >= 20) {
    warnings.push(
      language === "ua"
        ? "Небезпечно сильний вітер"
        : "Dangerously strong wind",
    );
  } else if (wind >= 10) {
    warnings.push(t.assistant.strongWind);
  }

  if (isThunderstorm) {
    warnings.push(language === "ua" ? "Гроза" : "Thunderstorm");
  }

  if (isSnow) {
    warnings.push(
      language === "ua"
        ? "Сніг та можлива ожеледиця"
        : "Snow and possible icy conditions",
    );
  }

  if (visibility < 1000) {
    warnings.push(
      language === "ua" ? "Дуже низька видимість" : "Very low visibility",
    );
  } else if (visibility < 3000) {
    warnings.push(
      language === "ua" ? "Знижена видимість" : "Reduced visibility",
    );
  }

  /*
    ----------------------------
    SCORE HELPERS
    ----------------------------
  */

  const clampScore = (score) =>
    Math.max(0, Math.min(10, Math.round(score)));

  /*
    ----------------------------
    COMFORT SCORE
    ----------------------------

    10/10 теперь означает почти идеальные
    погодные условия, а не просто отсутствие
    плохой погоды.
  */

  let comfortScore = 7;

  // FEELS LIKE TEMPERATURE
  if (feelsLike >= 18 && feelsLike <= 23) {
    comfortScore += 2;
  } else if (
    (feelsLike >= 15 && feelsLike < 18) ||
    (feelsLike > 23 && feelsLike <= 26)
  ) {
    comfortScore += 1;
  } else if (
    (feelsLike >= 10 && feelsLike < 15) ||
    (feelsLike > 26 && feelsLike <= 29)
  ) {
    // Нормально — без бонуса.
  } else if (
    (feelsLike >= 5 && feelsLike < 10) ||
    (feelsLike > 29 && feelsLike <= 32)
  ) {
    comfortScore -= 1;
  } else if (
    (feelsLike >= 0 && feelsLike < 5) ||
    (feelsLike > 32 && feelsLike <= 35)
  ) {
    comfortScore -= 2;
  } else if (
    (feelsLike >= -10 && feelsLike < 0) ||
    (feelsLike > 35 && feelsLike <= 40)
  ) {
    comfortScore -= 4;
  } else if (
    (feelsLike >= -20 && feelsLike < -10) ||
    (feelsLike > 40 && feelsLike <= 45)
  ) {
    comfortScore -= 6;
  } else if (
    feelsLike < -20 ||
    feelsLike > 45
  ) {
    comfortScore -= 8;
  }

  // HUMIDITY
  if (humidity >= 40 && humidity <= 60) {
    comfortScore += 1;
  } else if (
    humidity >= 70 &&
    humidity < 80
  ) {
    comfortScore -= 1;
  } else if (
    humidity >= 80 &&
    humidity < 90
  ) {
    comfortScore -= 2;
  } else if (humidity >= 90) {
    comfortScore -= 3;
  } else if (humidity < 25) {
    comfortScore -= 1;
  }

  // WIND
  if (wind >= 1 && wind <= 3.5) {
    comfortScore += 1;
  } else if (
    wind >= 7 &&
    wind < 10
  ) {
    comfortScore -= 1;
  } else if (
    wind >= 10 &&
    wind < 15
  ) {
    comfortScore -= 2;
  } else if (
    wind >= 15 &&
    wind < 20
  ) {
    comfortScore -= 4;
  } else if (wind >= 20) {
    comfortScore -= 7;
  }

  // WEATHER
  if (isRain) {
    comfortScore -= 2;
  }

  if (isSnow) {
    comfortScore -= 2;
  }

  if (isThunderstorm) {
    comfortScore -= 6;
  }

  // VISIBILITY
  if (visibility < 1000) {
    comfortScore -= 4;
  } else if (visibility < 3000) {
    comfortScore -= 2;
  } else if (visibility < 5000) {
    comfortScore -= 1;
  }

  // EXTREME CONDITIONS OVERRIDE
  if (
    feelsLike <= -40 ||
    feelsLike >= 48 ||
    wind >= 28
  ) {
    comfortScore = 0;
  }

  if (isThunderstorm && wind >= 15) {
    comfortScore = Math.min(
      comfortScore,
      1,
    );
  }

  comfortScore =
    clampScore(comfortScore);

  /*
    ----------------------------
    OUTDOOR
    ----------------------------
  */

  let outdoor = "";

  if (
    comfortScore <= 2 ||
    feelsLike <= -30 ||
    feelsLike >= 40 ||
    isThunderstorm ||
    wind >= 20
  ) {
    outdoor =
      language === "ua"
        ? "Активності надворі краще відкласти."
        : "Outdoor activities are best postponed.";
  } else if (
    comfortScore <= 4 ||
    feelsLike <= -15 ||
    feelsLike >= 35 ||
    isSnow ||
    wind >= 12
  ) {
    outdoor =
      language === "ua"
        ? "Тривалі активності надворі краще обмежити."
        : "Consider limiting prolonged outdoor activity.";
  } else if (isRain) {
    outdoor =
      language === "ua"
        ? "Для прогулянки знадобиться захист від дощу."
        : "Rain protection is recommended for outdoor activities.";
  } else if (comfortScore >= 8) {
    outdoor =
      language === "ua"
        ? "Чудова погода для активностей надворі."
        : "Great weather for outdoor activities.";
  } else if (comfortScore >= 6) {
    outdoor =
      language === "ua"
        ? "Хороші умови для прогулянки."
        : "Good conditions for a walk.";
  } else {
    outdoor =
      language === "ua"
        ? "Умови прийнятні, але не ідеальні."
        : "Conditions are acceptable, but not ideal.";
  }

  /*
    ----------------------------
    DRIVING
    ----------------------------
  */

  let driving = "";

  if (
    isThunderstorm ||
    visibility < 1000 ||
    wind >= 20
  ) {
    driving =
      t.assistant.dangerousDriving;
  } else if (
    isSnow ||
    isRain ||
    visibility < 3000 ||
    wind >= 10 ||
    feelsLike <= -20
  ) {
    driving =
      t.assistant.carefulDriving;
  } else {
    driving =
      t.assistant.goodDriving;
  }

  /*
    ----------------------------
    ACTIVITIES
    ----------------------------

    Каждая активность считается отдельно.
    Поэтому теперь не будет постоянных
    10/10 для всего сразу.
  */

  const calculateWalkingScore = () => {
    let score = 7;

    // Temperature
    if (
      feelsLike >= 15 &&
      feelsLike <= 24
    ) {
      score += 2;
    } else if (
      feelsLike >= 10 &&
      feelsLike < 15
    ) {
      score += 1;
    } else if (
      feelsLike > 24 &&
      feelsLike <= 28
    ) {
      score += 1;
    } else if (
      feelsLike >= 0 &&
      feelsLike < 5
    ) {
      score -= 2;
    } else if (
      feelsLike < 0
    ) {
      score -= 4;
    } else if (
      feelsLike > 32
    ) {
      score -= 3;
    }

    // Humidity
    if (
      humidity >= 75 &&
      humidity < 90
    ) {
      score -= 1;
    } else if (
      humidity >= 90
    ) {
      score -= 2;
    }

    // Wind
    if (wind >= 15) {
      score -= 4;
    } else if (wind >= 10) {
      score -= 2;
    } else if (wind >= 7) {
      score -= 1;
    }

    if (isRain) {
      score -= 2;
    }

    if (isSnow) {
      score -= 3;
    }

    if (visibility < 3000) {
      score -= 2;
    }

    if (
      isThunderstorm ||
      feelsLike <= -30 ||
      feelsLike >= 42 ||
      wind >= 22
    ) {
      return 0;
    }

    return clampScore(score);
  };

  const calculateRunningScore = () => {
    let score = 7;

    // Running prefers cooler weather
    if (
      feelsLike >= 10 &&
      feelsLike <= 18
    ) {
      score += 2;
    } else if (
      feelsLike > 18 &&
      feelsLike <= 22
    ) {
      score += 1;
    } else if (
      feelsLike > 25 &&
      feelsLike <= 28
    ) {
      score -= 2;
    } else if (
      feelsLike > 28 &&
      feelsLike <= 32
    ) {
      score -= 4;
    } else if (feelsLike > 32) {
      score -= 6;
    }

    if (feelsLike < 0) {
      score -= 3;
    }

    // Humidity matters more when exercising
    if (
      humidity >= 70 &&
      humidity < 80
    ) {
      score -= 1;
    } else if (
      humidity >= 80 &&
      humidity < 90
    ) {
      score -= 2;
    } else if (
      humidity >= 90
    ) {
      score -= 3;
    }

    if (wind >= 15) {
      score -= 4;
    } else if (wind >= 10) {
      score -= 2;
    } else if (wind >= 7) {
      score -= 1;
    }

    if (isRain) {
      score -= 3;
    }

    if (isSnow) {
      score -= 5;
    }

    if (visibility < 3000) {
      score -= 3;
    }

    if (
      isThunderstorm ||
      feelsLike <= -25 ||
      feelsLike >= 38 ||
      wind >= 20
    ) {
      return 0;
    }

    return clampScore(score);
  };

  const calculateCyclingScore = () => {
    let score = 7;

    if (
      feelsLike >= 14 &&
      feelsLike <= 23
    ) {
      score += 2;
    } else if (
      feelsLike >= 8 &&
      feelsLike < 14
    ) {
      score += 1;
    } else if (
      feelsLike > 28
    ) {
      score -= 2;
    } else if (
      feelsLike < 5
    ) {
      score -= 2;
    }

    if (
      humidity >= 80 &&
      humidity < 90
    ) {
      score -= 1;
    } else if (
      humidity >= 90
    ) {
      score -= 2;
    }

    // Cycling is especially sensitive to wind
    if (
      wind >= 15
    ) {
      score -= 7;
    } else if (
      wind >= 12
    ) {
      score -= 5;
    } else if (
      wind >= 8
    ) {
      score -= 3;
    } else if (
      wind >= 5
    ) {
      score -= 1;
    }

    if (isRain) {
      score -= 4;
    }

    if (isSnow) {
      score -= 7;
    }

    if (visibility < 3000) {
      score -= 4;
    }

    if (
      isThunderstorm ||
      feelsLike <= -20 ||
      feelsLike >= 40 ||
      wind >= 20 ||
      visibility < 1000
    ) {
      return 0;
    }

    return clampScore(score);
  };

  const calculateCarWashScore = () => {
    let score = 7;

    /*
      Для мойки температура не должна
      давать такой же бонус, как прогулке.
    */

    if (
      feelsLike >= 10 &&
      feelsLike <= 28
    ) {
      score += 1;
    } else if (
      feelsLike >= 5 &&
      feelsLike < 10
    ) {
      // Acceptable
    } else if (
      feelsLike >= 0 &&
      feelsLike < 5
    ) {
      score -= 2;
    } else if (
      feelsLike < 0
    ) {
      score -= 6;
    } else if (
      feelsLike > 35
    ) {
      score -= 2;
    }

    /*
      Сильный ветер = пыль и быстрое
      загрязнение автомобиля.
    */

    if (
      wind >= 15
    ) {
      score -= 4;
    } else if (
      wind >= 10
    ) {
      score -= 2;
    } else if (
      wind >= 7
    ) {
      score -= 1;
    }

    if (isRain) {
      return 0;
    }

    if (isSnow) {
      return 0;
    }

    if (isThunderstorm) {
      return 0;
    }

    if (
      feelsLike <= -5 ||
      wind >= 22
    ) {
      return 0;
    }

    return clampScore(score);
  };

  const walkingScore =
    calculateWalkingScore();

  const runningScore =
    calculateRunningScore();

  const cyclingScore =
    calculateCyclingScore();

  const carWashScore =
    calculateCarWashScore();

  const activities = [
    {
      name: language === "ua" ? "Прогулянка" : "Walking",
      score: walkingScore,
    },
    {
      name: language === "ua" ? "Біг" : "Running",
      score: runningScore,
    },
    {
      name: language === "ua" ? "Велосипед" : "Cycling",
      score: cyclingScore,
    },
    {
      name: language === "ua" ? "Мийка авто" : "Car wash",
      score: carWashScore,
    },
  ];

  const getScoreText = (score) => {
    if (score >= 8) {
      return language === "ua" ? "Чудово" : "Great";
    }

    if (score >= 6) {
      return language === "ua" ? "Добре" : "Good";
    }

    if (score >= 4) {
      return language === "ua" ? "Посередньо" : "Fair";
    }

    if (score >= 2) {
      return language === "ua" ? "Погано" : "Poor";
    }

    return language === "ua" ? "Не рекомендується" : "Not recommended";
  };

  return (
    <div className="relative mx-auto mt-[45px] w-full max-w-[950px] overflow-hidden rounded-[24px] border border-black/5 bg-white p-[20px] text-black shadow-[0_12px_35px_rgba(0,0,0,0.07)] dark:border-white/5 dark:bg-[#1C1C1C] dark:text-white md:p-[28px]">
      {/* Glow */}
      <div className="absolute right-[-70px] top-[-70px] h-[180px] w-[180px] rounded-full bg-[#FFB36C]/10 blur-[55px]" />

      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close assistant"
        className="absolute right-[16px] top-[14px] z-20 flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-[22px] leading-none transition-all duration-200 hover:rotate-90 hover:border-[#FFB36C] active:scale-90 dark:border-[#3A3A3A] dark:bg-[#262626]"
      >
        ×
      </button>

      {/* HEADER */}
      <div className="relative z-10 flex flex-col gap-[18px] sm:flex-row sm:items-center sm:justify-between">
        <div className="pr-[45px] sm:pr-0">
          <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-[#FF9D4D]">
            {language === "ua" ? "Рекомендації" : "Recommendations"}
          </p>

          <h2 className="mt-[5px] text-[20px] font-semibold md:text-[24px]">
            {t.assistant.title}
          </h2>

          <p className="mt-[6px] max-w-[520px] text-[11px] leading-[1.6] text-[#555555] dark:text-[#BDBDBD]">
            {t.assistant.subtitle}
          </p>
        </div>

        {/* COMFORT */}
        <div className="flex min-w-[125px] items-center justify-between gap-[15px] rounded-[18px] bg-[#FFF0E1] px-[17px] py-[13px] dark:bg-[#3A2C20] sm:block sm:text-center">
          <p className="text-[10px] font-semibold text-[#A85D1D] dark:text-[#FFC083]">
            {t.assistant.comfort}
          </p>

          <p className="text-[27px] font-semibold tracking-[-1px] text-[#222222] dark:text-white">
            {comfortScore}
            <span className="text-[13px] text-[#777777] dark:text-[#AAAAAA]">
              /10
            </span>
          </p>
        </div>
      </div>

      {/* CURRENT CONDITIONS */}
      <div className="relative z-10 mt-[20px] flex flex-wrap gap-[8px]">
        <span className="rounded-full bg-[#F5F5F5] px-[11px] py-[6px] text-[10px] font-semibold dark:bg-[#292929]">
          {Math.round(temp)}°C
        </span>

        <span className="rounded-full bg-[#F5F5F5] px-[11px] py-[6px] text-[10px] font-semibold dark:bg-[#292929]">
          {language === "ua" ? "Відчувається" : "Feels"} {Math.round(feelsLike)}
          °
        </span>

        <span className="rounded-full bg-[#F5F5F5] px-[11px] py-[6px] text-[10px] font-semibold dark:bg-[#292929]">
          {Math.round(wind * 10) / 10} m/s
        </span>

        <span className="rounded-full bg-[#F5F5F5] px-[11px] py-[6px] text-[10px] font-semibold dark:bg-[#292929]">
          {humidity}%
        </span>
      </div>

      {/* RECOMMENDATIONS */}
      <div className="relative z-10 mt-[22px] grid grid-cols-1 gap-[12px] sm:grid-cols-2">
        {[
          [t.assistant.clothes, clothes],
          [t.assistant.umbrella, umbrella],
          [t.assistant.outdoor, outdoor],
          [t.assistant.driving, driving],
        ].map(([title, value]) => (
          <div
            key={title}
            className="rounded-[17px] border border-[#E8E8E8] bg-[#FAFAFA] p-[17px] dark:border-[#343434] dark:bg-[#242424]"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.8px] text-[#666666] dark:text-[#AAAAAA]">
              {title}
            </p>

            <p className="mt-[7px] text-[13px] font-medium leading-[1.55]">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* ACTIVITIES */}
      <div className="relative z-10 mt-[22px]">
        <div className="mb-[11px] flex items-center justify-between">
          <p className="text-[11px] font-semibold">
            {language === "ua" ? "Активності" : "Activities"}
          </p>

          <p className="text-[9px] text-[#777777] dark:text-[#AAAAAA]">
            {language === "ua" ? "Оцінка умов" : "Conditions score"}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-[9px] sm:grid-cols-2">
          {activities.map((activity) => (
            <div
              key={activity.name}
              className="rounded-[15px] border border-[#E8E8E8] bg-[#FAFAFA] px-[14px] py-[12px] dark:border-[#343434] dark:bg-[#242424]"
            >
              <div className="flex items-center justify-between gap-[10px]">
                <div>
                  <p className="text-[11px] font-semibold">{activity.name}</p>

                  <p className="mt-[2px] text-[9px] font-medium text-[#777777] dark:text-[#AAAAAA]">
                    {getScoreText(activity.score)}
                  </p>
                </div>

                <p className="text-[16px] font-semibold">
                  {activity.score}
                  <span className="text-[9px] text-[#777777] dark:text-[#AAAAAA]">
                    /10
                  </span>
                </p>
              </div>

              <div className="mt-[9px] h-[5px] overflow-hidden rounded-full bg-[#E8E8E8] dark:bg-[#3A3A3A]">
                <div
                  className="h-full rounded-full bg-[#FFB36C] transition-all duration-500"
                  style={{
                    width: `${activity.score * 10}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WARNINGS */}
      <div className="relative z-10 mt-[20px] rounded-[17px] border border-[#E8E8E8] bg-[#FAFAFA] p-[17px] dark:border-[#343434] dark:bg-[#242424]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.8px] text-[#666666] dark:text-[#AAAAAA]">
          {t.assistant.warnings}
        </p>

        <div className="mt-[9px] flex flex-wrap gap-[8px]">
          {warnings.length > 0 ? (
            warnings.map((warning, index) => (
              <span
                key={`${warning}-${index}`}
                className="rounded-full bg-[#FFF0E1] px-[11px] py-[6px] text-[10px] font-semibold text-[#B9651B] dark:bg-[#3A2C20] dark:text-[#FFC083]"
              >
                {warning}
              </span>
            ))
          ) : (
            <p className="text-[13px] font-medium">{t.assistant.noWarnings}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WeatherAssistant;
