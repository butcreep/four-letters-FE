import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
/* 눈누폰트 */
  @font-face {
    font-family: 'Ycomputer-Regular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/Ycomputer-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'YOnepickTTF-Bold';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2410-1@1.0/YOnepickTTF-Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
  }




.ycomputer-regular {
  font-family: 'Ycomputer-Regular', sans-serif;
}

.yonepick-bold {
  font-family: 'YOnepickTTF-Bold', sans-serif;
}
/* Y Onepick 폰트 스타일 */
.yonepick-title {
  font-family: 'YOnepickTTF-Bold', sans-serif;
  font-size: 52px;
  font-weight: bold;
  line-height: 1.4;
  letter-spacing: -0.03em;
}

.yonepick-subtitle {
  font-family: 'YOnepickTTF-Bold', sans-serif;
  font-size: 40px;
  font-weight: bold;
  line-height: 1.4;
  letter-spacing: -0.03em;
}

/* Pretendard 폰트 스타일 */
.pretendard-title {
  font-family: 'Pretendard', sans-serif;
  font-size: 24px;
  font-weight: bold;
  line-height: 1.3;
  letter-spacing: -0.03em;
}

.pretendard-button {
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.03em;
}


  .ant-modal-mask {
    background-color: rgba(0, 0, 0, 0.8) !important;
  }

  .ant-modal {
    top: 50% !important;
    transform: translateY(-50%) !important;
  }
`;

export default GlobalStyle;
