import React, { useState } from "react";
import styled from "styled-components";
import CommonButton from "components/CommonButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GradientText = styled.span`
  background: linear-gradient(180deg, #867cdd 0%, #eec8ff 100%);
  -webkit-background-clip: text; /* 텍스트로 배경을 클리핑 */
  -webkit-text-fill-color: transparent; /* 텍스트를 투명하게 */
  font-size: 52px; /* "편지"의 크기 */
`;
const GradientDiv = styled.div`
  background: linear-gradient(180deg, #867cdd 0%, #6157b6 100%);
  padding: 15px 0;
  border-radius: 8px;
  margin-bottom: 40px;
  line-height: 130%;
`;

const RequestForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const onlyNumbers = value.replace(/[^0-9]/g, ""); // 숫자만 남김
      if (onlyNumbers.length <= 11) {
        setFormData((prev) => ({ ...prev, [name]: onlyNumbers }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const baseURL =
    process.env.REACT_APP_GLITCH_URL || "https://four-lettwes.glitch.me";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      sender: formData.name,
      phone: formData.phone,
      content: formData.message,
      date: new Date().toISOString().split("T")[0],
    };

    try {
      const response = await axios.post(`${baseURL}/requests`, requestData);

      if (response.status === 201) {
        alert("신청이 완료되었습니다!");
        setFormData({ name: "", phone: "", message: "" });
        navigate("/");
      } else {
        alert("신청에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <h1 className="yonepick-subtitle  text-center mb-[60px] ">
        나한테 <GradientText className="yonepick-title">편지</GradientText>
        <br />
        받고 싶은 사람?
      </h1>
      <div className="w-[295px]">
        <GradientDiv>
          <p className="text-center text-lg">
            친구에게 크리스마스
            <br />
            💌 편지를 요청해 보세요!
          </p>
        </GradientDiv>
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
              onChange={handleChange}
              className="form-input"
              placeholder="이름을 입력해주세요"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              핸드폰 번호
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
              placeholder="핸드폰 번호를 입력해주세요"
              pattern="\d{11}" // 11자리 숫자만 허용
              maxLength={11} // 최대 입력 길이
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
              onChange={handleChange}
              className="form-input"
              rows="4"
              placeholder="남길 말을 적어주세요 (최대 50자)"
              required
            ></textarea>
          </div>
        </form>
        <CommonButton text="편지 요청하기" type="submit" bgColor="#FA482C" />
      </div>
      <div className="text-left mt-[60px] w-[305px] max-w-md">
        <p className="mb-3 text-base">안내사항</p>
        <ul className="text-sm text-[#B1B1B9]">
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
  );
};

export default RequestForm;
