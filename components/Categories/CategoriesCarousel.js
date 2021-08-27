import { useState } from "react";
import Carousel from "react-multi-carousel";
import CustomCarouselDot from "../CustomCarouselDot";
import CategoriesItem from "./CategoriesItem";

const CategoriesCarousel = ({ categories }) => {
  const [currentSlide, setCurrentSlide] = useState(false);

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

  const getCurrent = (slide) => {
    console.log(slide);
  };

  return (
    <div className="relative pb-20 w-full">
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
        centerMode
        afterChange={(_, { currentSlide }) => {
          setCurrentSlide(currentSlide);
        }}
      >
        {categories.map((category, index) => (
          <CategoriesItem
            key={category.id}
            slide={index + 2}
            category={category}
            currentSlide={currentSlide}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default CategoriesCarousel;
