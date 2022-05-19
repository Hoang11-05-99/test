import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getAllCreatorAction } from "../../redux/action/recruitment";
import { useAppDispatch } from "../../redux/hooks";
import { setStatusRecruitment } from "../../redux/reducers/recruitment.reducer";
import TableRecruitment from "./TableRecruitment";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 70px;
  padding: 0 30px 50px 30px;
  background: -webkit-linear-gradient(left, #25c481, #25b7c4);
  background: linear-gradient(to right, #25c481, #25b7c4);
`;

const StyledSearch = styled.div`
  display: flex;
  gap: 5px;
  & h3 {
    white-space: nowrap;
    margin: 0;
  }
`;

export interface DataFilterRecruitment {
  address: {
    index: number;
  };
  type: {
    index: number;
  };
  workingForm: {
    index: number;
  };
  salary: {
    index: number;
  };
  rank: {
    index: number;
  };
  workExperience: {
    index: number;
  };
  name: {
    nameString: string;
  };
}
const MyRecruitment: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isShowModal, setIsShowModal] = useState(false);
  const [dataFilter, setDataFilter] = useState<DataFilterRecruitment>({
    address: { index: -1 },
    type: { index: -1 },
    salary: { index: -1 },
    rank: { index: -1 },
    workingForm: { index: -1 },
    workExperience: { index: -1 },
    name: { nameString: "" },
  });

  useEffect(() => {
    async function fetchData() {
      await dispatch(getAllCreatorAction());
      dispatch(setStatusRecruitment());
      // ...
    }
    fetchData();
  }, []);
  return (
    <Wrapper>
      <h1>Bài đăng của tôi</h1>
      <StyledSearch>
        <h3>Tìm bài đăng:</h3>
        <Input
          style={{ width: "15%", marginRight: "20px" }}
          onChange={(e) => {
            setDataFilter({
              ...dataFilter,
              name: { nameString: e.target.value },
            });
          }}
        />
        <Button
          type="primary"
          onClick={async () => {
            await dispatch(setStatusRecruitment());
            navigate("/recruitment/create");
          }}
        >
          Tạo bài
        </Button>
      </StyledSearch>
      <TableRecruitment
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
        dataFilter={dataFilter}
      />
    </Wrapper>
  );
};

export default MyRecruitment;
