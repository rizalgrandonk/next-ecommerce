import CategoriesItem from "./CategoriesItem";

const CategoryList = ({ categories }) => {
  // grid-cols-[repeat(auto-fit,minmax(280px,1fr))]
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 auto-rows-[240px] gap-3">
      {categories.map((category, index) => (
        <CategoriesItem key={category.id} category={category} index={index} />
      ))}
    </div>
  );
};

export default CategoryList;
