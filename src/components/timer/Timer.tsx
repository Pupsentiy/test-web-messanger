import React, { useEffect, useState } from "react";

interface Props {
  onTimeOut: () => void;
  setNotification: any;
  notification: any;
}

const Timer = ({ onTimeOut, setNotification, notification }: Props) => {
  const [second, setSecond] = useState<number>(4);

  const isTimer = async () => {
    const res: any = await onTimeOut();
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
