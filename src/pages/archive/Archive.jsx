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
  justify-content: center;
  margin-bottom: 16px;
`;

const TabButton = styled.button`
  background: ${(props) => (props.$active ? "#333" : "#f9f9f9")};
  color: ${(props) => (props.$active ? "white" : "#333")};
  border: none;
  padding: 8px 16px;
  margin: 0 4px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: ${(props) => (props.$active ? "#333" : "#e0e0e0")};
  }
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
  useSetVh(headerRef);
  const navigate = useNavigate();

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
      navigate(`/requests/${id}`);
    } else {
      navigate(`/archive/letter/${id}`);
    }
  };
  return (
    <div className="px-40">
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
        <ListContainer>
          {letters.map((letter) => (
            <LetterCard
              key={letter.id}
              onClick={() => handleCardClick(letter.id, activeTab)}
              className="cursor-pointer"
            >
              <h3>{letter.toRecipient || letter.title}</h3>
              <p>{letter.content}</p>
            </LetterCard>
          ))}
        </ListContainer>
        <Footer />
      </ArchiveContainer>
    </div>
  );
};

export default Archive;
