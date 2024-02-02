# BlockExtension

#### https://web-blockextension-frontend-qrd2als2fr9ur.sel5.cloudtype.app/

## Summary

파일 첨부시 보안에 문제가 될 수 있는 부분이 있어. 파일 확장자에 따라 특정 형식의 파일을 첨부하거나 전송하지 못하도록 제한하는 프로젝트.

## 프로젝트 실행

### [Client](https://github.com/Jimoou/BlockExtension/tree/client)

```
cd client
npm install
npm start
```

### [Server](https://github.com/Jimoou/BlockExtension/tree/server)

```
cd server
npm install
npm start
```

## 프로젝트 설명

### Stack

![Typescript](https://img.shields.io/badge/-Typescript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white) ![Node.jS](https://img.shields.io/badge/-Node.js-339933?logo=nodedotjs&logoColor=white) ![NestJS](https://img.shields.io/badge/-NestJS-E0234E?logo=nestjs&logoColor=white)
![MariaDB](https://img.shields.io/badge/-MariaDB-003545?logo=mariadb&logoColor=white)

### Tree

<details>
<summary>접기/펼치기</summary>

```
📂 client
├── 📂 src
│   ├── 📂 assets
│   ├── 📂 components
│   ├── 📂 hooks
│   ├── 📂 model
│   ├── 📂 pages
│   └── 📂 service
📂 server
├── 📂 src
│   ├── 📂 controller
│   ├── 📂 model
│   │   ├── 📂 dao
│   │   └── 📂 dto
│   ├── 📂 module
│   └── 📂 service
```

</details>

### RDB

<img width="614" alt="스크린샷 2024-02-02 오후 1 20 18" src="https://github.com/Jimoou/Jimoou/assets/109801772/3402b796-9d0c-4698-89ef-4d2296f7ab68">

### description

1. 클라이언트 계층과 서버 계층에서 예외 처리를 이중으로 작성.

- 사용자의 input값이 null인 경우를 예방하는 화면 구성.
- 사용자 작성 확장자명 20자로 제한.
- 사용자 작성 확장자 수 200개로 제한.
- 중복 확장자 방지.

2. UI/UX 구성

- 서버 계층에서 명확한 응답 반환으로 클라이언트 화면에 표시.
- 직관적인 UI/UX로 사용성 증진.
