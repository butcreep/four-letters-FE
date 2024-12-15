// import React, { useEffect, useState } from "react";
// import Header from "components/containers/HeaderContainer";
// import { useLocation, useNavigate } from "react-router-dom";
// import SenderRecipientForm from "./steps/SenderRecipientForm";
// import TemplateSelection from "./steps/TemplateSelection";
// import LetterWrite from "./steps/LetterWrite";
// import { createLetter } from "api/letters";
// import { getRequestById, updateRequest } from "api/requests";
// import CommonModal from "components/ui/CommonModal";

// const LetterCreation = () => {
//   const location = useLocation(); // 현재 경로의 location 객체
//   const recipient = location.state?.recipient; // state에서 recipient 추출
//   const [editData, seEditData] = useState([]);
//   const [step, setStep] = useState(1);
//   const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
//   const [requestLoading, setRequestLoading] = useState(false); // 로딩 상태 추가
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     fromSender: "",
//     toRecipient: "",
//     background: "",
//     message: "",
//     fontClass: "",
//   });
//   const stepTitles = {
//     1: "보내는이/받는이",
//     2: "편지지 선택",
//     3: "편지 쓰기",
//   };
//   useEffect(() => {
//     if (recipient?.id) {
//       const fetchRequests = async () => {
//         setIsLoading(true); // 로딩 종료
//         try {
//           const data = await getRequestById(recipient.id);
//           seEditData(data); // 상태 업데이트
//         } catch (error) {
//           console.error("Error fetching requests:", error);
//         } finally {
//           setIsLoading(false); // 로딩 종료
//         }
//       };
//       fetchRequests();
//     }
//   }, [recipient.id]);

//   useEffect(() => {
//     if (editData) {
//       setFormData((prev) => ({
//         ...prev,
//         fromSender: editData.fromSender || "",
//         toRecipient: editData.toRecipient || "",
//         background: editData.background || "",
//         message: editData.message || "",
//         fontClass: editData.fontClass || "",
//       }));
//     }
//   }, [editData]);

//   const handleBack = () => {
//     if (step > 1) {
//       setStep((prev) => prev - 1);
//     } else {
//       navigate(-1);
//     }
//   };

//   const handleNext = (data) => {
//     setFormData((prev) => {
//       const updatedFormData = { ...prev, ...data };

//       return updatedFormData;
//     });
//     setStep((prev) => prev + 1);
//   };

//   const handleDelete = async () => {
//     try {
//       // 폼 데이터 초기화
//       setFormData({
//         fromSender: "",
//         toRecipient: "",
//         background: "",
//         message: "",
//         fontClass: "",
//       });

//       // 요청 상태 업데이트
//       await updateRequest(recipient.id, {
//         isDraft: false, // 임시저장 여부 초기화
//         isDone: false, // 완료 상태 초기화
//       });
//     } catch (error) {
//       console.error("Error clearing letter content:", error);
//       alert("편지 내용을 초기화하는 데 실패했습니다. 다시 시도해주세요.");
//     } finally {
//       setIsDeleteModalVisible(false); // 모달 닫기
//       navigate("/home"); // 홈으로 이동
//     }
//   };

//   const handleSubmit = async (data) => {
//     setRequestLoading(true); // 로딩 시작
//     const updatedFormData = {
//       ...formData,
//       message: data.message, // 최신 content 반영
//       fontClass: data.fontClass,
//     };

//     try {
//       // 편지 전송
//       await createLetter(updatedFormData);
//       await updateRequest(recipient.id, { isDone: true });
//       // 전송 완료 페이지로 이동
//       navigate("/letter-complete");
//     } catch (error) {
//       console.error("Error Sending Letter:", error);
//       alert("편지 전송 또는 상태 업데이트에 실패했습니다. 다시 시도해주세요.");
//     } finally {
//       setRequestLoading(false); // 로딩 종료
//     }
//   };

//   const handleSaveDraft = async (draftData) => {
//     try {
//       await updateRequest(recipient.id, {
//         ...formData,
//         ...draftData,
//         isDraft: true,
//       });
//     } catch (error) {
//       console.error("임시 저장 중 오류 발생:", error);
//       alert("임시 저장에 실패했습니다. 다시 시도해주세요.");
//     }
//   };
//   const handleCloseModal = () => {
//     setIsDeleteModalVisible(false);
//   };
//   return (
//     <>
//       <Header title={stepTitles[step]} onBack={handleBack} />
//       <div className="header-height">
//         {step === 1 && (
//           <SenderRecipientForm
//             formData={formData}
//             onNext={handleNext}
//             isLoading={isLoading}
//           />
//         )}
//         {step === 2 && (
//           <TemplateSelection formData={formData} onNext={handleNext} />
//         )}
//         {step === 3 && (
//           <LetterWrite
//             formData={formData}
//             requestLoading={requestLoading}
//             onSubmit={handleSubmit}
//             onSaveDraft={handleSaveDraft}
//           />
//         )}
//       </div>

//       {isDeleteModalVisible && (
//         <CommonModal
//           type="letterDelete"
//           isVisible={!!setIsDeleteModalVisible}
//           onCancel={handleCloseModal}
//           onConfirm={handleDelete}
//         />
//       )}
//     </>
//   );
// };

// export default LetterCreation;
import React, { useEffect, useState } from "react";
import Header from "components/containers/HeaderContainer";
import { useLocation, useNavigate } from "react-router-dom";
import SenderRecipientForm from "./steps/SenderRecipientForm";
import TemplateSelection from "./steps/TemplateSelection";
import LetterWrite from "./steps/LetterWrite";
import { createLetter } from "api/letters";
import { getRequestById, updateRequest } from "api/requests";
import CommonModal from "components/ui/CommonModal";

const LetterCreation = () => {
  const location = useLocation();
  const recipient = location.state?.recipient;
  const [editData, setEditData] = useState(null);
  const [step, setStep] = useState(1);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    writer: "",
    receiver: "",
    content: "",
    metadata: {
      font: "",
      stationery: "",
    },
  });

  const stepTitles = {
    1: "보내는이/받는이",
    2: "편지지 선택",
    3: "편지 쓰기",
  };

  useEffect(() => {
    if (recipient?.id) {
      const fetchRequests = async () => {
        setIsLoading(true);
        try {
          const data = await getRequestById(recipient.id);
          setEditData(data);
        } catch (error) {
          console.error("Error fetching requests:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchRequests();
    }
  }, [recipient?.id]);

  useEffect(() => {
    if (editData) {
      setFormData({
        fromSender: editData.fromSender || "",
        toRecipient: editData.toRecipient || "",
        message: editData.message || "",
        metadata: {
          font: editData.metadata?.font || "",
          stationery: editData.metadata?.stationery || "",
        },
      });
    }
  }, [editData]);

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

  const handleSubmit = async (data) => {
    setRequestLoading(true);
    const requestBody = {
      requestId: recipient.requestId,
      writer: formData.writer,
      receiver: formData.receiver,
      content: data.content,
      metadata: {
        font: data.metadata.font,
        stationery: data.metadata.stationery,
      },
      status: "COMPLETED",
    };
    console.log("편지 전송 데이터", requestBody);

    try {
      const response = await createLetter(requestBody);

      if (response.message === "CREATED") {
        await updateRequest(recipient.id, { isDone: true });
        navigate("/letter-complete");
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Error Sending Letter:", error);
      alert("편지 전송에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setRequestLoading(false);
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
      console.log("임시저장데이터", response);
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
            requestLoading={requestLoading}
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
