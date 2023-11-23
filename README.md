# 🚀 Travel Hunt 개발 과정 🚀

## 📘 API Documentation

- 👉 [GraphQL PlayGround](https://travel-hunt.onrender.com/graphql/)

- 🚀 배포 주의사항 (클릭 후 대기 시간이 있습니다.)

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

## 🏁 마무리와 배운 점

