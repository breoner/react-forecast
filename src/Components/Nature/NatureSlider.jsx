import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

function NatureSlider({ images }) {
  if (!images.length) {
    return null;
  }

  return (
    <div className="relative mt-[25px] w-full overflow-hidden md:mt-[30px]">
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={16}
        slidesPerView={1}
        speed={600}
        loop={images.length > 4}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 18,
          },

          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },

          1280: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <div className="overflow-hidden rounded-[15px]">
              <img
                src={image.webformatURL}
                alt={image.tags}
                className="h-[220px] w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-[210px] md:h-[220px]"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default NatureSlider;
