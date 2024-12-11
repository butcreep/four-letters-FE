import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import styled from "styled-components";
import Intro from "pages/Intro";
import RequestForm from "pages/requests/RequestForm";
import RequestLink from "pages/requests/RequestLink";
import LetterCreation from "pages/letters/LetterCreation";
import useSetVh from "hooks/useSetVh";
import Archive from "pages/archive/Archive";
import LetterDetail from "pages/archive/LetterDetail";
const AppContainer = styled.div`
  margin: 0 auto;
  max-width: 480px;
  overflow: auto;
  width: 100%;
  background: linear-gradient(180deg, #0d0d0d 0%, #1d1c20 100%);
  height: calc(var(--vh, 1vh) * 100);
  position: relative;
`;

const App = () => {
  useSetVh();

  return (
    <AppContainer>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Intro />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/archive/letter/:id" element={<LetterDetail />} />
        <Route path="/letter/:id" element={<LetterCreation />} />
        <Route path="/request-link" element={<RequestLink />} />
        <Route path="/request-form" element={<RequestForm />} />
      </Routes>
    </AppContainer>
  );
};

export default App;
