
export interface IInputProps {
  htmlFor: string;
  error?: string | undefined;
  type: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder?: string;
  classInput?: string;
  classLabel?: string;
  name?:string
  pattern?:string
}