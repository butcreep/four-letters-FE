import React from "react";
import styled, { css } from "styled-components";

const SpinnerBackground = styled.div`
  ${(props) =>
    props.hasBackground &&
    css`
      background-color: rgba(0, 0, 0, 0.8);
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 999;
    `}
`;

const SpinnerWrapper = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top: 4px solid #fff;
  border-radius: 50%;
  width: ${(props) => props.size || "24px"};
  height: ${(props) => props.size || "24px"};
  animation: spin 1s linear infinite;

  /* 화면 중앙 배치 */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Spinner = ({ size, text, hasBackground }) => (
  <>
    {hasBackground && <SpinnerBackground hasBackground />}
    <SpinnerWrapper size={size} />
    {text && (
      <p
        style={{
          position: "fixed",
          top: "55%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#fff",
          fontSize: "14px",
          zIndex: 1001,
        }}
      >
        {text}
      </p>
    )}
  </>
);

export default Spinner;
