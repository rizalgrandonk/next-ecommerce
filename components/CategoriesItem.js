import Link from "next/link";
import { getMediaURL } from "../lib/api";

const CategoriesItem = ({ category }) => {
  return (
    <Link href={`/categories/${category.slug}`}>
      <a className="block group w-full h-72 md:h-96 px-3 pb-6">
        <div
          className="w-full shadow-sm group-hover:shadow-lg overflow-hidden"
          style={{ height: "90%" }}
        >
          <div
            className="w-full h-full transition-all duration-500 transform group-hover:scale-105 bg-cover"
            style={{
              backgroundImage: `url(${getMediaURL(
                category.image.formats.small
              )})`,
            }}
          />
        </div>
        <h2 className="text-2xl my-3 text-center uppercase font-medium">
          {category.name}
        </h2>
      </a>
    </Link>
  );
};

export default CategoriesItem;
