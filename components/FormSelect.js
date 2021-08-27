const FormSelect = ({
  id,
  labelField,
  idField,
  label,
  list,
  register,
  errors,
}) => {
  return (
    <>
      <div className="w-full">
        <label htmlFor={id} className="text-gray-600 text-sm">
          {label}
        </label>
        <select
          {...register(id, { required: true })}
          id={id}
          className="h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-primary"
        >
          {list.map((option) => (
            <option key={option[idField]} value={option[idField]}>
              {option[labelField]}
            </option>
          ))}
        </select>
      </div>
      {errors[id] && (
        <p className="text-xs text-red-600">{label} is required</p>
      )}
    </>
  );
};

export default FormSelect;
