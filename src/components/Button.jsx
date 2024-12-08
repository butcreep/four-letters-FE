import React from "react";
import styled from "styled-components";

// 공통 버튼 스타일
const StyledButton = styled.button`
  background-color: ${(props) => props.bgColor || "#ffbf00"}; /* 기본 배경색 */
  color: ${(props) => props.color || "#FFF"}; /* 기본 텍스트 색상 */
  padding: ${(props) => props.padding || "10px 20px"}; /* 기본 패딩 */
  border: none;
  border-radius: ${(props) => props.borderRadius || "5px"}; /* 기본 테두리 */
  font-size: ${(props) => props.fontSize || "16px"}; /* 기본 글자 크기 */
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) =>
      props.hoverColor || "#ffbf00"}; /* 기본 hover 색상 */
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

// 버튼 컴포넌트
const Button = ({ text, onClick, ...props }) => {
  return (
    <StyledButton onClick={onClick} {...props}>
      {text}
    </StyledButton>
  );
};

export default Button;
