import CategoriesItem from "./CategoriesItem";

const CategoryList = ({ categories }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] auto-rows-[240px] gap-3">
      {categories.map((category, index) => (
        <CategoriesItem key={category.id} category={category} index={index} />
      ))}
    </div>
  );
};

export default CategoryList;
