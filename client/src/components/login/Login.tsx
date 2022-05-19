/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Input, message } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IAuthRequest } from "../../api/type/auth";
import { getAccountAction, loginAction } from "../../redux/action/auth";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  authSelectors,
  setMessageAuth,
  setStatusAuth,
} from "../../redux/reducers/auth.reducer";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 70px;
`;

const Title = styled.h1`
  font-size: 50px;
  text-align: center;
  font-style: oblique;
  color: rgb(4, 54, 153);
  margin: 0;
`;
const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthorized = useAppSelector(authSelectors.isAuthorizedSelector);
  const token = useAppSelector(authSelectors.getTokenSelector);
  const messageLogin = useAppSelector(authSelectors.isMessageSelector);
  const status = useAppSelector(authSelectors.isStatusSelector);

  const onFinish = ({ email, passWord }: IAuthRequest) => {
    dispatch(loginAction({ email, passWord }));
  };

  useEffect(() => {
    if (isAuthorized && token) {
      navigate("/");
      dispatch(getAccountAction());
    }
  }, [navigate, dispatch, isAuthorized, token]);

  useEffect(() => {
    if (status === 200) {
      message.success(messageLogin);
      dispatch(setMessageAuth());
      dispatch(setStatusAuth());
    } else if (status === 400) {
      message.warning(messageLogin);
      dispatch(setMessageAuth());
      dispatch(setStatusAuth());
    } else if (status === 404) {
      message.error(messageLogin);
      dispatch(setMessageAuth());
      dispatch(setStatusAuth());
    }
  }, [status]);

  return (
    <Wrapper>
      <Title>Đăng nhập</Title>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        onFinish={onFinish}
        autoComplete="off"
        style={{ marginTop: "30px" }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Hãy nhập Email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="passWord"
          rules={[{ required: true, message: "Hãy nhập mật khẩu!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default Login;
