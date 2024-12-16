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
import LetterDetail from "pages/letters/LetterDetail";
import KakaoCallback from "api/KakaoCallBack";

const AppContainer = styled.div`
  margin: 0 auto;
  max-width: 480px;
  overflow: auto;
  width: 100%;
  background: linear-gradient(180deg, #0d0d0d 0%, #1d1c20 100%);
  height: calc(var(--vh, 1vh) * 100); /* 동적 높이 적용 */
  position: relative;

  padding-bottom: env(safe-area-inset-bottom, 20px); /* 하단 여백 확보 */
`;

const App = () => {
  useSetVh();

  return (
    <AppContainer>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Intro />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/archive/drafts" element={<Archive />} />
        <Route path="/archive/sent" element={<Archive />} />
        <Route path="/archive/letter/:id" element={<LetterDetail />} />
        <Route path="/letter-complete/:id" element={<LetterDetail />} />
        <Route path="/letter/:id" element={<LetterCreation />} />
        <Route path="/letter" element={<LetterCreation />} />
        <Route path="/request-link" element={<RequestLink />} />
        <Route path="/request-form/:requestId" element={<RequestForm />} />
        <Route path="/letter-complete" element={<Home />} />
        <Route path="/kakao/callback" element={<KakaoCallback />} />
      </Routes>
    </AppContainer>
  );
};

export default App;
