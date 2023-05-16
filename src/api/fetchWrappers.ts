import axios, { AxiosResponse } from "axios";
import {
  apiTokenInstance,
  urlSendMessage,
  urlGetChatHistory,
  urlGetChatMessage,
  urlGetReceiveNotification,
  urlDelDeleteNotification,
  urlGetStateInstance,
} from "../core/constants/constants";

export const fetchSendMessage = async (name: string, message: string) => {
  const data = {
    chatId: name,
    message: message,
  };

  const config = {
    method: "post",
    url: urlSendMessage,
    headers: {
      "Content-Type": "application/json",
      Authorization: ` Bearer ${apiTokenInstance}`,
    },
    data: data,
  };

  try {
    const response = await axios(config);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const fetchGetChatHistory = async (id: string) => {
  const data = {
    chatId: id,
  };

  const config = {
    method: "post",
    url: urlGetChatHistory,
    headers: {
      "Content-Type": "application/json",
      Authorization: ` Bearer ${apiTokenInstance}`,
    },
    data: data,
  };

  try {
    const responce = await axios(config);
    console.log(responce.data)
    return responce.data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchGetMessage = async (
  idMessage: string | undefined,
  chatId: string | undefined
) => {
  const data = {
    chatId: chatId,
    idMessage: idMessage,
  };

  const config = {
    method: "post",
    url: urlGetChatMessage,
    headers: {
      "Content-Type": "application/json",
      Authorization: ` Bearer ${apiTokenInstance}`,
    },
    data: data,
  };

  try {
    const responce = await axios(config);
    return responce.data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchGetReceiveNotification = async () => {
  const config = {
    method: "get",
    url: urlGetReceiveNotification,
    headers: {
      "Content-Type": "application/json",
      Authorization: ` Bearer ${apiTokenInstance}`,
    },
  };

  try {
    const { data }: AxiosResponse = await axios(config);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchDelDeleteNotification = async (idMessage: number) => {
  const config = {
    method: "delete",
    url: urlDelDeleteNotification + idMessage,
    headers: {
      "Content-Type": "application/json",
      Authorization: ` Bearer ${apiTokenInstance}`,
    },
  };

  try {
    const { data } = await axios(config);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchGetStateInstance = async () => {
  const config = {
    method: "get",
    url: urlGetStateInstance,
    headers: {
      "Content-Type": "application/json",
      Authorization: ` Bearer ${apiTokenInstance}`,
    },
  };

  try {
    const responce = await axios(config);
    console.log(responce)
    return responce;
  } catch (e) {
    console.log(e, "notAuthorized");
  }
};
