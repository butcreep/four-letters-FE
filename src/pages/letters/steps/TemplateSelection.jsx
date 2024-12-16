import React, { useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import CommonButton from "components/ui/CommonButton";

import images from "assets";

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
  cursor: pointer;
  border: ${props => (props.$isSelected ? "2px solid var(--color-deep-purple)" : "2px solid transparent")};
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
  const [selectedTemplate, setSelectedTemplate] = useState(
    previewLetters[formData?.metadata.stationery] || previewLetters[0],
  );
  const handleSelectTemplate = template => {
    setSelectedTemplate(template);
  };

  const handleNext = () => {
    console.log(selectedTemplate.id);

    if (selectedTemplate) {
      onNext({
        metadata: {
          stationery: selectedTemplate.id,
        },
      });
    }
  };

  return (
    <div className="h-full">
      <div className="footer-height flex flex-col justify-between">
        <div className="pt-[30px] relative">
          <LargeImage className="px-40 ">
            <img src={selectedTemplate.src} alt={`Template ${selectedTemplate.id}`} />
          </LargeImage>
          <SwiperContainer className="pl-[40px]">
            <Swiper spaceBetween={8} slidesPerView={3} style={{ paddingRight: "40px" }}>
              {previewLetters.map(template => (
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
        </div>
        <div className="px-40">
          <CommonButton text="다음" onClick={handleNext} disabled={!selectedTemplate} />
        </div>
      </div>
    </div>
  );
};

export default TemplateSelection;
