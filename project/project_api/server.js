// server.js

// 1. 필요한 라이브러리들을 불러옵니다.
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

// 2. Express 앱을 생성하고 기본 설정을 합니다.
const app = express();
const port = 4000; // 서버를 실행할 포트 번호

app.use(cors()); // 다른 주소(React Native 앱)에서의 요청을 허용
app.use(express.json()); // JSON 형태의 데이터를 서버가 이해할 수 있도록 설정

// 3. 🛡️ PostgreSQL 데이터베이스 연결 설정을 합니다.
// (이 정보는 서버에만 저장되어 안전합니다!)
const pool = new Pool({
  user: 'PostgreSQL 17',       // PostgreSQL 사용자 이름
  host: 'localhost',          // 데이터베이스 주소
  database: 'postgre',   // 데이터베이스 이름
  password: '1234', // PostgreSQL 비밀번호
  port: 5432,                 // PostgreSQL 기본 포트
});

// 4. ⚙️ API 주소(엔드포인트)를 만듭니다.
// 테스트용 주소: GET 요청이 http://localhost:4000/ 로 오면 "API 서버 정상 작동" 메시지를 보냅니다.
app.get('/', (req, res) => {
  res.send('✅ API 서버 정상 작동');
});

// 실제 데이터 조회 주소: GET 요청이 http://localhost:4000/api/users 로 오면
// users 테이블의 모든 데이터를 조회해서 보내줍니다.
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows); // DB에서 가져온 데이터를 JSON 형태로 응답
  } catch (error) {
    console.error('DB 조회 에러:', error);
    res.status(500).json({ error: '데이터베이스 처리 중 오류가 발생했습니다.' });
  }
});

// 5. 설정한 포트 번호로 서버 실행을 시작합니다.
app.listen(port, () => {
  console.log(`🚀 백엔드 API 서버가 http://localhost:${port} 에서 실행 중입니다.`);
});