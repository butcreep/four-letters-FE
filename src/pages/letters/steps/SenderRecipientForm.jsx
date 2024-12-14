import CommonButton from "components/ui/CommonButton";
import Spinner from "components/ui/Spinner";
import React, { useEffect, useState } from "react";

const SenderRecipientForm = ({ onNext, formData, isLoading }) => {
  const [sender, setSender] = useState(formData.fromSender || ""); // formData로 초기값 설정
  const [recipient, setRecipient] = useState(formData.toRecipient || ""); // formData로 초기값 설정
  useEffect(() => {
    if (formData.fromSender) setSender(formData.fromSender);
    if (formData.toRecipient) setRecipient(formData.toRecipient);
  }, [formData]);

  const handleSubmit = () => {
    onNext({ receiver: sender, writer: recipient });
  };
  const validateInput = (value) => {
    // 첫 번째 글자는 공백 불가능, 전체 길이는 1~7자
    if (value.length > 0 && value[0] === " ") return false; // 첫 글자가 공백이면 유효하지 않음
    if (value.length > 7) return false; // 길이가 7자를 초과하면 유효하지 않음
    return true;
  };

  const handleInputChange = (setter) => (e) => {
    const value = e.target.value;
    if (validateInput(value)) {
      setter(value); // 입력값이 유효하면 상태 업데이트
    }
  };

  return (
    <div className="px-40 h-full">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="pt-[30px] mx-auto flex flex-col justify-between items-center footer-height">
          <div className="flex flex-col gap-6 w-full">
            <div>
              <label className="form-label" htmlFor="sender">
                보내는 이
              </label>
              <input
                className="form-input"
                id="sender"
                type="text"
                maxLength={7}
                value={sender}
                onChange={handleInputChange(setSender)}
                placeholder="별명, 닉네임, 이름으로 입력"
              />
              <p className="text-xs mt-[10px] text-white">
                1~7자 이내로 입력해주세요.
              </p>
            </div>
            <div>
              <label className="form-label" htmlFor="recipient">
                받는 이
              </label>
              <input
                className="form-input"
                id="recipient"
                type="text"
                maxLength={7}
                value={recipient}
                onChange={handleInputChange(setRecipient)}
                placeholder="별명, 닉네임, 이름으로 입력"
              />
              <p className="text-xs mt-[10px] text-white">
                1~7자 이내로 입력해주세요.
              </p>
            </div>
          </div>
          <CommonButton
            text="다음"
            onClick={handleSubmit}
            disabled={!sender.trim() || !recipient.trim()}
          />
        </div>
      )}
    </div>
  );
};

export default SenderRecipientForm;
