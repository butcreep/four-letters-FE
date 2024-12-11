import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SenderRecipientForm from "./steps/SenderRecipientForm";
import TemplateSelection from "./steps/TemplateSelection";
import LetterWrite from "./steps/LetterWrite";
import { createLetter } from "api/letters";
import { getRequestById, updateRequest } from "api/requests";

const LetterCreation = () => {
  const location = useLocation(); // 현재 경로의 location 객체
  const recipient = location.state?.recipient; // state에서 recipient 추출
  const [editData, seEditData] = useState([]);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fromSender: "",
    toRecipient: "",
    background: "",
    content: "",
    fontClass: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (recipient?.id) {
      const fetchRequests = async () => {
        try {
          const data = await getRequestById(recipient.id);
          seEditData(data); // 상태 업데이트
        } catch (error) {
          console.error("Error fetching requests:", error);
        }
      };
      fetchRequests();
    }
  }, [recipient]);

  useEffect(() => {
    if (editData) {
      setFormData((prev) => ({
        ...prev,
        fromSender: editData.sender || "",
        toRecipient: editData.recipient || "",
        background: editData.background || "",
        content: editData.content || "",
        fontClass: editData.fontClass || "",
      }));
    }
  }, [editData]);

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };
  const handleNext = (data) => {
    if (step === 1) {
      setFormData((prev) => {
        const updatedData = {
          ...prev,
          fromSender: data.sender,
          toRecipient: data.recipient,
        };

        return updatedData;
      });
    } else if (step === 2) {
      setFormData((prev) => {
        const updatedData = { ...prev, background: data };

        return updatedData;
      });
    }
    setStep((prev) => prev + 1);
  };

  const handleSubmit = async (data) => {
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

  const handleSaveDraft = async (draftData) => {
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
    <>
      {step === 1 && (
        <SenderRecipientForm formData={formData} onNext={handleNext} />
      )}
      {step === 2 && (
        <TemplateSelection
          formData={formData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 3 && (
        <LetterWrite
          formData={formData}
          onSubmit={handleSubmit}
          onSaveDraft={handleSaveDraft}
        />
      )}
    </>
  );
};

export default LetterCreation;
