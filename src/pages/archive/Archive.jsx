import React, { useEffect, useState, useRef } from "react";

import styled from "styled-components";
import Footer from "components/containers/FooterContainer";
import { useNavigate } from "react-router-dom";
import useSetVh from "hooks/useSetVh";
import Header from "components/containers/HeaderContainer";
import { getRequests } from "api/requests";
import { getLetters } from "api/letters";

const ArchiveContainer = styled.div`
  height: calc(
    var(--vh, 1vh) * 100 - var(--header-height) - 60px
  ); /* 동적 높이 */
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  /* border-bottom: 2px solid #ccc; */
`;

const TabButton = styled.button`
  /* background: ${(props) => (props.$active ? "#333" : "#f9f9f9")}; */
  color: ${(props) => (props.$active ? "white" : "#333")};
  /* border: none;
  padding: 8px 16px;
  margin: 0 4px;
  border-radius: 4px; */
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  flex: 1; /* 버튼을 반반 배치 */
  border-bottom: ${(props) => (props.$active ? "2px solid white" : "none")};

  /* &:hover {
    background: ${(props) => (props.$active ? "#333" : "#e0e0e0")};
  } */
`;

const ListContainer = styled.div`
  flex: 1; /* 남은 공간을 차지하여 스크롤 가능 영역 확보 */
  overflow-y: auto; /* 세로 스크롤 활성화 */

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const LetterCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: #f9f9f9;

  h3 {
    margin: 0 0 8px 0;
  }

  p {
    margin: 0;
  }
`;

const Archive = () => {
  const [activeTab, setActiveTab] = useState("drafts");
  const [drafts, setDrafts] = useState([]);
  const [sent, setSent] = useState([]);
  const headerRef = useRef(null);
  const navigate = useNavigate();
  useSetVh(headerRef);

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const requests = await getRequests();
        const draftRequests = requests.filter((request) => request.isDraft);
        setDrafts(draftRequests);
      } catch (error) {
        console.error("Error fetching drafts:", error);
      }
    };

    const fetchSentLetters = async () => {
      try {
        const letters = await getLetters();
        setSent(letters);
      } catch (error) {
        console.error("Error fetching sent letters:", error);
      }
    };

    fetchDrafts();
    fetchSentLetters();
  }, []);

  const letters = activeTab === "drafts" ? drafts : sent;

  const handleCardClick = (id, tab) => {
    if (tab === "drafts") {
      const recipient = drafts.find((draft) => draft.id === id); // recipient 객체 찾기
      if (!recipient) {
        console.error(`Draft not found for id: ${id}`);
        return;
      }
      navigate(`/letter/${id}`, {
        state: { recipient }, // 객체를 state에 전달
      });
    } else {
      navigate(`/archive/letter/${id}`);
    }
  };
  const getShortenedText = (text) => {
    if (!text) return ""; // 빈 값 처리
    return text.length > 20 ? `${text.slice(0, 15)}...` : text;
  };
  return (
    <>
      <div ref={headerRef}>
        <Header title="보관함" />
      </div>
      <ArchiveContainer>
        <Tabs>
          <TabButton
            $active={activeTab === "drafts"}
            onClick={() => setActiveTab("drafts")}
          >
            작성 중
          </TabButton>
          <TabButton
            $active={activeTab === "sent"}
            onClick={() => setActiveTab("sent")}
          >
            보낸 편지
          </TabButton>
        </Tabs>
        <ListContainer className="px-40">
          {letters.map((letter) => (
            <LetterCard
              key={letter.id}
              onClick={() => handleCardClick(letter.id, activeTab)}
              className="cursor-pointer"
            >
              <h3>{letter.toRecipient || letter.title}</h3>
              <p>{getShortenedText(letter?.message || letter?.content)}</p>
            </LetterCard>
          ))}
        </ListContainer>
        <Footer />
      </ArchiveContainer>
    </>
  );
};

export default Archive;
