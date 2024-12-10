const modalSettings = {
  continueWriting: {
    title: data => "이어서 작성할까요?",
    content: data => "작성 중이던 편지가 있습니다.",
    buttons: [
      { text: "취소", actionKey: "onCancel" },
      { text: "이어서 작성", actionKey: "onConfirm" },
    ],
    showCloseButton: false,
  },
  friendRequest: {
    title: data => data.sender,
    content: data => data.content,
    buttons: [
      { text: "요청 삭제", actionKey: "onCancel" },
      { text: "편지 쓰기", actionKey: "onConfirm" },
    ],
    showCloseButton: true,
  },
  deleteRequest: {
    title: () => "요청을 삭제할까요?",
    content: () => "삭제하면 되돌릴 수 없습니다.",
    buttons: [
      { text: "취소", actionKey: "onCancel" },
      { text: "삭제", actionKey: "onConfirm" },
    ],
    showCloseButton: false,
  },
  // 추가 모달 설정 가능
};

export default modalSettings;
