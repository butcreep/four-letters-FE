import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import images from "assets";

const FooterContainer = styled.div`
  position: absolute; /* 부모 컨테이너 기준 위치 고정 */
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  background-color: #333;
  color: white;
`;

const FooterButton = styled.button`
  border: none;
  color: ${({ active }) => (active ? "#fff" : "#777779")};
  font-size: 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const buttons = [
  {
    path: "/home",

    icon: {
      active: images.footerIcons.homeOn,
      inactive: images.footerIcons.homeOff,
    },
  },
  {
    path: "/archive",

    icon: {
      active: images.footerIcons.storageOn,
      inactive: images.footerIcons.storageOff,
    },
  },
];

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <FooterContainer>
      {buttons.map((button) => (
        <FooterButton
          key={button.path}
          onClick={() => navigate(button.path)}
          active={location.pathname === button.path}
        >
          <img
            src={
              location.pathname === button.path
                ? button.icon.active
                : button.icon.inactive
            }
            alt={button.label}
          />
        </FooterButton>
      ))}
    </FooterContainer>
  );
};

export default Footer;
