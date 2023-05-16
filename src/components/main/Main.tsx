import React, { FC, useEffect, useState } from "react";
import Button from "../../components/button/Button";
import {
  fetchGetMessage,
  fetchGetStateInstance,
  fetchGetReceiveNotification,
  fetchDelDeleteNotification,
} from "../../api/fetchWrappers";

import chatttt from "../../assets/img/chat.svg";
import logoutImg from "../../assets/img/logout.svg";
import { useNavigate } from "react-router-dom";
import ContactList from "../../components/contactList/ContactList";
import PlaceMessages from "../../components/placeMessages/PlaceMessages";
import Timer from "../../components/timer/Timer";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../core/helpers/localStorage.helpers";
import Modal from "../../components/modal/Modal";
import {
  INotification,
  THistorySelectedContact,
  TSelectedContact,
} from "../../@types/global";

const Main: FC = () => {
  const navigate = useNavigate();
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [historySelectedContact, setHistorySelectedContact] = useState<
    THistorySelectedContact[]
  >([]);
  const [notification, setNotification] = useState<INotification | null>(null);
  const [selectedContact, setSelectedContact] = useState<TSelectedContact>({
    name: "",
    chatId: "",
  });
  const [chat, setChat] = useState<TSelectedContact[]>(
    getFromLocalStorage("chat")
      ? JSON.parse(getFromLocalStorage("chat") || "{}")
      : []
  );
  const [contactState, setContactState] = useState<TSelectedContact>({
    chatId: "",
    name: "",
  });

  const [checkAuth, setChekAuth] = useState("");

  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("chat");
    navigate("/");
  };

  const getInstance = async () => {
    const check = await fetchGetStateInstance();
    setChekAuth(check?.data.stateInstance);
  };

  const getMessage = async (notificationProps: {
    body: {
      idMessage: string | undefined;
      senderData: { chatId: string | undefined };
    };
  }) => {
    const res = await fetchGetMessage(
      notificationProps?.body?.idMessage,
      notificationProps?.body?.senderData?.chatId
    );
    if (res) {
      if (selectedContact.chatId === res.chatId) {
        setHistorySelectedContact([res, ...historySelectedContact]);
      }
    }
  };

  useEffect(() => {
    if (notification) {
      
      getMessage(notification);

      fetchDelDeleteNotification(notification.receiptId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification]);

  const onChangeFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactState({
      ...contactState,
      [name]: value,
    });
  };

  const addContact = () => {
    if (contactState.name !== "" && contactState.chatId !== "") {
      setChat([...chat, contactState]);
    }
  };

  useEffect(() => {
    if (chat.length) {
      saveToLocalStorage(chat, "chat");
    }
    getInstance();
  }, [chat]);
  return (
    <div className="messenger">
      <div className="wrapper-contact-list">
        <header className="header-contact-list">
          <Button type="button" classProps="button-chat">
            <img
              src={chatttt}
              alt="chat"
              onClick={() => setModalActive(true)}
            />
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
        checkAuth={checkAuth}
      />

      <Modal
        active={modalActive}
        setActive={setModalActive}
        onChangeFields={onChangeFields}
        addContact={addContact}
        contactState={contactState}
        setContactState={setContactState}
      />
    </div>
  );
};

export default Main;
