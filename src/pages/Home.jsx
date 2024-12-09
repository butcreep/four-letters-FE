import React, { useEffect, useState } from "react";
import axios from "axios";
import NoLetters from "components/NoLetters";
import RequestList from "./requests/RequestList";
import Modal from "components/Modal";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const baseURL = process.env.REACT_APP_GLITCH_URL || "https://four-lettwes.glitch.me";
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${baseURL}/requests`);
        console.log(response.data);
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching fetchRequests:", error);
      }
    };
    fetchRequests();
  }, []);

  const handleWriteLetter = () => {
    navigate(`/letter-select/${selectedRequest.id}`, { state: { recipient: selectedRequest } });
  };
  const handleContinueDraft = () => {
    // setSelectedRequest(request);
    console.log("selectedRequest", selectedRequest);
  };

  return (
    <div className="app-container">
      {requests.length > 0 ? (
        <RequestList requests={requests} onRequestClick={setSelectedRequest} onContinueDraft={handleContinueDraft} />
      ) : (
        <NoLetters />
      )}

      {selectedRequest && (
        <>
          {selectedRequest.isDraft ? (
            <Modal
              title="작성중인 편지"
              content={`작성중이던 편지가 있습니다. 이어서 작성할까요?`}
              onConfirm={() => {
                handleContinueDraft();
              }}
              onCancel={() => setSelectedRequest(null)}
              onClose={() => setSelectedRequest(null)}
            />
          ) : (
            <Modal
              title="편지 쓰기"
              content={`${selectedRequest.sender}에게 편지를 작성하세요.`}
              onConfirm={handleWriteLetter}
              onClose={() => setSelectedRequest(null)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
