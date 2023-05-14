import React, { memo, useEffect, useState } from "react";
import Button from "../../components/button/Button";
import {
  fetchGetChats,
  fetchGetContacts,
  fetchGetChatHistory,
  fetchSendMessage,
  fetchGetMessage,
  fetchGetStateInstance,
  fetchGetReceiveNotification,
} from "../../api/fetchWrappers";

import chat from "../../assets/img/chat.svg";
import logoutImg from "../../assets/img/logout.svg";
import "./MessengerPage.scss";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../hooks/hooks";
import ContactList from "../../components/contactList/ContactList";
import PlaceMessages from "../../components/placeMessages/PlaceMessages";
import Timer from "../../components/timer/Timer";
import { TFetchGetReceiveNotification } from "../../components/timer/Timer.types";

export type TSelectedContact = {
  id: string;
  name: string;
};

export type TChat = {
  id: string;
  name: string;
  type: string;
};

export type TContact = {
  archive: boolean;
  ephemeralExpiration: number;
  ephemeralSettingTimestamp: number;
  id: string;
  name: string;
  notSpam: boolean;
};

export type TMessagesSelectedContact = {
  chatId: string;
  idMessage: string;
  sendByApi: boolean;
  statusMessage: string;
  textMessage: string;
  timestamp: number;
  type: string;
  typeMessage: string;
};

export type TGetMessage = {
  chatId: string;
  idMessage: string;
  senderId: string;
  senderName: string;
  textMessage: string;
  timestamp: number;
  type: string;
  typeMessage: string;
};

export type TNotification = {
  chatId: string;
  chatName: string;
  sender: string;
  senderName: string;
};

const MessengerPage = () => {
  const navigate = useNavigate();
  const [allChats, setAllChats] = useState<TContact[]>([]);
  const [messagesSelectedContact, setMessagesSelectedContact] = useState<
    TMessagesSelectedContact[]
  >([]);
  const [notification, setNotification] =
    useState<TFetchGetReceiveNotification | null>(null);
  const [selectedContact, setSelectedContact] = useState<TSelectedContact>({
    name: "",
    id: "",
  });
  const [getLastMessage, setGetLastMessage] = useState<TGetMessage | null>(null);

  const logout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  const getChats = async () => {
    const contacts = await fetchGetContacts();
    const chats = await fetchGetChats();
    const contactsChange: TContact[] = chats?.map((chat: TContact) => {
      contacts?.map((contact: TChat) => {
        if (contact.id === chat.id) {
          chat.name = contact.name;
        }
        return contact;
      });
      return chat;
    });
    console.log(contactsChange);

    setAllChats(contactsChange);
  };

  useEffect(() => {
    getChats();
    fetchGetStateInstance();
  }, []);

  const getMessage = async () =>{
   const res  = await fetchGetMessage(
      notification?.body?.idMessage,
      notification?.body?.senderData?.chatId
    );
    console.log(res)
    setGetLastMessage(res)
  }

  useEffect(() => {
    if (notification) {
      getMessage()
     
    }
  }, [notification]);

  console.log(notification);
  return (
    <div className="messenger">
      <div className="wrapper-contact-list">
        <header className="header-contact-list">
          <Button type="button" classProps="button-chat">
            {/* <img src={chat} alt="chat" onClick={() => fetchGetMessage()} /> */}
          </Button>
          <Button type="button" classProps="" onClick={() => logout()}>
            <img src={logoutImg} alt="logout" />
          </Button>
        </header>
        <div>
          <ContactList
            contacts={allChats}
            setSelectedContact={setSelectedContact}
            setMessagesSelectedContact={setMessagesSelectedContact}
          />
          <Timer
            onTimeOut={fetchGetReceiveNotification}
            setNotification={setNotification}
            notification={notification}
          />
        </div>
      </div>
      <PlaceMessages
        messagesSelectedContact={messagesSelectedContact}
        selectedContact={selectedContact}
      />
    </div>
  );
};

export default MessengerPage;
