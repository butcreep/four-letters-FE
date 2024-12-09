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
  return JSON.parse(data);
};

// 기본 경로 처리
app.get("/", (req, res) => {
  res.send("Welcome to the API server. Try /api/letters for data.");
});

// 모든 편지 가져오기
app.get("/letters", (req, res) => {
  const db = getDBData();
  res.json(db.letters);
});

// 특정 편지 가져오기
app.get("/api/letters/:id", (req, res) => {
  const db = getDBData();
  const letter = db.letters.find(letter => letter.id === parseInt(req.params.id, 10));
  if (!letter) {
    return res.status(404).json({ error: "Letter not found" });
  }
  res.json(letter);
});

// 서버 시작
app.listen(port, () => {
  console.log(`Local server is running on http://localhost:${port}`);
});
