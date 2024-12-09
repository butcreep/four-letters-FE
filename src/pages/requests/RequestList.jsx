import React from "react";

export const RequestList = ({ requests, onRequestClick }) => {
  return (
    <>
      <h2>
        {requests.length}명의 친구에게
        <br />
        편지가 왔어요
      </h2>
      <ul className="letter-list">
        {requests.map(request => (
          <li className="letter-item cursor-pointer" onClick={() => onRequestClick(request)}>
            <div className="sender">{request.sender}</div>
            <div className="date">{request.date}</div>
          </li>
        ))}
      </ul>
    </>
  );
};
export default RequestList;
