import Carousel from "react-multi-carousel";
import Image from "next/image";
import CustomCarouselDot from "../CustomCarouselDot";
import { getMediaURL } from "@/lib/api";

const ImageCarousel = ({ images }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="relative pb-12 md:pb-20 md:pt-6 w-full mx-auto">
      <Carousel
        draggable
        swipeable
        customDot={<CustomCarouselDot />}
        responsive={responsive}
        showDots={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        arrows={false}
        renderDotsOutside
        infinite
      >
        {images.map((image) => (
          <div key={image.id} className="p-4 md:p-0">
            <div className="h-[80vh] bg-center bg-no-repeat bg-contain">
              <Image
                src={getMediaURL(image.formats.large)}
                placeholder="blur"
                blurDataURL={getMediaURL(image.formats.thumbnail)}
                alt=""
                layout="fill"
                objectFit="contain"
                objectPosition="center"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
