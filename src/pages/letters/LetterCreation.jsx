import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SenderRecipientForm from "./steps/SenderRecipientForm";
import TemplateSelection from "./steps/TemplateSelection";
import LetterWrite from "./steps/LetterWrite";

const LetterCreation = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    sender: "",
    recipient: "",
    template: null,
    content: "",
  });
  const navigate = useNavigate();

  const handleBack = () => {
    setStep(prev => prev - 1);
  };
  const handleNext = data => {
    console.log("Received Data from Child:", data); // 디버깅용
    if (step === 1) {
      setFormData(prev => {
        const updatedData = { ...prev, sender: data.sender, recipient: data.recipient };
        console.log("Updated FormData (Step 1):", updatedData); // 디버깅용
        return updatedData;
      });
    } else if (step === 2) {
      setFormData(prev => {
        const updatedData = { ...prev, template: data };
        console.log("Updated FormData (Step 2):", updatedData); // 디버깅용
        return updatedData;
      });
    }
    setStep(prev => prev + 1);
  };
  // const handleSubmit = async () => {
  //   const baseURL = process.env.REACT_APP_GLITCH_URL || "https://four-lettwes.glitch.me";

  //   try {
  //     const { recipient, content, sender, template } = formData;
  //     // 1. 편지 전송
  //     await axios.post(`${baseURL}/letters`, {
  //       toRecipient: recipient, // 받는 사람 정보
  //       content, // 편지 내용
  //       fromSender: sender, // 보내는 사람 정보
  //       fontClass: template?.fontClass, // 선택된 폰트 클래스 (template 속성에 포함된 폰트 클래스 사용)
  //       background: template?.src, // 템플릿 배경 이미지
  //     });

  //     // 2. 상태 업데이트
  //     await axios.put(`${baseURL}/requests/${parseInt(recipient.id, 10)}`, {
  //       isDone: true, // 상태를 완료로 변경
  //     });

  //     alert("편지가 성공적으로 전송되었습니다!");
  //     navigate("/home");
  //   } catch (error) {
  //     console.error("편지를 전송하는 중 오류 발생:", error);
  //     alert("편지 전송 또는 상태 업데이트에 실패했습니다. 다시 시도해주세요.");
  //   }
  // };
  const handleSubmit = async () => {
    const baseURL = process.env.REACT_APP_GLITCH_URL || "https://four-lettwes.glitch.me";

    try {
      const { recipient, content, sender, template } = formData;
      const requestData = {
        toRecipient: recipient, // 받는 사람 정보
        content, // 편지 내용
        fromSender: sender, // 보내는 사람 정보
        background: template?.src, // 템플릿 배경 이미지
      };

      console.log("Sending Letter Data:", requestData); // 요청 데이터 확인

      // 1. 편지 전송
      await axios.post(`${baseURL}/letters`, requestData);

      // 2. 상태 업데이트
      console.log("Updating Status for Recipient:", recipient.id); // 상태 업데이트 확인
      await axios.put(`${baseURL}/requests/${parseInt(recipient.id, 10)}`, {
        isDone: true,
      });

      alert("편지가 성공적으로 전송되었습니다!");
      navigate("/home");
    } catch (error) {
      console.error("Error Sending Letter:", error); // 오류 출력
      alert("편지 전송 또는 상태 업데이트에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleSaveDraft = async draftData => {
    const baseURL = process.env.REACT_APP_GLITCH_URL || "https://four-lettwes.glitch.me";
    try {
      await axios.put(`${baseURL}/requests/draft`, {
        ...formData,
        ...draftData,
        isDraft: true,
      });
      alert("편지가 임시 저장되었습니다.");
    } catch (error) {
      console.error("임시 저장 중 오류 발생:", error);
    }
  };

  return (
    <div>
      {step === 1 && <SenderRecipientForm onNext={handleNext} />}
      {step === 2 && <TemplateSelection onNext={handleNext} onBack={handleBack} />}
      {step === 3 && (
        <LetterWrite
          sender={formData.sender}
          recipient={formData.recipient}
          template={formData.template}
          onSubmit={handleSubmit}
          onSaveDraft={handleSaveDraft}
        />
      )}
    </div>
  );
};

export default LetterCreation;
