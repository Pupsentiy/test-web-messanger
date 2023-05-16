import React, { Dispatch, FC, SetStateAction } from "react";

import "./Modal.scss";
import Input from "../input/Input";
import Button from "../button/Button";
import { TSelectedContact } from "../../@types/global";

export type TModal = {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  onChangeFields: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addContact: () => void;
  contactState: TSelectedContact;
  setContactState: Dispatch<SetStateAction<TSelectedContact>>;
};

const Modal: FC<TModal> = ({
  active,
  setActive,
  onChangeFields,
  addContact,
  contactState,
  setContactState,
}) => {
  const closeModal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addContact();
    if (contactState.name !== "" && contactState.chatId !== "") {
      setActive(false);
      setContactState({
        chatId: "",
        name: "",
      });
    }
  };

  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? "modal__content active" : "modal__content"}
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={(e) => closeModal(e)}>
          <Input
            htmlFor="Номер Телефона"
            type="text"
            name="chatId"
            value={contactState["chatId"]}
            classInput="modal-input"
            classLabel="modal-input-label"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChangeFields(e)
            }
          />
          <Input
            htmlFor="Имя"
            type="text"
            name="name"
            value={contactState["name"]}
            classInput="modal-input"
            classLabel="modal-input-label"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChangeFields(e)
            }
          />
          <Button type="submit" classProps={""}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
