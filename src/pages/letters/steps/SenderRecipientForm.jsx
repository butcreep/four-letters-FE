import CommonButton from "components/CommonButton";
import Header from "components/HeaderContainer";
import React, { useState } from "react";

const SenderRecipientForm = ({ onNext }) => {
  const [sender, setSender] = useState("");
  const [recipient, setRecipient] = useState("");

  const handleSubmit = () => {
    onNext({ sender, recipient });
  };

  return (
    <>
      <Header title="보내는 이/받는 이" />
      <div className="pt-[40px] w-[295px] mx-auto flex flex-col justify-between items-center">
        <div className="flex flex-col gap-6 w-full">
          <div>
            <label className="form-label" htmlFor="sender">
              보내는 이
            </label>
            <input
              className="form-input"
              id="sender"
              type="text"
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
    </>
  );
};

export default SenderRecipientForm;