import React from "react";
import { Modal } from "antd";
import styled from "styled-components";
import modalSettings from "settings/modalSettings"; // 분리된 설정 파일 import

// 백그라운드 오버레이와 모달 스타일
const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 16px;
    padding: 0px;
    overflow: hidden;
  }

  .ant-modal-header {
    padding: 0;
  }

  .ant-modal-title {
    margin: 20px 0;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
  }

  .ant-modal-body {
    text-align: center;
  }
`;

const FooterButton = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #f0f0f0;
  background-color: #f7f7f7;
  width: 100%;
  margin-top: 40px;

  button {
    width: 100%;
    padding: 12px 0;
    font-size: 16px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;

    &:nth-child(1) {
      color: #333;
    }

    &:nth-child(2) {
      color: #4b31b5;
      border-left: 1px solid #eeeeee;
    }
  }
`;

const CommonModal = ({
  type,
  isVisible,
  onCancel,
  onConfirm,
  onClose,
  data, // 추가 데이터 전달
}) => {
  const currentModal = modalSettings[type] || {};

  return (
    <StyledModal
      open={isVisible}
      width={currentModal.width || 295}
      onCancel={onClose || onCancel}
      footer={null}
      closable={currentModal.showCloseButton || false}
    >
      <h2 className="text-2xl font-bold pt-10 pb-4">
        {currentModal.title(data)} {/* 동적 타이틀 처리 */}
      </h2>
      <p>{currentModal.content(data)}</p> {/* 동적 내용 처리 */}
      <FooterButton>
        {currentModal.buttons &&
          currentModal.buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.actionKey === "onCancel" ? onCancel : onConfirm} // 버튼 핸들러 연결
            >
              {button.text}
            </button>
          ))}
      </FooterButton>
    </StyledModal>
  );
};

export default CommonModal;
