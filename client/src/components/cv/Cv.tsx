import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getStatusFalseCvAction,
  getStatusTrueCvAction,
} from "../../redux/action/cv";
import { useAppDispatch } from "../../redux/hooks";
import TableCv from "./TableCv";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 70px;
  padding: 0 30px 50px 30px;
  background: -webkit-linear-gradient(left, #25c481, #25b7c4);
  background: linear-gradient(to right, #25c481, #25b7c4);
`;
const StyledSelect = styled.select`
  width: 100px;
  height: 30px;
`;
const Cv = () => {
  const [isShowModalProfile, setIsShowModalProfile] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function fetchData() {
      await dispatch(getStatusFalseCvAction());
    }
    fetchData();
  }, []);
  return (
    <Wrapper>
      <h1>Quản lý hồ sơ</h1>
      <StyledSelect
        defaultValue={0}
        onChange={(e) => {
          if (+e.target.value === 1) {
            dispatch(getStatusTrueCvAction());
            console.log("true");
          } else {
            dispatch(getStatusFalseCvAction());
            console.log("false");
          }
        }}
      >
        <option value={0}>Chưa duyệt</option>
        <option value={1}>Đã duyệt</option>
      </StyledSelect>
      <TableCv
        isShowModalDelete={isShowModalDelete}
        setIsShowModalDelete={setIsShowModalDelete}
        isShowModalProfile={isShowModalProfile}
        setIsShowModalProfile={setIsShowModalProfile}
      />
    </Wrapper>
  );
};

export default Cv;
