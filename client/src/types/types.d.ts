//import { SIGNUP, LOGIN } from "../consts/const";

export type TSideTabStates = 'profile' | 'chats' | 'friends' | 'search';

export type TFollowBtnStates = 'add' | 'pending' | 'added';

export type TFormStates = 'signup' | 'login';

export type TSignupFormData = {
  username: string,
  email: string,
};

export type TLoginFormData = {
  magicCode: string,
};

export type TMessage = {
  id: string,
  text: string,
  isSeen: boolean,
  //isOnline: boolean,
  createdAt: string,
  senderId: any,
  recipientId: any,
  //isAuth: boolean,
  image: string,
};

export type TRegisterFormData = {
  username: string,
  email: string,
};

type TRegisterResponse = {
  success?: boolean,
  msg: string,
  //user?: any,
};

type TLoginResponse = {
  msg: string,
  success?: boolean,
  user?: any
}

type TSearchUsersInput = {
  authUserId: string,
  username: string,
}

type TAddFriendInput = {
  senderId: string,
  recipientId: string,
}

type TGetChatsPayload = {
  authUserId: string,
}

type TMessage = {
  id: string,
  text: string,
  hasSeen: boolean,
  image: string,
  senderId: string,
  recipientId: string,
  createdAt: Date,
  updatedAt: Date,
}