/// <reference types="react-scripts" />
declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*";

export declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}
declare module "*.gif" {
  const content: string;
  export default content;
}