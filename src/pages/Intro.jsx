import CommonButton from "components/ui/CommonButton";
import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SantaLetterImage from "assets/img/Santa-Letter.svg";
import KakaoLogo from "assets/icon/Kakao.svg";
import Snowbg from "assets/img/Intro_Snowbg.svg";

const CenterImage = styled.div`
  background-image: url(${SantaLetterImage});
  background-size: cover;
  background-position: center;
  width: 220px; /* 원하는 너비 */
  height: 270px; /* 원하는 높이 */
  margin: 0 auto 58px; /* 가운데 정렬 */
`;
const GradientText = styled.span`
  background: linear-gradient(180deg, #867cdd 0%, #eec8ff 100%);
  -webkit-background-clip: text; /* 텍스트로 배경을 클리핑 */
  -webkit-text-fill-color: transparent; /* 텍스트를 투명하게 */
`;

const Intro = () => {
  // const navigate = useNavigate();
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_REST_API_KEY);
      console.log("Kakao SDK initialized");
    } else if (!window.Kakao) {
      console.error("Kakao SDK 로드 실패: window.Kakao가 정의되지 않았습니다.");
    }
  }, []);

  const handleLogin = () => {
    if (!window.Kakao) {
      console.error("Kakao 객체가 정의되지 않았습니다.");
      alert("카카오 SDK가 로드되지 않았습니다.");
      return;
    }

    const redirectUri =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/kakao/callback" // 로컬 환경
        : "https://mushy-marisa-dgnppr-a63d5cc2.koyeb.app/kakao/callback"; // 프로덕션 환경

    window.Kakao.Auth.authorize({
      redirectUri,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-slate-50 px-10">
      <div className="relative">
        <h1 className="yonepick-subtitle  text-center mb-[60px] ">
          나한테 <GradientText className="yonepick-title">편지</GradientText>
          <br />
          받고 싶은 사람?
        </h1>
        <div className="absolute top-[-40px] w-[316px] left-[-15px]">
          <img src={Snowbg} alt="" className="w-full" />
        </div>
      </div>
      <CenterImage />
      <CommonButton
        text="카카오로 시작하기"
        onClick={handleLogin}
        icon={KakaoLogo}
        $bgColor="#FDE502"
        color="#3B1E1D"
      />
    </div>
  );
};

export default Intro;
