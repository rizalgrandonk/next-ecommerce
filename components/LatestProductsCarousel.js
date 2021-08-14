import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CustomCarouselDot from "./CustomCarouselDot";
import LatestProductsItem from "./LatestProductsItem";

const LatestProductsCarousel = ({ products }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
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
      >
        {products.map((product) => (
          <LatestProductsItem key={product.id} product={product} />
        ))}
      </Carousel>
    </div>
  );
};

export default LatestProductsCarousel;
