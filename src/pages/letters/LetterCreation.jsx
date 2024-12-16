import React, { useState } from "react";
import Header from "components/containers/HeaderContainer";
import { useLocation, useNavigate } from "react-router-dom";
import SenderRecipientForm from "./steps/SenderRecipientForm";
import TemplateSelection from "./steps/TemplateSelection";
import LetterWrite from "./steps/LetterWrite";
import { createLetter, getLetters, updateLetter } from "api/letters";
import CommonModal from "components/ui/CommonModal";
import useKakaoShare from "hooks/useKakaoShare";

const LetterCreation = () => {
  const location = useLocation();

  const recipient = location.state?.recipient;

  const [step, setStep] = useState(1);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    writer: recipient.writer || "",
    receiver: recipient.receiver || "",
    content: recipient.content || "",
    metadata: {
      font: recipient.metadata?.font || "",
      stationery: recipient.metadata?.stationery || "",
    },
  });

  const stepTitles = {
    1: "보내는이/받는이",
    2: "편지지 선택",
    3: "편지 쓰기",
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    } else {
      navigate(-1);
    }
  };

  const handleNext = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const handleDelete = async () => {
    try {
      setFormData({
        writer: "",
        receiver: "",
        content: "",
        metadata: {
          font: "",
          stationery: "",
        },
      });
    } catch (error) {
      console.error("Error clearing letter content:", error);
      alert("편지 내용을 초기화하는 데 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsDeleteModalVisible(false);
      navigate("/home");
    }
  };
  const shareCompleteLink = useKakaoShare("COMPLETE", recipient?.requestId);

  const handleSubmit = async (data) => {
    const requestBody = {
      requestId: recipient.requestId,
      writer: formData.writer,
      receiver: formData.receiver,
      content: data.content,
      metadata: {
        font: data.metadata.font,
        stationery: data.metadata.stationery,
      },
      status: "COMPLETED", // 기본 상태는 COMPLETED
    };

    setIsLoading(true);
    try {
      if (recipient.status === "DRAFT") {
        const updatedLetter = await updateLetter(
          recipient.letterId,
          requestBody
        );
        if (updatedLetter.message === "CREATED") {
          shareCompleteLink("COMPLETE", recipient.letterId); // 카카오 공유
        }
      } else {
        // 새로운 편지 생성
        const response = await createLetter(requestBody);

        if (response.message === "CREATED") {
          const getLetter = await getLetters();
          const getLetterId = getLetter?.data.content.find(
            (letter) => letter.requestId === recipient.requestId
          );

          shareCompleteLink("COMPLETE", getLetterId.letterId); // 카카오 공유
        } else {
          throw new Error("Unexpected response from server");
        }
      }
    } catch (error) {
      console.error("Error Submitting Letter:", error);
      alert("편지 전송에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleSaveDraft = async (draftData) => {
    try {
      const response = await createLetter({
        ...formData,
        ...draftData,
        requestId: recipient.requestId,
        status: "DRAFT",
      });
      if (response.message === "CREATED") {
        console.log("임시저장데이터", response);
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error("임시 저장 중 오류 발생:", error);
      alert("임시 저장에 실패했습니다. 다시 시도해ㄴ주세요.");
    }
  };

  const handleCloseModal = () => {
    setIsDeleteModalVisible(false);
  };

  return (
    <>
      <Header title={stepTitles[step]} onBack={handleBack} />
      <div className="header-height">
        {step === 1 && (
          <SenderRecipientForm
            formData={formData}
            onNext={handleNext}
            isLoading={isLoading}
          />
        )}
        {step === 2 && (
          <TemplateSelection formData={formData} onNext={handleNext} />
        )}
        {step === 3 && (
          <LetterWrite
            formData={formData}
            isLoading={isLoading}
            onSubmit={handleSubmit}
            onSaveDraft={handleSaveDraft}
          />
        )}
      </div>

      {isDeleteModalVisible && (
        <CommonModal
          type="letterDelete"
          isVisible={isDeleteModalVisible}
          onCancel={handleCloseModal}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
};

export default LetterCreation;
