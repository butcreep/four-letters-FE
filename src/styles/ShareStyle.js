import styled from "styled-components";
import EmptyLetter from "assets/Empty-letter.svg";

export const BackgroundContainer = styled.div`
  background-image: url(${props => props.background});
  background-size: cover;
  background-position: center;
  height: 100%;
  overflow: hidden;
`;

export const ContentWrapper = styled.div`
  padding: 0 40px;
  border-radius: 12px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding-top: 30px;
  margin-top: ${props => `${props.margin}px` || "0"};
`;

export const TextAreaWrapper = styled.div`
  width: 100%;
  position: relative;
  background-color: #ece5dd;
  border-radius: 12px;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FixedText = styled.div`
  font-size: 16px;
  color: #000;
  margin: 5px 0;
`;

export const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;
export const CenterImage = styled.div`
  background-image: url(${props => props.image || EmptyLetter});
  background-size: cover;
  background-position: center;
  /* width: ${props => props.size || "100px"};
  height: ${props => props.height || props.size || "90px"};
  margin: 0 auto ${props => props.margin || "24px"}; */
  width: ${props => (typeof props.size === "number" ? `${props.size}px` : props.size || "100px")};
  height: ${props => (typeof props.height === "number" ? `${props.height}px` : props.height || props.size || "90px")};
  margin: 0 auto ${props => (typeof props.margin === "number" ? `${props.margin}px` : props.margin || "24px")};
`;
export const GradientDiv = styled.div`
  background: linear-gradient(180deg, #867cdd 0%, #6157b6 100%);
  width: 100%;
  height: calc(100% - 60px);
  position: relative;
  &::before {
    content: "";
    display: block;
    position: absolute;
    background-color: #fff;
    border-radius: 12px 0 0 0;
    top: -30px;
    left: 40px;
    width: calc(100% - 80px);
    height: 30px;
    z-index: 1;
  }
`;
export const GradientOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 200px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
  bottom: 0;
  pointer-events: none;
  z-index: 1;
`;
