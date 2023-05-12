import React, { useEffect, useState } from "react";
import Button from "../../components/button/Button";

import "./LoginPage.scss";
import { useNavigate } from "react-router-dom";

export type TAuth = {
  idinstance: string;
  token: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState<TAuth | null>(null);
  const [valueInput, setValueInput] = useState<TAuth>({
    idinstance: "",
    token: "",
  });
  const authorization = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (valueInput.idinstance !== "" && valueInput.token !== "") {
      setAuth(valueInput);
    }
  };

  useEffect(() => {
    if (auth) {
      navigate("/chat");
    }
  }, [auth, navigate]);

  const getValueInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValueInput({ ...valueInput, [name]: value });
  };
console.log(auth)
  return (
    <div className="loginpage">
      <div className="wrapper">
        <form
          action=""
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => authorization(e)}
        >
          <input
            type="text"
            name="idinstance"
            placeholder="idinstance"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              getValueInput(e)
            }
          />
          <input
            type="text"
            name="token"
            placeholder="token"
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
