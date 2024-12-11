import React from "react";
import styled from "styled-components";

// 공통 버튼 스타일
const StyledButton = styled.button`
  font-family: "Pretendard", sans-serif;
  background-color: ${props => props.$bgColor || "#4B31B5"}; /* 기본 배경색 */
  color: ${props => props.color || "#FFF"}; /* 기본 텍스트 색상 */
  padding: ${props => props.padding || "15px 20px"}; /* 기본 패딩 */
  border: none;
  border-radius: ${props => props.borderRadius || "8px"}; /* 기본 테두리 */
  font-size: ${props => props.fontSize || "16px"}; /* 기본 글자 크기 */
  cursor: pointer;
  transition: background-color 0.3s;
  width: 295px;
  font-weight: 500;
  margin: 0 auto;
  display: flex; /* 플렉스 컨테이너 */
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 가로 중앙 정렬 */

  /* &:hover {
    background-color: ${props => props.hoverColor || "#4B31B5"}; 
  } */

  &:disabled {
    background-color: #78787e;
    cursor: not-allowed;
  }
`;

// 텍스트와 이미지를 감싸는 컨테이너 스타일
const ContentWrapper = styled.span`
  display: flex; /* 플렉스 컨테이너 */
  align-items: center; /* 세로 중앙 정렬 */
  gap: 10px; /* 이미지와 텍스트 간격 */
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
