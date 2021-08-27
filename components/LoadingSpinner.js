const LoadingSpinner = () => {
  return (
    <div className="w-full h-full flex justify-center items-center text-secondary">
      <svg className="w-1/3 h-1/3 animate-rotate" viewBox="0 0 50 50">
        <circle
          className="animate-dash stroke-current"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="6"
        ></circle>
      </svg>
    </div>
  );
};

export default LoadingSpinner;
