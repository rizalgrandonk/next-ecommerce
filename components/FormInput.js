import { localize } from "@/lib/formater";
import { useRouter } from "next/router";

const FormInput = ({ id, type, label, register, errors }) => {
  const { locale } = useRouter();
  return (
    <>
      <div className="relative">
        <input
          {...register(id, { required: true })}
          id={id}
          type={type}
          className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-primary"
          placeholder={label}
        />
        <label
          htmlFor={id}
          className="absolute left-0 -top-5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
        >
          {label}
        </label>
      </div>
      {errors[id] && (
        <p className="text-xs text-red-600">
          {`${label} ${localize(locale, "required")}`}
        </p>
      )}
    </>
  );
};

export default FormInput;
