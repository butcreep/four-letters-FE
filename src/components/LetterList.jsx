import React from "react";
import LetterItem from "./LetterItem";

const LetterList = ({ letters, onLetterClick }) => {
  return (
    <ul className="letter-list">
      {letters.map((letter) => (
        <LetterItem
          key={letter.id}
          letter={letter}
          onClick={() => onLetterClick(letter)}
        />
      ))}
    </ul>
  );
};

export default LetterList;
