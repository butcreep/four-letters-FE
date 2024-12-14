import CommonButton from "components/ui/CommonButton";
import KakaoLogo from "assets/icon/Kakao.svg";
import React, { useEffect, useState } from "react";
import Header from "components/containers/HeaderContainer";
import { useSelector } from "react-redux";
import { getRequestLinks } from "api/requests";
import Spinner from "components/ui/Spinner";
import kakaoThumbnail from "assets/img/Thumbnail_img.png";
const RequestLink = () => {
  const [requestId, setRequestId] = useState("");
  const [loading, setLoading] = useState(true);

  const userId = useSelector((state) => state.user?.userId);
  useEffect(() => {
    if (!window.Kakao?.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_API_KEY); // 카카오 JavaScript 키로 초기화
    }
    console.log(window.Kakao.isInitialized());
  }, []);
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const data = await getRequestLinks(userId);

        setRequestId(data?.data.linkId || "123");
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };
    fetchRequests();
  }, [userId]);

  const requestFormLink = `https://four-letters-fe.vercel.app/request-form/${requestId}`;

  const handleCopyLink = () => {
    if (
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      navigator.clipboard
        .writeText(requestFormLink)
        .then(() => {
          alert("링크가 복사되었습니다!");
        })
        .catch((err) => {
          console.error("복사 실패:", err);
          fallbackCopyTextToClipboard(requestFormLink);
        });
    } else {
      fallbackCopyTextToClipboard(requestFormLink);
    }
  };

  const fallbackCopyTextToClipboard = (text) => {
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
    if (!navigator.userAgent.match(/(iPhone|iPod|iPad|Android)/)) {
      alert("데스크톱 환경에서는 링크로 이동합니다.");
      window.open(requestFormLink, "_blank");
      return;
    }

    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_API_KEY);
      }

      window.Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: "편지 신청서",
          description: "신청서를 보내면 친구에게 💌 편지 요청이 도착해요!",
          imageUrl: `${kakaoThumbnail}`, // 대표 이미지 URL
          link: {
            mobileWebUrl: requestFormLink,
            webUrl: requestFormLink,
          },
        },
        buttons: [
          {
            title: "신청서 작성하기",
            link: {
              mobileWebUrl: requestFormLink,
              webUrl: requestFormLink,
            },
          },
        ],
      });
    } else {
      alert("카카오톡 SDK가 로드되지 않았습니다.");
    }
  };

  return (
    <>
      {loading && <Spinner opacity={0.8} />}
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
              <label
                htmlFor="requestLink"
                className="block text-sm font-medium mb-2"
              >
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
                <button
                  onClick={handleCopyLink}
                  className="text-sm font-bold text-[var(--color-deep-purple)]"
                >
                  복사
                </button>
              </div>
              <p className="text-xs mt-[10px]">
                신청서 링크를 복사해서 공유해 보세요!
              </p>
            </div>
            <div>
              <label
                htmlFor="requestLink"
                className="block text-sm font-medium mb-2"
              >
                카카오로 공유
              </label>
              <CommonButton
                text="카카오로 공유하기"
                onClick={handleKakaoShare}
                icon={KakaoLogo}
                $bgColor="#FDE502"
                color="#3B1E1D"
              />
              <p className="text-xs mt-2">
                카카오톡에 등록된 친구에게 링크를 공유합니다.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-[#242228]"></div>
        <div className="text-left mt-[30px] ">
          <p className="mb-3 text-base">안내사항</p>
          <ul className="text-sm text-[#B1B1B9] list-disc list-inside">
            <li className="pb-[6px]">
              편지를 요청해야 작성자가 편지를 발송할 수 있습니다. (카카오
              알림톡으로 편지를 보내드려요)
            </li>
            <li>
              작성자가 편지를 거절할 수 있습니다. (단, 요청자에게 알림이 가지
              않아요)
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default RequestLink;
