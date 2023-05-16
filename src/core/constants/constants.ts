import { getFromLocalStorage } from "../helpers/localStorage.helpers";

const dataAuth = getFromLocalStorage("auth")
  ? JSON.parse(getFromLocalStorage("auth") || "{}")
  : {};

export const host: string = "https://api.green-api.com";
export const idInstance: string = dataAuth.idInstance;
export const apiTokenInstance: string = dataAuth.apiTokenInstance;

export const urlSendMessage: string = `${host}/waInstance${idInstance}/SendMessage/${apiTokenInstance}`;
export const urlGetChatHistory: string = `${host}/waInstance${idInstance}/GetChatHistory/${apiTokenInstance}`;
export const urlGetChatMessage: string = `${host}/waInstance${idInstance}/getMessage/${apiTokenInstance}`;
export const urlGetReceiveNotification: string = `${host}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`;
export const urlDelDeleteNotification: string = `${host}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/`;
export const urlGetStateInstance: string = `${host}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}/`;
