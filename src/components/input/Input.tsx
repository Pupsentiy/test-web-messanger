import { FC } from "react";

import './Input.scss'

import { IInputProps } from "./Input.types";

const Input: FC<IInputProps> = ({
  htmlFor,
  error,
  type,
  onChange,
  value,
  classInput,
  classLabel,
  placeholder,
  name,
  pattern
}) => {
  return (
    <div className="input-conteiner">
      <label className={classLabel} htmlFor={htmlFor}>
        {htmlFor}
      </label>
      <input
        type={type}
        className={classInput}
        id={htmlFor}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        pattern={pattern}
      />
      <small className="input-error">{error}</small>
    </div>
  );
};

export default Input;
