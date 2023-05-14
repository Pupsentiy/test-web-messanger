import React, { FC, useState } from "react";

import "./PlaceMessages.scss";
import {
  TMessagesSelectedContact,
  TSelectedContact,
} from "../../pages/MessengerPage/MessengerPage";
import useDebounce from "../../hooks/hooks";
import { fetchSendMessage } from "../../api/fetchWrappers";
import Button from "../button/Button";

export type TPlaceMessagesProps = {
  messagesSelectedContact: TMessagesSelectedContact[];
  selectedContact: TSelectedContact;
};

const PlaceMessages: FC<TPlaceMessagesProps> = ({
  messagesSelectedContact,
  selectedContact,
}) => {
  const [message, setMessage] = useState("");
  const debouncedValue = useDebounce<string>(message, 500);

  const getMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    fetchSendMessage(selectedContact.id, debouncedValue);
    setMessage("");
    if (message === "") {
      return;
    }
  };

  return (
    <div className="wrapper-place-message">
      <header className="header-place-message">{selectedContact.name}</header>
      {messagesSelectedContact?.length ? (
        <>
          <div className="wrapper-place-message">
            {messagesSelectedContact &&
              messagesSelectedContact.map((message: any, i: number) => (
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
        <h1>Выберите контакт</h1>
      )}
    </div>
  );
};

export default PlaceMessages;
