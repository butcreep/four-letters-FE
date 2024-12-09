import React from "react";
import styled from "styled-components";

// Styled-components 정의
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  max-width: 400px;
  width: 100%;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  position: relative;
`;

const Title = styled.h2`
  margin-top: 0;
  font-size: 18px;
  font-weight: bold;
`;

const Content = styled.p`
  margin: 20px 0;
  font-size: 14px;
  color: #555;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  background-color: ${props => (props.cancel ? "#ddd" : "#007bff")};
  color: ${props => (props.cancel ? "#333" : "white")};

  &:hover {
    background-color: ${props => (props.cancel ? "#ccc" : "#0056b3")};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

// 공통 모달 컴포넌트
const Modal = ({
  type,
  request,
  title,
  content,
  cancelText = "취소", // 기본 텍스트
  confirmText = "확인", // 기본 텍스트
  onCancel,
  onConfirm,
  onClose,
}) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        {title ? <Title>{title}</Title> : <Title>{request.sender}</Title>}
        {content ? <Content>{content}</Content> : <Content>{request.content}</Content>}
        <ButtonGroup>
          {onCancel && (
            <Button cancel onClick={onCancel}>
              {cancelText}
            </Button>
          )}
          {onConfirm && <Button onClick={onConfirm}>{confirmText}</Button>}
        </ButtonGroup>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
