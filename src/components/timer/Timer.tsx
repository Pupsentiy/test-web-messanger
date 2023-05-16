import React, { useEffect, useState } from "react";
import { INotification } from "../../@types/global";

interface Props {
  onTimeOut: () => Promise<INotification> ;
  setNotification: React.Dispatch<React.SetStateAction<INotification | null>>;
  notification: INotification | null;
}

const Timer = ({ onTimeOut, setNotification, notification }: Props) => {
  const [second, setSecond] = useState<number>(4);

  const isTimer = async () => {
    const res = await onTimeOut();
    if (res?.receiptId !== notification?.receiptId) {
      setNotification(res);
    }
    if (res || !res) {
      setSecond(4);
    }
  };

  const tick = () => {
    setSecond((oldValue) => oldValue - 1);
  };
  useEffect(() => {
    let timerId = setInterval(
      async () => (second > 1 ? tick() : await isTimer()),
      1000
    );
    return () => clearInterval(timerId);
  });

  return <></>;
};

export default Timer;
