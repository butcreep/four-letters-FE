import { Button } from "antd";
import CommonButton from "components/CommonButton";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SantaLetterImage from "assets/icons/Santa-Letter.png";
import KakaoLogo from "assets/icons/Kakao.png";

const CenterImage = styled.div`
  background-image: url(${SantaLetterImage});
  background-size: cover;
  background-position: center;
  width: 220px; /* 원하는 너비 */
  height: 270px; /* 원하는 높이 */
  margin: 0 auto 58px; /* 가운데 정렬 */
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
      <h1 className="text-center font-medium text-5xl mb-[60px]">
        나한테 <span className="">편지</span>
        <br />
        받고싶은 사람
      </h1>
      <CenterImage />
      <CommonButton
        text="카카오로 시작하기"
        onClick={handleLogin}
        icon={KakaoLogo}
        bgColor="#FDE502"
        color="#3B1E1D"
      />
    </div>
  );
};

export default Intro;
