import React, { useEffect, useState, useRef } from "react";

import styled from "styled-components";
import Footer from "components/containers/FooterContainer";
import { useLocation, useNavigate } from "react-router-dom";
import useSetVh from "hooks/useSetVh";
import Header from "components/containers/HeaderContainer";
import { getRequests } from "api/requests";
import { getLetters } from "api/letters";
import EmptyLetter from "assets/Empty-letter.svg";
import Spinner from "components/ui/Spinner";

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
  margin-bottom: 30px;
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
  padding: 16px 0;
  border-bottom: ${(props) => (props.$active ? "1px solid white" : "none")};

  /* &:hover {
    background: ${(props) => (props.$active ? "#333" : "#e0e0e0")};
  } */
`;
const CenterImage = styled.div`
  background-image: url(${EmptyLetter});
  background-size: cover;
  background-position: center;
  width: 100px; /* 원하는 너비 */
  height: 90px; /* 원하는 높이 */
  margin: 0 auto 24px; /* 가운데 정렬 */
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
`;

const Archive = () => {
  const [activeTab, setActiveTab] = useState("drafts");
  const [drafts, setDrafts] = useState([]);
  const [sent, setSent] = useState([]);
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const headerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  useSetVh(headerRef);
  useEffect(() => {
    // URL 경로에 따라 activeTab 설정
    const path = location.pathname.split("/")[2]; // /archive/drafts -> drafts
    if (path === "sent") {
      setActiveTab("sent");
    } else {
      setActiveTab("drafts"); // 기본값
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchDrafts = async () => {
      setLoading(true); // 로딩 시작
      try {
        const requests = await getRequests();
        const draftRequests = requests.filter(
          (request) => request.isDraft && !request.isDone
        );
        setDrafts(draftRequests);
      } catch (error) {
        console.error("Error fetching drafts:", error);
      } finally {
        setLoading(false); // 로딩 끝
      }
    };

    const fetchSentLetters = async () => {
      setLoading(true); // 로딩 시작
      try {
        const letters = await getLetters();
        setSent(letters);
      } catch (error) {
        console.error("Error fetching sent letters:", error);
      } finally {
        setLoading(false); // 로딩 끝
      }
    };

    fetchDrafts();
    fetchSentLetters();
  }, []);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate(`/archive/${tab}`); // 경로 변경
  };
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
    return text.length > 20 ? `${text.slice(0, 20)}...` : text;
  };
  return (
    <>
      {loading && <Spinner />}
      <div ref={headerRef}>
        <Header title="보관함" />
      </div>
      <ArchiveContainer>
        <Tabs>
          <TabButton
            $active={activeTab === "drafts"}
            onClick={() => handleTabClick("drafts")}
          >
            작성 중 ({drafts?.length})
          </TabButton>
          <TabButton
            $active={activeTab === "sent"}
            onClick={() => handleTabClick("sent")}
          >
            보낸 편지 ({sent?.length})
          </TabButton>
        </Tabs>
        {loading || (
          <ListContainer className="px-40">
            {letters.length > 0 ? (
              letters.map((letter) => (
                <LetterCard
                  key={letter.id}
                  onClick={() => handleCardClick(letter.id, activeTab)}
                  className="cursor-pointer"
                >
                  <div className="flex items-center">
                    <h3>To. {letter.toRecipient || letter.title}</h3>
                    <p className="text-xs ml-1">2024-12-13</p>
                  </div>
                  <p>{getShortenedText(letter?.message || letter?.content)}</p>
                </LetterCard>
              ))
            ) : (
              <div className="h-full text-[#B1B1B9] text-center text-sm mb-[20px] flex flex-col items-center justify-center">
                <CenterImage />
                {activeTab === "drafts"
                  ? "작성할 편지가 없어요."
                  : "보낸 편지가 없어요."}
              </div>
            )}
          </ListContainer>
        )}
        <Footer />
      </ArchiveContainer>
    </>
  );
};

export default Archive;
