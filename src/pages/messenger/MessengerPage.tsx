import React, { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import {
  fetchGetChats,
  fetchGetContacts,
  fetchGetIncomingMessage,
  fetchSendMessage,
} from "../../api/fetchWrappers";

import chat from "../../assets/img/chat.svg";
import logout from "../../assets/img/logout.svg";
import ava from "../../assets/img/avatar.svg";
import "./MessengerPage.scss";

export type TContact = {
  id: string;
  name: string;
  type: string;
};

const MessengerPage = () => {
  const [message, setMessage] = useState("");
  const [allChats, setAllChats] = useState([]);
  const [allContats, setAllContacts] = useState([]);
  const [allMessageContact, setAllMessageContact] = useState([]);
  const [selectedContactName, setSelectedContactName] = useState({
    name: "",
    id: "",
  });
  const sendMessage = () => {
    fetchSendMessage(selectedContactName.id, message);
  };

  const getMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const getChats = async () => {
    const chats = await fetchGetChats();
    setAllChats(chats);
  };

  const getContats = async () => {
    const contats = await fetchGetContacts();
    setAllContacts(contats);
  };

  const getChatHystory = async (contact: any) => {
    const message = await fetchGetIncomingMessage(contact.id);
    console.log(message);
    setAllMessageContact(message);
    setSelectedContactName({ name: contact.name, id: contact.id });
  };

  useEffect(() => {
    getChats();
    getContats();
  }, []);

  const contacts: any = allChats?.map((ch: any) => {
    allContats?.map((con: any) => {
      if (con.id === ch.id) {
        ch.name = con?.name;
      }
      return con;
    });
    return ch;
  });

  console.log(allMessageContact);

  return (
    <div className="messenger">
      {/* <input
        type="text"
        name="message"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => getMessage(e)}
      />
      <Button type="button" classProps="" onClick={() => sendMessage()}>
        send
      </Button> */}
      <div className="wrapper-contact-list">
        <header className="header-contact-list">
          <Button type="button" classProps="button-chat">
            <img src={chat} alt="chat" />
          </Button>
          <Button type="button" classProps="">
            <img src={logout} alt="logout" />
          </Button>
        </header>
        <div>
          <div className="contact-list">
            {contacts &&
              contacts.map((contact: TContact, i: number) => (
                <div
                  className="wrapper-contact"
                  key={i}
                  onClick={() => {
                    getChatHystory(contact);
                  }}
                >
                  <img src={ava} alt="" />
                  <div className="wrapper-name-contact">
                    <span className="name-contact">
                      {contact?.name !== undefined
                        ? contact?.name
                        : "+" + contact.id.substring(0, 11)}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="wrapper-place-message">
        <header className="header-place-message">
          {selectedContactName.name}
        </header>
        <div className="wrapper-place-message">
          {allMessageContact &&
            allMessageContact.map((message: any, i: number) => (
              <div
                className={
                  !message.hasOwnProperty("textMessage")
                    ? "place-disable"
                    : message.type === "incoming"
                    ? "place-message-incoming"
                    : "place-message-outgoing"
                }
                key={i}
              >
                {message.textMessage}
              </div>
            ))}
        </div>
        <div className="input-message">
          <input
            type="text"
            placeholder="Введите сообщение"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => getMessage(e)}
          />
          <Button type="button" classProps="" onClick={() => sendMessage()}>
            Отправить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessengerPage;
