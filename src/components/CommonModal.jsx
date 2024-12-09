// import React from "react";
// import { Modal, Button } from "antd";

// const CommonModal = ({
//   request,
//   title,
//   content,
//   cancelText = "취소", // 기본 텍스트
//   confirmText = "확인", // 기본 텍스트
//   onCancel,
//   onConfirm,
//   onClose,
//   isVisible,
// }) => {
//   return (
//     <Modal
//       title={title || (request && request.sender)}
//       open={isVisible}
//       onCancel={onClose || onCancel}
//       footer={[
//         onCancel && (
//           <Button key="cancel" onClick={onCancel}>
//             {cancelText}
//           </Button>
//         ),
//         onConfirm && (
//           <Button key="confirm" type="primary" onClick={onConfirm}>
//             {confirmText}
//           </Button>
//         ),
//       ]}
//     >
//       <p>{content || (request && request.content)}</p>
//     </Modal>
//   );
// };

// export default CommonModal;
import React from "react";
import { Modal } from "antd";
import styled, { createGlobalStyle } from "styled-components";

// 글로벌 스타일 정의
const GlobalStyle = createGlobalStyle`
  .ant-modal-mask {
    background-color: rgba(0, 0, 0, 0.8) !important; /* 어두운 백그라운드 */
  }
`;

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

  /* 모달 정중앙 위치 설정 */
  .ant-modal {
    top: 50% !important;
    transform: translateY(-50%) !important;
    width: 295px !important; /* 너비 지정 */
  }
`;

// Footer 스타일
const FooterButton = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #f0f0f0;
  background-color: #f7f7f7;
  width: 100%;
  border-top: #eeeeee solid 1px;
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
  request,
  title,
  content,
  cancelText = "취소",
  confirmText = "확인",
  onCancel,
  onConfirm,
  onClose,
  isVisible,
}) => {
  return (
    <>
      <GlobalStyle />
      <StyledModal
        open={isVisible}
        width={295}
        onCancel={onClose || onCancel}
        footer={null} // 기본 footer 제거
      >
        <h2 className="text-2xl font-bold pt-10 pb-4">
          {title || (request && request.sender)}
        </h2>
        <p>{content || (request && request.content)}</p>

        <FooterButton>
          <button onClick={onCancel}>{cancelText}</button>
          <button onClick={onConfirm}>{confirmText}</button>
        </FooterButton>
      </StyledModal>
    </>
  );
};

export default CommonModal;
