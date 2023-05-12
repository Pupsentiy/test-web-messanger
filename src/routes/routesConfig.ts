
import LoginPage from "../pages/login/LoginPage";
import MessengerPage from "../pages/messenger/MessengerPage";

export type TRoutesConfig = {
  [key: string]: {
    title: string | null;
    path: string;
    component: () => JSX.Element;
  };
};

export const routesConfig: TRoutesConfig = {
  home: {
    title: "Login",
    path: "/",
    component: LoginPage,
  },
  chat: {
    title: "Chat",
    path: "/chat",
    component: MessengerPage,
  },
};
