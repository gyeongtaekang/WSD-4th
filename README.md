# WSD-4th
## GYENG NETFLIX 클론

이 프로젝트는 **React**와 **Tailwind CSS**를 사용하여 GYENG NETFLIX를 클론한 프로젝트입니다.  
2024년 2학기 **웹서비스 설계 과목 4차 과제**로 제작되었습니다.

---

## 배포된 웹사이트

프로젝트는 **Netlify**를 통해 배포되었으며, 아래 링크에서 확인할 수 있습니다:  
**[GYENG NETFLIX 웹사이트](https://wsd-44.netlify.app/)**

---

## 홈 화면

![홈 화면](./public/assert/ReadmeImg.png)

---

## 사용 기술

- **React**: 컴포넌트 기반 UI 개발
- **Tailwind CSS**: 스타일링 프레임워크
- **Kakao API**: 카카오 로그인 API

---

## 시작하기

이 프로젝트는 다운로드 후 아래 단계를 수행하면 바로 실행할 수 있습니다:
깃허브 기준으로 설명드립니다.

1. 프로젝트 디렉터리로 이동: `cd WSD-4th-main`  
2. 필수 패키지 설치: `npm install`  
3. 앱 실행: `npm start`  
   브라우저에서 `http://localhost:3000`을 열어 확인하세요.

---

## 환경 변수 설정

프로젝트는 환경 변수 파일을 사용하여 API 키를 관리합니다. 개발과 프로덕션 환경에 따라 각각 다른 파일을 사용합니다.  

개발 환경 (.env):  
REACT_APP_TMDB_API_KEY=  여기에 키
REACT_APP_KAKAO_KEY= 여기에 키키

개발 환경 (.env.development):  
REACT_APP_TMDB_API_KEY=  여기에 키
REACT_APP_KAKAO_KEY= 여기에 키키

scss
코드 복사
프로덕션 환경 (.env.production):  
REACT_APP_TMDB_API_KEY=프로덕션_API_KEY_여기에_입력
REACT_APP_KAKAO_KEY=프로덕션_KAKAO_KEY_여기에_입력

yaml
코드 복사
주의: `.env` 파일은 버전 관리 시스템에 포함하지 않도록 `.gitignore`에 추가하세요.

---

## 사용 가능한 스크립트

1. 프로젝트 디렉터리로 이동: `cd WSD-4th-main`  
2. 종속성 설치: `npm install`  
3. 앱 실행: `npm start`  
4. 테스트 실행: `npm test`  
5. 앱 빌드: `npm run build`  
6. 설정 노출: `npm run eject`  

---

## Git 명령어로 프로젝트 업로드

git add . git commit -m "수정사항" git push origin main




