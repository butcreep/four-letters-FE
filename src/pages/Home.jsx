// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import NoLetters from "components/NoLetters";
// import RequestList from "./requests/RequestList";
// import Modal from "components/Modal";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const [requests, setRequests] = useState([]);
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const baseURL = process.env.REACT_APP_GLITCH_URL || "https://four-lettwes.glitch.me";
//     const fetchRequests = async () => {
//       try {
//         const response = await axios.get(`${baseURL}/requests`);
//         console.log(response.data);
//         setRequests(response.data);
//       } catch (error) {
//         console.error("Error fetching fetchRequests:", error);
//       }
//     };
//     fetchRequests();
//   }, []);

//   const handleWriteLetter = () => {
//     navigate(`/letter-select/${selectedRequest.id}`, { state: { recipient: selectedRequest } });
//   };
//   const handleContinueDraft = () => {
//     // setSelectedRequest(request);
//     console.log("selectedRequest", selectedRequest);
//   };

//   return (
//     <div className="app-container">
//       {requests.length > 0 ? (
//         <RequestList requests={requests} onRequestClick={setSelectedRequest} onContinueDraft={handleContinueDraft} />
//       ) : (
//         <NoLetters />
//       )}

//       {selectedRequest && (
//         <>
//           {selectedRequest.isDraft ? (
//             <Modal
//               title="작성중인 편지"
//               content={`작성중이던 편지가 있습니다. 이어서 작성할까요?`}
//               onConfirm={() => {
//                 handleContinueDraft();
//               }}
//               onCancel={() => setSelectedRequest(null)}
//               onClose={() => setSelectedRequest(null)}
//             />
//           ) : (
//             <Modal
//               title="편지 쓰기"
//               content={`${selectedRequest.sender}에게 편지를 작성하세요.`}
//               onConfirm={handleWriteLetter}
//               onClose={() => setSelectedRequest(null)}
//             />
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Home;
import React, { useEffect, useState } from "react";
import axios from "axios";
import NoLetters from "components/NoLetters";
import RequestList from "./requests/RequestList";
import CommonModal from "components/CommonModal"; // Ant Design 기반 Modal 컴포넌트
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false); // 요청 삭제 확인 모달 상태
  const navigate = useNavigate();

  useEffect(() => {
    const baseURL =
      process.env.REACT_APP_GLITCH_URL || "https://four-lettwes.glitch.me";
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
    navigate(`/letter-select/${selectedRequest.id}`, {
      state: { recipient: selectedRequest },
    });
  };

  const handleContinueDraft = () => {
    console.log("selectedRequest", selectedRequest);
  };

  const handleDeleteRequest = async () => {
    const baseURL =
      process.env.REACT_APP_GLITCH_URL || "https://four-lettwes.glitch.me";

    try {
      await axios.delete(`${baseURL}/requests/${selectedRequest.id}`);
      setRequests((prev) =>
        prev.filter((request) => request.id !== selectedRequest.id)
      );
      setSelectedRequest(null); // 선택된 요청 초기화
      setDeleteConfirmationVisible(false); // 삭제 모달 닫기
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  const handleCancelAll = () => {
    setSelectedRequest(null);
    setDeleteConfirmationVisible(false);
  };

  return (
    <div className="app-container">
      {requests.length > 0 ? (
        <RequestList
          requests={requests}
          onRequestClick={setSelectedRequest}
          onContinueDraft={handleContinueDraft}
        />
      ) : (
        <NoLetters />
      )}

      {/* 첫 번째 모달 */}
      {selectedRequest && (
        <CommonModal
          title={
            selectedRequest.isDraft
              ? "이어서 작성할까요?"
              : `${selectedRequest.sender}`
          }
          content={
            selectedRequest.isDraft
              ? "작성중이던 편지가 있습니다."
              : `${selectedRequest.content}`
          }
          cancelText={selectedRequest.isDraft ? "취소" : "요청 삭제"}
          confirmText={selectedRequest.isDraft ? "이어서 작성" : "편지 쓰기"}
          onCancel={
            () =>
              selectedRequest.isDraft
                ? setSelectedRequest(null)
                : setDeleteConfirmationVisible(true) // 요청 삭제 모달 표시
          }
          onConfirm={
            selectedRequest.isDraft ? handleContinueDraft : handleWriteLetter
          }
          isVisible={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}

      {/* 요청 삭제 확인 모달 */}
      {deleteConfirmationVisible && (
        <CommonModal
          title="요청을 삭제할까요?"
          content="삭제하면 되돌릴 수 없습니다."
          cancelText="취소"
          confirmText="삭제"
          onCancel={handleCancelAll} // 모두 닫기
          onConfirm={handleDeleteRequest} // 삭제 처리
          isVisible={deleteConfirmationVisible}
          onClose={handleCancelAll} // 모두 닫기
        />
      )}
    </div>
  );
};

export default Home;
