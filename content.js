// GitMaster Academy v1.2 bilingual lesson scenarios.
window.ACADEMY_DATA = {
  "chapters": [
    {
      "id": 1,
      "title": {
        "ko": "Git과 첫 커밋",
        "en": "Git & First Commit",
        "ja": "Git と初めてのコミット",
        "zh": "Git 与首次提交"
      },
      "summary": "작업 트리, 스테이징 영역, 로컬 저장소의 관계를 먼저 이해한다."
    },
    {
      "id": 2,
      "title": {
        "ko": "코드 변경과 이력 검토",
        "en": "Diffs & History",
        "ja": "差分と履歴を読む",
        "zh": "代码差异与历史"
      },
      "summary": "상태 확인, 선택적 스테이징, 커밋과 로그를 체계적으로 익힌다."
    },
    {
      "id": 3,
      "title": {
        "ko": "브랜치 설계와 병합",
        "en": "Branches & Merging",
        "ja": "ブランチとマージ",
        "zh": "分支与合并"
      },
      "summary": "AI가 바꾼 파일과 변경 범위를 읽고 검증한다."
    },
    {
      "id": 4,
      "title": {
        "ko": "충돌 해결과 Git 그래프",
        "en": "Conflict & Graphs",
        "ja": "競合解決とグラフ",
        "zh": "冲突解决与图谱"
      },
      "summary": "브랜치로 작업을 격리하고 병합 충돌을 실제로 해결한다."
    },
    {
      "id": 5,
      "title": {
        "ko": "원격 저장소와 동기화",
        "en": "Remotes & Sync",
        "ja": "リモートと同期",
        "zh": "远程仓库与同步"
      },
      "summary": "로컬과 원격의 차이를 이해하고 안전하게 동기화한다."
    },
    {
      "id": 6,
      "title": {
        "ko": "협업과 Pull Request",
        "en": "Collaborative Workflows",
        "ja": "共同作業と PR",
        "zh": "协作与拉取请求"
      },
      "summary": "리뷰와 변경 검증을 중심으로 팀 협업을 실습한다."
    },
    {
      "id": 7,
      "title": {
        "ko": "파일 복구와 Revert",
        "en": "Restore & Revert",
        "ja": "ファイル復旧と Revert",
        "zh": "文件恢复与 Revert"
      },
      "summary": "restore와 revert의 차이를 경험하고 실수를 되돌린다."
    },
    {
      "id": 8,
      "title": {
        "ko": "HEAD 복구와 Stash",
        "en": "HEAD Recovery & Stash",
        "ja": "HEAD 復旧と Stash",
        "zh": "HEAD 恢复与 Stash"
      },
      "summary": "reset, stash의 동작 범위와 주의점을 익힌다."
    },
    {
      "id": 9,
      "title": {
        "ko": "선택적 이력 관리",
        "en": "Selective History",
        "ja": "履歴の選択的管理",
        "zh": "选择性管理历史"
      },
      "summary": "tag, cherry-pick, rebase의 의도와 한계를 익힌다."
    },
    {
      "id": 10,
      "title": {
        "ko": "Rebase와 AI 변경 통제",
        "en": "Rebase & AI Changes",
        "ja": "Rebase と AI 変更",
        "zh": "变基与 AI 修改"
      },
      "summary": "AI 생성 코드의 변경 범위를 통제하고 비밀정보를 보호한다."
    },
    {
      "id": 11,
      "title": {
        "ko": "AI 보안과 장애 대응",
        "en": "AI Security & Recovery",
        "ja": "AI セキュリティと復旧",
        "zh": "AI 安全与故障恢复"
      },
      "summary": "잘못된 변경의 추적, 복구, 릴리스 태그를 연습한다."
    },
    {
      "id": 12,
      "title": {
        "ko": "실전 프로젝트와 릴리스",
        "en": "Capstone & Release",
        "ja": "総合課題とリリース",
        "zh": "实战项目与发布"
      },
      "summary": "브랜치 생성부터 검증·병합·태그까지 스스로 완수한다."
    }
  ],
  "lessons": [
    {
      "id": "L01",
      "chapter": 1,
      "scenario": "fresh",
      "goal": "status",
      "title": {
        "ko": "내 저장소 상태 읽기",
        "en": "Read repository status",
        "ja": "リポジトリの状態を確認",
        "zh": "查看仓库状态"
      },
      "description": {
        "ko": "git status를 실행하여 현재 브랜치와 작업 파일을 확인하세요.",
        "en": "Run git status to inspect your branch and files.",
        "ja": "git status でブランチとファイルを確認しましょう。",
        "zh": "使用 git status 检查分支和文件。"
      },
      "hint": "git status"
    },
    {
      "id": "L02",
      "chapter": 1,
      "scenario": "fresh",
      "goal": "stage",
      "title": {
        "ko": "변경 파일을 선별하기",
        "en": "Stage one changed file",
        "ja": "変更ファイルを選んで追加",
        "zh": "选择性暂存文件"
      },
      "description": {
        "ko": "README.md를 파일 편집기에서 직접 수정해 Getting started 문구를 추가하고 저장하세요. git diff로 변경을 확인한 뒤 README.md만 git add로 스테이징하세요.",
        "en": "Edit README.md yourself, add \"Getting started\", save, review with git diff, and stage only README.md.",
        "ja": "README.md を直接編集し Getting started を追加して保存します。git diff で確認後、README.md のみステージしてください。",
        "zh": "直接编辑 README.md，加入 Getting started 并保存。使用 git diff 检查，然后仅暂存 README.md。"
      },
      "hint": "README.md를 열고 마지막에 Getting started 한 줄 추가 → [변경 저장] → git status → git diff → git add README.md"
    },
    {
      "id": "L03",
      "chapter": 1,
      "scenario": "stagedReadme",
      "goal": "commit",
      "title": {
        "ko": "첫 의미 있는 커밋",
        "en": "Create a meaningful commit",
        "ja": "意味のあるコミットを作成",
        "zh": "创建有意义的提交"
      },
      "description": {
        "ko": "스테이징된 변경을 docs: update guide 메시지로 커밋하세요.",
        "en": "Commit staged changes with message docs: update guide.",
        "ja": "ステージ済み変更を docs: update guide でコミット。",
        "zh": "以 docs: update guide 为消息创建提交。"
      },
      "hint": "git commit -m \"docs: update guide\""
    },
    {
      "id": "L04",
      "chapter": 2,
      "scenario": "fresh",
      "goal": "diff",
      "title": {
        "ko": "AI 변경 내용 검토",
        "en": "Inspect a code diff",
        "ja": "AI の変更差分を確認",
        "zh": "审查 AI 代码差异"
      },
      "description": {
        "ko": "app.js 파일을 편집해 기존 version 코드 대신 greet 함수를 작성하고 저장하세요. git status와 git diff를 직접 실행해 어떤 줄이 바뀌었는지 읽어보세요.",
        "en": "Open app.js and replace the version code with a greet function. Save, then run git status and git diff to inspect the exact edits.",
        "ja": "app.js の version 行を greet 関数に書き換えて保存し、git status と git diff で変更行を確認してください。",
        "zh": "编辑 app.js，将 version 代码替换为 greet 函数并保存，然后运行 git status 和 git diff 查看改动。"
      },
      "hint": "app.js: export function greet(name) { return `Hello, ${name}!`; }\n파일 편집 후 [변경 저장]을 누른 다음 git diff를 실행하세요."
    },
    {
      "id": "L05",
      "chapter": 2,
      "scenario": "twoCommits",
      "goal": "log",
      "title": {
        "ko": "커밋의 흐름 읽기",
        "en": "Read the commit history",
        "ja": "コミット履歴を読む",
        "zh": "阅读提交历史"
      },
      "description": {
        "ko": "한 줄 로그로 최근 커밋을 확인하세요.",
        "en": "Inspect recent commits in one-line format.",
        "ja": "一行形式でコミット履歴を表示。",
        "zh": "使用单行形式查看提交历史。"
      },
      "hint": "git log --oneline"
    },
    {
      "id": "L06",
      "chapter": 2,
      "scenario": "twoCommits",
      "goal": "show",
      "title": {
        "ko": "코드 리뷰용 커밋 보기",
        "en": "Inspect the latest commit",
        "ja": "最新コミットを調べる",
        "zh": "检查最新提交"
      },
      "description": {
        "ko": "가장 최근 커밋의 변경 내역을 확인하세요.",
        "en": "Inspect the latest commit with git show.",
        "ja": "git show で直近のコミットを確認。",
        "zh": "使用 git show 查看最近的提交。"
      },
      "hint": "git show HEAD"
    },
    {
      "id": "L07",
      "chapter": 3,
      "scenario": "fresh",
      "goal": "newbranch",
      "title": {
        "ko": "기능 브랜치 만들기",
        "en": "Create a feature branch",
        "ja": "機能ブランチを作る",
        "zh": "创建功能分支"
      },
      "description": {
        "ko": "feature/login 브랜치를 만들고 전환하세요.",
        "en": "Create and switch to feature/login.",
        "ja": "feature/login ブランチを作成して切り替え。",
        "zh": "创建并切换到 feature/login 分支。"
      },
      "hint": "git switch -c feature/login"
    },
    {
      "id": "L08",
      "chapter": 3,
      "scenario": "fresh",
      "goal": "featurecommit",
      "title": {
        "ko": "기능을 격리해 커밋",
        "en": "Commit on a feature branch",
        "ja": "機能ブランチでコミット",
        "zh": "在功能分支上提交"
      },
      "description": {
        "ko": "feature/login 브랜치를 생성하고 app.js를 커밋하세요.",
        "en": "Create feature/login and commit app.js there.",
        "ja": "feature/login を作成して app.js をコミット。",
        "zh": "创建 feature/login 并提交 app.js。"
      },
      "hint": "git switch -c feature/login  →  git add app.js  →  git commit -m \"feat: login\""
    },
    {
      "id": "L09",
      "chapter": 3,
      "scenario": "mergeReady",
      "goal": "merge",
      "title": {
        "ko": "기능 브랜치 병합",
        "en": "Merge a completed feature",
        "ja": "機能ブランチをマージ",
        "zh": "合并功能分支"
      },
      "description": {
        "ko": "main에서 feature/login 브랜치를 병합하세요.",
        "en": "Merge feature/login into main.",
        "ja": "main で feature/login をマージ。",
        "zh": "在 main 分支合并 feature/login。"
      },
      "hint": "git merge feature/login"
    },
    {
      "id": "L10",
      "chapter": 4,
      "scenario": "conflict",
      "goal": "resolve",
      "title": {
        "ko": "충돌 표시 직접 해결",
        "en": "Resolve a real conflict",
        "ja": "競合マーカーを解消",
        "zh": "解决合并冲突"
      },
      "description": {
        "ko": "app.js의 충돌 표시를 편집기로 수정하고 add와 commit으로 병합을 마치세요.",
        "en": "Edit conflict markers in app.js, then add and commit.",
        "ja": "app.js の競合を編集し add と commit で完了。",
        "zh": "编辑 app.js 的冲突标记后暂存并提交。"
      },
      "hint": "파일 편집 → git add app.js → git commit -m \"merge: resolve conflict\""
    },
    {
      "id": "L11",
      "chapter": 4,
      "scenario": "branchDiverged",
      "goal": "graph",
      "title": {
        "ko": "브랜치 그래프 읽기",
        "en": "Inspect the commit graph",
        "ja": "コミットグラフを確認",
        "zh": "查看提交图谱"
      },
      "description": {
        "ko": "모든 브랜치의 커밋 그래프를 조회하세요.",
        "en": "Inspect all branches using the commit graph.",
        "ja": "全ブランチのグラフを表示しましょう。",
        "zh": "使用提交图查看所有分支。"
      },
      "hint": "git log --graph --oneline --all"
    },
    {
      "id": "L12",
      "chapter": 4,
      "scenario": "fresh",
      "goal": "branchlist",
      "title": {
        "ko": "현재 브랜치 목록 확인",
        "en": "List branches",
        "ja": "ブランチ一覧を確認",
        "zh": "列出所有分支"
      },
      "description": {
        "ko": "브랜치 목록과 현재 위치를 확인하세요.",
        "en": "List branches and find the current branch.",
        "ja": "ブランチ一覧と現在位置を確認。",
        "zh": "列出分支并查看当前分支。"
      },
      "hint": "git branch"
    },
    {
      "id": "L13",
      "chapter": 5,
      "scenario": "fresh",
      "goal": "remote",
      "title": {
        "ko": "가상 원격 등록",
        "en": "Configure a remote",
        "ja": "リモートを登録",
        "zh": "配置远程仓库"
      },
      "description": {
        "ko": "학습용 origin 원격을 등록하세요. 실제 네트워크 연결은 하지 않습니다.",
        "en": "Register a virtual origin remote (no network).",
        "ja": "学習用の仮想 origin を登録します。",
        "zh": "配置虚拟 origin 远程地址（无网络请求）。"
      },
      "hint": "git remote add origin https://example.invalid/team/demo.git"
    },
    {
      "id": "L14",
      "chapter": 5,
      "scenario": "aheadRemote",
      "goal": "push",
      "title": {
        "ko": "로컬 커밋 전송",
        "en": "Push local commits",
        "ja": "ローカルコミットを送信",
        "zh": "推送本地提交"
      },
      "description": {
        "ko": "시뮬레이터의 가상 원격 origin/main으로 변경을 푸시하세요.",
        "en": "Push your changes to simulated origin/main.",
        "ja": "仮想の origin/main に変更を push。",
        "zh": "推送变更到模拟的 origin/main。"
      },
      "hint": "git push -u origin main"
    },
    {
      "id": "L15",
      "chapter": 5,
      "scenario": "remoteAhead",
      "goal": "fetch",
      "title": {
        "ko": "원격 변경만 가져오기",
        "en": "Fetch without merging",
        "ja": "マージせずに fetch",
        "zh": "抓取但不合并"
      },
      "description": {
        "ko": "원격 변경을 받아 오되 로컬 main은 아직 변경하지 마세요.",
        "en": "Fetch remote commits without changing local main.",
        "ja": "main を変更せずリモートを fetch。",
        "zh": "抓取远程提交，但不修改本地 main。"
      },
      "hint": "git fetch origin"
    },
    {
      "id": "L16",
      "chapter": 6,
      "scenario": "remoteAhead",
      "goal": "pull",
      "title": {
        "ko": "안전하게 변경 동기화",
        "en": "Synchronize from remote",
        "ja": "リモートから同期",
        "zh": "从远程同步"
      },
      "description": {
        "ko": "원격 main의 변경을 로컬 main에 반영하세요.",
        "en": "Integrate remote main into local main.",
        "ja": "リモートの main をローカルに反映。",
        "zh": "将远程 main 同步到本地。"
      },
      "hint": "git pull origin main"
    },
    {
      "id": "L17",
      "chapter": 6,
      "scenario": "twoCommits",
      "goal": "audit",
      "title": {
        "ko": "PR 올리기 전 점검",
        "en": "Review before a PR",
        "ja": "PR 前の変更確認",
        "zh": "提交 PR 前检查"
      },
      "description": {
        "ko": "status와 log를 모두 실행해 PR 전에 상태와 이력을 점검하세요.",
        "en": "Run status and log before opening a PR.",
        "ja": "PR 前に status と log を確認。",
        "zh": "在提交 PR 前运行 status 和 log。"
      },
      "hint": "git status  →  git log --oneline"
    },
    {
      "id": "L18",
      "chapter": 6,
      "scenario": "dirtyBoth",
      "goal": "selective",
      "title": {
        "ko": "필요한 코드만 포함",
        "en": "Stage only intended code",
        "ja": "必要なコードのみ追加",
        "zh": "仅暂存预期代码"
      },
      "description": {
        "ko": "app.js만 추가하세요. README.md는 변경된 상태로 남아 있어야 합니다.",
        "en": "Stage only app.js; leave README.md unstaged.",
        "ja": "app.js のみ追加し README.md は残します。",
        "zh": "仅暂存 app.js，README.md 保持未暂存。"
      },
      "hint": "git add app.js"
    },
    {
      "id": "L19",
      "chapter": 7,
      "scenario": "dirtyReadme",
      "goal": "unstage",
      "title": {
        "ko": "스테이징만 취소하기",
        "en": "Unstage without deleting",
        "ja": "内容を残してステージ解除",
        "zh": "取消暂存但保留修改"
      },
      "description": {
        "ko": "README.md를 먼저 스테이징한 다음 다시 스테이징에서만 제외하세요.",
        "en": "Stage README.md, then unstage without losing the edit.",
        "ja": "README.md を追加後、編集を残して解除。",
        "zh": "先暂存 README.md，再取消暂存并保留修改。"
      },
      "hint": "git add README.md  →  git restore --staged README.md"
    },
    {
      "id": "L20",
      "chapter": 7,
      "scenario": "dirtyReadme",
      "goal": "restore",
      "title": {
        "ko": "수정 전 상태로 되돌리기",
        "en": "Discard a working change",
        "ja": "作業ツリーの変更を破棄",
        "zh": "放弃工作区修改"
      },
      "description": {
        "ko": "README.md의 커밋되지 않은 수정만 취소하세요.",
        "en": "Discard uncommitted README.md modifications.",
        "ja": "README.md の未コミット変更を破棄。",
        "zh": "放弃 README.md 的未提交修改。"
      },
      "hint": "git restore README.md"
    },
    {
      "id": "L21",
      "chapter": 7,
      "scenario": "twoCommits",
      "goal": "revert",
      "title": {
        "ko": "공유 이력은 revert",
        "en": "Revert a published change",
        "ja": "公開履歴は revert",
        "zh": "使用 revert 撤销公开变更"
      },
      "description": {
        "ko": "최신 커밋을 새로운 취소 커밋으로 되돌리세요.",
        "en": "Create a new commit that reverts HEAD.",
        "ja": "HEAD を新しい取り消しコミットで戻す。",
        "zh": "创建新提交以撤销 HEAD。"
      },
      "hint": "git revert HEAD"
    },
    {
      "id": "L22",
      "chapter": 8,
      "scenario": "twoCommits",
      "goal": "reflog",
      "title": {
        "ko": "잃어버린 HEAD 추적",
        "en": "Inspect the reflog",
        "ja": "reflog で HEAD を追跡",
        "zh": "用 reflog 追踪 HEAD"
      },
      "description": {
        "ko": "HEAD 이동 이력을 조회하세요.",
        "en": "Inspect the history of HEAD movements.",
        "ja": "HEAD の移動履歴を確認。",
        "zh": "查看 HEAD 的移动历史。"
      },
      "hint": "git reflog"
    },
    {
      "id": "L23",
      "chapter": 8,
      "scenario": "twoCommits",
      "goal": "softreset",
      "title": {
        "ko": "커밋만 취소하고 변경 유지",
        "en": "Undo commit, keep staging",
        "ja": "変更を残してコミットを戻す",
        "zh": "撤销提交但保留暂存"
      },
      "description": {
        "ko": "최신 커밋을 제거하되 변경 파일은 스테이징 상태로 남겨 두세요.",
        "en": "Move HEAD back one commit; keep changes staged.",
        "ja": "HEAD を一つ戻し変更をステージに残します。",
        "zh": "HEAD 后退一个提交，变更仍保留在暂存区。"
      },
      "hint": "git reset --soft HEAD~1"
    },
    {
      "id": "L24",
      "chapter": 8,
      "scenario": "dirtyApp",
      "goal": "stash",
      "title": {
        "ko": "진행 중인 작업 임시 보관",
        "en": "Temporarily stash your work",
        "ja": "作業内容を stash で保管",
        "zh": "使用 stash 暂存工作"
      },
      "description": {
        "ko": "수정 중인 파일을 stash에 보관하세요.",
        "en": "Save the modified work to the stash.",
        "ja": "変更を stash に保存。",
        "zh": "把当前修改保存到 stash。"
      },
      "hint": "git stash"
    },
    {
      "id": "L25",
      "chapter": 9,
      "scenario": "withStash",
      "goal": "stashpop",
      "title": {
        "ko": "임시 작업 다시 가져오기",
        "en": "Restore stashed work",
        "ja": "stash を復元",
        "zh": "恢复暂存的工作"
      },
      "description": {
        "ko": "stash pop을 실행해 보관된 작업을 복원하세요.",
        "en": "Restore saved work using stash pop.",
        "ja": "stash pop で作業を復元。",
        "zh": "使用 stash pop 恢复工作。"
      },
      "hint": "git stash pop"
    },
    {
      "id": "L26",
      "chapter": 9,
      "scenario": "fresh",
      "goal": "tag",
      "title": {
        "ko": "릴리스 버전 표시",
        "en": "Create a release tag",
        "ja": "リリースタグを作る",
        "zh": "创建发布标签"
      },
      "description": {
        "ko": "현재 커밋에 v1.0.0 태그를 만드세요.",
        "en": "Tag the current commit as v1.0.0.",
        "ja": "現在のコミットに v1.0.0 タグを設定。",
        "zh": "给当前提交创建 v1.0.0 标签。"
      },
      "hint": "git tag v1.0.0"
    },
    {
      "id": "L27",
      "chapter": 9,
      "scenario": "cherryReady",
      "goal": "cherry",
      "title": {
        "ko": "필요한 커밋만 가져오기",
        "en": "Cherry-pick a fix",
        "ja": "必要なコミットだけ適用",
        "zh": "挑选特定提交"
      },
      "description": {
        "ko": "fix 브랜치의 커밋을 cherry-pick하세요.",
        "en": "Cherry-pick the commit on the fix branch.",
        "ja": "fix ブランチのコミットを cherry-pick。",
        "zh": "将 fix 分支的提交拣选到当前分支。"
      },
      "hint": "git cherry-pick fix"
    },
    {
      "id": "L28",
      "chapter": 10,
      "scenario": "rebaseReady",
      "goal": "rebase",
      "title": {
        "ko": "최신 기준 위로 이력 재배치",
        "en": "Rebase onto main",
        "ja": "main 上に rebase",
        "zh": "基于 main 变基"
      },
      "description": {
        "ko": "feature/docs 브랜치를 main 위로 rebase하세요.",
        "en": "Rebase feature/docs onto main.",
        "ja": "feature/docs を main 上に rebase。",
        "zh": "将 feature/docs 变基到 main。"
      },
      "hint": "git rebase main"
    },
    {
      "id": "L29",
      "chapter": 10,
      "scenario": "dirtyBoth",
      "goal": "selective",
      "title": {
        "ko": "AI가 변경한 파일 분리",
        "en": "Separate AI changes",
        "ja": "AI の変更を選択",
        "zh": "筛选 AI 修改文件"
      },
      "description": {
        "ko": "app.js만 스테이징하고 README.md 변경은 검토 대상으로 남겨 두세요.",
        "en": "Stage app.js but keep README.md unstaged for review.",
        "ja": "app.js のみ追加し README.md は未ステージに。",
        "zh": "只暂存 app.js，保留 README.md 供审查。"
      },
      "hint": "git status → git diff → git add app.js"
    },
    {
      "id": "L30",
      "chapter": 10,
      "scenario": "fresh",
      "goal": "diff",
      "title": {
        "ko": "AI 코드의 부작용 찾기",
        "en": "Audit AI-generated changes",
        "ja": "AI 生成コードを監査",
        "zh": "审计 AI 生成代码"
      },
      "description": {
        "ko": "app.js 파일을 편집해 기존 version 코드 대신 greet 함수를 작성하고 저장하세요. git status와 git diff를 직접 실행해 어떤 줄이 바뀌었는지 읽어보세요.",
        "en": "Open app.js and replace the version code with a greet function. Save, then run git status and git diff to inspect the exact edits.",
        "ja": "app.js の version 行を greet 関数に書き換えて保存し、git status と git diff で変更行を確認してください。",
        "zh": "编辑 app.js，将 version 代码替换为 greet 函数并保存，然后运行 git status 和 git diff 查看改动。"
      },
      "hint": "app.js: export function greet(name) { return `Hello, ${name}!`; }\n파일 편집 후 [변경 저장]을 누른 다음 git diff를 실행하세요."
    },
    {
      "id": "L31",
      "chapter": 11,
      "scenario": "secrets",
      "goal": "ignore",
      "title": {
        "ko": "비밀정보 Git에서 제외",
        "en": "Keep secrets out of Git",
        "ja": "機密情報を除外",
        "zh": "排除敏感信息"
      },
      "description": {
        "ko": ".gitignore에 .env를 추가하고 git status를 확인하세요.",
        "en": "Add .env to .gitignore and check git status.",
        "ja": " .gitignore に .env を書いて status を確認。",
        "zh": "在 .gitignore 中添加 .env 并检查 status。"
      },
      "hint": ".gitignore 파일 편집: .env → git status"
    },
    {
      "id": "L32",
      "chapter": 11,
      "scenario": "twoCommits",
      "goal": "revert",
      "title": {
        "ko": "문제 배포 커밋 되돌리기",
        "en": "Rollback a bad release",
        "ja": "問題リリースを取り消す",
        "zh": "回滚错误发布"
      },
      "description": {
        "ko": "배포 문제를 일으킨 HEAD를 이력 보존 방식으로 취소하세요.",
        "en": "Revert HEAD while preserving shared history.",
        "ja": "履歴を保ったまま HEAD を revert。",
        "zh": "保留历史并撤销有问题的 HEAD。"
      },
      "hint": "git revert HEAD"
    },
    {
      "id": "L33",
      "chapter": 11,
      "scenario": "twoCommits",
      "goal": "reflog",
      "title": {
        "ko": "복구 근거 찾기",
        "en": "Investigate recovery points",
        "ja": "復旧地点を特定",
        "zh": "找到可恢复的版本"
      },
      "description": {
        "ko": "reflog를 조회해 이전 HEAD 위치를 확인하세요.",
        "en": "Inspect reflog to identify earlier HEAD positions.",
        "ja": "reflog で以前の HEAD を確認。",
        "zh": "检查 reflog 以定位旧的 HEAD。"
      },
      "hint": "git reflog"
    },
    {
      "id": "L34",
      "chapter": 12,
      "scenario": "fresh",
      "goal": "tag",
      "title": {
        "ko": "안정판에 릴리스 태그",
        "en": "Tag the verified release",
        "ja": "検証済みリリースにタグ",
        "zh": "为稳定版本打标签"
      },
      "description": {
        "ko": "검증된 현재 커밋에 v1.0.0 태그를 생성하세요.",
        "en": "Create tag v1.0.0 on the verified commit.",
        "ja": "検証したコミットに v1.0.0 タグ。",
        "zh": "给已验证的提交创建 v1.0.0 标签。"
      },
      "hint": "git tag v1.0.0"
    },
    {
      "id": "L35",
      "chapter": 12,
      "scenario": "dirtyBoth",
      "goal": "audit",
      "title": {
        "ko": "출시 직전 최종 확인",
        "en": "Release readiness check",
        "ja": "リリース前の最終点検",
        "zh": "发布前最终检查"
      },
      "description": {
        "ko": "status와 최근 로그를 조회하고 추적되지 않은 변경을 구분하세요.",
        "en": "Inspect status and log to identify outstanding edits.",
        "ja": "status と log で未処理の変更を確認。",
        "zh": "查看 status 和 log 识别未提交修改。"
      },
      "hint": "git status → git log --oneline"
    },
    {
      "id": "L36",
      "chapter": 12,
      "scenario": "fresh",
      "goal": "capstone",
      "title": {
        "ko": "최종 미션: 분기부터 배포까지",
        "en": "Capstone: branch to release",
        "ja": "最終課題: 開発からリリース",
        "zh": "终极挑战：从分支到发布"
      },
      "description": {
        "ko": "feature/final에서 app.js를 수정·커밋한 뒤 main에 병합하고 v2.0.0을 태그하세요.",
        "en": "Edit and commit app.js on feature/final, merge into main, then tag v2.0.0.",
        "ja": "feature/final で修正・コミット後 main に統合しタグ設定。",
        "zh": "在 feature/final 修改提交 app.js，合并回 main 并打 v2.0.0 标签。"
      },
      "hint": "git switch -c feature/final → 파일 수정 → git add app.js → git commit -m \"feat: final\" → git switch main → git merge feature/final → git tag v2.0.0"
    }
  ]
};
