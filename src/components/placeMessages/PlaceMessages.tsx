import React, { FC, useState } from "react";

import useDebounce from "../../hooks/hooks";
import { fetchSendMessage } from "../../api/fetchWrappers";
import Button from "../button/Button";
import { TGetMessage, TPlaceMessagesProps } from "../../@types/global";
import Input from "../input/Input";

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
            <Input
              type="text"
              placeholder="Введите сообщение"
              value={message}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                getMessage(e)
              }
              htmlFor={""}
              classInput="inputs"
              classLabel="label"
            />
            <Button type="button" classProps="" onClick={() => sendMessage()}>
              Отправить
            </Button>
          </div>
        </>
      ) : (
        <h3>
          авторизуйтесь на сайте green-api.com, с помощью аккаунта whatsapp
        </h3>
      )}
    </div>
  );
};

export default PlaceMessages;
