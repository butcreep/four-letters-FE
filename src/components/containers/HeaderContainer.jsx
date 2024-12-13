import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Back from "assets/icon/Back-button.svg";
import Home from "assets/icon/Home-On.svg";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
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
  height: 24px;
  line-height: 24px !important;
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
      <BackButton onClick={handleBack}>
        <img src={Back} alt="" />
      </BackButton>
      <Title className="pretendard-button">{title}</Title>
      <div onClick={() => navigate("/home")}>
        <img src={Home} alt="" />
      </div>
    </HeaderContainer>
  );
};

export default Header;
