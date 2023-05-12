import axios from "axios";
import {
  apiTokenInstance,
  urlGetChats,
  urlSendMessage,
  urlGetContacts,
  urlGetChatHistory,
} from "../core/constants/constants";

export const fetchSendMessage = async (name:string,message: string) => {
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
    console.log(response, "axios post");
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
    // console.log(data, "axios getChats");
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchGetIncomingMessage = async (id: string) => {
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
