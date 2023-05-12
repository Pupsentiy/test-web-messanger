import { FC } from "react";
import { TButtonProps } from "./Button.types";

const Button: FC<TButtonProps> = ({ children, type, classProps, onClick }) => {
  return (
    <button className={classProps} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
