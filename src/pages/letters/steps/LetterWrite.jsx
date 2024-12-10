import Header from "components/HeaderContainer";
import React, { useState } from "react";
import styled from "styled-components";

const BackgroundContainer = styled.div`
  background-image: url(${(props) => props.background});
  background-size: cover;
  background-position: center;
  height: 100vh; /* 전체 화면 높이 */
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
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
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

const LetterWrite = ({
  sender,
  recipient,
  template,
  onSubmit,
  onSaveDraft,
}) => {
  const [letterContent, setLetterContent] = useState("");
  const [selectedFontClass, setSelectedFontClass] =
    useState("ycomputer-regular");
  const maxTextLength = 500;

  const handleContentChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxTextLength) {
      setLetterContent(value);
    }
  };

  const handleFontChange = (e) => {
    setSelectedFontClass(e.target.value);
  };

  const handleSaveDraft = () => {
    if (!letterContent.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }
    onSaveDraft({ content: letterContent });
  };

  const handleSubmit = () => {
    if (!letterContent.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }
    onSubmit({ content: letterContent });
  };

  return (
    <div>
      <Header title="편지 작성" />
      <BackgroundContainer
        background={template?.src || "https://via.placeholder.com/1920x1080"}
      >
        <ContentWrapper>
          <Title>편지 작성</Title>
          <TextAreaWrapper>
            <FixedText>To. {recipient}</FixedText>
            <TextArea
              placeholder="여기에 편지를 작성하세요..."
              value={letterContent}
              onChange={handleContentChange}
              font={selectedFontClass}
            />
            <FixedText>From. {sender}</FixedText>
            <CharacterCount>
              {letterContent.length} / {maxTextLength}
            </CharacterCount>
          </TextAreaWrapper>
          <FontSelect
            selectedFont={selectedFontClass}
            onChange={handleFontChange}
          />
          <ButtonGroup>
            <Button data-variant="secondary" onClick={handleSaveDraft}>
              임시 저장
            </Button>
            <Button onClick={handleSubmit}>편지 보내기</Button>
          </ButtonGroup>
        </ContentWrapper>
      </BackgroundContainer>
    </div>
  );
};

export default LetterWrite;
