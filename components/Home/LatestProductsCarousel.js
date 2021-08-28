import { useState } from "react";
import Carousel from "react-multi-carousel";
import CustomCarouselDot from "../CustomCarouselDot";
import LatestProductsItem from "./LatestProductsItem";

const LatestProductsCarousel = ({ products }) => {
  const [currentSlide, setCurrentSlide] = useState(2);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 655 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 655, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="relative pb-20">
      <Carousel
        draggable
        swipeable
        customDot={<CustomCarouselDot />}
        showDots
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={3000}
        arrows={false}
        renderDotsOutside
        infinite
        afterChange={(_, { currentSlide }) => {
          setCurrentSlide(currentSlide);
        }}
      >
        {products.map((product, index) => (
          <LatestProductsItem
            key={product.id}
            slide={index + 2}
            currentSlide={currentSlide}
            product={product}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default LatestProductsCarousel;
