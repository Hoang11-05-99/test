import {
  CaretDownOutlined,
  CaretUpOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button } from "antd";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Role } from "../../api/type/auth";
import { getAccountAction } from "../../redux/action/auth";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  authSelectors,
  setAccountAuth,
  setAuthorized,
  setMessageAuth,
  setStatusAuth,
  setToken,
} from "../../redux/reducers/auth.reducer";
import { removeAccessToken } from "../../untils/localStorageService";
const Block = styled.div`
  display: flex;
  background: rgb(11, 20, 38);
  height: 70px;
  justify-content: space-between;
  align-items: center;
  padding-left: 25px;
  padding-right: 25px;
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
  z-index: 9999;
`;
const LeftBlock = styled.div`
  display: flex;
  align-items: center;
  width: 40%;
  color: white;
  font-size: 20px;
  font-style: oblique;
  cursor: pointer;
`;
const RightBlock = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  justify-content: center;
  border: 0;
  box-sizing: border-box;
  gap: 10px;
  margin-left: 10px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  justify-content: center;
  border: 0;
  box-sizing: border-box;
  gap: 10px;
  margin-left: 10px;
`;

const LinkToUrl = styled(Link)``;

const Name = styled.div`
  font-size: 20px;
  color: white;
  font-style: oblique;
`;

const DropDown = styled.div`
  box-sizing: border-box;
  margin-top: 160px;
  padding: 16px;
  display: block;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  background-color: rgb(255, 255, 255);
  min-width: 135px;
  z-index: 1;
  box-shadow: rgb(0 0 0 / 10%) 0px 4px 40px;
  border-radius: 15px;
  white-space: nowrap;
  right: 2%;
`;
const BoxItem = styled(Link)`
  display: flex;
  padding: 10px 16px 0 0;
  align-items: center;
  line-height: 1.3em;
  color: rgb(0, 0, 0);
  background-repeat: no-repeat;
  background-size: cover;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;
const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isShowDropDownMenu, setIsShowDropDownMenu] = useState(false);
  const [isShowIcon, setIsShowIcon] = useState(false);
  const account = useAppSelector(authSelectors.getAccountSelector);

  const handleDisconnect = () => {
    dispatch(setAuthorized());
    dispatch(setToken());
    dispatch(setAccountAuth());
    dispatch(setStatusAuth());
    removeAccessToken();
  };

  useLayoutEffect(() => {
    dispatch(getAccountAction());
    dispatch(setStatusAuth());
    dispatch(setMessageAuth());
  }, []);
  if (account?.role === Role.CANDIDATE) {
    return (
      <Block>
        <LeftBlock
          onClick={() => {
            navigate("/");
          }}
        >
          Tìm kiếm việc làm Online
        </LeftBlock>
        <RightBlock>
          {account ? (
            <Content
              onClick={() => {
                setIsShowDropDownMenu(!isShowDropDownMenu);
                setIsShowIcon(!isShowIcon);
              }}
            >
              <Avatar size="default" icon={<UserOutlined />} />
              <Name>{account?.userName}</Name>
              {isShowIcon ? (
                <CaretDownOutlined style={{ color: "white" }} />
              ) : (
                <CaretUpOutlined style={{ color: "white" }} />
              )}
              {isShowDropDownMenu ? (
                <DropDown>
                  <BoxItem
                    onClick={() => {
                      setIsShowDropDownMenu(false);
                    }}
                    to="/"
                  >
                    Trang chủ
                  </BoxItem>
                  <BoxItem
                    onClick={() => {
                      setIsShowDropDownMenu(false);
                    }}
                    to="/profile"
                  >
                    Hồ sơ cá nhân
                  </BoxItem>
                  <BoxItem to="/" onClick={handleDisconnect}>
                    Đăng xuất
                  </BoxItem>
                </DropDown>
              ) : null}
            </Content>
          ) : (
            <>
              <LinkToUrl to={"/login"}>
                <Button type="primary">Đăng nhập</Button>
              </LinkToUrl>
              <LinkToUrl to={"/register"}>
                <Button type="primary">Đăng kí</Button>
              </LinkToUrl>
            </>
          )}
        </RightBlock>
      </Block>
    );
  } else if (account?.role === Role.RECRUITER) {
    return (
      <Block>
        <LeftBlock
          onClick={() => {
            navigate("/");
          }}
        >
          Tìm kiếm việc làm Online
        </LeftBlock>
        <RightBlock>
          {account ? (
            <Content
              onClick={() => {
                setIsShowDropDownMenu(!isShowDropDownMenu);
                setIsShowIcon(!isShowIcon);
              }}
            >
              <Avatar size="default" icon={<UserOutlined />} />
              <Name>{account?.userName}</Name>
              {isShowIcon ? (
                <CaretDownOutlined style={{ color: "white" }} />
              ) : (
                <CaretUpOutlined style={{ color: "white" }} />
              )}
              {isShowDropDownMenu ? (
                <DropDown style={{ marginTop: "200px" }}>
                  <BoxItem
                    onClick={() => {
                      setIsShowDropDownMenu(false);
                    }}
                    to="/"
                  >
                    Trang chủ
                  </BoxItem>
                  <BoxItem
                    onClick={() => {
                      setIsShowDropDownMenu(false);
                      // dispatch(getAllCreatorAction());
                    }}
                    to="/recruitment/myRecruitment"
                  >
                    Bài đăng của tôi
                  </BoxItem>
                  <BoxItem
                    onClick={() => {
                      setIsShowDropDownMenu(false);
                    }}
                    to="/profile/manager"
                  >
                    Quản lý hồ sơ
                  </BoxItem>
                  <BoxItem to="/" onClick={handleDisconnect}>
                    Đăng xuất
                  </BoxItem>
                </DropDown>
              ) : null}
            </Content>
          ) : (
            <>
              <LinkToUrl to={"/login"}>
                <Button type="primary">Đăng nhập</Button>
              </LinkToUrl>
              <LinkToUrl to={"/register"}>
                <Button type="primary">Đăng kí</Button>
              </LinkToUrl>
            </>
          )}
        </RightBlock>
      </Block>
    );
  } else {
    return (
      <Block>
        <LeftBlock
          onClick={() => {
            navigate("/");
          }}
        >
          Tìm kiếm việc làm Online
        </LeftBlock>
        <RightBlock>
          {account ? (
            <Content
              onClick={() => {
                setIsShowDropDownMenu(!isShowDropDownMenu);
                setIsShowIcon(!isShowIcon);
              }}
            >
              <Avatar size="default" icon={<UserOutlined />} />
              <Name>{account?.userName}</Name>
              {isShowIcon ? (
                <CaretDownOutlined style={{ color: "white" }} />
              ) : (
                <CaretUpOutlined style={{ color: "white" }} />
              )}
              {isShowDropDownMenu ? (
                <DropDown>
                  <BoxItem
                    onClick={() => {
                      setIsShowDropDownMenu(false);
                    }}
                    to="/"
                  >
                    Trang chủ
                  </BoxItem>
                  <BoxItem
                    onClick={() => {
                      setIsShowDropDownMenu(false);
                    }}
                    to="/user"
                  >
                    Quản lý tài khoản
                  </BoxItem>
                  <BoxItem to="/" onClick={handleDisconnect}>
                    Đăng xuất
                  </BoxItem>
                </DropDown>
              ) : null}
            </Content>
          ) : (
            <>
              <LinkToUrl to={"/login"}>
                <Button type="primary">Đăng nhập</Button>
              </LinkToUrl>
              <LinkToUrl to={"/register"}>
                <Button type="primary">Đăng kí</Button>
              </LinkToUrl>
            </>
          )}
        </RightBlock>
      </Block>
    );
  }
};

export default Header;
