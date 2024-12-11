import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SenderRecipientForm from "./steps/SenderRecipientForm";
import TemplateSelection from "./steps/TemplateSelection";
import LetterWrite from "./steps/LetterWrite";
import { createLetter } from "api/letters";
import { updateRequest } from "api/requests";

const LetterCreation = () => {
  const location = useLocation(); // 현재 경로의 location 객체
  const recipient = location.state?.recipient; // state에서 recipient 추출

  if (!recipient) {
    console.error("Recipient is undefined. Ensure data is being passed correctly.");
  }
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fromSender: "",
    toRecipient: "",
    background: "",
    content: "",
    fontClass: "",
  });
  const navigate = useNavigate();
  const handleBack = () => {
    setStep(prev => prev - 1);
  };
  const handleNext = data => {
    if (step === 1) {
      setFormData(prev => {
        const updatedData = { ...prev, fromSender: data.sender, toRecipient: data.recipient };

        return updatedData;
      });
    } else if (step === 2) {
      setFormData(prev => {
        const updatedData = { ...prev, background: data };

        return updatedData;
      });
    }
    setStep(prev => prev + 1);
  };

  const handleSubmit = async data => {
    const updatedFormData = {
      ...formData,
      content: data.content, // 최신 content 반영
      fontClass: data.fontClass,
    };
    try {
      // 편지 전송
      await createLetter(updatedFormData);

      // 상태 업데이트
      console.log("Updating Status for Recipient:", recipient.id);
      await updateRequest(recipient.id, { isDone: true });

      navigate("/home");
    } catch (error) {
      console.error("Error Sending Letter:", error);
      alert("편지 전송 또는 상태 업데이트에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleSaveDraft = async draftData => {
    try {
      await updateRequest(recipient.id, {
        ...formData,
        ...draftData,
        isDraft: true,
      });

      navigate("/home");
    } catch (error) {
      console.error("임시 저장 중 오류 발생:", error);
      alert("임시 저장에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div>
      {step === 1 && <SenderRecipientForm onNext={handleNext} />}
      {step === 2 && <TemplateSelection onNext={handleNext} onBack={handleBack} />}
      {step === 3 && <LetterWrite formData={formData} onSubmit={handleSubmit} onSaveDraft={handleSaveDraft} />}
    </div>
  );
};

export default LetterCreation;
