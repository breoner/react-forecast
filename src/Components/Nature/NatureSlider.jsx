import { useEffect, useMemo, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

/*
  ========================================
  NORMALIZE TEXT
  ========================================
*/

const normalizeText = (value = "") => {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
};

/*
  ========================================
  CITY PHOTO CARD
  ========================================
*/

function CityPhotoCard({ image, language }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <article className="group relative h-[285px] overflow-hidden rounded-[22px] border border-black/[0.06] bg-[#E8E8E8] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_16px_40px_rgba(0,0,0,0.13)] dark:border-white/[0.06] dark:bg-[#202020]">
      {/* SKELETON */}

      {!loaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-[#E6E6E6] dark:bg-[#242424]">
          <div className="absolute bottom-[20px] left-[18px] right-[18px]">
            <div className="h-[11px] w-[55%] rounded-full bg-black/10 dark:bg-white/10" />

            <div className="mt-[9px] h-[7px] w-[35%] rounded-full bg-black/[0.07] dark:bg-white/[0.07]" />
          </div>
        </div>
      )}

      {/* IMAGE */}

      {!error && (
        <img
          src={image.url}
          alt={`${image.cityName} city`}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => {
            setLoaded(false);
            setError(true);
          }}
          className={`h-full w-full object-cover transition-[opacity,transform] duration-700 group-hover:scale-[1.055] ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* IMAGE ERROR */}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#EEEEEE] px-[20px] text-center dark:bg-[#242424]">
          <div className="flex h-[54px] w-[54px] items-center justify-center rounded-[16px] bg-[#FFF0E1] text-[#D9771E] dark:bg-[#3A2C20] dark:text-[#FFB36C]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="h-[26px] w-[26px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6"
              />
            </svg>
          </div>

          <p className="mt-[12px] text-[13px] font-semibold">
            {image.cityName}
          </p>

          <p className="mt-[4px] text-[10px] text-[#777777] dark:text-[#AAAAAA]">
            {language === "ua"
              ? "Не вдалося завантажити фото"
              : "Could not load photo"}
          </p>
        </div>
      )}

      {/* CONTENT */}

      {loaded && !error && (
        <>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />

          {/* CITY BADGE */}

          <div className="absolute left-[16px] top-[16px]">
            <div className="flex items-center gap-[6px] rounded-full border border-white/15 bg-black/35 px-[10px] py-[6px] text-[9px] font-semibold text-white backdrop-blur-md">
              <span className="h-[5px] w-[5px] rounded-full bg-[#FFB36C]" />

              {image.cityName}
            </div>
          </div>

          {/* BOTTOM CONTENT */}

          <div className="absolute bottom-0 left-0 right-0 p-[18px]">
            <div className="flex items-end justify-between gap-[15px]">
              <div className="min-w-0">
                <p className="truncate text-[16px] font-semibold text-white">
                  {image.cityName}
                </p>

                {image.country && (
                  <p className="mt-[3px] text-[10px] font-medium text-white/70">
                    {image.country}
                  </p>
                )}
              </div>

              {typeof image.temperature === "number" && (
                <div className="shrink-0 rounded-[12px] border border-white/10 bg-white/15 px-[12px] py-[7px] text-[16px] font-semibold text-white backdrop-blur-md">
                  {Math.round(image.temperature)}°
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </article>
  );
}

/*
  ========================================
  NATURE SLIDER
  ========================================
*/

function NatureSlider({ cities, language }) {
  const swiperRef = useRef(null);

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);

  /*
    ========================================
    FAVORITE CITIES
    ========================================
  */

  const favoriteCities = useMemo(() => {
    return cities.filter((city) => city.isFavorite);
  }, [cities]);

  const favoritesKey = useMemo(() => {
    return favoriteCities
      .map((city) => city.id)
      .sort()
      .join("|");
  }, [favoriteCities]);

  /*
    ========================================
    LOAD CITY IMAGES
    ========================================
  */

  useEffect(() => {
    if (favoriteCities.length === 0) {
      setImages([]);
      return;
    }

    const controller = new AbortController();

    const loadCityImages = async () => {
      try {
        setLoading(true);

        const allCityResults = await Promise.all(
          favoriteCities.map(async (city) => {
            /*
              ========================================
              CITY DATA
              ========================================
            */

            const cityName = city.place?.name || city.weather?.name || "";

            const englishName = city.place?.local_names?.en || "";

            const ukrainianName = city.place?.local_names?.uk || "";

            const russianName = city.place?.local_names?.ru || "";

            const country =
              city.place?.country || city.weather?.sys?.country || "";

            if (!cityName) {
              return [];
            }

            /*
              ========================================
              SEARCH VARIANTS
              ========================================
            */

            let searchVariants = [
              englishName,
              ukrainianName,
              russianName,
              cityName,
            ].filter(Boolean);

            const normalizedNames = [
              cityName,
              englishName,
              ukrainianName,
              russianName,
            ]
              .filter(Boolean)
              .map((name) => normalizeText(name));

            /*
              ========================================
              KRYVYI RIH SPECIAL SEARCH
              ========================================
            */

            const isKryvyiRih = normalizedNames.some(
              (name) =>
                name.includes("kryvyi rih") ||
                name.includes("krivoy rog") ||
                name.includes("krivoi rog") ||
                name.includes("кривии ріг") ||
                name.includes("кривои рог"),
            );

            if (isKryvyiRih) {
              searchVariants = [
                "Кривой Рог Украина",
                "Кривий Ріг Україна",
                "Krivoy Rog Ukraine",
                "Kryvyi Rih Ukraine",

                "Кривой Рог",
                "Кривий Ріг",
                "Krivoy Rog",
                "Kryvyi Rih",
                "Krivoi Rog",
              ];
            }

            searchVariants = [
              ...new Set(
                searchVariants.filter(Boolean).map((name) => name.trim()),
              ),
            ];

            /*
              ========================================
              PIXABAY REQUESTS
              ========================================
            */

            const rawImages = [];

            for (const variant of searchVariants) {
              try {
                const response = await fetch(
                  `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
                    variant,
                  )}&image_type=photo&orientation=horizontal&per_page=20&safesearch=true`,
                  {
                    signal: controller.signal,
                  },
                );

                if (!response.ok) {
                  continue;
                }

                const data = await response.json();

                if (!data.hits?.length) {
                  continue;
                }

                rawImages.push(...data.hits);

                if (isKryvyiRih && rawImages.length >= 20) {
                  break;
                }
              } catch (error) {
                if (error.name === "AbortError") {
                  throw error;
                }

                console.error(`Pixabay search failed for ${variant}:`, error);
              }
            }

            /*
              ========================================
              REMOVE DUPLICATES
              ========================================
            */

            const uniqueImages = rawImages.filter(
              (image, index, array) =>
                array.findIndex((item) => item.id === image.id) === index,
            );

            /*
              ========================================
              VALIDATION
              ========================================
            */

            let validImages = [];

            if (isKryvyiRih) {
              validImages = uniqueImages;
            } else {
              const nameVariants = [
                cityName,
                englishName,
                ukrainianName,
                russianName,
              ].filter(Boolean);

              validImages = uniqueImages.filter((image) => {
                const tags = normalizeText(image.tags || "");

                return nameVariants.some((name) => {
                  const normalizedName = normalizeText(name);

                  if (!normalizedName) {
                    return false;
                  }

                  if (tags.includes(normalizedName)) {
                    return true;
                  }

                  const words = normalizedName
                    .split(" ")
                    .filter((word) => word.length >= 3);

                  if (words.length < 2) {
                    return false;
                  }

                  return words.every((word) => tags.includes(word));
                });
              });
            }

            /*
              ========================================
              RESULT FOR CITY
              ========================================
            */

            return validImages.slice(0, 8).map((image) => ({
              id: `${city.id}-${image.id}`,

              pixabayId: image.id,

              cityId: city.id,

              cityName,

              country,

              temperature: city.weather?.main?.temp,

              url: image.largeImageURL || image.webformatURL,

              tags: image.tags,
            }));
          }),
        );

        /*
          ========================================
          MIX PHOTOS BY CITY
          ========================================
        */

        const maxImagesPerCity = Math.max(
          0,
          ...allCityResults.map((items) => items.length),
        );

        const mixedImages = [];

        for (let index = 0; index < maxImagesPerCity; index += 1) {
          allCityResults.forEach((cityImages) => {
            if (cityImages[index]) {
              mixedImages.push(cityImages[index]);
            }
          });
        }

        /*
          Финальная защита от дублей Pixabay.
        */

        const finalImages = mixedImages.filter(
          (image, index, array) =>
            array.findIndex((item) => item.pixabayId === image.pixabayId) ===
            index,
        );

        setImages(finalImages);

        setActiveIndex(0);

        swiperRef.current?.slideTo(0, 0);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Favorite city photos:", error);

          setImages([]);
        }
      } finally {
        setLoading(false);
      }
    };

    loadCityImages();

    return () => {
      controller.abort();
    };
  }, [favoritesKey]);

  /*
    ========================================
    SWIPER STATE
    ========================================
  */

  const updateSliderState = (swiper) => {
    setActiveIndex(swiper.activeIndex);

    const count =
      typeof swiper.params.slidesPerView === "number"
        ? swiper.params.slidesPerView
        : 1;

    setSlidesPerView(count);
  };

  const lastPossibleIndex = Math.max(0, images.length - slidesPerView);

  const paginationCount = lastPossibleIndex + 1;

  /*
    ========================================
    NO FAVORITES
    ========================================
  */

  if (favoriteCities.length === 0) {
    return (
      <div className="mx-auto max-w-[500px] rounded-[20px] border border-dashed border-[#D8D8D8] bg-[#FAFAFA] px-[20px] py-[30px] text-center dark:border-[#3A3A3A] dark:bg-[#1C1C1C]">
        <div className="mx-auto flex h-[48px] w-[48px] items-center justify-center rounded-[15px] bg-[#FFF0E1] text-[#D9771E] dark:bg-[#3A2C20] dark:text-[#FFB36C]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="h-[23px] w-[23px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
            />
          </svg>
        </div>

        <p className="mt-[12px] text-[13px] font-semibold">
          {language === "ua"
            ? "Немає улюблених міст"
            : "No favorite cities yet"}
        </p>

        <p className="mx-auto mt-[5px] max-w-[330px] text-[10px] leading-[1.6] text-[#777777] dark:text-[#AAAAAA]">
          {language === "ua"
            ? "Позначте місто сердечком, і тут з'являться його фотографії."
            : "Mark a city as favorite and its photos will appear here."}
        </p>
      </div>
    );
  }

  /*
    ========================================
    LOADING
    ========================================
  */

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-[285px] animate-pulse rounded-[22px] bg-[#E6E6E6] dark:bg-[#242424]"
          />
        ))}
      </div>
    );
  }

  /*
    ========================================
    NO RELIABLE PHOTOS
    ========================================
  */

  if (images.length === 0) {
    return (
      <div className="mx-auto max-w-[520px] rounded-[20px] border border-[#E6E6E6] bg-[#FAFAFA] px-[22px] py-[30px] text-center dark:border-[#363636] dark:bg-[#1C1C1C]">
        <div className="mx-auto flex h-[48px] w-[48px] items-center justify-center rounded-[15px] bg-[#FFF0E1] text-[#D9771E] dark:bg-[#3A2C20] dark:text-[#FFB36C]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="h-[24px] w-[24px]"
          >
            <rect x="3" y="4" width="18" height="16" rx="2" />

            <circle cx="8.5" cy="9" r="1.5" />

            <path d="m4 17 5-5 4 4 2-2 5 5" />
          </svg>
        </div>

        <p className="mt-[12px] text-[13px] font-semibold">
          {language === "ua" ? "Фото міст не знайдено" : "No city photos found"}
        </p>

        <p className="mx-auto mt-[5px] max-w-[350px] text-[10px] leading-[1.6] text-[#777777] dark:text-[#AAAAAA]">
          {language === "ua"
            ? "Pixabay не має достатньо точних фотографій цих міст."
            : "Pixabay does not have reliable photos for these cities."}
        </p>
      </div>
    );
  }

  /*
    ========================================
    SLIDER
    ========================================
  */

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;

          updateSliderState(swiper);
        }}
        onSlideChange={updateSliderState}
        onBreakpoint={updateSliderState}
        navigation={{
          prevEl: ".favorite-city-prev",
          nextEl: ".favorite-city-next",
        }}
        slidesPerView={1}
        spaceBetween={16}
        speed={600}
        grabCursor
        watchOverflow
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 16,
          },

          1024: {
            slidesPerView: 3,
            spaceBetween: 18,
          },
        }}
        className="!px-[2px] !pb-[4px]"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <CityPhotoCard image={image} language={language} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* PREVIOUS */}

      <button
        type="button"
        aria-label="Previous photo"
        className="favorite-city-prev absolute left-[12px] top-[121px] z-20 hidden h-[44px] w-[44px] items-center justify-center rounded-full border border-white/20 bg-black/45 text-white shadow-[0_8px_22px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-200 hover:border-[#FFB36C] hover:bg-[#FFB36C] hover:text-black active:scale-90 disabled:pointer-events-none disabled:opacity-0 md:flex"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-[18px] w-[18px]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 18l-6-6 6-6"
          />
        </svg>
      </button>

      {/* NEXT */}

      <button
        type="button"
        aria-label="Next photo"
        className="favorite-city-next absolute right-[12px] top-[121px] z-20 hidden h-[44px] w-[44px] items-center justify-center rounded-full border border-white/20 bg-black/45 text-white shadow-[0_8px_22px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-200 hover:border-[#FFB36C] hover:bg-[#FFB36C] hover:text-black active:scale-90 disabled:pointer-events-none disabled:opacity-0 md:flex"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-[18px] w-[18px]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 18l6-6-6-6"
          />
        </svg>
      </button>

      {/* CUSTOM PAGINATION */}

      {paginationCount > 1 && (
        <div className="mt-[22px] flex justify-center">
          <div className="flex max-w-full items-center gap-[6px] overflow-x-auto rounded-full border border-black/[0.06] bg-white px-[10px] py-[8px] shadow-[0_5px_18px_rgba(0,0,0,0.06)] dark:border-white/[0.08] dark:bg-[#1D1D1D]">
            {Array.from({
              length: paginationCount,
            }).map((_, index) => {
              const isActive = activeIndex === index;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => swiperRef.current?.slideTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-[7px] shrink-0 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-[24px] bg-[#FFB36C]"
                      : "w-[7px] bg-[#A8A8A8] hover:bg-[#858585] dark:bg-[#747474] dark:hover:bg-[#999999]"
                  }`}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default NatureSlider;
