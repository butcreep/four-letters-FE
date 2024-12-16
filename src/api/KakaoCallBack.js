import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendKakaoAuthRequest } from "../api/auth";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/userSlice";
import Spinner from "components/ui/Spinner";
import loadImg from "assets/img/Load50.svg";

const KakaoCallBack = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const authorizationCode = new URLSearchParams(window.location.search).get(
      "code"
    );

    if (authorizationCode) {
      sendKakaoAuthRequest(authorizationCode)
        .then((data) => {
          const { token, userId, name = "사용자" } = data?.data || {};

          if (token) {
            // Redux 상태 업데이트
            dispatch(setUserInfo({ userId, token, name }));

            navigate("/home"); // 홈 화면으로 이동
          } else {
            console.error("토큰 값이 없습니다. 응답 데이터:", data);
            alert("로그인에 실패했습니다. 다시 시도해주세요.");
          }
        })
        .catch((error) => {
          console.error(
            "카카오 로그인 실패:",
            error.response?.data || error.message
          );
          alert("로그인에 실패했습니다. 다시 시도해주세요.");
        });
    } else {
      console.error("Authorization Code가 전달되지 않았습니다.");
    }
  }, [navigate, dispatch]);

  return (
    <Spinner text="카카오 로그인 중" size={180} opacity={0.8} image={loadImg} />
  );
};

export default KakaoCallBack;
