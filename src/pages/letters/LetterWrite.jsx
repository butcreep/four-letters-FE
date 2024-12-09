import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  margin-bottom: 20px;

  label {
    font-size: 14px;
    margin-bottom: 5px;
  }

  input {
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 10px;
    outline: none;
    width: 100%;
  }
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

const PreviewArea = styled.div`
  width: 100%;
  height: 300px;
  background-image: url(${props => props.background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;

  p {
    font-size: 16px;
    color: #333;
    white-space: pre-wrap; /* 줄바꿈 지원 */
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  width: 90%;
  max-width: 400px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const LetterWrite = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { recipient, template } = location.state || {};
  const [toRecipient, setToRecipient] = useState(recipient?.sender || "");
  const [fromSender, setFromSender] = useState("");
  const [letterContent, setLetterContent] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleContentChange = e => {
    setLetterContent(e.target.value);
  };

  const handleToRecipientChange = e => {
    setToRecipient(e.target.value);
  };

  const handleFromSenderChange = e => {
    setFromSender(e.target.value);
  };

  const handleSubmit = async () => {
    const baseURL = process.env.REACT_APP_GLITCH_URL || "https://four-lettwes.glitch.me";

    try {
      await axios.post(`${baseURL}/letters`, {
        toRecipient, // 받는 사람 이름
        content: `<PreviewArea background="${template?.src}">
                    <p>To. ${toRecipient}</p>
                    <p>${letterContent || "내용이 없습니다."}</p>
                    <p>From. ${fromSender}</p>
                  </PreviewArea>`,
        fromSender, // 보내는 사람 이름
        background: template?.src, // 편지지 배경 이미지
      });
      alert("편지가 전송되었습니다!");
      navigate("/home"); // 요청 리스트로 이동
    } catch (error) {
      console.error("편지를 전송하는 중 오류 발생:", error);
    }
  };

  const handleSaveDraft = async () => {
    const baseURL = process.env.REACT_APP_GLITCH_URL || "https://four-lettwes.glitch.me";
    try {
      await axios.put(`${baseURL}/requests/${parseInt(recipient.id, 10)}`, {
        isDraft: true,
        content: letterContent,
        toRecipient,
        fromSender,
      });
      alert("편지가 임시 저장되었습니다.");
      navigate("/home"); // 요청 리스트로 이동
    } catch (error) {
      console.error("임시 저장 중 오류 발생:", error);
    }
  };

  const handleOpenPreview = () => {
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  return (
    <Container>
      <Title>편지 작성</Title>
      <InputGroup>
        <label htmlFor="toRecipient">받는 사람</label>
        <input id="toRecipient" type="text" value={toRecipient} onChange={handleToRecipientChange} />
        <label htmlFor="fromSender">보내는 사람</label>
        <input id="fromSender" type="text" value={fromSender} onChange={handleFromSenderChange} />
      </InputGroup>
      <TextArea
        placeholder="여기에 편지를 작성하세요..."
        value={letterContent}
        onChange={handleContentChange}
        background={template?.src}
      />
      <ButtonGroup>
        <Button data-variant="secondary" onClick={handleSaveDraft}>
          임시 저장
        </Button>
        <Button onClick={handleOpenPreview}>미리보기</Button>
        <Button onClick={handleSubmit}>편지 보내기</Button>
      </ButtonGroup>

      {isPreviewOpen && (
        <ModalOverlay onClick={handleClosePreview}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <PreviewArea background={template?.src}>
              <p>To. {toRecipient}</p>
              <p>{letterContent || "내용이 없습니다."}</p>
              <p>From. {fromSender}</p>
            </PreviewArea>
            <Button onClick={handleClosePreview}>닫기</Button>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default LetterWrite;
