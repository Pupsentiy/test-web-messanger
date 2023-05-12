export const host: string = "https://api.green-api.com";
export const idInstance: string = "1101819326";
export const apiTokenInstance: string =
  "45e9266f66ef44418deb564a74ce3aa6c29ee8eaa07144dc94";

export const urlSendMessage: string = `${host}/waInstance${idInstance}/SendMessage/${apiTokenInstance}`;
export const urlGetChats: string = `${host}/waInstance${idInstance}/GetChats/${apiTokenInstance}`;
export const urlGetContacts: string = `${host}/waInstance${idInstance}/GetContacts/${apiTokenInstance}`;
export const urlGetChatHistory: string = `${host}/waInstance${idInstance}/GetChatHistory/${apiTokenInstance}`;
