const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = 3000;

// CORS 허용
app.use(cors());

// JSON 데이터 파싱
app.use(express.json());

// db.json 데이터 읽기
const getDBData = () => {
  const data = fs.readFileSync("./db.json", "utf-8");
  console.log("DB Data:", data); // 디버깅용 로그 추가
  return JSON.parse(data);
};

// db.json 데이터 쓰기
const saveDBData = data => {
  try {
    console.log("Saving data to db.json..."); // 로그 추가
    fs.writeFileSync("./db.json", JSON.stringify(data, null, 2), "utf-8");
    console.log("Data saved successfully.");
  } catch (error) {
    console.error("Error writing to db.json:", error);
    throw error; // 오류를 다시 던져서 상위 코드에서 처리할 수 있게 합니다.
  }
};

// 기본 경로 처리
app.get("/", (req, res) => {
  res.send("Welcome to the API server. Try /letters or /requests for data.");
});

// 모든 편지 가져오기
app.get("/letters", (req, res) => {
  const db = getDBData();
  res.json(db.letters);
});

// 특정 편지 가져오기
app.get("/letters/:id", (req, res) => {
  const db = getDBData();
  const letter = db.letters.find(letter => letter.id === parseInt(req.params.id, 10));
  if (!letter) {
    return res.status(404).json({ error: "Letter not found" });
  }
  res.json(letter);
});
// 편지 추가 (POST)
// POST /letters - 편지 저장
app.post("/letters", (req, res) => {
  try {
    const db = getDBData();
    const newLetter = {
      id: db.letters.length + 1,
      toRecipient: req.body.toRecipient,
      content: req.body.content,
      fromSender: req.body.fromSender,
      background: req.body.background, // 배경 이미지 URL 저장
    };
    db.letters.push(newLetter);
    saveDBData(db); // db.json에 저장
    res.status(201).json(newLetter); // 새로 생성된 편지 반환
  } catch (error) {
    console.error("편지를 저장하는 중 오류 발생:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 모든 요청 가져오기
app.get("/requests", (req, res) => {
  const db = getDBData();
  res.json(db.requests);
});

// 특정 요청 가져오기
app.get("/requests/:id", (req, res) => {
  const db = getDBData();
  const request = db.requests.find(req => req.id === parseInt(req.params.id, 10));
  if (!request) {
    return res.status(404).json({ error: "Request not found" });
  }
  res.json(request);
});

// 요청 추가 (POST)
app.post("/requests", (req, res) => {
  const db = getDBData();
  const newRequest = {
    id: db.requests.length + 1, // 새로운 ID 할당
    ...req.body,
  };
  db.requests.push(newRequest);
  saveDBData(db); // 데이터 저장
  res.status(201).json(newRequest); // 새로 생성된 요청 반환
});

// 요청 수정 (PUT)
app.put("/requests/:id", (req, res) => {
  try {
    console.log("Request Params:", req.params);
    console.log("Request Body:", req.body);

    const db = getDBData();
    const requestId = parseInt(req.params.id, 10);
    const requestIndex = db.requests.findIndex(req => req.id === requestId);

    if (requestIndex === -1) {
      return res.status(404).json({ error: "Request not found" });
    }

    db.requests[requestIndex] = {
      ...db.requests[requestIndex],
      ...req.body,
    };

    saveDBData(db);
    res.json(db.requests[requestIndex]);
  } catch (error) {
    console.error("Error updating request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 요청 삭제 (DELETE)
app.delete("/requests/:id", (req, res) => {
  const db = getDBData();
  const requestIndex = db.requests.findIndex(req => req.id === parseInt(req.params.id, 10));
  if (requestIndex === -1) {
    return res.status(404).json({ error: "Request not found" });
  }
  const deletedRequest = db.requests.splice(requestIndex, 1); // 데이터 삭제
  saveDBData(db); // 데이터 저장
  res.json(deletedRequest); // 삭제된 요청 반환
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
