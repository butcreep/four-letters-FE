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
  letterDelete: {
    title: () => "편지를 삭제할까요?",
    content: () => "삭제하면 되돌릴 수 없습니다.",
    buttons: [
      { text: "취소", actionKey: "onCancel" },
      { text: "삭제", actionKey: "onConfirm" },
    ],
    showCloseButton: false,
  },
  letterSaveModal: {
    title: () => "편지를 보관함에 저장할까요?",
    content: () => "편지를 저장하면 이후에 다시 확인할 수 있습니다.",
    buttons: [
      { text: "취소", actionKey: "onCancel" },
      { text: "저장", actionKey: "onConfirm" },
    ],
    showCloseButton: true,
  },
  letterSaveComplete: {
    title: () => "편지가 저장되었습니다.",
    content: () => "작성 중이던 편지가 보관함에 저장되었습니다.",
    buttons: [{ text: "확인", actionKey: "onCancel" }],
    showCloseButton: false,
  },
  letterSendConfirm: {
    title: () => "편지를 보낼까요?",
    content: () => "작성한 편지는 보낸 후 수정할 수 없습니다.",
    buttons: [
      { text: "취소", actionKey: "onCancel" },
      { text: "보내기", actionKey: "onConfirm" },
    ],
    showCloseButton: true,
  },
  letterAskComplete: {
    title: () => "편지가 요청되었습니다.",
    content: () => "편지를 기다려보세요.",
    buttons: [{ text: "확인", actionKey: "onConfirm" }],
    showCloseButton: false,
  },
};

export default modalSettings;
