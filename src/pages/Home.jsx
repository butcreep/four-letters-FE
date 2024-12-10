import React, { useEffect, useState } from "react";
import axios from "axios";
import RequestList from "./requests/RequestList";
import CommonModal from "components/CommonModal";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalType, setModalType] = useState(null); // 모달 타입 관리
  const navigate = useNavigate();

  useEffect(() => {
    const baseURL = process.env.REACT_APP_GLITCH_URL || "https://four-lettwes.glitch.me";
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${baseURL}/requests`);
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching fetchRequests:", error);
      }
    };
    fetchRequests();
  }, []);

  const handleWriteLetter = () => {
    navigate(`/letter/${selectedRequest.id}`, {
      state: { recipient: selectedRequest },
    });
  };

  const handleDeleteRequest = async () => {
    const baseURL = process.env.REACT_APP_GLITCH_URL || "https://four-lettwes.glitch.me";

    try {
      await axios.delete(`${baseURL}/requests/${selectedRequest.id}`);
      setRequests(prev => prev.filter(req => req.id !== selectedRequest.id));
      setSelectedRequest(null);
      setModalType(null);
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
    setModalType(null);
  };

  return (
    <div className="app-container">
      <RequestList
        requests={requests}
        onRequestClick={req => {
          setSelectedRequest(req);
          setModalType(req.isDraft ? "continueWriting" : "friendRequest");
        }}
      />

      {modalType && (
        <CommonModal
          type={modalType}
          isVisible={!!modalType}
          onCancel={modalType === "deleteRequest" ? handleCloseModal : () => setModalType("deleteRequest")}
          onConfirm={modalType === "deleteRequest" ? handleDeleteRequest : handleWriteLetter}
          onClose={handleCloseModal}
          data={selectedRequest}
        />
      )}
    </div>
  );
};

export default Home;
