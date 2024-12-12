import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 75px;
  color: white;
  padding: 0 20px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    opacity: 0.8;
  }
`;

const Title = styled.h1`
  text-align: center;
  flex-grow: 1;
`;

const Header = ({ title = "편지 작성", onBack, onDelete }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1); // 이전 페이지로 이동
    }
  };

  return (
    <HeaderContainer>
      <BackButton onClick={handleBack}>← {/* 왼쪽 화살표 표시 */}</BackButton>
      <Title className="pretendard-button">{title}</Title>
      {onDelete ? <p onClick={onDelete}>삭제</p> : <div style={{ width: "30px" }} />} {/* 삭제 버튼 또는 여백 */}
    </HeaderContainer>
  );
};

export default Header;
