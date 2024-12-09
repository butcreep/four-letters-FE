import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import styled from "styled-components";
import LetterWrite from "pages/letters/LetterWrite";
import Intro from "pages/Intro";
import LetterSelect from "pages/letters/LetterSelect";
const AppContainer = styled.div`
  margin: 0 auto;
  max-width: 480px;
  overflow: auto;
  width: 100%;
  background-color: #fff;
  height: calc(var(--vh, 1vh) * 100);
`;

const App = () => {
  return (
    <AppContainer>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Intro />} />
        <Route path="/letter-select/:id" element={<LetterSelect />} />
        <Route path="/letter-write" element={<LetterWrite />} />
        <Route path="/letter-write/:id" element={<LetterWrite />} />
      </Routes>
    </AppContainer>
  );
};

export default App;
