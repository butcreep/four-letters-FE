import React from "react";
import styled from "styled-components";

// 공통 버튼 스타일
const StyledButton = styled.button`
  font-family: "Pretendard", sans-serif;
  background-color: ${props => props.$bgColor || "#4B31B5"};
  color: ${props => props.color || "#FFF"};
  padding: ${props => props.padding || "15px 20px"};
  border: none;
  border-radius: ${props => props.borderRadius || "8px"};
  font-size: ${props => props.fontSize || "16px"};
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  font-weight: 500;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    background-color: #78787e;
    cursor: not-allowed;
  }
`;

// 텍스트와 이미지를 감싸는 컨테이너 스타일
const ContentWrapper = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CommonButton = ({ text, onClick, icon, ...props }) => {
  return (
    <StyledButton onClick={onClick} {...props}>
      <ContentWrapper>
        {icon && <img src={icon} alt="icon" style={{ width: "24px", height: "24px" }} />}
        {text}
      </ContentWrapper>
    </StyledButton>
  );
};

export default CommonButton;
