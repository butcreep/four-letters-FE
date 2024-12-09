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
  return (
    <div className="app-container">
      {requests.length > 0 ? <RequestList requests={requests} onRequestClick={setSelectedRequest} /> : <NoLetters />}

      {selectedRequest && (
        <Modal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onCancel={() => setSelectedRequest(null)}
          confirmText="편지 쓰기"
          onConfirm={handleWriteLetter}
        />
      )}
    </div>
  );
};

export default Home;
