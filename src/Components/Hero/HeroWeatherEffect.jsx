function HeroWeatherEffect({ theme }) {
  if (theme === "default") {
    return null;
  }

  /*
    ========================================
    CLEAR
    ========================================
  */

  if (theme === "clear") {
    return (
      <>
        <div className="absolute right-[8%] top-[70px] h-[170px] w-[170px] rounded-full bg-[#FFD28A]/15 blur-[70px]" />

        <div className="absolute right-[12%] top-[100px] h-[90px] w-[90px] rounded-full bg-[#FFD28A]/15 blur-[35px]" />
      </>
    );
  }

  /*
    ========================================
    CLOUDS
    ========================================
  */

  if (theme === "clouds") {
    return (
      <>
        <div className="hero-cloud absolute left-[-180px] top-[90px] h-[100px] w-[330px] rounded-full bg-white/5 blur-[35px]" />

        <div className="hero-cloud-delayed absolute left-[-250px] top-[240px] h-[120px] w-[400px] rounded-full bg-white/[0.04] blur-[40px]" />
      </>
    );
  }

  /*
    ========================================
    RAIN / STORM
    ========================================
  */

  if (
    theme === "rain" ||
    theme === "storm"
  ) {
    return (
      <>
        {Array.from({
          length: 15,
        }).map((_, index) => (
          <span
            key={index}
            className="hero-rain absolute top-[-50px] h-[25px] w-px bg-white/20"
            style={{
              left: `${5 + index * 7}%`,
              animationDelay: `${-index * 0.17}s`,
              animationDuration:
                theme === "storm"
                  ? "0.65s"
                  : "0.9s",
            }}
          />
        ))}

        {theme === "storm" && (
          <div className="hero-lightning absolute inset-0 bg-white/10 opacity-0" />
        )}
      </>
    );
  }

  /*
    ========================================
    SNOW
    ========================================
  */

  if (theme === "snow") {
    return (
      <>
        {Array.from({
          length: 14,
        }).map((_, index) => (
          <span
            key={index}
            className="hero-snow absolute top-[-20px] rounded-full bg-white/65"
            style={{
              left: `${3 + index * 7}%`,
              width: `${
                3 + (index % 3)
              }px`,
              height: `${
                3 + (index % 3)
              }px`,
              animationDelay: `${
                -index * 0.8
              }s`,
              animationDuration: `${
                8 + (index % 5)
              }s`,
            }}
          />
        ))}
      </>
    );
  }

  /*
    ========================================
    MIST
    ========================================
  */

  if (theme === "mist") {
    return (
      <>
        <div className="hero-mist absolute left-[-25%] top-[120px] h-[130px] w-[70%] rounded-full bg-white/[0.08] blur-[50px]" />

        <div className="hero-mist-delayed absolute right-[-25%] top-[300px] h-[140px] w-[70%] rounded-full bg-white/[0.06] blur-[55px]" />
      </>
    );
  }

  /*
    ========================================
    NIGHT
    ========================================
  */

  if (theme === "night") {
    return (
      <>
        {Array.from({
          length: 12,
        }).map((_, index) => (
          <span
            key={index}
            className="hero-star absolute h-[2px] w-[2px] rounded-full bg-white/70"
            style={{
              left: `${
                5 +
                ((index * 17) % 90)
              }%`,
              top: `${
                8 +
                ((index * 13) % 55)
              }%`,
              animationDelay: `${
                index * 0.4
              }s`,
            }}
          />
        ))}

        <div className="absolute right-[10%] top-[75px] h-[90px] w-[90px] rounded-full bg-[#E5ECFF]/10 blur-[35px]" />
      </>
    );
  }

  return null;
}

export default HeroWeatherEffect;