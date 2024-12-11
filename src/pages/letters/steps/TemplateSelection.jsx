import React, { useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import CommonButton from "components/ui/CommonButton"; // CommonButton 컴포넌트를 import
import Header from "components/containers/HeaderContainer";
import LetterType01 from "assets/img/letter/Letter-Type01.svg";
import LetterType02 from "assets/img/letter/Letter-Type02.svg";
import LetterType03 from "assets/img/letter/Letter-Type03.svg";
import LetterType04 from "assets/img/letter/Letter-type04.svg";

// Styled-components 정의
const Container = styled.div`
  padding-top: 30px;
  position: relative;
`;

const LargeImage = styled.div`
  width: 100%;
  height: 295px;
  margin-bottom: 24px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;

const SwiperContainer = styled.div`
  width: 100%;

  .swiper-slide {
    display: flex;
    justify-content: center;
  }
`;

const SmallImage = styled.div`
  width: 100px;
  height: 100px;
  cursor: pointer;
  border: ${(props) =>
    props.$isSelected
      ? "2px solid var(--color-deep-purple)"
      : "2px solid transparent"};
  border-radius: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;

// 편지지 이미지 데이터
const letterTemplates = [
  { id: 1, src: LetterType01 },
  { id: 2, src: LetterType02 },
  { id: 3, src: LetterType03 },
  { id: 4, src: LetterType04 },
];

const TemplateSelection = ({ onNext }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(letterTemplates[0]); // 선택된 템플릿을 초기화

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template); // 선택된 템플릿 설정
  };

  const handleNext = () => {
    if (selectedTemplate) {
      onNext(selectedTemplate.src); // 선택된 템플릿 데이터를 부모로 전달
    }
  };

  return (
    <div className="px-40 footer-height">
      <Header title="편지지 선택" />
      <div className="footer-height flex flex-col justify-between">
        <Container>
          <LargeImage>
            <img
              src={selectedTemplate.src}
              alt={`Template ${selectedTemplate.id}`}
            />
          </LargeImage>
          <SwiperContainer>
            <Swiper spaceBetween={8} slidesPerView={3}>
              {letterTemplates.map((template) => (
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
        </Container>
        <CommonButton
          text="다음"
          onClick={handleNext}
          disabled={!selectedTemplate}
        />
      </div>
    </div>
  );
};

export default TemplateSelection;
