import CommonButton from "components/ui/CommonButton";
import KakaoLogo from "assets/icon/Kakao.svg";
import React from "react";
import Header from "components/containers/HeaderContainer";

const RequestLink = () => {
  const requestFormLink = "https://four-letters-fe.vercel.app/request-form";

  // const handleCopyLink = () => {
  //   navigator.clipboard.writeText(requestFormLink);
  //   alert("링크가 복사되었습니다!");
  // };
  const handleCopyLink = () => {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      navigator.clipboard
        .writeText(requestFormLink)
        .then(() => {
          alert("링크가 복사되었습니다!");
        })
        .catch(err => {
          console.error("복사 실패:", err);
          fallbackCopyTextToClipboard(requestFormLink);
        });
    } else {
      fallbackCopyTextToClipboard(requestFormLink);
    }
  };

  const fallbackCopyTextToClipboard = text => {
    const input = document.createElement("input");
    input.value = text;
    document.body.appendChild(input);
    input.select();
    try {
      document.execCommand("copy");
      alert("링크가 복사되었습니다!");
    } catch (err) {
      console.error("Fallback 복사 실패:", err);
      alert("복사에 실패했습니다. 수동으로 복사해주세요.");
    }
    document.body.removeChild(input);
  };

  const handleKakaoShare = () => {
    window.open(
      `https://sharer.kakao.com/talk/friends/picker/link?url=${encodeURIComponent(requestFormLink)}`,
      "_blank",
    );
  };

  return (
    <>
      <Header title="편지 신청서" />
      <div className="px-40 flex flex-col items-center h-screen text-white pt-10 w-full overflow-y-auto">
        <p className="text-center text-3xl mb-10 font-semibold">
          신청서를 보내면
          <br />
          친구에게 💌 편지 요청이
          <br />
          도착해요!
        </p>
        <div className="mb-[60px] w-full">
          <div className="rounded-lg">
            <div className="mb-[30px]">
              <label htmlFor="requestLink" className="block text-sm font-medium mb-2">
                신청 링크
              </label>
              <div className="flex justify-between items-center py-[13px] px-[14px] rounded-lg border-[#78787E] border gap-3">
                <input
                  id="requestLink"
                  type="text"
                  readOnly
                  value={requestFormLink}
                  className="bg-transparent text-[var(--color-deep-white)] w-5/6 mr-2overflow-hidden text-ellipsis whitespace-nowrap"
                />
                <button onClick={handleCopyLink} className="text-sm font-bold text-[var(--color-deep-purple)]">
                  복사
                </button>
              </div>
              <p className="text-xs mt-[10px]">신청서 링크를 복사해서 공유해 보세요!</p>
            </div>
            <div>
              <label htmlFor="requestLink" className="block text-sm font-medium mb-2">
                카카오로 공유
              </label>
              <CommonButton
                text="카카오로 공유하기"
                onClick={handleKakaoShare}
                icon={KakaoLogo}
                $bgColor="#FDE502"
                color="#3B1E1D"
              />
              <p className="text-xs mt-2">카카오톡에 등록된 친구에게 링크를 공유합니다.</p>
            </div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-[#242228]"></div>
        <div className="text-left mt-[30px] ">
          <p className="mb-3 text-base">안내사항</p>
          <ul className="text-sm text-[#B1B1B9]">
            <li className="pb-[6px]">
              편지를 요청해야 작성자가 편지를 발송할 수 있습니다. (카카오 알림톡으로 편지를 보내드려요)
            </li>
            <li>작성자가 편지를 거절할 수 있습니다. (단, 요청자에게 알림이 가지 않아요)</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default RequestLink;
