import Link from "next/link";
import Image from "next/image";
import { getMediaURL } from "@/lib/api";

const CategoriesItem = ({ category, currentSlide, slide }) => {
  return (
    <Link href={`/categories/${category.slug}`}>
      <a className="block w-full h-[30vh] md:h-[60vh] px-1 lg:px-3">
        <div className="relative w-full h-full shadow-md overflow-hidden group">
          <div className="w-full h-full transition-all duration-500 transform group-hover:scale-125 bg-cover bg-center">
            <Image
              src={getMediaURL(category.image.formats.medium)}
              alt={category.name}
              placeholder="blur"
              blurDataURL={getMediaURL(category.image.formats.thumbnail)}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center overflow-hidden">
            <h2
              className={`text-3xl md:text-6xl text-white text-center uppercase font-semibold transition-all duration-300 ${
                currentSlide == slide ? "translate-y-0" : "translate-y-80"
              }`}
            >
              {category.name}
            </h2>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default CategoriesItem;
