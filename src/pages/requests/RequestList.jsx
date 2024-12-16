import React from "react";
import Arrow from "assets/icon/Arrow-right.svg";
import CommonButton from "components/ui/CommonButton";
import { useLocation, useNavigate } from "react-router-dom";
import Tree from "assets/icon/Tree.svg";
import ListTitleSnow from "assets/icon/Snow/ListTitleSnow.svg";
import LetterSide from "assets/img/Background-Side.svg";
import Spinner from "components/ui/Spinner";
import { CenterImage, GradientDiv, GradientOverlay } from "styles/ShareStyle";

// const GradientDiv = styled.div`
//   width: 100%;
//   height: calc(100% - 60px);
//   position: relative;
//   &::before {
//     content: "";
//     display: block;
//     position: absolute;
//     background-color: #fff;
//     border-radius: 12px 0 0 0;
//     top: -30px;
//     left: 40px;
//     width: calc(100% - 80px);
//     height: 30px;
//     z-index: 1;
//   }
// `;
// const CenterImage = styled.div`
//   background-image: url(${EmptyLetter});
//   background-size: cover;
//   background-position: center;
//   width: 100px;
//   height: 90px;
//   margin: 0 auto 24px;
// `;
// const StyledUlWrapper = styled.div`
//   position: relative;
//   height: calc(100% - 180px);
//   overflow: hidden;
//   border-radius: 0 0 12px 12px;
// `;

// const StyledUl = styled.ul`
//   background: white;
//   width: 100%;
//   position: relative;
//   height: 100%;
//   padding-bottom: 30px;
//   overflow-y: auto;
//   scrollbar-width: none;
//   -ms-overflow-style: none;

//   &::-webkit-scrollbar {
//     display: none;
//   }
// `;
// const GradientOverlay = styled.div`
//   position: absolute;
//   width: 100%;
//   height: 200px;
//   background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
//   bottom: 0;
//   pointer-events: none;
//   z-index: 1;
// `;
export const RequestList = ({ requests, onRequestClick, loading }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigateToForm = () => {
    navigate("/request-link");
  };
  const handleNavigateToHome = () => {
    navigate("/home");
  };

  const handleNavigateToArchive = () => {
    navigate("/archive");
  };
  const letterComplete = location.pathname === "/letter-complete";
  return (
    <div className="footer-height pt-[30px]">
      {loading && <Spinner opacity={0.7} />}
      <div className="relative">
        {letterComplete ? (
          <h2 className="pretendard-title text-white text-center mb-[45px]">
            💌 편지를
            <br />
            전송했어요!
          </h2>
        ) : (
          <h2 className="pretendard-title text-white text-center mb-[40px]">
            {requests.length > 0 ? (
              <>
                {requests.length}명의 친구에게
                <br />
                💌 편지 요청이 왔어요!
              </>
            ) : (
              <>
                아직 💌 편지를 요청한
                <br />
                친구가 없어요
              </>
            )}
          </h2>
        )}
        <div className="absolute top-[-10px] right-[37px]">
          <img src={ListTitleSnow} alt="" />
        </div>
      </div>

      <GradientDiv className="purple-gradient">
        <div className="absolute top-[-64px] left-[15px] w-[64px]">
          <img src={Tree} alt="" />
        </div>
        <div className="absolute top-[-30px] right-0 w-[40px]">
          <img src={LetterSide} alt="" />
        </div>
        <div className="px-40 h-full">
          <div className="relative h-[calc(100%-180px)] overflow-hidden rounded-b-[12px]">
            {letterComplete && (
              <p className="text-center bg-white text-[#867cdd] pb-3 font-semibold text-lg">
                {requests.length}명의 친구가
                <br />
                편지를 기다리고 있어요
              </p>
            )}
            <ul className="bg-white w-full relative h-full pb-[30px] overflow-y-auto scrollbar-none">
              {loading || requests.length > 0 ? (
                requests.map(request => (
                  <li
                    key={request.requestId}
                    className="letter-item cursor-pointer flex pb-[10px] mx-5 justify-between items-center pt-5 border-b border-dashed border-[#eeeeee]"
                    onClick={() => onRequestClick(request)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="sender text-base">{request.requesterName}</div>
                      <div className="date text-xs text-[#B1B1B9]">{request.updatedAt.split("T")[0]}</div>
                    </div>
                    <div className="flex items-center">
                      {request.isDraft && (
                        <div className="rounded-xl bg-[#BCF8BE] text-[#36A33A] text-xs p-1 px-[10px] mr-2">작성중</div>
                      )}
                      <img src={Arrow} alt="Arrow" />
                    </div>
                  </li>
                ))
              ) : (
                <div className="h-full text-[#B1B1B9] text-center text-sm mb-[20px] flex flex-col items-center justify-center">
                  <CenterImage />
                  작성할 편지가 없어요.
                </div>
              )}
            </ul>
            <GradientOverlay />
          </div>
          {letterComplete || (
            <p className="pb-[10px] text-sm pt-[29px] text-center">
              신청서를 보내고 <span className="font-bold">편지 요청</span>을 받아보세요!
            </p>
          )}
          {letterComplete ? (
            <div className="flex justify-center gap-1 mt-3">
              <CommonButton text="보관함으로 가기" onClick={handleNavigateToArchive} />
              <CommonButton text="홈으로" onClick={handleNavigateToHome} $bgColor="#000" />
            </div>
          ) : (
            <CommonButton text="신청서 보내기" onClick={handleNavigateToForm} />
          )}
        </div>
      </GradientDiv>
    </div>
  );
};
export default RequestList;
