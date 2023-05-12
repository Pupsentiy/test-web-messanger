import { ReactNode } from "react";

export type TButtonProps = {
  children: ReactNode;
  type: "button" | "submit" | "reset";
  classProps: string;
  onClick?: ((e: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
};