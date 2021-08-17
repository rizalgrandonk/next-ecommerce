import Carousel from "react-multi-carousel";
import CustomCarouselDot from "../CustomCarouselDot";
import CategoriesItem from "./CategoriesItem";

const CategoriesCarousel = ({ categories }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <div className="relative pb-12">
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
      >
        {categories.map((category) => (
          <CategoriesItem key={category.id} category={category} />
        ))}
      </Carousel>
    </div>
  );
};

export default CategoriesCarousel;
