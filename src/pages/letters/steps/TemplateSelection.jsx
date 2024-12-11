import React, { useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import CommonButton from "components/ui/CommonButton"; // CommonButton 컴포넌트를 import
import Header from "components/containers/HeaderContainer";

// Styled-components 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative;
`;

const LargeImage = styled.div`
  width: 295px;
  height: 295px;
  margin-bottom: 24px;

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
  max-width: 295px;
  margin-bottom: 78px;

  .swiper-slide {
    display: flex;
    justify-content: center;
  }
`;

const SmallImage = styled.div`
  width: 100px;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

// Mock 데이터: 편지지 이미지
const letterTemplates = [
  { id: 1, src: "https://via.placeholder.com/300x400?text=Template+1" },
  { id: 2, src: "https://via.placeholder.com/300x400?text=Template+2" },
  { id: 3, src: "https://via.placeholder.com/300x400?text=Template+3" },
  { id: 4, src: "https://via.placeholder.com/300x400?text=Template+4" },
];

const TemplateSelection = ({ onNext }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(letterTemplates[0]); // 선택된 템플릿을 초기화

  const handleSelectTemplate = template => {
    setSelectedTemplate(template); // 선택된 템플릿 설정
  };

  const handleNext = () => {
    if (selectedTemplate) {
      onNext(selectedTemplate.src); // 선택된 템플릿 데이터를 부모로 전달
    }
  };

  return (
    <>
      <Header title="편지지 선택" />
      <Container>
        <LargeImage>
          <img src={selectedTemplate.src} alt={`Template ${selectedTemplate.id}`} />
        </LargeImage>
        <SwiperContainer>
          <Swiper spaceBetween={8} slidesPerView={3}>
            {letterTemplates.map(template => (
              <SwiperSlide key={template.id}>
                <SmallImage
                  onClick={() => handleSelectTemplate(template)}
                  $isSelected={template.id === selectedTemplate?.id}
                >
                  <img src={template.src} alt={`Template ${template.id}`} />
                </SmallImage>
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperContainer>
        <ButtonContainer>
          <CommonButton text="다음" onClick={handleNext} disabled={!selectedTemplate} />
        </ButtonContainer>
      </Container>
    </>
  );
};

export default TemplateSelection;
