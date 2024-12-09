import React from "react";

export const RequestList = ({ requests, onRequestClick, onContinueDraft }) => {
  return (
    <>
      <h2>
        {requests.length}명의 친구에게
        <br />
        편지가 왔어요
      </h2>
      <ul className="letter-list">
        {requests
          .filter(request => !request.isDone)
          .map(request => (
            <li key={request.id} className="letter-item cursor-pointer flex" onClick={() => onRequestClick(request)}>
              {request.isDraft && <div className="rounded-md bg-slate-500 inline-block text-sky-50">수정중</div>}
              <div className="sender">{request.sender}</div>
              <div className="date">{request.date}</div>
            </li>
          ))}
      </ul>
    </>
  );
};
export default RequestList;
