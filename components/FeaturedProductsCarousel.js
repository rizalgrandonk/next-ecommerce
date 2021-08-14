import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CustomCarouselDot from "../components/CustomCarouselDot";
import FeaturedProductsItem from "./FeaturedProductsItem";

const FeaturedProductsCarousel = ({ products }) => {
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
    <Carousel
      draggable
      swipeable
      customDot={<CustomCarouselDot />}
      responsive={responsive}
      showDots={true}
      autoPlay={true}
      autoPlaySpeed={2000}
      arrows={false}
      infinite
    >
      {products.map((product) => (
        <FeaturedProductsItem key={product.id} product={product} />
      ))}
    </Carousel>
  );
};

export default FeaturedProductsCarousel;
