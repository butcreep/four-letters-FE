import React from "react";
import Arrow from "assets/icon/Arrow-right.svg";
import CommonButton from "components/CommonButton";
import styled from "styled-components";
import EmptyLetter from "assets/Empty-letter.svg";
import { useNavigate } from "react-router-dom";

const GradientDiv = styled.div`
  background: linear-gradient(180deg, #867cdd 0%, #eec8ff 100%);
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CenterImage = styled.div`
  background-image: url(${EmptyLetter});
  background-size: cover;
  background-position: center;
  width: 220px; /* 원하는 너비 */
  height: 270px; /* 원하는 높이 */
  margin: 0 auto 58px; /* 가운데 정렬 */
`;
const StyledUl = styled.ul`
  background: white;
  width: 295px;
  height: 40%;
  border-radius: 12px;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

export const RequestList = ({ requests, onRequestClick }) => {
  const navigate = useNavigate();

  const handleNavigateToForm = () => {
    navigate("/request-link");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-white text-center text-2xl font-bold mb-[20px]">
        {requests.length > 0 ? (
          <>
            {requests.length}명의 친구에게
            <br />
            편지 요청이 왔어요!
          </>
        ) : (
          <>
            아직 편지를 요청한
            <br />
            친구가 없어요
          </>
        )}
      </h2>

      <GradientDiv>
        <StyledUl>
          {requests.length > 0 ? (
            requests
              .filter(request => !request.isDone)
              .map(request => (
                <li
                  key={request.id}
                  className="letter-item cursor-pointer flex pb-4 mx-5 justify-between items-center pt-6 border-b border-dashed border-[#B1B1B9]"
                  onClick={() => onRequestClick(request)}
                >
                  <div className="flex items-center gap-2">
                    <div className="sender text-base">{request.sender}</div>
                    <div className="date text-xs text-[#B1B1B9]">{request.date}</div>
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
            <div className="text-white text-center text-2xl font-bold mb-[20px] flex flex-col items-center justify-center">
              <CenterImage />
              작성할 편지가 없어요.
            </div>
          )}
        </StyledUl>
        <p className="pb-[10px] text-sm pt-[29px]">
          신청서를 보내고 <span className="font-bold">편지 요청</span>을 받아보세요!
        </p>
        <CommonButton text="신청서 보내기" onClick={handleNavigateToForm} />
      </GradientDiv>
    </div>
  );
};
export default RequestList;
