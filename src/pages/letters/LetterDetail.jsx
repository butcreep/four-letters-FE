import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import useSetVh from "hooks/useSetVh";
import { getLetterById } from "api/letters";
import images from "assets";
import Header from "components/containers/HeaderContainer";
import Spinner from "components/ui/Spinner";
import {
  BackgroundContainer,
  TextAreaWrapper,
  ContentWrapper,
  FixedText,
} from "styles/ShareStyle";

const ContentText = styled.div`
  width: 100%;
  height: 60%;
  text-align: center;
  padding: 20px;
  margin: 20px 0;
  font-size: 16px;
  background-color: #ece5dd;
  outline: none;
  resize: none;
  color: #000;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const LetterDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState(null);
  const headerRef = useRef(null);
  const { letterBackgrounds, letterIcons } = images;

  useSetVh(headerRef);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await getLetterById(id);

        setDetail(data.data);
      } catch (err) {
        console.error("Error fetching detail:", err);
        setError("데이터를 불러오지 못했습니다.");
      }
    };

    fetchDetail();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!detail) {
    return <Spinner />;
  }
  const showHeader = !location.pathname.startsWith("/letter-complete");
  const backgroundIndex = detail?.metadata?.stationery;
  const backgroundImage =
    letterBackgrounds?.[backgroundIndex] || letterBackgrounds?.[0];
  const backgroundIcon = letterIcons?.[backgroundIndex] || letterIcons?.[0];
  return (
    <>
      {showHeader && <Header title="작성된 편지" />}
      <BackgroundContainer background={backgroundImage}>
        <ContentWrapper
          className={detail.metadata?.font || "ycomputer-regular"}
          margin={80}
        >
          <TextAreaWrapper>
            <img
              src={backgroundIcon}
              alt="letter-icon"
              className="w-20 h-20 mx-auto absolute top-[-60px] left-1/2 transform -translate-x-1/2 z-[1]"
            />
            <h2 className="mt-5 text-2xl text-center text-gray-800">
              To. {detail.writer}
            </h2>
            <ContentText>{detail.content}</ContentText>
            <FixedText>From. {detail.receiver}</FixedText>
          </TextAreaWrapper>
        </ContentWrapper>
      </BackgroundContainer>
    </>
  );
};

export default LetterDetail;
