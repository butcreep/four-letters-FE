import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import storage from "assets/icon/Storage-Box-On.svg";
import home from "assets/icon/Home-On.svg";
const FooterContainer = styled.div`
  position: absolute; /* 부모 컨테이너 기준 위치 고정 */
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  background-color: #333;
  color: white;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.2);
`;

const FooterButton = styled.button`
  border: none;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }
`;

const Footer = () => {
  const navigate = useNavigate();

  return (
    <FooterContainer>
      <FooterButton onClick={() => navigate("/")}>
        <img src={home} alt="" />홈
      </FooterButton>
      <FooterButton onClick={() => navigate("/archive")}>
        <img src={storage} alt="" />
        보관함
      </FooterButton>
    </FooterContainer>
  );
};

export default Footer;
