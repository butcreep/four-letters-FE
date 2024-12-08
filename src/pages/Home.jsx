import React, { useEffect, useState } from "react";
import axios from "axios";
import LetterList from "components/LetterList";
import LetterModal from "components/LetterModal";
import NoLetters from "components/NoLetters";
// import "./App.css"; // 스타일 파일

const Home = () => {
  const [letters, setLetters] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_GLITCH_URL}/letters`
        );
        console.log(response.data);
        setLetters(response.data);
      } catch (error) {
        console.error("Error fetching letters:", error);
      }
    };
    fetchLetters();
  }, []);

  return (
    <div className="app-container">
      {letters.length > 0 ? (
        <LetterList letters={letters} onLetterClick={setSelectedLetter} />
      ) : (
        <NoLetters />
      )}

      {selectedLetter && (
        <LetterModal
          letter={selectedLetter}
          onClose={() => setSelectedLetter(null)}
        />
      )}
    </div>
  );
};

export default Home;
