import { useState } from "react";
import FormStepper from "../components/FormStepper";
import CustomerForm from "../components/Checkout/CustomerForm";

const steps = ["Customer Data", "Payment Details"];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      <div className="w-full h-44 bg-secondary flex items-end">
        <div className="container mx-auto px-6 md:px-16">
          <h1 className="text-3xl md:text-5xl text-white font-semibold uppercase pl-6 py-1 border-l-4 border-primary">
            Checkout
          </h1>
        </div>
      </div>
      <span className="block w-full h-8 rounded-b-xl bg-secondary" />
      <div className="container mx-auto px-4 lg:px-40 pt-4 pb-10">
        <div className="bg-white rounded-md overflow-hidden p-4 mb-4 shadow-lg">
          <FormStepper activeStep={activeStep} steps={steps} />
          <CustomerForm />
        </div>
      </div>
    </>
  );
};

export default Checkout;
