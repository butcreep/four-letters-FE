import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

// Styled-components 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const LargeImage = styled.div`
  width: 300px;
  height: 400px;
  margin-bottom: 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    border: 2px solid #ddd;
  }
`;

const SwiperContainer = styled.div`
  width: 100%;
  max-width: 320px;
  margin-bottom: 20px;

  .swiper-slide {
    display: flex;
    justify-content: center;
  }
`;

// 수정된 SmallImage 컴포넌트
const SmallImage = styled.div`
  width: 80px;
  height: 100px;
  cursor: pointer;
  border: ${props => (props.$isSelected ? "2px solid #007BFF" : "2px solid transparent")};
  border-radius: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  &:hover {
    border-color: #007bff;
  }
`;

const NextButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

// Mock 데이터: 편지지 이미지
const letterTemplates = [
  { id: 1, src: "https://via.placeholder.com/300x400?text=Template+1" },
  { id: 2, src: "https://via.placeholder.com/300x400?text=Template+2" },
  { id: 3, src: "https://via.placeholder.com/300x400?text=Template+3" },
  { id: 4, src: "https://via.placeholder.com/300x400?text=Template+4" },
];

const LetterSelect = () => {
  const { id } = useParams();

  const location = useLocation();
  const navigate = useNavigate();
  const recipient = location.state?.recipient; // 전달받은 recipient 정보
  console.log("❤recipient", recipient);
  const [selectedTemplate, setSelectedTemplate] = useState(letterTemplates[0]);

  const handleSelectTemplate = template => {
    setSelectedTemplate(template);
  };

  const handleNext = () => {
    navigate(`/letter-write/${id}`, {
      state: { recipient, template: selectedTemplate },
    });
  };

  return (
    <Container>
      <LargeImage>
        <img src={selectedTemplate.src} alt={`Template ${selectedTemplate.id}`} />
      </LargeImage>

      <SwiperContainer>
        <Swiper spaceBetween={10} slidesPerView={3}>
          {letterTemplates.map(template => (
            <SwiperSlide key={template.id}>
              <SmallImage
                onClick={() => handleSelectTemplate(template)}
                $isSelected={template.id === selectedTemplate.id}
              >
                <img src={template.src} alt={`Template ${template.id}`} />
              </SmallImage>
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperContainer>

      <NextButton onClick={handleNext}>편지 작성하기</NextButton>
    </Container>
  );
};

export default LetterSelect;
