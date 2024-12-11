import Header from "components/containers/HeaderContainer";
import React, { useState } from "react";
import styled from "styled-components";
import CommonModal from "components/ui/CommonModal";

const BackgroundContainer = styled.div`
  background-image: url(${(props) => props.background});
  background-size: cover;
  background-position: center;
  height: 100vh; /* 전체 화면 높이 */
`;

const ContentWrapper = styled.div`
  padding: 40px;
  border-radius: 12px;
`;

const TextAreaWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 20px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  resize: none;
  font-family: ${(props) => props.font};
  color: #333;
  background-color: white;

  ::placeholder {
    color: rgba(51, 51, 51, 0.5);
  }
`;

const FixedText = styled.div`
  font-size: 14px;
  color: #888;
  margin: 5px 0;
`;

const CharacterCount = styled.div`
  text-align: right;
  font-size: 12px;
  color: #666;
  margin-top: 5px;
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
  margin-bottom: 20px;
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
  const [letterContent, setLetterContent] = useState("");
  const [selectedFontClass, setSelectedFontClass] =
    useState("ycomputer-regular");
  const [selectedModalType, setSelectedModalType] = useState(null);
  const [isDraftSaved, setIsDraftSaved] = useState(false); // 임시 저장 상태
  const maxTextLength = 500;

  const handleContentChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxTextLength) {
      setLetterContent(value);
    }
  };

  const handleFontChange = (e) => {
    setSelectedFontClass(e.target.value);
    console.log("폰트클래스", selectedFontClass);
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
      content: letterContent,
      fontClass: selectedFontClass,
    };
    if (selectedModalType === "letterSendConfirm") {
      onSubmit(updatedData); // 편지 전송
    } else if (selectedModalType === "letterSaveComplete" && isDraftSaved) {
      onSaveDraft(updatedData); // 임시 저장 상태 초기화
    }
    setSelectedModalType(null); // 모달 닫기
  };

  const handleCancelModal = () => {
    if (selectedModalType === "letterSaveComplete" && isDraftSaved) {
      setIsDraftSaved(false); // 임시 저장 상태 초기화
    }
    setSelectedModalType(null); // 모달 닫기
  };

  return (
    <div>
      <div className="px-40">
        <Header title="편지 작성" />
      </div>
      <BackgroundContainer
        background={
          formData.template || "https://via.placeholder.com/1920x1080"
        }
      >
        <ContentWrapper>
          <TextAreaWrapper>
            <FixedText>To. {formData.toRecipient}</FixedText>
            <TextArea
              placeholder="여기에 편지를 작성하세요..."
              value={letterContent}
              onChange={handleContentChange}
              font={selectedFontClass}
            />
            <FixedText>From. {formData.fromSender}</FixedText>
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
