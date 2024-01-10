
export type TUser = {
  id: string,
  username: string,
  email: string,
  createdAt: string,
  updatedAt: string,
};

export type TEmailDetails = {
  from: string,
  to: string,
  subject: string,
  text: string,
  html: any,
};