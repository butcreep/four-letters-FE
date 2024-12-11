import CommonButton from "components/ui/CommonButton";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SantaLetterImage from "assets/img/Santa-Letter.svg";
import KakaoLogo from "assets/icon/Kakao.svg";

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
  font-size: 52px; /* "편지"의 크기 */
`;

const Intro = () => {
  const navigate = useNavigate();
  // 로그인 버튼 클릭 핸들러
  const handleLogin = () => {
    console.log("카카오 로그인 버튼 클릭");
    navigate("/home");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen text-slate-50">
      <h1 className="yonepick-subtitle  text-center mb-[60px] ">
        나한테 <GradientText className="yonepick-title">편지</GradientText>
        <br />
        받고 싶은 사람?
      </h1>
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
