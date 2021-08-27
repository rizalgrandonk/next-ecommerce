import Link from "next/link";
import Image from "next/image";
import { getMediaURL } from "@/lib/api";

const CategoriesItem = ({ category, index }) => {
  let span = "";
  switch (index) {
    case 0:
      span = "lg:row-span-2";
      break;

    case 1:
      span = "lg:col-span-2";
      break;

    case 3:
      span = "lg:row-span-2";
      break;

    default:
      span = "";
      break;
  }

  return (
    <Link href={`/categories/${category.slug}`}>
      <a
        className={`relative block w-full h-full transition-all duration-500 transform hover:scale-95 bg-cover bg-top ${span}`}
      >
        <Image
          src={getMediaURL(category.image.formats.medium)}
          alt={category.name}
          placeholder="blur"
          blurDataURL={getMediaURL(category.image.formats.thumbnail)}
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          loading="lazy"
        />
        <div className="relative w-full h-full flex justify-center items-center bg-black/50">
          <h2 className="text-3xl md:text-5xl text-white text-center uppercase font-semibold">
            {category.name}
          </h2>
        </div>
      </a>
    </Link>
  );
};

export default CategoriesItem;
