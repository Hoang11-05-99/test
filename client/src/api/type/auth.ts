import { IResponse } from "./IResponse";

export interface IAuthRequest {
  email: string;
  passWord: string;
}

export interface IRegisterRequest {
  email: string;
  userName: string;
  passWord: string;
  role: Role;
}

export interface IAuthResponse extends IResponse {
  result: string;
}

export interface IRegisterResponse extends IResponse {
  result: Account;
}

export interface IGetAccountResponse extends IResponse {
  result: Account;
}

export interface Account {
  email: string;
  userName: string;
  passWord: string;
  role: Role;
  status: boolean;
}

export enum Role {
  CANDIDATE = "candidate",
  RECRUITER = "recruiter",
  ADMIN = "admin",
}
