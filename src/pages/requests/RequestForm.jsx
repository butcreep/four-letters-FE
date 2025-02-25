import React, { useState } from "react";
// import styled from "styled-components";
import CommonButton from "components/ui/CommonButton";
import CommonModal from "components/ui/CommonModal";
import { useNavigate, useParams } from "react-router-dom";
import { createRequest } from "api/requests";
import HomeBg from "assets/img/Home-bg.svg";
import Hello from "assets/icon/Hello-Santa.svg";
import Spinner from "components/ui/Spinner";

const RequestForm = () => {
  const { requestId } = useParams() || { requestId: "default-id" };

  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 유효성 검사 함수
  const validateInput = (value, minLength, maxLength) => {
    if (value.trim().length < minLength || value.trim().length > maxLength) {
      return false;
    }
    return true;
  };

  const isFormValid = () => {
    return (
      validateInput(formData.name, 1, 7) && // 요청자: 1~7자
      validateInput(formData.message, 1, 50) // 메시지: 1~50자
    );
  };

  const handleInputChange = field => e => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    const requestData = {
      requesterName: formData.name,
      message: formData.message,
    };

    console.log(requestData, requestId);
    try {
      const response = await createRequest(requestData, requestId);
      console.log("response:", response);
      if (response?.message === "CREATED") {
        setIsModalOpen(true); // 성공 시 모달 열기
      } else {
        alert("신청에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      if (error.response?.status === 400) {
        const errorMessage = error.response?.data?.error?.map(err => err.message).join(", ");
        alert(`입력 오류: ${errorMessage || "잘못된 요청입니다."}`);
      } else {
        alert("서버 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate("/");
    setFormData({ name: "", message: "" });
  };

  return (
    <>
      {loading && <Spinner text="요청을 처리 중입니다..." opacity={0.8} />}
      <div className="bg-[#8B80DE] pt-5 ">
        <img src={HomeBg} alt="" className="w-full relative bottom-[-1px]" />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#ofofof] text-white px-40">
        <h1 className="yonepick-subtitle text-center mb-[30px]">
          나한테 <span className="yonepick-title gradient-text">편지</span>
          <br />
          받고 싶은 사람?
        </h1>
        <div className="w-full">
          <div>
            <img src={Hello} alt="" className="mx-auto" />
          </div>
          <div className="py-[15px] rounded-[8px] mb-[40px] leading-[1.3] purple-gradient">
            <p className="text-center text-lg">
              친구에게 크리스마스
              <br />
              💌 편지를 요청해 보세요!
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 mb-[30px]">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                요청자
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange("name")}
                className="form-input"
                placeholder="이름을 입력해주세요"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                메시지
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange("message")}
                className="form-input"
                rows="4"
                placeholder="남길 말을 적어주세요 (최대 50자)"
                required
              ></textarea>
            </div>
          </form>
          <CommonButton
            text="편지 요청하기"
            onClick={handleSubmit}
            disabled={!isFormValid() || loading} // 버튼 활성화 조건
            $bgColor="#FA482C"
          />
        </div>
        <div className="text-left mt-[60px] pb-[30px]">
          <p className="mb-3 text-base">안내사항</p>
          <ul className="text-sm text-[#B1B1B9] list-disc list-inside">
            <li className="pb-[6px]">
              편지를 요청해야 작성자가 편지를 발송할 수 있습니다. (카카오 알림톡으로 편지를 보내드려요)
            </li>
            <li>작성자가 편지를 거절할 수 있습니다. (단, 요청자에게 알림이 가지 않아요)</li>
          </ul>
        </div>
      </div>
      {isModalOpen && (
        <CommonModal
          type="letterAskComplete"
          isVisible={!!isModalOpen}
          onConfirm={handleModalClose} // 확인 버튼 동작
        />
      )}
    </>
  );
};

export default RequestForm;
