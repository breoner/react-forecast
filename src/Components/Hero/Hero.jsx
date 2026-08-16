import { translations } from "../../data/translations";
import HeroWeatherEffect from "./HeroWeatherEffect";
import HeroSearch from "./HeroSearch";
import useHeroImage from "./useHeroImage";
import useHeroWeather from "./useHeroWeather";

function Hero({ onSearch, language, featuredCity }) {
  const heroImage = useHeroImage(featuredCity);

  const { heroWeather, heroTheme, heroOverlay } = useHeroWeather(featuredCity);

  const t = translations[language];

  /*
    ========================================
    DATE
    ========================================
  */

  const now = new Date();

  const locale = language === "ua" ? "uk-UA" : "en-US";

  const monthYear = now.toLocaleDateString(locale, {
    month: "long",
    year: "numeric",
  });

  const weekDay = now.toLocaleDateString(locale, {
    weekday: "long",
  });

  const day = now.getDate();

  const getDaySuffix = (dayNumber) => {
    if (language === "ua") {
      return "";
    }

    if (dayNumber >= 11 && dayNumber <= 13) {
      return "th";
    }

    switch (dayNumber % 10) {
      case 1:
        return "st";

      case 2:
        return "nd";

      case 3:
        return "rd";

      default:
        return "th";
    }
  };

  const formattedDay =
    language === "ua"
      ? `${weekDay}, ${day}`
      : `${weekDay}, ${day}${getDaySuffix(day)}`;

  return (
    <section className="relative min-h-[500px] overflow-hidden font-['Montserrat'] text-white md:min-h-[560px]">
      <div
        key={heroImage}
        className="hero-bg-fade absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      />
      {/* MAIN OVERLAY */}

      <div
        className={`absolute inset-0 transition-colors duration-700 ${heroOverlay}`}
      />

      {/* WEATHER AMBIENT */}

      <HeroWeatherEffect theme={heroTheme} />

      {/* BOTTOM GRADIENT */}

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />

      <div className="relative z-10 mx-auto flex min-h-[500px] w-full max-w-[1160px] flex-col items-center px-[16px] pb-[55px] pt-[55px] md:min-h-[560px] md:px-[24px] md:pt-[70px] xl:px-[10px] xl:pt-[85px]">
        {/* HERO TEXT */}

        <div className="flex flex-col items-center text-center">
          <div className="rounded-full border border-white/20 bg-white/10 px-[14px] py-[7px] text-[10px] font-medium backdrop-blur-md md:text-[11px]">
            {monthYear}
          </div>

          <h1 className="mt-[18px] max-w-[720px] text-[30px] font-semibold leading-[1.1] tracking-[-0.5px] sm:text-[36px] md:text-[44px] xl:text-[52px]">
            {t.hero.title}
          </h1>

          <p className="mt-[16px] max-w-[570px] text-[12px] font-medium leading-[1.7] text-white/80 sm:text-[13px] md:text-[15px]">
            {t.hero.description}
          </p>

          <div className="mt-[18px] flex flex-wrap items-center justify-center gap-[10px] text-[11px] text-white/70 md:text-[12px]">
            <span>{formattedDay}</span>

            <span className="h-[4px] w-[4px] rounded-full bg-[#FFB36C]" />

            <span>{monthYear}</span>

            {featuredCity && typeof heroWeather.temp === "number" && (
              <>
                <span className="h-[4px] w-[4px] rounded-full bg-[#FFB36C]" />

                <span>
                  {heroWeather.cityName} · {Math.round(heroWeather.temp)}°
                </span>
              </>
            )}
          </div>
        </div>

        {/* SEARCH */}

        <HeroSearch onSearch={onSearch} language={language} t={t} />

        <div className="mt-auto flex flex-wrap justify-center gap-[10px] pt-[35px]">
          <div className="rounded-[12px] border border-white/15 bg-white/10 px-[15px] py-[9px] text-[10px] backdrop-blur-md md:text-[11px]">
            {language === "ua" ? "Швидкий пошук міста" : "Quick city search"}
          </div>

          <div className="rounded-[12px] border border-white/15 bg-white/10 px-[15px] py-[9px] text-[10px] backdrop-blur-md md:text-[11px]">
            {language === "ua" ? "Актуальна погода" : "Current weather"}
          </div>

          <div className="rounded-[12px] border border-white/15 bg-white/10 px-[15px] py-[9px] text-[10px] backdrop-blur-md md:text-[11px]">
            {language === "ua"
              ? "Прогноз та рекомендації"
              : "Forecast & recommendations"}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
