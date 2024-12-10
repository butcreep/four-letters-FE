import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import styled from "styled-components";
// import LetterWrite from "pages/letters/LetterWrite";
import Intro from "pages/Intro";
// import LetterSelect from "pages/letters/LetterSelect";
import RequestForm from "pages/requests/RequestForm";
import RequestLink from "pages/requests/RequestLink";
import LetterCreation from "pages/letters/LetterCreation";
const AppContainer = styled.div`
  margin: 0 auto;
  max-width: 480px;
  overflow: auto;
  width: 100%;
  background-color: #000;
  height: calc(var(--vh, 1vh) * 100);
  position: relative;
`;

const App = () => {
  return (
    <AppContainer>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Intro />} />
        <Route path="/letter/:id" element={<LetterCreation />} />
        {/* <Route path="/letter-write" element={<LetterWrite />} />
        <Route path="/letter-write/:id" element={<LetterWrite />} /> */}
        <Route path="/request-link" element={<RequestLink />} />
        <Route path="/request-form" element={<RequestForm />} />
      </Routes>
    </AppContainer>
  );
};

export default App;
