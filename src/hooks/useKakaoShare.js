const initializeKakao = () => {
  if (!window.Kakao?.isInitialized()) {
    window.Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_API_KEY);
    console.log("Kakao SDK initialized:", window.Kakao.isInitialized());
  }
};

const shareCompleteLink = (type, requestId) => {
  console.log("👉", type, requestId);
  initializeKakao();

  const templateId =
    type === "FORM" ? 115325 : type === "COMPLETE" ? 115354 : null;

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
export default shareCompleteLink;
