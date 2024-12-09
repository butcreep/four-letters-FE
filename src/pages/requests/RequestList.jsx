import React from "react";
import Arrow from "assets/icons/Arrow-right.png";
import CommonButton from "components/CommonButton";
import styled from "styled-components";
const GradientDiv = styled.div`
  background: linear-gradient(180deg, #867cdd 0%, #eec8ff 100%);
  width: 100%; /* 원하는 너비 */
  height: 70%; /* 원하는 높이 */
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const RequestList = ({ requests, onRequestClick, onContinueDraft }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-white text-center text-2xl font-bold mb-[20px]">
        {requests.length}명의 친구에게
        <br />
        편지 요청이 왔어요!
      </h2>
      <GradientDiv>
        <ul className="letter-list bg-white w-[295px] rounded-xl">
          {requests
            .filter((request) => !request.isDone)
            .map((request) => (
              <li
                key={request.id}
                className="letter-item cursor-pointer flex pb-4 mx-5 justify-between items-center pt-6 border-b border-dashed border-[#B1B1B9]"
                onClick={() => onRequestClick(request)}
              >
                <div className="flex items-center gap-2">
                  <div className="sender text-base">{request.sender}</div>
                  <div className="date text-xs text-[#B1B1B9]">
                    {request.date}
                  </div>
                </div>
                <div className="flex">
                  {request.isDraft && (
                    <div className="rounded-xl bg-[#BCF8BE] inline-block text-[#36A33A] text-xs p-1 px-[10px] mr-2">
                      작성중
                    </div>
                  )}
                  <div>
                    <img src={Arrow} alt="Arrow" />
                  </div>
                </div>
              </li>
            ))}
        </ul>
        <p className="pb-[10px] text-sm pt-[29px]">
          신청서를 보내고 <span className="font-bold">편지 요청</span>을
          받아보세요!
        </p>
        <CommonButton text="신청서 보내기" />
      </GradientDiv>
    </div>
  );
};
export default RequestList;
