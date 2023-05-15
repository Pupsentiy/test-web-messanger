import React, { memo, useCallback, useEffect, useState } from "react";
import Button from "../../components/button/Button";
import {
  fetchGetChats,
  fetchGetContacts,
  fetchGetChatHistory,
  fetchSendMessage,
  fetchGetMessage,
  fetchGetStateInstance,
  fetchGetReceiveNotification,
  fetchDelDeleteNotification,
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

export type THistorySelectedContact = {
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
  statusMessage: string;
  sendByApi: boolean;
  textMessage: string;
  timestamp: number;
  type: string;
  typeMessage: string;
  extendedTextMessage?: TextendedTextMessage;
};

export type TextendedTextMessage = {
  text: string;
  description: string;
  title: string;
  previewType: string;
  jpegThumbnail: string;
  forwardingScore: null;
  isForwarded: null;
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
  const [historySelectedContact, setHistorySelectedContact] = useState<
    THistorySelectedContact[]
  >([]);
  const [notification, setNotification] =
    useState<TFetchGetReceiveNotification | null>(null);
  const [selectedContact, setSelectedContact] = useState<TSelectedContact>({
    name: "",
    id: "",
  });
  const [getLastMessage, setGetLastMessage] = useState<TGetMessage | null>(
    null
  );

    const [chat,setChat] = useState<any>([])
    const [contactState,setContactState] = useState<any>({
      chatId:'',
      name:'',
      messages:[]
    })



  const logout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  const getChats = async () => {
    const contacts = await fetchGetContacts();
    const chats = await fetchGetChats();
    fetchGetStateInstance();
    const contactsChange: TContact[] = chats?.map((chat: TContact) => {
      contacts?.map((contact: TChat) => {
        if (contact.id === chat.id) {
          chat.name = contact.name;
        }
        return contact;
      });
      return chat;
    });

    setAllChats(contactsChange);
  };

  // useEffect(() => {
  //   getChats();
  // }, []);

  const getMessage = async () => {
    const res = await fetchGetMessage(
      notification?.body?.idMessage,
      notification?.body?.senderData?.chatId
    );
    if (res) {
      setGetLastMessage(res);
    }
  };

  const updateChat = () => {
    if (getLastMessage) {
      // const hystory = await fetchGetChatHistory(getLastMessage.chatId);
      // setHistorySelectedContact(hystory);
      // setHistorySelectedContact({[getLastMessage,...historySelectedContact]})
      console.log(getLastMessage);

      if (selectedContact.id === getLastMessage.chatId) {
        setHistorySelectedContact([getLastMessage, ...historySelectedContact]);
      }
    }
  };
  // useEffect(() => {
  //   if (notification !== null) {
  //     getMessage();
  //     fetchDelDeleteNotification(notification.receiptId);
  //     updateChat();
  //   }
  // }, [notification]);

  // console.log(notification);
  console.log(historySelectedContact);

  const onChangeFields =(e:any)=>{
      const {name, value} = e.target
      setContactState({
        ...contactState,
        [name]: value,
      })
  } 

  const addContact =() => {
    setChat([...chat,contactState])
  }
  console.log(chat)
  return (
    <div className="messenger">
      <div className="wrapper-contact-list">
        <header className="header-contact-list">
            <input type="text" name="chatId"  onChange={((e:any) => onChangeFields(e))}/>
            <input type="text" name="name" onChange={(e:any) => onChangeFields(e)} />
          <button onClick={()=>addContact()}>send</button>



          <Button type="button" classProps="button-chat">
            {/* <img src={chat} alt="chat" onClick={() => fetchGetMessage()} /> */}
          </Button>
          <Button type="button" classProps="" onClick={() => logout()}>
            <img src={logoutImg} alt="logout" />
          </Button>
        </header>
        <div>
          <ContactList
            contacts={chat}
            setSelectedContact={setSelectedContact}
            setHistorySelectedContact={setHistorySelectedContact}
          />
          <Timer
            onTimeOut={fetchGetReceiveNotification}
            setNotification={setNotification}
            notification={notification}
          />
        </div>
      </div>
      <PlaceMessages
        historySelectedContact={historySelectedContact}
        selectedContact={selectedContact}
      />
    </div>
  );
};

export default MessengerPage;
