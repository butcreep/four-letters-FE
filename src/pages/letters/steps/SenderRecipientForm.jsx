import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;

  label {
    display: block;
    margin-bottom: 5px;
    font-size: 14px;
  }

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
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

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
`;

const SenderRecipientForm = ({ onNext }) => {
  const [sender, setSender] = useState("");
  const [recipient, setRecipient] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!sender.trim() || !recipient.trim()) {
      setError("모든 필드를 입력해주세요."); // 필드 유효성 검사
      return;
    }
    setError(""); // 오류 메시지 초기화
    onNext({ sender, recipient });
  };

  return (
    <Container>
      <h2>보내는 사람 및 받는 사람 정보 입력</h2>
      <InputGroup>
        <label htmlFor="sender">보내는 사람</label>
        <input
          id="sender"
          type="text"
          value={sender}
          onChange={e => setSender(e.target.value)}
          placeholder="보내는 사람 이름을 입력하세요"
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="recipient">받는 사람</label>
        <input
          id="recipient"
          type="text"
          value={recipient}
          onChange={e => setRecipient(e.target.value)}
          placeholder="받는 사람 이름을 입력하세요"
        />
      </InputGroup>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Button onClick={handleSubmit} disabled={!sender.trim() || !recipient.trim()}>
        다음
      </Button>
    </Container>
  );
};

export default SenderRecipientForm;
