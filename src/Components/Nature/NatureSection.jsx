import { useEffect, useState } from "react";
import NatureSlider from "./NatureSlider";

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

function NatureSection() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getImages = async () => {
      try {
        const response = await fetch(
          `https://pixabay.com/api/?key=${API_KEY}&q=nature&image_type=photo&orientation=horizontal&per_page=20`,
        );

        if (!response.ok) {
          throw new Error("Failed to load nature images");
        }

        const data = await response.json();

        setImages(data.hits || []);
      } catch (error) {
        console.error(error);
        setImages([]);
      }
    };

    getImages();
  }, []);

  return (
    <section className="py-[45px] md:py-[60px]">
      <div className="mx-auto w-full max-w-[1160px] px-[16px] md:px-[24px] xl:px-[10px]">
        <h2 className="text-center text-[20px] font-semibold md:text-[24px]">
          Beautiful nature
        </h2>

        <NatureSlider images={images} />
      </div>
    </section>
  );
}

export default NatureSection;
