import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 75px;
  color: white;
  padding: 0 16px;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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

const Header = ({ title = "편지 작성", onBack }) => {
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
      <div style={{ width: "30px" }} /> {/* 오른쪽 공간 확보 */}
    </HeaderContainer>
  );
};

export default Header;
