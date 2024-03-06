# 🚀 Programmers Lecture Automation - Lecto
Lecto는 프로그래머스 코스의 강의를 자동으로 실행해주는 크롬 확장 프로그램입니다.

각 강의를 동시에 여러 탭에서 실행하면 경고 창이 뜨기 때문에 Lecto는 강의를 하나씩 순차적으로 실행합니다. 처음 강의를 실행할 때에는 배속과 건너뛰기 기능을 사용할 수 없고, 영상을 끝까지 시청해서 수강 완료 처리가 되어야 해당 기능을 사용할 수 있습니다. Lecto를 사용하여 강의를 미리 실행하여 수강 완료 처리를 만들면 이후에 편하게 강의를 들을 수 있습니다.

## 📥 Installation

1. `git clone https://github.com/do0ori/lecto.git`로 이 저장소를 클론하거나 ZIP 파일로 다운로드 후 압축 해제
2. 크롬 브라우저의 주소 창에 `chrome://extensions`를 입력해서 확장 프로그램 페이지로 이동
3. 페이지 상단의 "개발자 모드" 활성화
4. "압축해제된 확장 프로그램을 로드합니다" 버튼을 클릭하고, 확장 프로그램 폴더 선택
![image](https://github.com/do0ori/lecto/assets/71831926/9d5e1fb3-545a-40ca-9033-49fc4c7f1e54)

## 📖 Usage

1. 크롬 브라우저에서 우측 상단의 확장 프로그램 아이콘(🧩)을 클릭
2. 나타난 메뉴에서 "Programmers Lecture Automation - Lecto"를 고정(📌)
3. 우측 상단의 확장 프로그램 아이콘 클릭
    - 기본적으로 프로그래머스의 강의 수강 페이지가 아니면 활성화되지 않습니다.
        ![image](https://github.com/do0ori/lecto/assets/71831926/148e36a1-a138-4d24-b26f-0ff2e84b242a)
    - 프로그래머스 강의 수강 페이지에서 Start 버튼을 눌러 프로그램을 실행할 수 있습니다.
        ![image](https://github.com/do0ori/lecto/assets/71831926/060f2f23-cc2a-434c-a1c3-3f17e445e4ff)
        - 수강 페이지의 목차에 존재하는 모든 강의를 순차적으로 음소거🔇로 실행합니다.
        - 모두 수강 완료 처리가 되면 알림🔔을 보냅니다.
            ![image](https://github.com/do0ori/lecto/assets/71831926/2725cd0e-5131-41bf-a2b0-ce4c388524ff)

## 🤝 Contributions
버그를 발견하거나 새로운 기능을 제안하는 것은 언제나 환영입니다! [이슈](https://github.com/do0ori/lecto/issues)를 작성해주세요.