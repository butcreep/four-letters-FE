import React from "react";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const navigate = useNavigate();
  // 로그인 버튼 클릭 핸들러
  const handleLogin = () => {
    console.log("카카오 로그인 버튼 클릭");
    navigate("/home");
  };
  return (
    <div>
      <h1 className="text-center font-medium text-5xl">
        나한테 편지
        <br />
        받고싶은 사람
      </h1>
      <div className="w-full" onClick={handleLogin}>
        <div className="flex justify-center items-center bg-kakaoYellow w-full h-[54px] gap-2">
          <span>카카오 로그인</span>
        </div>
      </div>
    </div>
  );
};

export default Intro;
