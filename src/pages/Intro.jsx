import CommonButton from "components/ui/CommonButton";
import React, { useEffect } from "react";
// import styled from "styled-components";
import SantaLetterImage from "assets/img/Santa-Letter.svg";
import KakaoLogo from "assets/icon/Kakao.svg";
import Snowbg from "assets/img/Intro_Snowbg.svg";
import { CenterImage } from "styles/ShareStyle";

// const CenterImage = styled.div`
//   background-image: url(${SantaLetterImage});
//   background-size: cover;
//   background-position: center;
//   width: 220px;
//   height: 270px;
//   margin: 0 auto 58px;
// `;

const Intro = () => {
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
        : "https://four-letters-fe.vercel.app/kakao/callback"; // 프로덕션 환경

    window.Kakao.Auth.authorize({
      redirectUri,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-slate-50 px-10">
      <div className="relative">
        <h1 className="yonepick-subtitle  text-center mb-[60px] ">
          나한테 <span className="yonepick-title gradient-text">편지</span>
          <br />
          받고 싶은 사람?
        </h1>
        <div className="absolute top-[-40px] w-[316px] left-[-15px]">
          <img src={Snowbg} alt="" className="w-full" />
        </div>
      </div>
      <CenterImage image={SantaLetterImage} size={220} height={270} margin={58} />
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
