import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

function NatureSlider({ images }) {
  if (!images.length) {
    return null;
  }

  return (
    <div className="relative mt-[30px]">
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={1}
        speed={600}
        loop={images.length > 4}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <div className="overflow-hidden rounded-[15px]">
              <img
                src={image.webformatURL}
                alt={image.tags}
                className="h-[220px] w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default NatureSlider;
