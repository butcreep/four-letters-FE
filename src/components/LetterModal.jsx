import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

// Styled-components 정의
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background-color: #fff;
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  position: relative;
  border-radius: 8px;
`;

const Title = styled.h2`
  margin-top: 0;
`;

const Content = styled.p`
  line-height: 1.5;
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

const LetterModal = ({ letter, onClose }) => {
  const navigate = useNavigate();

  const handleWriteLetter = () => {
    navigate("/letter-select", { state: { recipient: letter } });
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Title>{letter.sender}님의 편지</Title>
        <Content>{letter.content}</Content>
        <CloseButton onClick={onClose}>닫기</CloseButton>
        <div className="flex">
          <Button text="요청 삭제" />{" "}
          <Button text="편지 쓰기" onClick={handleWriteLetter} />
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LetterModal;
