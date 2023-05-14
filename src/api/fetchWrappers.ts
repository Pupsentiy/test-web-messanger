import axios from "axios";
import {
  apiTokenInstance,
  urlGetChats,
  urlSendMessage,
  urlGetContacts,
  urlGetChatHistory,
  urlGetChatMessage,
  urlGetReceiveNotification,
  urlDelDeleteNotification,
  urlGetStateInstance,
} from "../core/constants/constants";

export const fetchSendMessage = async (name: string, message: string) => {
  const data = JSON.stringify({
    chatId: name,
    message: message,
  });

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

export const fetchGetChats = async () => {
  const config = {
    method: "get",
    url: urlGetChats,
    headers: {
      "Content-Type": "application/json",
      Authorization: ` Bearer ${apiTokenInstance}`,
    },
  };

  try {
    const { data } = await axios(config);
    // console.log(data, "axios getChats");
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchGetContacts = async () => {
  const config = {
    method: "get",
    url: urlGetContacts,
    headers: {
      "Content-Type": "application/json",
      Authorization: ` Bearer ${apiTokenInstance}`,
    },
  };

  try {
    const { data } = await axios(config);
    console.log(data, "axios getChats");
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchGetChatHistory = async (id: string) => {
  const data = JSON.stringify({
    chatId: id,
  });

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
    console.log(responce);
    return responce.data;
    // console.log(data, "axios post");
  } catch (e) {
    console.log(e);
  }
};

export const fetchGetMessage = async (idMessage: string | undefined,chatId: string | undefined) => {
  const data = JSON.stringify({
    chatId: chatId,
    idMessage: idMessage,
  });

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
    console.log(responce,'getMessage');
    return responce.data;
    // console.log(data, "axios post");
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
    const { data } = await axios(config);
    // console.log(data, "axios fetchGetReceiveNotification");
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchDelDeleteNotification = async (idMessage: any) => {
  const data = JSON.stringify({
    receiptId: idMessage,
  });

  const config = {
    method: "delete",
    url: urlDelDeleteNotification,
    headers: {
      "Content-Type": "application/json",
      Authorization: ` Bearer ${apiTokenInstance}`,
    },
    data: data,
  };

  try {
    const { data } = await axios(config);
    // console.log(data, "axios getChats");
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
    const { data } = await axios(config);
    console.log(data, "authorized");
    return data;
  } catch (e) {
    console.log(e, "notAuthorized");
  }
};
