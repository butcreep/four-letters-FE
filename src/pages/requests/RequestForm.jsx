// import React, { useState } from "react";
// import styled from "styled-components";
// import CommonButton from "components/ui/CommonButton";
// import CommonModal from "components/ui/CommonModal";
// import { useNavigate, useParams } from "react-router-dom";
// import { createRequest } from "api/requests";
// import HomeBg from "assets/img/Home-bg.svg";
// import Hello from "assets/icon/Hello-Santa.svg";
// import Spinner from "components/ui/Spinner";

// const GradientText = styled.span`
//   background: linear-gradient(180deg, #867cdd 0%, #eec8ff 100%);
//   -webkit-background-clip: text; /* 텍스트로 배경을 클리핑 */
//   -webkit-text-fill-color: transparent; /* 텍스트를 투명하게 */
//   font-size: 52px; /* "편지"의 크기 */
// `;
// const GradientDiv = styled.div`
//   background: linear-gradient(180deg, #867cdd 0%, #6157b6 100%);
//   padding: 15px 0;
//   border-radius: 8px;
//   margin-bottom: 40px;
//   line-height: 130%;
// `;

// const RequestForm = () => {
//   const { requestId } = useParams();

//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     message: "",
//   });
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // 유효성 검사 함수
//   const validateInput = (
//     value,
//     minLength,
//     maxLength,
//     noLeadingSpace = false
//   ) => {
//     if (noLeadingSpace && value[0] === " ") return false; // 첫 글자가 공백이면 유효하지 않음
//     if (value.trim().length < minLength || value.trim().length > maxLength)
//       return false;
//     return true;
//   };

//   // 입력값 변경 핸들러
//   const handleInputChange =
//     (setter, minLength, maxLength, noLeadingSpace = false) =>
//     (e) => {
//       const value = e.target.value;

//       // 빈 문자열일 경우 검사를 통과하도록 설정
//       if (
//         value === "" ||
//         validateInput(value, minLength, maxLength, noLeadingSpace)
//       ) {
//         setter(value);
//       }
//     };

//   const handlePhoneChange = (e) => {
//     const { value } = e.target;
//     const onlyNumbers = value.replace(/[^0-9]/g, ""); // 숫자만 남김
//     if (onlyNumbers.length <= 11) {
//       setFormData((prev) => ({ ...prev, phone: onlyNumbers }));
//     }
//   };

//   const isFormValid = () => {
//     return (
//       validateInput(formData.name, 1, 7, true) && // 요청자: 1~7자, 첫 글자 공백 불가
//       formData.phone.trim().length === 11 && // 핸드폰 번호: 11자
//       validateInput(formData.message, 1, 50) // 메시지: 1~50자
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (loading) return;
//     setLoading(true);
//     const requestData = {
//       requesterName: formData.name,
//       // phone: formData.phone,
//       message: formData.message,
//     };

//     try {
//       const response = await createRequest(requestData, requestId);

//       if (response) {
//         setIsModalOpen(true); // 요청 성공 시 모달 열기
//       } else {
//         alert("신청에 실패했습니다. 다시 시도해주세요.");
//       }
//     } catch (error) {
//       console.error("Error submitting request:", error);
//       alert("서버 오류가 발생했습니다.");
//     } finally {
//       setLoading(false); // 로딩 종료
//     }
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//     navigate("/");
//     setFormData({ name: "", phone: "", message: "" });
//   };

//   return (
//     <>
//       {loading && <Spinner text="요청을 처리 중입니다..." opacity={0.8} />}
//       <div className="bg-[#8B80DE] pt-5 ">
//         <img src={HomeBg} alt="" className="w-full relative bottom-[-1px]" />
//       </div>
//       <div className="flex flex-col items-center justify-center min-h-screen bg-[#ofofof] text-white px-40">
//         <h1 className="yonepick-subtitle text-center mb-[30px]">
//           나한테 <GradientText className="yonepick-title">편지</GradientText>
//           <br />
//           받고 싶은 사람?
//         </h1>
//         <div className="w-full">
//           <div>
//             <img src={Hello} alt="" className="mx-auto" />
//           </div>
//           <GradientDiv>
//             <p className="text-center text-lg">
//               친구에게 크리스마스
//               <br />
//               💌 편지를 요청해 보세요!
//             </p>
//           </GradientDiv>
//           <form
//             onSubmit={handleSubmit}
//             className="flex flex-col gap-6 mb-[30px]"
//           >
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium mb-2">
//                 요청자
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange(
//                   (value) => setFormData((prev) => ({ ...prev, name: value })),
//                   1,
//                   7,
//                   true // 첫 글자 공백 불가
//                 )}
//                 className="form-input"
//                 placeholder="이름을 입력해주세요"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="phone" className="block text-sm font-medium mb-2">
//                 핸드폰 번호
//               </label>
//               <input
//                 type="tel"
//                 id="phone"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handlePhoneChange}
//                 className="form-input"
//                 placeholder="핸드폰 번호를 입력해주세요"
//                 pattern="\d{11}" // 11자리 숫자만 허용
//                 maxLength={11} // 최대 입력 길이
//                 required
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="message"
//                 className="block text-sm font-medium mb-2"
//               >
//                 메시지
//               </label>
//               <textarea
//                 id="message"
//                 name="message"
//                 value={formData.message}
//                 onChange={handleInputChange(
//                   (value) =>
//                     setFormData((prev) => ({ ...prev, message: value })),
//                   1,
//                   50
//                 )}
//                 className="form-input"
//                 rows="4"
//                 placeholder="남길 말을 적어주세요 (최대 50자)"
//                 required
//               ></textarea>
//             </div>
//           </form>
//           <CommonButton
//             text="편지 요청하기"
//             onClick={handleSubmit}
//             disabled={!isFormValid() || loading} // 버튼 활성화 조건
//             $bgColor="#FA482C"
//           />
//         </div>
//         <div className="text-left mt-[60px] pb-[30px]">
//           <p className="mb-3 text-base">안내사항</p>
//           <ul className="text-sm text-[#B1B1B9] list-disc list-inside">
//             <li className="pb-[6px]">
//               편지를 요청해야 작성자가 편지를 발송할 수 있습니다. (카카오
//               알림톡으로 편지를 보내드려요)
//             </li>
//             <li>
//               작성자가 편지를 거절할 수 있습니다. (단, 요청자에게 알림이 가지
//               않아요)
//             </li>
//           </ul>
//         </div>
//       </div>
//       {isModalOpen && (
//         <CommonModal
//           type="letterAskComplete"
//           isVisible={!!isModalOpen}
//           onConfirm={handleModalClose} // 확인 버튼 동작
//         />
//       )}
//     </>
//   );
// };

// export default RequestForm;
import React, { useState } from "react";
import styled from "styled-components";
import CommonButton from "components/ui/CommonButton";
import CommonModal from "components/ui/CommonModal";
import { useNavigate, useParams } from "react-router-dom";
import { createRequest } from "api/requests";
import HomeBg from "assets/img/Home-bg.svg";
import Hello from "assets/icon/Hello-Santa.svg";
import Spinner from "components/ui/Spinner";

const GradientText = styled.span`
  background: linear-gradient(180deg, #867cdd 0%, #eec8ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 52px;
`;

const GradientDiv = styled.div`
  background: linear-gradient(180deg, #867cdd 0%, #6157b6 100%);
  padding: 15px 0;
  border-radius: 8px;
  margin-bottom: 40px;
  line-height: 130%;
`;

const RequestForm = () => {
  const { requestId } = useParams();

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

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
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
        const errorMessage = error.response?.data?.error
          ?.map((err) => err.message)
          .join(", ");
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
          나한테 <GradientText className="yonepick-title">편지</GradientText>
          <br />
          받고 싶은 사람?
        </h1>
        <div className="w-full">
          <div>
            <img src={Hello} alt="" className="mx-auto" />
          </div>
          <GradientDiv>
            <p className="text-center text-lg">
              친구에게 크리스마스
              <br />
              💌 편지를 요청해 보세요!
            </p>
          </GradientDiv>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 mb-[30px]"
          >
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
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
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
              편지를 요청해야 작성자가 편지를 발송할 수 있습니다. (카카오
              알림톡으로 편지를 보내드려요)
            </li>
            <li>
              작성자가 편지를 거절할 수 있습니다. (단, 요청자에게 알림이 가지
              않아요)
            </li>
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
