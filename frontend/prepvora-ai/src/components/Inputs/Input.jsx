const Input = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  labelClass = "",
  inputClass = "",
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className={`text-sm font-medium ${labelClass}`}>
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-violet-500 transition ${inputClass}`}
      />
    </div>
  );
};

export default Input;
