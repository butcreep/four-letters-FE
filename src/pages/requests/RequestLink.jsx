import React from "react";

const RequestLink = () => {
  const requestFormLink = "https://four-letters-fe.vercel.app/request-form";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(requestFormLink);
    alert("링크가 복사되었습니다!");
  };

  const handleKakaoShare = () => {
    window.open(
      `https://sharer.kakao.com/talk/friends/picker/link?url=${encodeURIComponent(requestFormLink)}`,
      "_blank",
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-2xl font-bold mb-6">편지 신청서</h1>
      <p className="text-center text-lg mb-8">신청서를 보내면 친구에게 ❤️ 편지 요청이 도착해요!</p>
      <div className="bg-gray-800 p-6 rounded-lg w-[90%] max-w-md">
        <div className="mb-4">
          <label htmlFor="requestLink" className="block text-sm font-medium mb-2">
            신청 링크
          </label>
          <div className="flex items-center bg-gray-700 p-2 rounded">
            <input
              id="requestLink"
              type="text"
              readOnly
              value={requestFormLink}
              className="bg-transparent text-white w-full mr-2"
            />
            <button onClick={handleCopyLink} className="text-sm bg-blue-500 px-4 py-2 rounded font-bold">
              복사
            </button>
          </div>
          <p className="text-sm mt-2">신청서 링크를 복사해서 공유해 보세요!</p>
        </div>
        <div className="flex flex-col items-center">
          <button onClick={handleKakaoShare} className="w-full bg-yellow-500 text-black py-2 rounded font-bold text-lg">
            카카오로 공유하기
          </button>
          <p className="text-sm mt-2">카카오톡에 등록된 친구에게 링크를 공유합니다.</p>
        </div>
      </div>
      <div className="text-left text-sm mt-6 w-[90%] max-w-md">
        <p className="mb-2">📌 안내사항</p>
        <ul className="list-disc list-inside">
          <li>편지를 요청해야 작성자가 편지를 발송할 수 있습니다.</li>
          <li>작성자가 편지를 거절할 수 있습니다. (단, 요청자에게 알림이 가지 않아요)</li>
        </ul>
      </div>
    </div>
  );
};

export default RequestLink;
