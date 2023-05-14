import { FC } from "react";

import "./ContactList.scss";
import { fetchGetChatHistory } from "../../api/fetchWrappers";
import {
  TContact,
  TMessagesSelectedContact,
  TSelectedContact,
} from "../../pages/MessengerPage/MessengerPage";
import ava from "../../assets/img/avatar.svg";

export type TContactListProps = {
  contacts: any[];
  setMessagesSelectedContact: React.Dispatch<
    React.SetStateAction<TMessagesSelectedContact[]>
  >;
  setSelectedContact: React.Dispatch<React.SetStateAction<TSelectedContact>>;
};

const ContactList: FC<TContactListProps> = ({
  contacts,
  setSelectedContact,
  setMessagesSelectedContact,
}) => {
  const getChatHistory = async (contact: TContact) => {
    const messageList = await fetchGetChatHistory(contact.id);
    setSelectedContact({ name: contact.name, id: contact.id });
    setMessagesSelectedContact(messageList);
  };

  return (
    <div className="contact-list">
      {contacts &&
        contacts.map((contact: TContact, i: number) => (
          <div
            className="wrapper-contact"
            key={i}
            onClick={() => {
              getChatHistory(contact);
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
  );
};

export default ContactList;
