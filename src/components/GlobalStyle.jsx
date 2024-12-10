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
  /* 프리텐다드 */
  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/woff2/Pretendard-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/woff2/Pretendard-Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
  }
/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Poor+Story&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Hi+Melody&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Gaegu:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Dongle:wght@300;400;700&display=swap');
  body {
    font-family: 'Pretendard', Arial, sans-serif; // 웹폰트 적용
  }
  /* Font Classes */
.poor-story {
  font-family: 'Poor Story', sans-serif;
}

.hi-melody {
  font-family: 'Hi Melody', cursive;
}

.gaegu {
  font-family: 'Gaegu', cursive;
}

.dongle {
  font-family: 'Dongle', sans-serif;
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
  line-height: 1.4; /* 140% */
  letter-spacing: -0.03em; /* -3% */
}

.yonepick-subtitle {
  font-family: 'YOnepickTTF-Bold', sans-serif;
  font-size: 40px;
  font-weight: bold;
  line-height: 1.4; /* 140% */
  letter-spacing: -0.03em; /* -3% */
}

/* Pretendard 폰트 스타일 */
.pretendard-title {
  font-family: 'Pretendard', sans-serif;
  font-size: 24px;
  font-weight: bold;
  line-height: 1.3; /* 130% */
  letter-spacing: -0.03em; /* -3% */
}

.pretendard-button {
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 500; /* medium */
  line-height: 1.2; /* 120% */
  letter-spacing: -0.03em; /* -3% */
}


  .ant-modal-mask {
    background-color: rgba(0, 0, 0, 0.8) !important; /* 어두운 백그라운드 */
  }

  .ant-modal {
    top: 50% !important;
    transform: translateY(-50%) !important;
  }
`;

export default GlobalStyle;
