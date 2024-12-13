import React from "react";
import Arrow from "assets/icon/Arrow-right.svg";
import CommonButton from "components/ui/CommonButton";
import styled from "styled-components";
import EmptyLetter from "assets/Empty-letter.svg";
import GradientBefore from "assets/img/Background-Img.svg";
import { useNavigate } from "react-router-dom";
import Tree from "assets/icon/Tree.svg";
import ListTitleSnow from "assets/icon/Snow/ListTitleSnow.svg";
import LetterSide from "assets/img/Background-Side.svg";

const GradientDiv = styled.div`
  background: linear-gradient(180deg, #867cdd 0%, #eec8ff 100%);
  width: 100%;
  height: calc(100% - 60px);
  position: relative; /* ::before가 제대로 위치하도록 설정 */

  &::before {
    content: "";
    display: block;
    /* background-image: url(${GradientBefore}); 
    background-size: cover; 
    background-position: center;*/
    position: absolute;
    background-color: #fff;
    border-radius: 12px 0 0 0;
    top: -30px;
    left: 40px;
    width: calc(100% - 80px); /* 이미지 크기 */
    height: 30px;
    z-index: 1; /* 배경 이미지가 아래쪽에 위치하도록 설정 */
  }
`;
const CenterImage = styled.div`
  background-image: url(${EmptyLetter});
  background-size: cover;
  background-position: center;
  width: 100px; /* 원하는 너비 */
  height: 90px; /* 원하는 높이 */
  margin: 0 auto 24px; /* 가운데 정렬 */
`;
const StyledUlWrapper = styled.div`
  position: relative; /* 그라데이션 오버레이의 기준 */
  height: calc(100% - 180px); /* 화면 크기에 따라 높이 제한 */
  overflow: hidden; /* 전체 영역 스크롤 방지 */
  border-radius: 0 0 12px 12px;
`;

const StyledUl = styled.ul`
  background: white;
  width: 100%;
  position: relative;
  /* width: 295px; */
  /* height: 390px; */
  height: 100%;
  /* height: calc(100% - 180px);  */
  /* height: 80%; */
  padding-bottom: 80px;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;
const GradientOverlay = styled.div`
  content: "";
  position: absolute;
  width: 100%;
  height: 200px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  bottom: 0;
  pointer-events: none; /* 스크롤, 클릭 이벤트 방지 */
  z-index: 1; /* 컨텐츠 위로 고정 */
`;
export const RequestList = ({ requests, onRequestClick }) => {
  const navigate = useNavigate();

  const handleNavigateToForm = () => {
    navigate("/request-link");
  };
  return (
    <div className="footer-height pt-[30px]">
      <div className="relative">
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
        <div className="absolute top-[-10px] right-[37px]">
          <img src={ListTitleSnow} alt="" />
        </div>
      </div>

      <GradientDiv>
        <div className="absolute top-[-64px] left-[15px] w-[64px]">
          <img src={Tree} alt="" />
        </div>
        <div className="absolute top-[-30px] right-0 w-[40px]">
          <img src={LetterSide} alt="" />
        </div>
        <div className="px-40 h-full">
          <StyledUlWrapper>
            <StyledUl>
              {requests.length > 0 ? (
                requests.map((request) => (
                  <li
                    key={request.id}
                    className="letter-item cursor-pointer flex pb-[10px] mx-5 justify-between items-center pt-5 border-b border-dashed border-[#eeeeee]"
                    onClick={() => onRequestClick(request)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="sender text-base">{request.sender}</div>
                      <div className="date text-xs text-[#B1B1B9]">
                        {request.date}
                      </div>
                    </div>
                    <div className="flex items-center">
                      {request.isDraft && (
                        <div className="rounded-xl bg-[#BCF8BE] text-[#36A33A] text-xs p-1 px-[10px] mr-2">
                          작성중
                        </div>
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
            </StyledUl>
            <GradientOverlay />
          </StyledUlWrapper>
          <p className="pb-[10px] text-sm pt-[29px] text-center">
            신청서를 보내고 <span className="font-bold">편지 요청</span>을
            받아보세요!
          </p>
          <CommonButton text="신청서 보내기" onClick={handleNavigateToForm} />
        </div>
      </GradientDiv>
    </div>
  );
};
export default RequestList;
