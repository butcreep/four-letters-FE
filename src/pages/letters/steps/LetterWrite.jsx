import React, { useState } from "react";
import styled from "styled-components";
import CommonModal from "components/ui/CommonModal";
import images from "assets";
import useSetVh from "hooks/useSetVh";

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
  background-color: #ffe7a6;
  border-radius: 12px;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .toSender {
    margin-top: 10%;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 90%;
  text-align: center;
  padding: 20px;
  font-size: 16px;
  background-color: #ffe7a6;
  outline: none;
  resize: none;
  font-family: ${(props) => props.font};
  color: #333;
  ::-webkit-scrollbar {
    display: none; /* 스크롤바 숨기기 */
  }
  -ms-overflow-style: none; /* IE, Edge 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox 스크롤바 숨기기 */
  ::placeholder {
    color: rgba(51, 51, 51, 0.5);
  }
`;

const FixedText = styled.div`
  font-size: 14px;
  color: #888;
  margin: 5px 0;
  font-family: ${(props) => props.font}, sans-serif;
`;

const CharacterCount = styled.div`
  text-align: right;
  font-size: 12px;
  color: #666;
  margin-top: 5px;
  position: absolute;
  bottom: 0;
  right: 0;
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;

  gap: 15px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 15px 0px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 50%;

  &[data-variant="secondary"] {
    background-color: #ddd;
    color: #333;

    &:hover {
      background-color: #ccc;
    }
  }
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 20px 0;
  width: 100%;
  font-family: ${(props) => props.font}, sans-serif;
`;

const FontSelect = ({ selectedFont, onChange }) => {
  return (
    <Select value={selectedFont} onChange={onChange} font={selectedFont}>
      <option value="ycomputer-regular">Y콤퓨타체</option>
      <option value="dongle">Dongle</option>
      <option value="gaegu">Gaegu</option>
      <option value="hi-melody">Hi Melody</option>
      <option value="poor-story">Poor Story</option>
    </Select>
  );
};

const LetterWrite = ({ formData, onSubmit, onSaveDraft }) => {
  const { letterBackgrounds, letterIcons } = images;
  const [letterContent, setLetterContent] = useState(formData.message || ""); // formData로 초기값 설정
  const [selectedFontClass, setSelectedFontClass] = useState(
    formData.fontClass || "ycomputer-regular"
  );
  const [selectedModalType, setSelectedModalType] = useState(null);
  const maxTextLength = 300;

  useSetVh();
  const handleContentChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxTextLength) {
      setLetterContent(value);
    }
  };

  const handleFontChange = (e) => {
    setSelectedFontClass(e.target.value);
  };

  const handleSaveDraft = async () => {
    if (!letterContent.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }
    setSelectedModalType("letterSaveComplete"); // 임시 저장 모달 설정
  };

  const handleSendLetter = () => {
    if (!letterContent.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }
    if (!selectedFontClass) {
      alert("폰트를 선택해주세요.");
      return;
    }

    setSelectedModalType("letterSendConfirm"); // 편지 보내기 모달 설정
  };

  const handleModalConfirm = () => {
    const updatedData = {
      ...formData,
      message: letterContent,
      fontClass: selectedFontClass,
    };
    if (selectedModalType === "letterSendConfirm") {
      onSubmit(updatedData); // 편지 전송
    } else if (selectedModalType === "letterSaveComplete") {
      onSaveDraft(updatedData);
    }
    setSelectedModalType(null); // 모달 닫기
  };

  const handleCancelModal = () => {
    setSelectedModalType(null); // 모달 닫기
  };
  const backgroundIndex = formData.background ? formData.background : 0; // background 값이 없으면 기본값 0 사용
  const backgroundImage =
    letterBackgrounds?.[backgroundIndex] || letterBackgrounds?.[0];
  const backgroundIcon = letterIcons?.[backgroundIndex] || letterIcons?.[0];

  return (
    <div className="h-full">
      <BackgroundContainer background={backgroundImage}>
        <ContentWrapper>
          <TextAreaWrapper>
            <img
              src={backgroundIcon}
              alt="letter-icon"
              className="w-20 h-20 mx-auto absolute top-[-60px] left-1/2 transform -translate-x-1/2 z-[1]"
            />
            <FixedText font={selectedFontClass} className="toSender">
              To. {formData.toRecipient}
            </FixedText>
            <TextArea
              placeholder="여기에 편지를 작성하세요..."
              value={letterContent}
              onChange={handleContentChange}
              font={selectedFontClass}
            />
            <FixedText font={selectedFontClass}>
              From. {formData.fromSender}
            </FixedText>
            <CharacterCount>
              {letterContent.length} / {maxTextLength}
            </CharacterCount>
          </TextAreaWrapper>
          <FontSelect
            selectedFont={selectedFontClass}
            onChange={handleFontChange}
          />
          <ButtonGroup>
            <Button onClick={handleSaveDraft} className="pretendard-button">
              임시 저장
            </Button>
            <Button onClick={handleSendLetter} className="pretendard-button">
              편지 보내기
            </Button>
          </ButtonGroup>
        </ContentWrapper>
      </BackgroundContainer>

      {selectedModalType && (
        <CommonModal
          type={selectedModalType}
          isVisible={!!selectedModalType}
          onCancel={handleCancelModal}
          onConfirm={handleModalConfirm} // 확인 버튼 동작
          data={{}}
        />
      )}
    </div>
  );
};

export default LetterWrite;
