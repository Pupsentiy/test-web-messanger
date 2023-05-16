import React, { FC, useState } from "react";

import "./PlaceMessages.scss";
import {
  TGetMessage,
  THistorySelectedContact,
  TSelectedContact,
} from "../../pages/MessengerPage/MessengerPage";
import useDebounce from "../../hooks/hooks";
import {
  fetchSendMessage,
} from "../../api/fetchWrappers";
import Button from "../button/Button";

export type TPlaceMessagesProps = {
  historySelectedContact: THistorySelectedContact[];
  selectedContact: TSelectedContact;
  checkAuth: string;
};

const PlaceMessages: FC<TPlaceMessagesProps> = ({
  historySelectedContact,
  selectedContact,
  checkAuth,
}) => {
  const [message, setMessage] = useState<string>("");
  const debouncedValue = useDebounce<string>(message, 250);
  const getMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const sendMessage = async () => {
    if (message === "") {
      return;
    }

    await fetchSendMessage(selectedContact.chatId, debouncedValue);
    setMessage("");
  };

  return (
    <div className="wrapper-place-message">
      <header className="header-place-message">{selectedContact.name}</header>
      {checkAuth !== "notAuthorized" ? (
        <>
          <div className="wrapper-place-message">
            {historySelectedContact &&
              historySelectedContact.map((message: TGetMessage, i: number) => (
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
              value={message}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                getMessage(e)
              }
            />
            <Button type="button" classProps="" onClick={() => sendMessage()}>
              Отправить
            </Button>
          </div>
        </>
      ) : (
        <h3>авторизуйтесь на сайте green-api.com, с помощью аккаунта whatsapp</h3>
      )}
    </div>
  );
};

export default PlaceMessages;
