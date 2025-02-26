# 📌 프로젝트 개요

이 프로젝트는 **Vercel에 배포된 React 프론트엔드**와 **Glitch 기반 목서버(백엔드)**로 구성된 애플리케이션입니다.  
**원래 백엔드 서버가 존재했지만 현재 작동하지 않음** → CRUD 기능을 유지하기 위해 **목서버 추가**

🔗 **배포된 서비스:** [Four Letters](https://four-letters-fe.vercel.app)

## 🚀 주요 기능

### 🖥️ 프론트엔드 (React - Vercel 배포)

- 로그인 없이 **요청(Request) 생성 및 조회 가능**
- **보관함**에서 작성 중인 편지(Drafts) 및 보낸 편지(Sent) 목록 확인 가능
- 원래 **카카오 로그인 및 공유 기능** 포함 → **현재 로그인 제외하고 CRUD 기능만 유지**
- **Redux**를 활용한 상태 관리
- **공유하기 기능 정상 동작**

### 🌐 백엔드 (Glitch 기반 목서버 - Express.js)

- `db.json`을 활용한 데이터 저장 및 관리 (파일 기반 데이터베이스)
- RESTful API 엔드포인트 제공
- **API 목록:**
  - `GET /letters` → **편지 리스트 가져오기**
  - `POST /requests` → **요청 생성**
  - `GET /requests/links/:linkId` → **특정 링크 요청 리스트 조회**
  - `PUT /requests/:id` → **요청 수정**
  - `DELETE /requests/:id` → **요청 삭제**

---

## 🛠 **기술 스택**

### 📌 **프론트엔드**

- **React**: 컴포넌트 기반 UI 개발
- **Redux Toolkit**: 상태 관리
- **React Router**: 페이지 라우팅
- **Styled-Components**: CSS-in-JS 스타일링
- **Vercel**: 프론트엔드 배포

### 📌 **백엔드 (Glitch 목서버)**

- **Node.js + Express.js**: REST API 서버 구축
- **JSON 파일 (`db.json`)**: 간단한 데이터 저장소
- **CORS 설정**: 크로스 도메인 요청 허용

---

## 🔧 **실행 방법**

### 1️⃣ **Glitch 서버 실행**

1. Glitch에서 **새로운 프로젝트 생성**
2. `server.js` 및 `db.json` 파일 추가
3. `package.json`에 **Express & CORS** 추가 후 설치

```json
{
  "dependencies": {
    "express": "latest",
    "cors": "latest"
  }
}
```

4. Glitch에서 서버 실행 → `server.js` 실행 확인

### 2️⃣ **React 프론트엔드 실행 (Vercel 배포)**

1. `.env` 파일에서 **Glitch 서버 URL 설정**

```env
REACT_APP_GLITCH_URL=https://your-glitch-project.glitch.me/api/v1
```

2. **Vercel 배포**

```sh
npm install -g vercel
vercel
```

3. Vercel에서 `https://your-vercel-app.vercel.app` 접속하여 실행

---

## 📌 **API 엔드포인트 정리**

### 1️⃣ **요청(Request) 관련 API**

✅ **새로운 요청 생성**

```http
POST /requests
```

✅ **특정 링크에 대한 요청 목록 조회**

```http
GET /requests/links/:linkId
```

✅ **요청 수정**

```http
PUT /requests/:id
```

✅ **요청 삭제**

```http
DELETE /requests/:id
```

### 2️⃣ **편지(Letter) 관련 API**

✅ **모든 편지 조회**

```http
GET /letters
```

✅ **새로운 편지 생성**

```http
POST /letters
```

✅ **특정 편지 수정**

```http
PUT /letters/:id
```

✅ **특정 편지 삭제**

```http
DELETE /letters/:id
```

---

## 📌 **API 요청 예제 & 응답 예제**

### 1️⃣ 요청 생성 (POST `/requests`)

📌 **요청 예제:**

```json
{
  "linkId": "12345",
  "requesterName": "김산타",
  "message": "편지 보내줘!"
}
```

📌 **응답 예제:**

```json
{
  "message": "CREATED",
  "data": {
    "id": 678910,
    "linkId": "12345",
    "requesterName": "김산타",
    "message": "편지 보내줘!"
  }
}
```

### 2️⃣ 요청 조회 (GET `/requests/links/12345`)

📌 **응답 예제:**

```json
{
  "content": [
    {
      "id": 678910,
      "linkId": "12345",
      "requesterName": "김산타",
      "message": "편지 보내줘!"
    }
  ]
}
```

---

## 💡 **고민했던 부분 & 해결 과정**

### 1️⃣ 백엔드 서버 중단 후, 기능을 어떻게 유지할 것인가?

📌 **고민:**

- 기존 백엔드가 중단되면서 **카카오 로그인 & 데이터 저장 기능 비활성화됨**
- **최소한 CRUD 기능만이라도 유지할 필요가 있었음**
- **Glitch를 활용하여 목서버를 만들면 해결 가능할 것으로 판단**

✅ **해결 방법:**

- 기존 **백엔드 API 구조 분석** → Glitch에서 동일한 API 구현
- Vercel에서 기존 **React 프론트엔드를 Glitch API와 연결**
- 로그인 제외하고, 요청/편지 관련 **CRUD 기능 유지**

### 2️⃣ 원래는 **카카오 로그인으로 어플리케이션이 개인화되어 있었음**

📌 **고민:**

- 기존에는 카카오 로그인을 통해 사용자의 요청 및 편지 데이터를 개인화
- 현재는 로그인 기능이 제거되어 모든 사용자 요청이 동일하게 처리됨

✅ **해결 방법:**

- 로그인 기능이 복구되면 다시 사용자별 데이터 저장 가능하도록 설계 고려

---

## 🚀 **향후 개선 사항**

✅ **사용자 인증 기능 복구** → 원래 동작했던 **카카오 로그인 기능 복구 필요**
✅ **데이터 저장소 변경** → `db.json` 대신 **MongoDB / Firebase** 연동 고려
✅ **파일 업로드 기능** → 편지에 **이미지 첨부 기능 추가**

---
