import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/button/Button";

import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../core/helpers/localStorage.helpers";

import "./LoginPage.scss";

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
          <input
            type="text"
            name="idInstance"
            placeholder="idInstance"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              getValueInput(e)
            }
          />
          <input
            type="text"
            name="apiTokenInstance"
            placeholder="apiTokenInstance"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              getValueInput(e)
            }
          />

          <Button type="submit" classProps="btn-login">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
