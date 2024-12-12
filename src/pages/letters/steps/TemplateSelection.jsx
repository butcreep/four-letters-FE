import React, { useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import CommonButton from "components/ui/CommonButton"; // CommonButton 컴포넌트를 import

import images from "assets";

// Styled-components 정의
const Container = styled.div`
  padding-top: 30px;
  position: relative;
`;

const LargeImage = styled.div`
  width: 100%;
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
  /* min-width: 100px;
  min-height: 100px; */
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

const TemplateSelection = ({ onNext, formData }) => {
  const { previewLetters } = images;
  // const [selectedTemplate, setSelectedTemplate] = useState(previewLetters[0]); // 선택된 템플릿을 초기화
  const [selectedTemplate, setSelectedTemplate] = useState(
    previewLetters[formData.background] || previewLetters[0]
  ); // 선택된 템플릿을 초기화
  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template); // 선택된 템플릿 설정
  };

  const handleNext = () => {
    if (selectedTemplate) {
      onNext(selectedTemplate.id); // 선택된 템플릿 데이터를 부모로 전달
    }
  };

  return (
    <div className="footer-height">
      <div className="footer-height flex flex-col justify-between">
        <Container>
          <LargeImage className="px-40 ">
            <img
              src={selectedTemplate.src}
              alt={`Template ${selectedTemplate.id}`}
            />
          </LargeImage>
          <SwiperContainer className="pl-[40px]">
            <Swiper
              spaceBetween={8}
              slidesPerView={3}
              style={{ paddingRight: "40px" }}
            >
              {previewLetters.map((template) => (
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
        <div className="px-40">
          <CommonButton
            text="다음"
            onClick={handleNext}
            disabled={!selectedTemplate}
          />
        </div>
      </div>
    </div>
  );
};

export default TemplateSelection;
