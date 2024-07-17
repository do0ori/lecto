# 🚀 Programmers Lecture Automation - Lecto

Lecto는 프로그래머스 코스의 강의를 자동으로 실행해주는 크롬 확장 프로그램입니다.

각 강의를 동시에 여러 탭에서 실행하면 경고 창이 뜨기 때문에 Lecto는 강의를 하나씩 순차적으로 실행합니다. 처음 강의를 실행할 때에는 배속과 건너뛰기 기능을 사용할 수 없고, 영상을 끝까지 시청해서 수강 완료 처리가 되어야 해당 기능을 사용할 수 있습니다. 배속 기능이 풀리더라도 실제 러닝타임을 기준으로 출석 인정이 되기 때문에 Lecto를 사용하여 정배속으로 강의를 실행해두면 이후에 편하게 강의를 들을 수 있습니다.

## 📥 Installation

1. 최신 [release](https://github.com/do0ori/lecto/releases) ZIP 파일 다운로드 후 압축 해제
2. 크롬 브라우저의 주소 창에 `chrome://extensions`를 입력해서 확장 프로그램 페이지로 이동
3. 페이지 상단의 "개발자 모드" 활성화
4. "압축해제된 확장 프로그램을 로드합니다" 버튼을 클릭하고, 확장 프로그램 폴더 선택
   ![image](https://github.com/do0ori/lecto/assets/71831926/be6c0313-fdeb-4c7d-a54a-859f88ac2d68)

## 📖 Usage

1. 크롬 브라우저에서 우측 상단의 확장 프로그램 아이콘(🧩)을 클릭
2. 나타난 메뉴에서 "Programmers Lecture Automation - Lecto"를 고정(📌)
3. 우측 상단의 확장 프로그램 아이콘 클릭
   - 기본적으로 프로그래머스의 강의 수강 페이지가 아니면 활성화되지 않습니다.
     ![image](https://github.com/do0ori/lecto/assets/71831926/b950edff-e09d-4f13-8bf3-decd5ad43b8b)
   - 프로그래머스 강의 수강 페이지에서 Start 버튼을 눌러 프로그램을 실행할 수 있습니다.
     ![image](https://github.com/do0ori/lecto/assets/71831926/25e653fa-217b-4704-91c2-f4d78ff3baa3)
     - 수강 페이지의 목차에 존재하는 모든 강의를 순차적으로 1배속으로 실행합니다.
     - 모두 수강 완료 처리가 되면 알림🔔을 보냅니다.
       ![image](https://github.com/do0ori/lecto/assets/71831926/2725cd0e-5131-41bf-a2b0-ce4c388524ff)
     - Start 버튼 아래의 toggle switch를 통해 강의 소리와 알림 소리에 대한 on/off 설정을 할 수 있습니다.

## 🤝 Contributions

버그를 발견하거나 새로운 기능을 제안하는 것은 언제나 환영입니다! [이슈](https://github.com/do0ori/lecto/issues)를 작성해주세요.
