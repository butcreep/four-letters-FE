import React from "react";

const LetterItem = ({ letter, onClick }) => {
  return (
    <li className="letter-item cursor-pointer" onClick={onClick}>
      <div className="sender">{letter.sender}</div>
      <div className="date">{letter.date}</div>
    </li>
  );
};

export default LetterItem;
