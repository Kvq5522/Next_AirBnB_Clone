"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type="text",
  disabled,
  formatPrice,
  required,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative my-3">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}

      <input
        id={id}
        type={type}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        className={`peer w-full p-4 pt-6 font-light rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed 
          ${formatPrice ? "pl-10" : "pl-4"} 
          border-[1px]
          ${errors[id] ? "border-rose-500" : "border-neutral-200"} 
          ${errors[id] ? "focus:border-rose-500" : "focus:border-black"} 
          ${errors[id] ? "text-rose-500" : "text-neutral-700"}
        `}
      />

      <label
        className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-0 
          ${formatPrice ? "pl-10" : "pl-4"}
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? "text-rose-500" : "text-zinc-400"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
