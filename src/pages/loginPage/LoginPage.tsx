import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/button/Button";

import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../core/helpers/localStorage.helpers";

import "./LoginPage.scss";
import Input from "../../components/input/Input";

export type TAuth = {
  idInstance: string;
  apiTokenInstance: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState<TAuth>(
    getFromLocalStorage("auth")
      ? JSON.parse(getFromLocalStorage("auth") || "{}")
      : {}
  );
  const [valueInput, setValueInput] = useState<TAuth>({
    idInstance: "",
    apiTokenInstance: "",
  });

  const authorization = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (valueInput.idInstance !== "" && valueInput.apiTokenInstance !== "") {
      setAuth(valueInput);
    }
  };

  useEffect(() => {
    if (
      auth.hasOwnProperty("idInstance") &&
      auth.hasOwnProperty("apiTokenInstance")
    ) {
      navigate("/chat");
      saveToLocalStorage(auth, "auth");
    }
  }, [auth, navigate]);

  const getValueInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValueInput({ ...valueInput, [name]: value });
  };


  console.log(auth);
  return (
    <div className="loginpage">
      <div className="wrapper">
        <form
          action=""
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => authorization(e)}
        >
          <Input
            type="text"
            name="idInstance"
            classInput="modal-input"
            classLabel="modal-input-label"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => getValueInput(e)} htmlFor={"idInstance"}          />
            
          <Input
            type="text"
            name="apiTokenInstance"
            classInput="modal-input"
            classLabel="modal-input-label"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => getValueInput(e)} htmlFor={"apiTokenInstance"}          />

          <Button type="submit" classProps="btn-login">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
