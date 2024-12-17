import React, { useEffect, useState, useRef } from "react";

import styled from "styled-components";
import Footer from "components/containers/FooterContainer";
import { useLocation, useNavigate } from "react-router-dom";
import useSetVh from "hooks/useSetVh";
import Header from "components/containers/HeaderContainer";
import { getDraftLetters, getLetters } from "api/letters";
// import EmptyLetter from "assets/Empty-letter.svg";
import Spinner from "components/ui/Spinner";
import { CenterImage } from "styles/ShareStyle";

const ArchiveContainer = styled.div`
  height: calc(var(--vh, 1vh) * 100 - var(--header-height) - 60px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const TabButton = styled.button`
  color: ${(props) => (props.$active ? "white" : "#333")};
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  flex: 1;
  padding: 16px 0;
  border-bottom: ${(props) => (props.$active ? "1px solid white" : "none")};
`;

const Archive = () => {
  const [activeTab, setActiveTab] = useState("drafts");
  const [drafts, setDrafts] = useState({ data: { content: [] } });
  const [sent, setSent] = useState({ data: { content: [] } });
  const [loading, setLoading] = useState(false);
  const headerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  useSetVh(headerRef);

  useEffect(() => {
    const path = location.pathname.split("/")[2];
    setActiveTab(path === "sent" ? "sent" : "drafts");
  }, [location.pathname]);

  useEffect(() => {
    const fetchDrafts = async () => {
      setLoading(true);
      try {
        const requests = await getDraftLetters();
        console.log("임시저장", requests);
        setDrafts(requests || { data: { content: [] } });
      } catch (error) {
        console.error("Error fetching drafts:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchSentLetters = async () => {
      setLoading(true);
      try {
        const letters = await getLetters();
        console.log("보낸편지", letters);

        setSent(letters || { data: { content: [] } });
      } catch (error) {
        console.error("Error fetching sent letters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrafts();
    fetchSentLetters();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate(`/archive/${tab}`);
  };

  const handleCardClick = (id) => {
    const recipient = drafts.data.content.find(
      (draft) => draft.letterId === id
    );

    if (!recipient) {
      navigate(`/archive/letter/${id}`, { state: { id } });
    } else {
      // navigate(`/letter/${id}`, { state: { recipient } });
      navigate(`/letter/${id}`, { state: { recipient } });
    }
  };

  const getShortenedText = (text) =>
    text?.length > 20 ? `${text.slice(0, 20)}...` : text;

  const letters = activeTab === "drafts" ? drafts : sent;

  return (
    <>
      {loading && <Spinner />}
      <div ref={headerRef}>
        <Header title="보관함" />
      </div>
      <ArchiveContainer>
        <div className="flex justify-between mb-8">
          <TabButton
            $active={activeTab === "drafts"}
            onClick={() => handleTabClick("drafts")}
          >
            작성 중 ({drafts?.data?.content?.length || 0})
          </TabButton>
          <TabButton
            $active={activeTab === "sent"}
            onClick={() => handleTabClick("sent")}
          >
            보낸 편지 ({sent?.data?.content?.length || 0})
          </TabButton>
        </div>
        {!loading && (
          <div className="px-40 flex-1 overflow-y-auto scrollbar-none scrollbar-none::-webkit-scrollbar">
            {letters.data.content.length > 0 ? (
              letters.data.content.map((letter) => (
                <div
                  key={letter.letterId}
                  onClick={() => handleCardClick(letter.letterId, activeTab)}
                  className="cursor-pointer border border-gray-300 rounded-lg p-4 mb-4 bg-gray-100"
                >
                  <div className="flex items-center">
                    <h3>To. {letter.receiver || letter.title}</h3>
                    <p className="text-xs ml-1">2024-12-13</p>
                  </div>
                  <p>{getShortenedText(letter?.message || letter?.content)}</p>
                </div>
              ))
            ) : (
              <div className="h-full text-[#B1B1B9] text-center text-sm mb-[20px] flex flex-col items-center justify-center">
                <CenterImage />
                {activeTab === "drafts"
                  ? "작성할 편지가 없어요."
                  : "보낸 편지가 없어요."}
              </div>
            )}
          </div>
        )}
        <Footer />
      </ArchiveContainer>
    </>
  );
};

export default Archive;
