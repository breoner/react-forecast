import NatureSlider from "./NatureSlider";

function NatureSection({ cities, language }) {
  const favoriteCities = cities.filter((city) => city.isFavorite);

  return (
    <section id="nature" className="scroll-mt-[80px] py-[60px]">
      <div className="mx-auto w-full max-w-[1160px] px-[16px] md:px-[24px] xl:px-[10px]">
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-[#FF9D4D]">
            {language === "ua" ? "Колекція" : "Collection"}
          </p>

          <h2 className="mt-[5px] text-[20px] font-semibold md:text-[24px]">
            {language === "ua" ? "Улюблені міста" : "Favorite cities"}
          </h2>

          <p className="mx-auto mt-[7px] max-w-[450px] text-[11px] leading-[1.6] text-[#666666] dark:text-[#AAAAAA]">
            {favoriteCities.length > 0
              ? language === "ua"
                ? "Міста, які ви додали до улюблених."
                : "Cities you have added to your favorites."
              : language === "ua"
                ? "Позначте місто сердечком, і воно з’явиться тут."
                : "Mark a city as favorite and it will appear here."}
          </p>
        </div>

        <div className="mt-[28px]">
          <NatureSlider cities={cities} language={language} />
        </div>
      </div>
    </section>
  );
}

export default NatureSection;
