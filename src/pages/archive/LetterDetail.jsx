import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useSetVh from "hooks/useSetVh";
import { getLetterById } from "api/letters";

const BackgroundContainer = styled.div`
  background-image: url(${props => props.background});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  padding: 30px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 500px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
  color: #333;
`;

const FixedText = styled.div`
  font-size: 14px;
  color: #888;
  margin: 5px 0;
  text-align: left;
  width: 100%;
`;

const ContentText = styled.div`
  width: 100%;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const LetterDetail = () => {
  const { id } = useParams(); // URL에서 ID 추출
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState(null);
  const headerRef = useRef(null);

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

  return (
    <>
      <BackgroundContainer background={detail.background || "https://via.placeholder.com/1920x1080"}>
        <ContentWrapper className={detail.fontClass || "ycomputer-regular"}>
          <Title>To. {detail.toRecipient}</Title>
          <ContentText>{detail.content}</ContentText>
          <FixedText>From. {detail.fromSender}</FixedText>
        </ContentWrapper>
      </BackgroundContainer>
    </>
  );
};

export default LetterDetail;
