import { FaCheck } from "react-icons/fa";

const FormStepper = ({ steps, activeStep }) => {
  return (
    <div className="flex items-center w-full justify-between mb-10 px-2 md:px-16">
      {steps.map((step, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-between text-primary"
        >
          {index < activeStep ? (
            <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 border-2 border-primary flex justify-center items-center bg-primary text-white">
              <span className="font-medium">
                <FaCheck />
              </span>
            </div>
          ) : (
            <div
              className={`rounded-full transition duration-500 ease-in-out h-12 w-12 border-2 border-primary flex justify-center items-center ${
                index === activeStep ? "bg-primary text-white" : "text-primary"
              }`}
            >
              <span className="font-medium">{index + 1}</span>
            </div>
          )}
          <div className="mt-2 text-xs w-min md:w-max text-center font-medium uppercase text-primary">
            {step}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormStepper;
