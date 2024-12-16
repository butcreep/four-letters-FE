import React from "react";
import styled from "styled-components";
import { Spin } from "antd";

const GradientIcon = styled.div`
  svg {
    width: ${props => props.size || 48}px;
    height: ${props => props.size || 48}px;
    animation: spin 2s linear infinite;

    /* SVG에 대한 그라데이션 스타일 추가 */
    circle {
      stroke: url(#gradient);
      stroke-width: 3;
      fill: none;
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const GradientSpin = ({ size }) => (
  <GradientIcon size={size}>
    <svg viewBox="0 0 50 50" style={{ background: "none" }}>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#867cdd" />
          <stop offset="100%" stopColor="#eec8ff" />
        </linearGradient>
      </defs>
      <circle cx="25" cy="25" r="20" />
    </svg>
  </GradientIcon>
);

const Spinner = ({ opacity = 0, size = 48, text = "", image = null }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: `rgba(0, 0, 0, ${opacity})`,
        zIndex: 1000,
      }}
    >
      {image && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[80%]">
          <img
            src={image}
            alt="spinner-icon"
            style={{
              width: "84px",
            }}
          />
        </div>
      )}
      <Spin indicator={<GradientSpin size={size} />} />

      {text && (
        <p
          style={{
            marginTop: 16,
            color: "#fff",
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {text}
        </p>
      )}
    </div>
  );
};

export default Spinner;
