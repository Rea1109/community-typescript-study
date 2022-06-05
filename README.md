# 콜버스랩 프론트엔드 과제

### 구현사항 체크리스트

1. 공통조건

    - [x] React , Typescript 개발
    - [x] Git version 관리
    - [x] 로컬 환경 프로젝트 실행
    - [x] mock server 활용 (필요시)

2. 세부사항

    - [x] 커뮤니티 리스트
        - [x] route : /community/list
        - [x] 리스트 피그마 디자인 UI/UX
        - [x] 카테고리
            - [x] 좌우 슬라이드
            - [x] 글 필터링
            - [x] 인기글 필터링
        - [x] 리스트 아이템
            - [x] 작성시간 별 display
            - [x] 글 제목 1줄 , 글 내용 최대 2줄
            - [x] 글 이미지 있을 경우 display , 높이 160px 고정
        - [x] 스크롤 높이 유지
        - [x] 우측 하단 글쓰기 버튼
    - [x] 커뮤니티 디테일
        - [x] route : /community/post/:post_pk
        - [x] 디테일 피그마 디자인 UI/UX
        - [x] 글 내용 링크 작동
        - [x] 좋아요 버튼 작동
        - [x] 조회수 체크
        - [x] 글 이미지 보여주기
    - [x] 커뮤니티 글쓰기
        - [x] 유효성 검사
        - [x] route : /community/post/new
        - [x] 이미지 업로드
            - [x] 좌우 슬라이드
            - [x] 삭제 기능
            - [x] multiple upload
        - [x] 완료버튼 활성화 및 비활성화
        - [x] 글 등록 및 리스트 화면 이동
        - [x] 상단 뒤로가기 버튼

3. 참고사항

    - [과제 설명](https://callbus.notion.site/554c86d2d8e043669b923bf1928a5203)
    - [과제 피그마](https://www.figma.com/file/X4P7NoRQ1D5YqlSCwtOeDa/%EC%9E%90%EB%A6%AC%ED%86%A1-%EA%B3%BC%EC%A0%9C?node-id=0%3A1)

### 구현 설명

1. Get start

    ```
     npm install
     npm start
    ```

2. 폴더 구조

    ```
     - .vscode
       - settings.json: 코드 포맷터 설정
     - @types
       - global: typescript 이미지파일 모듈 선언
     - src:
       - assets: static 파일 (font , image)
       - commons: util성 라이브러, 공통 변수, 타입
       - component: 공통으로 사용되는 컴포넌트
       - contexts: contextApi provider
       - pages: 화면에 보여지는 페이지
       - data.json : mock db
    ```

3. 사용 라이브러리

    - json-server : mock server로 활용
    - concurrently : npm script 커스텀
    - emotion
    - axios
    - react-router-dom
    - uuid : node key 값 설정
    - prettier / eslint : 코드 포멧터

4. 기타
    - 화면은 360\*720 기준으로 퍼블리싱 했습니다.

> 좋은 과제 주셔서 감사합니다.  
> 이번 기회에 어떤 부분이 부족한지 , 더 공부해야할 부분은 어디인지
> 확인 할 수 있었습니다.
