/* Progressive, non-spoiler-first coaching for GitMaster team collaboration. */
(function(){
'use strict';
const hints={
ko:[
['먼저 민지를 작업자로 선택하세요. 새 기능은 main에서 바로 수정하지 않고 별도의 브랜치에서 개발합니다.','상단 「현재 작업자」 → 민지 선택. 가운데 Git Terminal에 git branch를 입력해 현재 브랜치를 확인한 뒤 git switch -c feature/task-filter를 실행하세요.','-c는 새 브랜치를 만들고 즉시 이동하는 옵션입니다. 터미널에서 git branch를 다시 실행해 feature/task-filter 옆에 *가 붙었는지 확인하세요.'],
['이 단계는 코드 작성과 Git 기록이 별개의 작업임을 배우는 과정입니다. 파일을 수정했어도 add와 commit을 하지 않으면 Git 이력에는 남지 않습니다.','민지로 작업하고 가운데 「이번 과제 파일 만들기」 → src/filter.js 선택 → 함수 작성 → 「변경 저장」. 다음으로 git status → git add src/filter.js → git commit -m "feat: add filter" → git push -u origin feature/task-filter를 순서대로 실행하세요.','직접 작성하기 어렵다면 「예제 코드 입력」을 눌러 구조를 살펴보세요(저장·커밋은 자동 실행되지 않음). 함수 이름은 filterTasks여야 합니다. 완료 확인: 기능 브랜치 커밋에 src/filter.js가 포함되고 원격 브랜치가 최신 커밋을 가리켜야 합니다.'],
['PR은 기능 브랜치의 변경을 main에 반영해 달라고 팀에 검토를 요청하는 문서입니다. Draft는 작성 중이므로 아직 리뷰 대상이 아닙니다.','오른쪽 Pull Requests에서 제목 12자 이상, 변경 이유와 테스트 계획 25자 이상 작성 → 「Draft로 PR 열기」 클릭. 생성된 PR #1을 「Ready for review」로 전환하세요.','민지 역할에서 리뷰 요청 대상 「준호」 선택 → 「리뷰어 요청」. PR #1 상단이 Ready이고 리뷰어 목록에 준호가 나타나면 미션이 완료됩니다. 리뷰는 아직 준호가 수행하지 않습니다.'],
['코드 리뷰는 리뷰어 준호가 작성자 민지의 변경 사항을 읽고, 문제를 재현할 수 있는 구체적인 수정 요청을 남기는 과정입니다. 승인(Approve)과 다릅니다.','① 화면 상단 「현재 작업자」를 준호로 변경 → ② 오른쪽 PR #1의 Ready 상태 확인 → ③ Files changed의 src/filter.js 초록색 + 줄 확인 → ④ 「리뷰 제출」에서 Request changes와 src/filter.js를 선택하세요.','예제 코드의 task.title.includes(query)는 대소문자와 공백을 그대로 비교합니다. 리뷰 예시: “src/filter.js의 검색어 공백·대소문자를 정규화해 주세요. query.trim().toLowerCase()와 title.toLowerCase() 적용 후 재검증이 필요합니다.” 오른쪽 「예제 리뷰문 입력」을 사용해 수정한 뒤 「리뷰 제출」을 눌러야 합니다. Open 대화가 생성되면 05단계로 이동합니다.'],
['수정 요청을 받은 뒤에는 리뷰어가 아니라 작성자인 민지가 코드를 고쳐야 합니다. 단순 댓글만 작성해서는 완료되지 않습니다.','상단 민지 선택 → 가운데 src/filter.js 열기 → query.trim().toLowerCase()와 task.title.toLowerCase()를 이용해 함수 수정 → 「변경 저장」 → git add src/filter.js → git commit -m "fix: normalize task filter" → git push -u origin feature/task-filter 실행.','Push한 뒤 오른쪽 리뷰 대화에서 「수정 후 대화 해결 표시」를 누르세요. 새 커밋이 없으면 해결할 수 없습니다. 완료 확인: 새 커밋 Push + 공백·대소문자 처리 코드 + 리뷰 대화 Resolved가 모두 충족됩니다.'],
['CI는 새 코드가 팀의 검사 조건을 통과하는지 확인하는 과정입니다. 이 시뮬레이터의 CI는 JavaScript를 실행하지 않고 코드 구조를 검사합니다.','오른쪽 PR #1을 선택하고 「CI 검사 실행」 클릭. 검사 결과를 PR 상태 영역에서 확인하세요. 실패했다면 src/filter.js에 filterTasks, trim, toLowerCase, return이 있는지 점검합니다.','코드를 수정했다면 「변경 저장 → git add → git commit → git push」를 다시 한 다음 CI를 재실행해야 합니다. 완료 기준: 최신 Push 커밋의 CI가 Passed이며, 옛 커밋의 통과 기록은 인정되지 않습니다.'],
['Approve는 “현재 제출된 변경을 확인했으며 병합에 동의한다”는 리뷰어의 의사 표시입니다. 작성자는 자기 PR을 승인할 수 없습니다.','상단 「현재 작업자」 → 준호. 오른쪽 PR #1에서 최신 파일 변경과 미해결 대화 여부 확인 → 「리뷰 제출」 유형 Approve 선택 → 「리뷰 제출」 버튼 클릭.','PR 상태에 준호의 승인 1/2이 표시되는지 확인하세요. 수정 요청 후에는 같은 준호가 새 커밋을 다시 검토해 승인해야 합니다. 이 단계에서는 아직 main에 병합하지 마세요.'],
['보호된 main 브랜치에 병합하려면 서로 다른 두 리뷰어의 승인이 필요합니다. 수아는 두 번째 리뷰어이면서 병합 권한을 가진 관리자입니다.','① 상단 민지로 변경 → 오른쪽 리뷰 요청 대상 수아 선택 → 「리뷰어 요청」 클릭. ② 상단 수아로 변경 → 「리뷰 제출」에서 Approve 선택 및 제출. ③ CI Passed와 미해결 대화 0개 확인.','오른쪽 병합 불가 사유가 사라지면 수아 역할로 「보호된 main에 병합」 클릭. 확인 기준: PR #1에 Merged 표시가 생기고 main에 기능이 반영됩니다. 버튼이 막히면 승인 2/2·최신 CI·대화 Resolved·Push 상태를 각각 확인하세요.'],
['두 번째 개발자 대현은 첫 PR과 다른 기능을 독립적인 브랜치에서 작성합니다. 첫 PR이 main에 병합된 뒤 시작하세요.','대현 선택 → git switch main → git switch -c feature/task-count → 「이번 과제 파일 만들기」로 src/count.js 생성 → countTasks 함수를 작성·저장 → git add src/count.js → git commit -m "feat: add count" → git push -u origin feature/task-count.','오른쪽 PR 작성 폼에서 제목·변경 이유를 입력해 Draft PR #2 생성 → Ready 전환. 예제 함수: export function countTasks(tasks) { return tasks.length; }  완료 확인: PR #2가 Ready이고 작성자가 대현이며 최신 커밋이 Push된 상태입니다.'],
['마지막 단계는 실제 팀 협업의 핵심인 교차 리뷰와 보호 브랜치 병합입니다. 작성자 대현이 자신의 PR을 승인할 수는 없습니다.','대현 역할에서 PR #2에 준호·수아 두 사람을 각각 리뷰어로 요청. 오른쪽 「CI 검사 실행」에서 Passed 확인 → 준호 역할로 Approve 제출 → 수아 역할로 Approve 제출.','수아 역할로 「보호된 main에 병합」 버튼 클릭. 막히면 오른쪽 「병합 불가 사유」를 확인하세요. 승인 2/2, CI Passed, 미해결 대화 없음, 최신 Push가 조건입니다. PR 두 건 모두 Merged면 전체 과정 완료입니다.']
],
en:[
['Select Minji as the active developer. Work on an isolated feature branch rather than editing main.','Choose Minji in Acting as. Run git branch, then git switch -c feature/task-filter in the center terminal.','The -c flag creates a branch and switches to it. Run git branch again; the active branch should have an asterisk.'],
['Editing a file is different from staging, committing, and pushing it. Each step matters.','Minji → Create task file → src/filter.js → write code → Save changes. Then run git status, git add src/filter.js, git commit -m "feat: add filter", git push -u origin feature/task-filter.','Insert sample code if needed; it does not save or commit automatically. The committed file must define filterTasks and the remote must point at your latest commit.'],
['A pull request asks the team to review changes before merging into main. A Draft is not ready for reviews.','Fill the right-hand PR form: title 12+ characters and explanation/test plan 25+ characters. Create Draft PR #1, then Mark ready for review.','As Minji, choose Junho as reviewer and click Request review. Verify PR #1 says Ready and lists Junho.'],
['Junho, the reviewer, needs to inspect Minji’s changes and request a specific code fix—not approve them.','Acting as → Junho. In PR #1, inspect Files changed → src/filter.js green + lines. Choose Request changes and src/filter.js in the review form.','The example uses task.title.includes(query), which does not normalize whitespace or case. Suggest query.trim().toLowerCase() and title.toLowerCase(), and explain why. Use Insert sample review as a starting point, then submit the review. Expect an Open discussion.'],
['Minji must modify the code after the review. A comment alone is not enough.','Switch to Minji, update src/filter.js with trim and toLowerCase, Save changes, then git add, git commit, git push.','After pushing a NEW commit, use Resolve discussion for the open thread. Check that the new remote commit and resolved review are reflected.'],
['CI checks confirm that the latest proposed revision meets the training rules. Here they are static checks, not JS execution.','With PR #1 selected, click Run CI checks on the right. If failed, verify filterTasks, trim, toLowerCase and return are present.','After any additional commit, push and rerun CI. The check must be Passed for the current head commit, not an older revision.'],
['Approve means that a reviewer accepts the current changes. Authors cannot approve their own PR.','Switch to Junho. Inspect PR #1 and resolved discussions; choose Approve in Submit review, then submit.','Verify Junho approval counts as 1/2. Since Junho previously requested changes, he needs to approve the corrected revision.'],
['Protected main requires two distinct approvals. Sua can serve as the second reviewer and authorized maintainer.','Minji requests a review from Sua; switch to Sua, submit Approve, check CI Passed and no open threads.','As Sua, click Merge into protected main once the blockers disappear. If blocked, check approvals 2/2, CI on latest push, and resolved threads.'],
['Daehyun develops a separate feature in a different branch after PR #1 is merged.','Daehyun → git switch main → git switch -c feature/task-count → create src/count.js → save → git add → git commit → git push.','Use export function countTasks(tasks) { return tasks.length; } as an example. Open Draft PR #2, mark Ready, and verify Daehyun authored it.'],
['The final task uses cross-review, CI and protected-branch merging for PR #2.','Daehyun requests reviews from Junho and Sua. Run CI checks. As Junho, Approve. As Sua, Approve.','Sua merges PR #2 only after two approvals, Passed CI, no open discussions and latest push. Both PRs should show Merged.']
],
ja:[
['担当者をミンジにします。mainを直接変更せず機能ブランチを作成します。','「担当者」→ミンジ。ターミナルで git branch を確認し、git switch -c feature/task-filter を実行します。','-c は新規ブランチを作成して切り替えるオプションです。git branch で * を確認してください。'],
['ファイル編集とGitへの記録は別の操作です。','ミンジ → 課題ファイル作成 → src/filter.js → コード記述 → 保存。git add src/filter.js → git commit -m "feat: add filter" → git push -u origin feature/task-filter。','サンプルコード挿入もできます。filterTasks がコミット内にあり、最新コミットをPushしたら完了です。'],
['PRはmainへの変更をレビューしてもらう依頼です。Draftはレビュー前の状態です。','右側でタイトル（12文字以上）と説明（25文字以上）を入力 → Draft PR #1 作成 → Readyに変更します。','ミンジでジュノをレビュアーに指定し依頼。PR #1にReadyとジュノが表示されれば完了です。'],
['ジュノは追加されたコードを読み、理由を添えて修正を依頼する役目です。','担当者をジュノに変更 → PR #1のFiles changedからsrc/filter.jsの緑色+行を確認 → Request changes、src/filter.jsを選択。','includes(query)は空白や大文字小文字を処理しません。query.trim().toLowerCase()とtitle.toLowerCase()の追加を提案し、レビュー送信。Openの会話が作成されます。'],
['修正依頼後は作者ミンジがコードを修正します。','ミンジ → src/filter.js のtrimとtoLowerCaseを追加 → 保存 → add → commit → push。','新規コミットをPush後、右側の「会話を解決」をクリック。コード修正とResolvedが必要です。'],
['CIは最新の変更が条件を満たすかの検査です。ここでは静的ルールを使います。','PR #1で「CIを実行」。失敗時はfilterTasks・trim・toLowerCase・returnを確認します。','修正後は再度保存・commit・Push・CI実行。最新コミットでPassedが必要です。'],
['Approveは現在の変更に同意するレビューです。作者は自分のPRを承認できません。','ジュノに切り替え → PR #1で Approve を選んでレビュー送信。','ジュノの承認が1/2と表示されることを確認。まだマージしません。'],
['mainの保護ルールでは異なる2人の承認が必要です。','ミンジがスアにレビューを依頼 → スアに切り替え → Approveを送信。','スアで保護されたmainにマージ。不可の場合は2/2承認・CI Passed・解決済み会話・Pushを確認。'],
['デヒョンは別の機能を独立したブランチで開発します。','デヒョン → git switch main → git switch -c feature/task-count → src/count.js作成 → 保存 → add → commit → push。','countTasks関数を含めてPR #2をDraft作成→Readyに変更。'],
['最後はPR #2の交差レビューとマージです。','デヒョンがジュノとスアにレビュー依頼 → CI → ジュノ承認 → スア承認。','スアがマージ。2人の承認・CI通過・未解決0件・最新Pushを確認。']
],
zh:[
['先选择敏智作为开发者，不要直接修改main分支。','顶部选择敏智 → 在终端查看git branch → 执行git switch -c feature/task-filter。','-c表示新建并切换分支。再次执行git branch，检查星号是否在feature/task-filter前。'],
['修改文件与暂存、提交、推送是不同操作。','敏智 → 创建任务文件src/filter.js → 编写代码 → 保存 → git add src/filter.js → git commit -m "feat: add filter" → git push -u origin feature/task-filter。','可以插入示例代码，但仍需手动保存。检查提交中包含filterTasks，并已推送最新版本。'],
['PR是申请团队审查并合并代码的流程。Draft尚不能正式审查。','右侧填写标题（至少12字符）和说明（至少25字符）→ 创建Draft PR #1 → 标记Ready。','以敏智身份选择俊浩并请求审查。PR #1为Ready且审查者包含俊浩即可。'],
['俊浩应查看敏智修改的代码并提出具体建议，而不是直接批准。','切换俊浩 → 查看PR #1的Files changed中src/filter.js绿色+行 → 在审查表单选择Request changes和文件。','includes(query)不会处理空格和大小写。建议使用query.trim().toLowerCase()和title.toLowerCase()，填写原因并提交。应出现Open讨论。'],
['请求修改后应由作者敏智修改代码。','切换敏智 → 修改src/filter.js，增加trim和toLowerCase → 保存 → add → commit → push。','推送新提交后，在右侧把对应讨论标记Resolved。仅留言不算完成。'],
['CI用于验证最新代码。本练习只是静态规则检查，不执行JS。','选中PR #1 → 运行CI。失败时检查filterTasks、trim、toLowerCase和return。','修改后重新保存、提交、推送并运行CI；最新提交必须显示Passed。'],
['Approve表示审查者同意当前代码。作者不能批准自己的PR。','切换俊浩 → 在PR #1的审查表单中选Approve并提交。','检查俊浩批准计数1/2，不要马上合并。'],
['受保护main要求两名不同审查者批准。','敏智请求秀雅审查 → 切换秀雅 → 提交Approve。','秀雅点击合并。若被阻止，检查2/2批准、最新CI通过、讨论已解决、已推送。'],
['大贤需要在独立分支实现第二个功能。','切换大贤 → git switch main → git switch -c feature/task-count → 创建src/count.js → 保存 → add → commit → push。','编写countTasks函数，创建Draft PR #2并标记Ready。'],
['最后通过交叉审查与CI完成PR #2的合并。','大贤分别请求俊浩和秀雅审查 → 运行CI → 俊浩Approve → 秀雅Approve。','秀雅合并PR #2。检查2人批准、CI Passed、无未解决讨论、最新推送。']
]
};
const labels={
 ko:{heading:'막히면 단계별 힌트',start:'힌트 1 보기 · 먼저 방향부터',next:'다음 힌트 보기',close:'힌트 접기',count:'단계',tier:['① 왜 필요한가?','② 화면에서 따라 하기','③ 예시·완료 확인'],note:'힌트를 열어도 명령 실행·리뷰 제출은 자동으로 진행되지 않습니다.'},
 en:{heading:'Need help? Step-by-step hints',start:'Show hint 1 · start with the concept',next:'Show next hint',close:'Hide hints',count:'level',tier:['① Why it matters','② Where to click','③ Example and completion check'],note:'Hints do not execute Git commands or submit reviews.'},
 ja:{heading:'困ったら段階別ヒント',start:'ヒント1を見る',next:'次のヒント',close:'閉じる',count:'段階',tier:['① 理由','② 操作手順','③ 例と完了確認'],note:'ヒントを開いてもコマンドやレビューは自動実行されません。'},
 zh:{heading:'遇到问题？逐步提示',start:'显示提示1',next:'下一条提示',close:'收起提示',count:'层级',tier:['① 为什么','② 操作步骤','③ 示例与验收'],note:'查看提示不会自动执行命令或提交审查。'}
};
window.GitTeamHints={get:(lang,step)=>hints[lang]?.[step]||hints.ko[step]||[],labels:(lang)=>labels[lang]||labels.ko};
})();
