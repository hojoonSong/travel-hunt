<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## 커밋 템플릿 적용 방법

```bash
# 로컬 환경에서 커밋 템플릿 적용
git config --local commit.template .gitmessage.txt

# 커밋 템플릿으로 커밋
git commit
```

## 처음 로컬 환경에서 도커 시작

```bash
# 빌드 후 시작
docker compose up --build
```

## 앱 시작

```bash
# 로컬 환경 시작
$ docker compose up

# 백그라운드 환경에서 시작
docker compose up -d
```

```
# 설문지 시스템 API 구현

## 설문지 CRUD (Survey)

- **Create**: 새로운 설문지 생성
  - `POST /surveys`
- **Read**: 설문지 목록 조회 및 개별 설문지 조회
  - `GET /surveys`, `GET /surveys/{id}`
- **Update**: 설문지 정보 업데이트
  - `PUT /surveys/{id}`
- **Delete**: 설문지 삭제
  - `DELETE /surveys/{id}`

## 문항 CRUD (Question)

- **Create**: 특정 설문지에 문항 추가
  - `POST /surveys/{surveyId}/questions`
- **Read**: 특정 설문지의 문항 조회
  - `GET /surveys/{surveyId}/questions`
- **Update**: 문항 수정
  - `PUT /questions/{id}`
- **Delete**: 문항 삭제
  - `DELETE /questions/{id}`

## 선택지 CRUD (Option)

- **Create**: 특정 문항에 선택지 추가
  - `POST /questions/{questionId}/options`
- **Read**: 특정 문항의 선택지 조회
  - `GET /questions/{questionId}/options`
- **Update**: 선택지 수정
  - `PUT /options/{id}`
- **Delete**: 선택지 삭제
  - `DELETE /options/{id}`

## 답변 CRUD (Answer)

- **Create**: 사용자의 답변 추가
  - `POST /answers`
- **Read**: 특정 답변 조회
  - `GET /answers/{id}`
- **Update**: 답변 수정
  - `PUT /answers/{id}`
- **Delete**: 답변 삭제
  - `DELETE /answers/{id}`

## 설문지 완료 (Response)

- 사용자가 설문지를 완료하면, 해당 응답을 `Response` Entity에 저장
  - `POST /surveys/{surveyId}/responses`

## 완료된 설문지 확인

- 특정 사용자가 완료한 설문지 목록 조회
  - `GET /users/{userId}/responses`
- 특정 설문지에 대한 모든 응답 조회
  - `GET /surveys/{surveyId}/responses`
``
```
