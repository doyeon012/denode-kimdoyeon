## 서비스 실행 방법

1. **프로젝트 클론**

   ```bash
   git clone https://github.com/doyeon012/denode.git
   cd denode-kimdoyeon
   ```

2. **의존성 설치**

   ```bash
   npm install
   ```

3. **도커 서비스 실행**

   ```bash
   docker-compose up -d
   ```

   * NestJS 앱은 `http://localhost:3000`에서 실행됩니다.

4. **Swagger API 문서 접속**

   ```
   http://localhost:3000/api-docs#/
   ```

   * API 테스트 가능
   * DTO 스키마 및 응답 타입 확인 가능
---

## 로컬에서 실행 시
바꿔줘야 하는 값
```
DB_HOST=localhost
DB_PASSWORD=로컬 MYSQL 비밀번호
PWD=포크 뜬 디렉토리 위치
```
