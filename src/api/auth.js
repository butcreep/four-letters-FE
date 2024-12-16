import apiClient from "./apiClient";

/**
 * 카카오 인증 요청을 서버에 보내는 API
 * @param {String} authorizationCode - 카카오에서 발급한 인증 코드
 * @returns {Promise<Object>} - 서버 응답 데이터
 * @throws {Error} - API 요청 실패 시 에러 메시지
 */

export const sendKakaoAuthRequest = async (authorizationCode) => {
  try {
    console.log("redirectionUri:", `${window.location.origin}/kakao/callback`);
    const response = await apiClient.post("/auth/kakao", {
      authorizationCode,
      redirectionUri: `${window.location.origin}/kakao/callback`,
    });

    return response.data; // 응답 데이터를 반환합니다.
  } catch (error) {
    console.error("API 요청 실패:", error.response?.data || error.message);
    throw error; // 호출자에게 에러를 전달합니다.
  }
};
