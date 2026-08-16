import { useEffect, useState } from "react";
import heroBg from "../../assets/hero-bg.png";

const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

const heroImageCache = new Map();

function useHeroImage(featuredCity) {
  const [heroImage, setHeroImage] = useState(heroBg);

  useEffect(() => {
    if (!featuredCity) {
      setHeroImage(heroBg);
      return;
    }

    const cityName =
      featuredCity.place?.local_names?.en ||
      featuredCity.place?.name ||
      featuredCity.weather?.name;

    const cacheKey = `${featuredCity.place?.lat}-${featuredCity.place?.lon}`;

    const cachedImage = heroImageCache.get(cacheKey);

    if (cachedImage) {
      setHeroImage(cachedImage);
      return;
    }

    if (!cityName) {
      setHeroImage(heroBg);
      return;
    }

    const controller = new AbortController();

    const loadHeroImage = async () => {
      try {
        let cityVariants = [
          cityName,
          featuredCity.place?.name,
          featuredCity.place?.local_names?.en,
          featuredCity.place?.local_names?.uk,
          featuredCity.place?.local_names?.ru,
        ].filter(Boolean);

        const normalizedCity = cityName.toLowerCase();

        /*
          Pixabay лучше находит Кривой Рог
          по альтернативным вариантам названия.
        */
        if (
          normalizedCity.includes("kryvyi rih") ||
          normalizedCity.includes("krivoy rog") ||
          normalizedCity.includes("кривий ріг") ||
          normalizedCity.includes("кривой рог")
        ) {
          cityVariants = [
            "Кривой Рог",
            "Кривий Ріг",
            "Krivoy Rog",
            "Kryvyi Rih",
            "Krivoi Rog",
          ];
        }

        cityVariants = [...new Set(cityVariants.map((name) => name.trim()))];

        for (const variant of cityVariants) {
          const response = await fetch(
            `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(
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

          const image = data.hits[0];

          if (image) {
            const imageUrl =
              image.largeImageURL || image.webformatURL || heroBg;

            heroImageCache.set(cacheKey, imageUrl);

            setHeroImage(imageUrl);

            return;
          }
        }

        setHeroImage(heroBg);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Hero image:", error);
          setHeroImage(heroBg);
        }
      }
    };

    loadHeroImage();

    return () => {
      controller.abort();
    };
  }, [featuredCity]);

  return heroImage;
}

export default useHeroImage;
