import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import styled from "styled-components";
import LetterWrite from "pages/LetterWrite";
import Intro from "pages/Intro";
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
        <Route path="/write" element={<LetterWrite />} />
      </Routes>
    </AppContainer>
  );
};

export default App;
