import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useSetVh from "hooks/useSetVh";
import { getLetterById } from "api/letters";
import images from "assets";
import Header from "components/containers/HeaderContainer";

// const BackgroundContainer = styled.div`
//   background-image: url(${(props) => props.background});
//   background-size: cover;
//   background-position: center;
//   height: 100%;
//   overflow: hidden;
// `;

// const ContentWrapper = styled.div`
//   border-radius: 12px;
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   margin: 0 40px;
//   height: 100%;
// `;
// const TextAreaWrapper = styled.div`
//   background-color: #ffe7a6;
//   width: 100%;
//   position: relative;
//   border-radius: 12px;
//   height: 70%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: space-between;
//   .toSender {
//     margin-top: 10%;
//   }
// `;
const BackgroundContainer = styled.div`
  background-image: url(${(props) => props.background});
  background-size: cover;
  background-position: center;
  height: 100%;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  padding: 0 40px;
  border-radius: 12px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-top: 30px;
`;

const TextAreaWrapper = styled.div`
  width: 100%;
  position: relative;
  background-color: #ece5dd;
  border-radius: 12px;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
  color: #333;
`;

const FixedText = styled.div`
  /* font-size: 14px;
  color: #888;
  margin: 5px 0;
  text-align: left;
  width: 100%; */
  font-size: 16px;
  color: #000;
  margin: 5px 0;
`;

const ContentText = styled.div`
  /* width: 100%;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center; */
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
    display: none; /* 스크롤바 숨기기 */
  }
  -ms-overflow-style: none; /* IE, Edge 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox 스크롤바 숨기기 */
`;

const LetterDetail = () => {
  const { id } = useParams(); // URL에서 ID 추출
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState(null);
  const headerRef = useRef(null);
  const { letterBackgrounds, letterIcons } = images;

  useSetVh(headerRef);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await getLetterById(id);

        setDetail(data);
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
    return <p>로딩 중...</p>;
  }
  const backgroundIndex = detail?.background;

  const backgroundImage =
    letterBackgrounds?.[backgroundIndex] || letterBackgrounds?.[0];
  const backgroundIcon = letterIcons?.[backgroundIndex] || letterIcons?.[0];
  return (
    <>
      <Header title="작성된 편지" />
      <BackgroundContainer background={backgroundImage}>
        <ContentWrapper className={detail.fontClass || "ycomputer-regular"}>
          <TextAreaWrapper>
            <img
              src={backgroundIcon}
              alt="letter-icon"
              className="w-20 h-20 mx-auto absolute top-[-60px] left-1/2 transform -translate-x-1/2 z-[1]"
            />
            <Title>To. {detail.toRecipient}</Title>
            <ContentText>{detail.message}</ContentText>
            <FixedText>From. {detail.fromSender}</FixedText>
          </TextAreaWrapper>
        </ContentWrapper>
      </BackgroundContainer>
    </>
  );
};

export default LetterDetail;
