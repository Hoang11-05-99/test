import { Modal } from "antd";
import React from "react";
import styled from "styled-components";
import { deleteCvAction } from "../../redux/action/cv";
import { useAppDispatch } from "../../redux/hooks";

interface Props {
  isShowModal: boolean;
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}
const Title = styled.h2`
  text-align: center;
  font-size: 20px;
  margin-top: 20px;
`;
const ModalDeleteCv: React.FC<Props> = ({
  isShowModal,
  setIsShowModal,
  id,
}) => {
  const dispatch = useAppDispatch();
  const handleOk = () => {
    setIsShowModal(false);
    dispatch(deleteCvAction(id));
  };

  const handleCancel = () => {
    setIsShowModal(false);
  };
  return (
    <Modal
      visible={isShowModal}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Có"
      cancelText="Không"
    >
      <Title>⚠️Bạn có muốn xóa hồ sơ không ?</Title>
    </Modal>
  );
};

export default ModalDeleteCv;
