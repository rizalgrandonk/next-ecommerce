const CustomCarouselDot = ({ onClick, ...rest }) => {
  const { active } = rest;
  return (
    <button
      className={`h-3 mx-1 mb-8 transition-all ${
        active ? "w-8 bg-primary" : "w-4 bg-gray-400"
      }`}
      onClick={() => onClick()}
    ></button>
  );
};

export default CustomCarouselDot;
