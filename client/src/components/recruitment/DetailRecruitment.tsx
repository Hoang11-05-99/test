/* eslint-disable react-hooks/exhaustive-deps */
import {
  ClockCircleOutlined,
  ContactsOutlined,
  EnvironmentOutlined,
  MessageOutlined,
  PhoneOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import moment from "moment";
import React, { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { checkAddress, checkSalary, checkType } from "../../config/data";
import { getRecuitmentAction } from "../../redux/action/recruitment";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { recruitmentSelectors } from "../../redux/reducers/recruitment.reducer";
import { cvSelectors } from "../../redux/reducers/cv.reducer";
import mucLuong from "../../asset/mucluong.svg";
import loainganh from "../../asset/loainganh.svg";
import capbac from "../../asset/capbac.svg";

const Wrapper = styled.div`
  height: 100vh;
  padding: 30px 25px;
`;
const Title = styled.h2`
  border-left: 7px solid #00b14f;
  color: #333;
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 16px;
  padding-left: 12px;
`;
const BoxInfo = styled.div`
  background: #00b14f0d;
  border-radius: 3px;
  margin-bottom: 8px;
  padding: 16px 16px 0;
  p {
    color: #333;
    font-weight: 700;
    margin-bottom: 16px;
    -webkit-text-decoration-line: underline;
    text-decoration-line: underline;
  }
`;
const BoxMain = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`;
const BoxItem = styled.div`
  display: flex;
  margin-bottom: 16px;
  img {
    height: 32px;
    margin-right: 16px;
    width: 32px;
  }
`;
const DetailRecruitment: React.FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const [isShowModal, setIsShowModal] = useState(false);
  const recruitment = useAppSelector(
    recruitmentSelectors.getRecruitmentSelector
  );
  const mess = useAppSelector(cvSelectors.isMessageSelector);

  console.log(mess);

  useLayoutEffect(() => {
    dispatch(getRecuitmentAction(params.id!));
  }, []);
  return (
    <Wrapper>
      <Title>Chi tiết tin tuyển dụng</Title>
      <BoxInfo>
        <p>Thông tin chung</p>
        <BoxMain>
          <BoxItem>
            <img src={mucLuong} alt="" />
            <div>
              <strong>Mức lương</strong>
              <br />
              <span>{checkSalary(recruitment?.salary!)}</span>
            </div>
          </BoxItem>
          <BoxItem>
            <img src={loainganh} alt="" />
            <div>
              <strong>Loại ngành</strong>
              <br />
              <span>{checkType(recruitment?.type!)}</span>
            </div>
          </BoxItem>
          <BoxItem>
            <img src={capbac} alt="" />
            <div>
              <strong>Cấp bậc</strong>
              <br />
              <span>Nhân viên</span>
            </div>
          </BoxItem>
        </BoxMain>
      </BoxInfo>
    </Wrapper>
  );
};

export default DetailRecruitment;
