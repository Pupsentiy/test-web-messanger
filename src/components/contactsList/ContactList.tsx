import { FC } from "react";

import "./ContactList.scss";
import Button from "../button/Button";

import avatar from '../../assets/img/avatar.svg'

const ContactList: FC = () => {
  return (
    <div className="contacts">
      <header>
        <img className="owner" src={avatar} alt="avatar" />
        <Button type="button" classProps="button-add-contact">
          add contact
        </Button>
        <Button type="button" classProps="button-logout">
          logout
        </Button>
      </header>
    </div>
  );
};

export default ContactList;
