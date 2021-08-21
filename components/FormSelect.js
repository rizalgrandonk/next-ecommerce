const FormSelect = ({ id, label, value, onChange, provinceList }) => {
  return (
    <div className="px-4 mb-10 w-1/2">
      <div className="w-full">
        <label htmlFor={id} className="text-gray-600 text-sm">
          {label}
        </label>
        <select
          value={value}
          onChange={onChange}
          id={id}
          className="h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-primary"
          required
        >
          {provinceList.map((province) => (
            <option key={province.province_id} value={province.province_id}>
              {province.province}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FormSelect;
