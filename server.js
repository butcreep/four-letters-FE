const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Mock 데이터
let letters = [
  {
    id: 1,
    sender: "루돌라",
    content: "안녕하세요! 저는 루돌라입니다",
    date: "2024-12-08",
  },
  {
    id: 2,
    sender: "루돌돌",
    content: "나에게 편지를 써주겠어요?",
    date: "2024-12-08",
  },
];

// 편지 요청 리스트 가져오기
app.get("/letters", (req, res) => {
  res.json(letters);
});

// 특정 편지 요청 가져오기
app.get("/letters/:id", (req, res) => {
  const letter = letters.find((l) => l.id === parseInt(req.params.id));
  if (letter) {
    res.json(letter);
  } else {
    res.status(404).json({ message: "Letter not found" });
  }
});

// 서버 실행
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
