import { useEffect, useState } from "react";
import NatureSlider from "./NatureSlider";

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

function NatureSection() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getImages = async () => {
      const response = await fetch(
        `https://pixabay.com/api/?key=${API_KEY}&q=nature&image_type=photo&orientation=horizontal&per_page=20`,
      );

      const data = await response.json();

      setImages(data.hits);
    };

    getImages();
  }, []);

  return (
    <section className="py-[60px]">
      <div className="mx-auto w-full max-w-[1160px] px-[10px]">
        <h2 className="text-center text-[24px] font-semibold">
          Beautiful nature
        </h2>

        <NatureSlider images={images} />
      </div>
    </section>
  );
}

export default NatureSection;
