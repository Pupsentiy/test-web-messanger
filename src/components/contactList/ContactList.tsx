import { FC } from "react";

import "./ContactList.scss";
import { fetchGetChatHistory } from "../../api/fetchWrappers";

import ava from "../../assets/img/avatar.svg";
import { TSelectedContact, THistorySelectedContact } from "../../@types/global";

export type TContactListProps = {
  contacts: TSelectedContact[];
  setHistorySelectedContact: React.Dispatch<
    React.SetStateAction<THistorySelectedContact[]>
  >;
  setSelectedContact: React.Dispatch<React.SetStateAction<TSelectedContact>>;
};

const ContactList: FC<TContactListProps> = ({
  contacts,
  setSelectedContact,
  setHistorySelectedContact,
}) => {
  const getChatHistory = async (contact: TSelectedContact) => {
    const updateChatId = contact.chatId + "@c.us";
    const messageList = await fetchGetChatHistory(updateChatId);
    setSelectedContact({ name: contact.name, chatId: updateChatId });
    setHistorySelectedContact(messageList);
  };

  return (
    <div className="contact-list">
      {contacts &&
        contacts.map((contact: TSelectedContact, i: number) => (
          <div
            className="wrapper-contact"
            key={i}
            onClick={() => {
              getChatHistory(contact);
            }}
          >
            <img src={ava} alt="" />
            <div className="wrapper-name-contact">
              <span className="name-contact">{contact?.name}</span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ContactList;
