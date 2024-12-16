// const useKakaoShare = (templateId, requestId) => {
//   console.log("Request ID for sharing:", requestId); // 디버깅용 로그

//   // requestId 값이 없을 경우 알림 표시
//   if (!requestId) {
//     alert("링크 ID가 없습니다. 다시 시도해주세요.");
//     return;
//   }

//   try {
//     if (window.Kakao && window.Kakao.isInitialized()) {
//       // 템플릿 ID를 사용하여 카카오톡 공유
//       window.Kakao.Link.sendCustom({
//         templateId: 115325, // 카카오 디벨로퍼스에서 생성한 템플릿 ID
//         templateArgs: {
//           linkId: requestId, // 템플릿에서 사용하는 변수
//         },
//       });
//     } else {
//       alert("카카오 SDK가 초기화되지 않았습니다.");
//     }
//   } catch (error) {
//     console.error("카카오 공유 실패:", error);
//     alert("카카오 공유에 실패했습니다. 다시 시도해주세요.");
//   }
// };

// export default useKakaoShare;

import { useEffect } from "react";

const useKakaoShare = (type, requestId) => {
  const templateId = type === "FORM" ? 115325 : type === "COMPLETE" ? 115354 : null;

  useEffect(() => {
    if (!window.Kakao?.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_API_KEY);
      console.log("Kakao SDK initialized:", window.Kakao.isInitialized());
    }
  }, []);

  const shareLink = () => {
    if (!requestId) {
      alert("링크 ID가 없습니다. 다시 시도해주세요.");
      return;
    }

    if (!templateId) {
      console.error("Invalid template type provided:", type);
      alert("템플릿 ID가 유효하지 않습니다.");
      return;
    }

    try {
      if (window.Kakao && window.Kakao.isInitialized()) {
        window.Kakao.Link.sendCustom({
          templateId,
          templateArgs: {
            linkId: requestId,
          },
        });
      } else {
        alert("카카오 SDK가 초기화되지 않았습니다.");
      }
    } catch (error) {
      console.error("카카오 공유 실패:", error);
      alert("카카오 공유에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return shareLink;
};

export default useKakaoShare;
