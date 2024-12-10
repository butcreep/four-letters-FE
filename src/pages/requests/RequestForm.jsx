import React, { useState } from "react";
import CommonButton from "components/CommonButton";
import axios from "axios";

const RequestForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === "phone") {
      const onlyNumbers = value.replace(/[^0-9]/g, ""); // 숫자만 남김
      if (onlyNumbers.length <= 11) {
        setFormData(prev => ({ ...prev, [name]: onlyNumbers }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const baseURL = process.env.REACT_APP_GLITCH_URL || "https://four-lettwes.glitch.me";

  const handleSubmit = async e => {
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
      <h1 className="text-2xl font-bold mb-6">나한테 편지 받고 싶은 사람?</h1>
      <p className="text-center text-lg mb-8">친구에게 크리스마스 ❤️ 편지를 요청해 보세요!</p>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg w-full max-w-md space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            요청자 이름
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 rounded border-none bg-gray-700 text-white"
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
            className="w-full p-2 rounded border-none bg-gray-700 text-white"
            placeholder="핸드폰 번호를 입력해주세요"
            pattern="\d{11}" // 11자리 숫자만 허용
            maxLength={11} // 최대 입력 길이
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            남길말
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 rounded border-none bg-gray-700 text-white"
            rows="4"
            placeholder="남길 말을 적어주세요 (최대 50자)"
            required
          ></textarea>
        </div>
        <CommonButton
          text="편지 요청하기"
          type="submit"
          className="w-full py-2 bg-red-500 text-white font-bold text-lg rounded-lg"
        />
      </form>
      <div className="text-sm mt-6 text-left max-w-md">
        <p className="mb-2 font-bold">📌 안내사항</p>
        <ul className="list-disc list-inside">
          <li>편지를 요청해야 작성자가 편지를 발송할 수 있습니다.</li>
          <li>작성자가 편지를 거절할 수 있습니다. (단, 요청자에게 알림이 가지 않아요)</li>
        </ul>
      </div>
    </div>
  );
};

export default RequestForm;
