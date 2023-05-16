/// <reference types="react-scripts" />
declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*";

export declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}
declare module "*.gif" {
  const content: string;
  export default content;
}


export interface INotification {
  receiptId: number;
  body:      Body;
}

export interface Body {
  typeWebhook:  string;
  instanceData: InstanceData;
  timestamp:    number;
  idMessage:    string;
  senderData:   SenderData;
  messageData:  MessageData;
}

export interface InstanceData {
  idInstance:   number;
  wid:          string;
  typeInstance: string;
}

export interface MessageData {
  typeMessage:             string;
  extendedTextMessageData: ExtendedTextMessageData;
}

export interface ExtendedTextMessageData {
  text:          string;
  description:   string;
  title:         string;
  previewType:   string;
  jpegThumbnail: string;
}

export interface SenderData {
  chatId:     string;
  chatName:   string;
  sender:     string;
  senderName: string;
}

export interface AxiosResponse<T = any>  {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}

export type TSelectedContact = {
  chatId: string;
  name: string;
};

export type THistorySelectedContact = {
  chatId: string;
  idMessage: string;
  sendByApi: boolean;
  statusMessage: string;
  textMessage: string;
  timestamp: number;
  type: string;
  typeMessage: string;
};

export type TGetMessage = {
  chatId: string;
  idMessage: string;
  statusMessage: string;
  sendByApi: boolean;
  textMessage: string;
  timestamp: number;
  type: string;
  typeMessage: string;
  extendedTextMessage?: TextendedTextMessage;
};

export type TextendedTextMessage = {
  text: string;
  description: string;
  title: string;
  previewType: string;
  jpegThumbnail: string;
  forwardingScore: null;
  isForwarded: null;
};

export type TPlaceMessagesProps = {
  historySelectedContact: THistorySelectedContact[];
  selectedContact: TSelectedContact;
  checkAuth: string;
};

export type TContactListProps = {
  contacts: TSelectedContact[];
  setHistorySelectedContact: React.Dispatch<
    React.SetStateAction<THistorySelectedContact[]>
  >;
  setSelectedContact: React.Dispatch<React.SetStateAction<TSelectedContact>>;
};