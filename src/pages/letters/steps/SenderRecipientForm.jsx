import CommonButton from "components/ui/CommonButton";
import React, { useEffect, useState } from "react";

const SenderRecipientForm = ({ onNext, formData }) => {
  const [sender, setSender] = useState(formData.fromSender || ""); // formData로 초기값 설정
  const [recipient, setRecipient] = useState(formData.toRecipient || ""); // formData로 초기값 설정
  useEffect(() => {
    if (formData.fromSender) setSender(formData.fromSender);
    if (formData.toRecipient) setRecipient(formData.toRecipient);
  }, [formData]);

  const handleSubmit = () => {
    onNext({ sender, recipient });
  };

  return (
    <div className="px-40 footer-height">
      <div className="pt-[20px] mx-auto flex flex-col justify-between items-center footer-height">
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
              onChange={(e) => setSender(e.target.value)}
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
              onChange={(e) => setRecipient(e.target.value)}
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
    </div>
  );
};

export default SenderRecipientForm;
