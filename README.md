# 🚀 Travel Hunt 개발 과정 🚀

## 앱 시작

```bash
# 로컬 환경 시작

# 의존성을 설치합니다.
npm install

# .env example을 참고하여, .env를 생성하고 환경변수를 설정합니다.
NODE_ENV= #local
PORT= #4000

# NestJS - DB configs
DATABASE_NAME= # Database Name
DATABASE_USER= # Database User
DATABASE_PASS= # Database Password
DATABASE_HOST= # YOUR_DATABASE_URI

# nestJS를 실행합니다.
npm start

```

## 📘 API Documentation

- 👉 [GraphQL PlayGround API 문서 확인](https://port-0-travel-hunt-kvmh2mljz6ccl7.sel4.cloudtype.app/graphql)
- 👉 [GraphQL PlayGround 쿼리 실행 시 결과 반환 가능](https://travel-hunt.onrender.com/graphql)

- 🚀 배포 주의사항 (쿼리 실행 가능한 배포서버는 클릭 후 대기 시간이 있습니다.)
- PaaS 사용으로 배포환경에서 Playground 사용에 제약

## 📚 기술 스택

- ![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
- ![TypeORM](https://img.shields.io/badge/TypeORM-fe0902?style=for-the-badge&logo=databricks&logoColor=white)
- ![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)

## 🗺️ ERD
![ERD Diagram](https://github.com/hojoonSong/travel-hunt/assets/51044545/e422ceac-9280-4491-b902-a7421b1d5c03)

## 🛠️ 데이터 모델 설계

### 1️⃣ `Answer` 엔터티

- 응답(`Response`)과 질문(`Question`)에 대한 참조를 포함합니다.
- 각 답변은 선택된 옵션의 ID를 가집니다.

### 2️⃣ `Option` 엔터티

- 각 옵션은 특정 질문(`Question`)에 속합니다.
- 옵션 텍스트와 점수를 포함하며, 조건부 다음 질문의 ID를 가질 수 있습니다.

### 3️⃣ `Question` 엔터티

- 설문(`Survey`)과 연결되며, 각 질문은 설문 ID를 포함합니다.
- 질문 텍스트, 질문 유형, 이전 및 다음 질문의 ID를 포함합니다.
- 옵션(`Option`)과 답변(`Answer`)과의 일대다 관계를 가집니다.

### 4️⃣ `Response` 엔터티

- 설문(`Survey`)과 연결되며, 각 응답은 설문 ID와 이메일을 포함합니다.
- 완료 날짜와 총 점수를 기록합니다.
- 여러 답변(`Answer`)을 포함할 수 있습니다.

### 5️⃣ `Survey` 엔터티

- 설문 제목과 설명을 포함합니다.
- 생성 날짜를 기록합니다.
- 여러 질문(`Question`)과 응답(`Response`)을 포함할 수 있습니다.

🔍 **이러한 설계의 핵심 포인트**:

- **효율적인 데이터 관리**: 각 엔터티는 서로 연결되어 있어, 데이터의 일관성과 관리가 용이합니다.
- **강력한 관계 설정**: `ManyToOne`과 `OneToMany` 관계를 통해 복잡한 데이터 구조를 명확하게 표현합니다.
- **유연한 데이터 모델링**: 조건부 질문(`conditionalQuestion`)과 같은 유연한 구조를 통해 다양한 시나리오를 지원합니다.
- **정규화된 데이터 구조**: 중복을 최소화하고 데이터 무결성을 유지하도록 설계되었습니다.
- **확장 가능성**: 새로운 필드나 관계를 쉽게 추가할 수 있어, 시스템의 확장성을 보장합니다.

### 📁 폴더 구조:

```
project-root
│
├── src
│   ├── answer - 답변 관련 모듈, 서비스, 리졸버, 엔터티 및 타입
│   ├── common - 공통 설정 및 필터
│   ├── option - 옵션 관련 모듈, 서비스, 리졸버, 엔터티 및 타입
│   ├── question - 질문 관련 모듈, 서비스, 리졸버, 엔터티 및 타입
│   ├── response - 응답 관련 모듈, 서비스, 리졸버, 엔터티 및 타입
│   └── survey - 설문 관련 모듈, 서비스, 리졸버, 엔터티 및 타입
├── 기타 설정 및 메타데이터 파일들
```

## 🏁 GraphQL, 쿼리문 생성하기 예제 1

```js
# 한 번에 Survey를 생성할때, Question과 Option도 동시에 생성할 수 있습니다.
mutation CreateNewSurvey {
  createSurvey(createSurveyInput: {
    title: "해외 여행 설문조사",
    description: "다가오는 휴가에 대한 해외 여행 계획에 관한 설문조사입니다.",
    questions: [
      {
        questionText: "당신은 다가올 휴가 때 해외 여행을 희망하시나요?",
        questionType: "SingleChoice",
        options: [
          { optionText: "예", score: 1 },
          { optionText: "아니오", score: 0, conditionalNextQuestionId: 7 }
        ]
      },
      {
        questionText: "당신이 희망하는 해외여행의 종류는?",
        questionType: "SingleChoice",
        options: [
          { optionText: "패키지 여행", score: 1 },
          { optionText: "자유여행", score: 2 },
          { optionText: "테마여행", score: 3 }
        ]
      },
      {
        questionText: "당신이 희망하는 여행지는?",
        questionType: "SingleChoice",
        options: [
          { optionText: "동남아/대만/서남아", score: 1 },
          { optionText: "중국/홍콩/극동러시아", score: 2 },
          { optionText: "일본", score: 3 },
          { optionText: "남태평양", score: 4 },
          { optionText: "유럽/아프리카", score: 5 },
          { optionText: "미주/중남미/하와이", score: 6 }
        ]
      },
      {
        questionText: "당신이 생각하는 여행의 1인당 금액은? (쇼핑비용 제외)",
        questionType: "SingleChoice",
        options: [
          { optionText: "100만원 미만", score: 1 },
          { optionText: "100만원 이상 ~ 200만원 미만", score: 2 },
          { optionText: "200만원 이상 ~ 300만원 미만", score: 3 },
          { optionText: "300만원 이상 ~ 400만원 미만", score: 4 },
          { optionText: "400만원 이상", score: 5 }
        ]
      },
      {
        questionText: "당신이 해외 여행지를 선택할 때 고려하는 사항은? (중복 응답 가능)",
        questionType: "MultipleChoice",
        options: [
          { optionText: "기간", score: 1 },
          { optionText: "비용", score: 2 },
          { optionText: "치안", score: 3 },
          { optionText: "여행목적", score: 4 },
          { optionText: "음식", score: 5 },
          { optionText: "쇼핑", score: 6 }
        ]
      },
      {
        questionText: "당신은 국내여행 보다 해외여행을 선호하시나요?",
        questionType: "SingleChoice",
        options: [
          { optionText: "매우 좋음", score: 5 },
          { optionText: "좋음", score: 4 },
          { optionText: "보통", score: 3 },
          { optionText: "나쁨", score: 2 },
          { optionText: "매우 나쁨", score: 1 }
        ]
      },
      {
        questionText: "당신의 성별은?",
        questionType: "SingleChoice",
        options: [
          { optionText: "남", score: 1 },
          { optionText: "여", score: 1 }
        ]
      }
    ]
  }) {
    title
    description
    questions {
      id
      nextQuestionId
      questionType
      questionText
      options {
        id
        questionId
        optionText
        score
        conditionalNextQuestionId
      }
    }
  }
}
```
```js
# 실행결과는 다음과 같습니다.
{
  "data": {
    "createSurvey": {
      "title": "해외 여행 설문조사",
      "description": "다가오는 휴가에 대한 해외 여행 계획에 관한 설문조사입니다.",
      "questions": [
        {
          "id": "1",
          "nextQuestionId": 2,
          "questionType": "SingleChoice",
          "questionText": "당신은 다가올 휴가 때 해외 여행을 희망하시나요?",
          "options": [
            {
              "id": "1",
              "questionId": "1",
              "optionText": "예",
              "score": 1,
              "conditionalNextQuestionId": null
            },
            {
              "id": "2",
              "questionId": "1",
              "optionText": "아니오",
              "score": 0,
              "conditionalNextQuestionId": 7
            }
          ]
        },
        {
          "id": "2",
          "nextQuestionId": 3,
          "questionType": "SingleChoice",
          "questionText": "당신이 희망하는 해외여행의 종류는?",
          "options": [
            {
              "id": "3",
              "questionId": "2",
              "optionText": "패키지 여행",
              "score": 1,
              "conditionalNextQuestionId": null
            },
            {
              "id": "4",
              "questionId": "2",
              "optionText": "자유여행",
              "score": 2,
              "conditionalNextQuestionId": null
            },
            {
              "id": "5",
              "questionId": "2",
              "optionText": "테마여행",
              "score": 3,
              "conditionalNextQuestionId": null
            }
          ]
        },
        {
          "id": "3",
          "nextQuestionId": 4,
          "questionType": "SingleChoice",
          "questionText": "당신이 희망하는 여행지는?",
          "options": [
            {
              "id": "6",
              "questionId": "3",
              "optionText": "동남아/대만/서남아",
              "score": 1,
              "conditionalNextQuestionId": null
            },
            {
              "id": "7",
              "questionId": "3",
              "optionText": "중국/홍콩/극동러시아",
              "score": 2,
              "conditionalNextQuestionId": null
            },
            {
              "id": "8",
              "questionId": "3",
              "optionText": "일본",
              "score": 3,
              "conditionalNextQuestionId": null
            },
            {
              "id": "9",
              "questionId": "3",
              "optionText": "남태평양",
              "score": 4,
              "conditionalNextQuestionId": null
            },
            {
              "id": "10",
              "questionId": "3",
              "optionText": "유럽/아프리카",
              "score": 5,
              "conditionalNextQuestionId": null
            },
            {
              "id": "11",
              "questionId": "3",
              "optionText": "미주/중남미/하와이",
              "score": 6,
              "conditionalNextQuestionId": null
            }
          ]
        },
        {
          "id": "4",
          "nextQuestionId": 5,
          "questionType": "SingleChoice",
          "questionText": "당신이 생각하는 여행의 1인당 금액은? (쇼핑비용 제외)",
          "options": [
            {
              "id": "12",
              "questionId": "4",
              "optionText": "100만원 미만",
              "score": 1,
              "conditionalNextQuestionId": null
            },
            {
              "id": "13",
              "questionId": "4",
              "optionText": "100만원 이상 ~ 200만원 미만",
              "score": 2,
              "conditionalNextQuestionId": null
            },
            {
              "id": "14",
              "questionId": "4",
              "optionText": "200만원 이상 ~ 300만원 미만",
              "score": 3,
              "conditionalNextQuestionId": null
            },
            {
              "id": "15",
              "questionId": "4",
              "optionText": "300만원 이상 ~ 400만원 미만",
              "score": 4,
              "conditionalNextQuestionId": null
            },
            {
              "id": "16",
              "questionId": "4",
              "optionText": "400만원 이상",
              "score": 5,
              "conditionalNextQuestionId": null
            }
          ]
        },
        {
          "id": "5",
          "nextQuestionId": 6,
          "questionType": "MultipleChoice",
          "questionText": "당신이 해외 여행지를 선택할 때 고려하는 사항은? (중복 응답 가능)",
          "options": [
            {
              "id": "17",
              "questionId": "5",
              "optionText": "기간",
              "score": 1,
              "conditionalNextQuestionId": null
            },
            {
              "id": "18",
              "questionId": "5",
              "optionText": "비용",
              "score": 2,
              "conditionalNextQuestionId": null
            },
            {
              "id": "19",
              "questionId": "5",
              "optionText": "치안",
              "score": 3,
              "conditionalNextQuestionId": null
            },
            {
              "id": "20",
              "questionId": "5",
              "optionText": "여행목적",
              "score": 4,
              "conditionalNextQuestionId": null
            },
            {
              "id": "21",
              "questionId": "5",
              "optionText": "음식",
              "score": 5,
              "conditionalNextQuestionId": null
            },
            {
              "id": "22",
              "questionId": "5",
              "optionText": "쇼핑",
              "score": 6,
              "conditionalNextQuestionId": null
            }
          ]
        },
        {
          "id": "6",
          "nextQuestionId": 7,
          "questionType": "SingleChoice",
          "questionText": "당신은 국내여행 보다 해외여행을 선호하시나요?",
          "options": [
            {
              "id": "23",
              "questionId": "6",
              "optionText": "매우 좋음",
              "score": 5,
              "conditionalNextQuestionId": null
            },
            {
              "id": "24",
              "questionId": "6",
              "optionText": "좋음",
              "score": 4,
              "conditionalNextQuestionId": null
            },
            {
              "id": "25",
              "questionId": "6",
              "optionText": "보통",
              "score": 3,
              "conditionalNextQuestionId": null
            },
            {
              "id": "26",
              "questionId": "6",
              "optionText": "나쁨",
              "score": 2,
              "conditionalNextQuestionId": null
            },
            {
              "id": "27",
              "questionId": "6",
              "optionText": "매우 나쁨",
              "score": 1,
              "conditionalNextQuestionId": null
            }
          ]
        },
        {
          "id": "7",
          "nextQuestionId": null,
          "questionType": "SingleChoice",
          "questionText": "당신의 성별은?",
          "options": [
            {
              "id": "28",
              "questionId": "7",
              "optionText": "남",
              "score": 1,
              "conditionalNextQuestionId": null
            },
            {
              "id": "29",
              "questionId": "7",
              "optionText": "여",
              "score": 1,
              "conditionalNextQuestionId": null
            }
          ]
        }
      ]
    }
  }
}
```
## 🏁 GraphQL, 쿼리문 생성하기 예제 2

```js
# Response를 생성할 때 email을 기준으로 Unique로 관리됩니다. Answer를 같이 생성할 수 있으며,
설문지가 생성되거나 Read될 때, TotalScore는 다시 재반영됩니다.
mutation {
  createResponse(createResponseInput: {
    surveyId: 1,
    email: "user@example.kr",
    answers: [
      { questionId: 1, selectedOptionId: 1 },
      { questionId: 2, selectedOptionId: 3 },
      { questionId: 3, selectedOptionId: 6 },
      { questionId: 4, selectedOptionId: 13 },
      { questionId: 5, selectedOptionId: 17 },
      { questionId: 5, selectedOptionId: 18 },
      { questionId: 6, selectedOptionId: 21 },
      { questionId: 7, selectedOptionId: 22 }
    ]
  }) {
    id
    surveyId
    email
    totalScore
    completionDate
    answers {
      id
      questionId
      selectedOptionId
    }
  }
}
```

```js
# 실행결과는 아래와 같습니다.
{
  "data": {
    "createResponse": {
      "id": "1",
      "surveyId": "1",
      "email": "user@example.kr",
      "totalScore": 19,
      "completionDate": "2023-11-23T12:48:50.818Z",
      "answers": [
        {
          "id": "1",
          "questionId": "1",
          "selectedOptionId": 1
        },
        {
          "id": "2",
          "questionId": "2",
          "selectedOptionId": 3
        },
        {
          "id": "3",
          "questionId": "3",
          "selectedOptionId": 6
        },
        {
          "id": "4",
          "questionId": "4",
          "selectedOptionId": 13
        },
        {
          "id": "5",
          "questionId": "5",
          "selectedOptionId": 17
        },
        {
          "id": "6",
          "questionId": "5",
          "selectedOptionId": 18
        },
        {
          "id": "7",
          "questionId": "6",
          "selectedOptionId": 21
        },
        {
          "id": "8",
          "questionId": "7",
          "selectedOptionId": 22
        }
      ]
    }
  }
}
```
