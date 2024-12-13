import React from "react";
import styled from "styled-components";
import { Spin } from "antd";

const GradientIcon = styled.div`
  svg {
    width: ${(props) => props.size || 48}px; /* 스피너 크기 동적 */
    height: ${(props) => props.size || 48}px;
    animation: spin 2s linear infinite;

    /* SVG에 대한 그라데이션 스타일 추가 */
    circle {
      stroke: url(#gradient);
      stroke-width: 4;
      fill: none; /* 투명한 배경 유지 */
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

const Spinner = ({
  opacity = 0, // 기본 투명도
  size = 48, // 기본 스피너 크기
  text = "", // 기본 텍스트
  image = null, // 기본 이미지 없음
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column", // 수직 정렬
        justifyContent: "center",
        alignItems: "center",
        background: `rgba(0, 0, 0, ${opacity})`,
        zIndex: 1000,
      }}
    >
      {/* 이미지가 있으면 렌더링 */}
      {image && (
        <img
          src={image}
          alt="spinner-icon"
          style={{
            width: size * 1.5, // 이미지 크기 조정 (스피너보다 약간 큼)
            marginBottom: 16, // 스피너와 간격
          }}
        />
      )}
      <Spin indicator={<GradientSpin size={size} />} />
      {/* 텍스트가 있으면 렌더링 */}
      {text && (
        <p
          style={{
            marginTop: 16,
            color: "#fff",
            fontSize: 16,
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
