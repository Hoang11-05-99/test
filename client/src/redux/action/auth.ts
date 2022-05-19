import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAccountApi, loginApi, RegisterApi } from "../../api/auth/auth";
import {
  IAuthRequest,
  IAuthResponse,
  IRegisterRequest,
  IRegisterResponse,
} from "../../api/type/auth";

export const loginAction = createAsyncThunk<IAuthResponse, IAuthRequest>(
  "auth/login",
  async (data: IAuthRequest) => {
    const response = { ...(await loginApi(data)) };
    return response;
  }
);

export const registerAction = createAsyncThunk<
  IRegisterResponse,
  IRegisterRequest
>("auth/register", async (data: IRegisterRequest) => {
  const response = { ...(await RegisterApi(data)) };
  return response;
});

export const getAccountAction = createAsyncThunk(
  "auth/getAccount",
  async () => {
    const response = { ...(await getAccountApi()) };
    return response;
  }
);
