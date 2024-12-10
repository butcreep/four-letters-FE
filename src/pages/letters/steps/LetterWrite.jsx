import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  max-width: 500px;
  height: 300px;
  padding: 20px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-image: url(${props => props.background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: #333;
  outline: none;
  resize: none;

  font-family: ${props => props.font}; /* 동적으로 폰트 적용 */
  transition: font-family 0.3s ease-in-out;

  ::placeholder {
    color: rgba(51, 51, 51, 0.5);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
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
  width: 100%;
  font-family: ${props => props.font}, sans-serif; /* 선택된 폰트 적용 */
`;

const Option = styled.option`
  font-family: ${props => props.font}, sans-serif; /* 개별 옵션에 폰트 적용 */
`;

const FontSelect = ({ selectedFont, onChange }) => {
  return (
    <Select value={selectedFont} onChange={onChange} font={selectedFont}>
      <Option value="ycomputer-regular" font="Ycomputer-Regular">
        Y콤퓨타체
      </Option>
      <Option value="dongle" font="Dongle">
        Dongle
      </Option>
      <Option value="gaegu" font="Gaegu">
        Gaegu
      </Option>
      <Option value="hi-melody" font="Hi Melody">
        Hi Melody
      </Option>
      <Option value="poor-story" font="Poor Story">
        Poor Story
      </Option>
    </Select>
  );
};

const LetterWrite = ({ sender, recipient, template, onSubmit, onSaveDraft }) => {
  const [letterContent, setLetterContent] = useState("");
  const [selectedFontClass, setSelectedFontClass] = useState("ycomputer-regular");
  const maxTextLength = 500;

  const handleContentChange = e => {
    const value = e.target.value;
    if (value.length <= maxTextLength) {
      setLetterContent(value);
    }
  };

  const handleFontChange = e => {
    setSelectedFontClass(e.target.value);
  };

  const handleSaveDraft = () => {
    if (!letterContent.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }
    onSaveDraft({
      content: letterContent,
      // font: selectedFontClass,
    });
  };

  const handleSubmit = () => {
    if (!letterContent.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }
    onSubmit({
      content: letterContent,
      // font: selectedFontClass,
    });
  };

  return (
    <Container>
      <Title>편지 작성</Title>
      <p>보내는 사람: {sender}</p>
      <p>받는 사람: {recipient}</p>
      <div className="mb-4">
        <label htmlFor="font-select" className="block text-sm font-medium mb-2">
          폰트 선택
        </label>
        <FontSelect selectedFont={selectedFontClass} onChange={handleFontChange} />
      </div>
      <TextArea
        placeholder="여기에 편지를 작성하세요..."
        value={letterContent}
        onChange={handleContentChange}
        background={template?.src}
        font={selectedFontClass}
      />
      <ButtonGroup>
        <Button data-variant="secondary" onClick={handleSaveDraft}>
          임시 저장
        </Button>
        <Button onClick={handleSubmit}>편지 보내기</Button>
      </ButtonGroup>
    </Container>
  );
};

export default LetterWrite;
