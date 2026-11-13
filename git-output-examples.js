/* GitMaster v1.27 — clickable Git terminal output for both orientation animations.
 * Demonstration only: does not mutate Git simulators or learner progress.
 * Output excerpts omit Git's verbose hint lines for readability.
 */
(function () {
  'use strict';
  const I18N = {
    ko: {
      heading:'명령 실행 후 실제로 보이는 출력', status:'상태 보기',diff:'변경 줄 비교',
      step:'한 줄을 선택하면 아래에서 뜻을 확인할 수 있습니다.',
      sample:'이해를 돕기 위해 Git의 안내 문구 일부를 생략한 출력 예시입니다.',
      tracked:'이 예시의 README.md는 이미 Git이 추적하는 파일입니다.',
      untracked:'새로 만든 src/filter.js는 untracked입니다. 기본 git diff에는 새 파일 내용이 표시되지 않습니다. 먼저 git add로 등록하세요.',
      noChange:'출력이 없다면, 스테이징하지 않은 추적 파일의 변경이 없을 수도 있습니다.',
      prompt:'줄 선택 후 자세한 뜻을 확인하세요.'
    },
    en: {
      heading:'What the terminal actually prints',status:'Repository status',diff:'Line-by-line changes',
      step:'Select any output line to read its meaning.',
      sample:'Selected Git output lines; routine Git hints are omitted to fit the lesson.',
      tracked:'README.md is already tracked by Git in this example.',
      untracked:'The new src/filter.js is untracked. Plain git diff does not display untracked file content. Stage it with git add first.',
      noChange:'No output may simply mean no unstaged changes to tracked files.',
      prompt:'Select a line for an explanation.'
    },
    ja: {
      heading:'ターミナルの実際の出力例',status:'状態を表示',diff:'変更行を比較',
      step:'各行を選択すると意味がわかります。',
      sample:'学習用の抜粋です。Gitの補助メッセージの一部を省略しています。',
      tracked:'この例のREADME.mdはGitの追跡対象です。',
      untracked:'新しいsrc/filter.jsはuntrackedです。通常のgit diffでは未追跡ファイルの内容は表示されません。まずgit addで登録します。',
      noChange:'出力がない場合、追跡済みファイルに未ステージの変更がない可能性があります。',
      prompt:'行を選択して説明を確認してください。'
    },
    zh: {
      heading:'终端真实输出示例',status:'查看状态',diff:'逐行比较',
      step:'点击任意输出行查看含义。',
      sample:'为便于学习，省略了 Git 部分提示行。',
      tracked:'此示例中的 README.md 已被 Git 跟踪。',
      untracked:'新建的 src/filter.js 属于 untracked 文件。普通 git diff 不显示未跟踪文件的内容，请先使用 git add。',
      noChange:'没有输出可能表示已跟踪文件没有未暂存的修改。',
      prompt:'点击一行查看说明。'
    }
  };
  const loc = (ko,en,ja,zh)=>({ko,en,ja,zh});
  const row = (code,description,color='')=>({code,description,color});
  const items = {
    base: {
      status:[
        row('$ git status',loc('현재 저장소의 상태를 확인합니다. 파일은 변경하지 않습니다.','Inspect the repository without changing anything.','変更を加えず状態を確認します。','只检查状态，不修改文件。')),
        row('On branch main',loc('현재 작업 중인 브랜치는 main입니다.','Your current branch is main.','現在のブランチはmainです。','当前分支是 main。')),
        row('Changes not staged for commit:',loc('수정됐지만 아직 스테이징하지 않은 파일이 있다는 뜻입니다.','There are changes not yet staged for a commit.','変更はありますが、まだステージしていません。','有修改，但尚未暂存。')),
        row('  modified: README.md',loc('Git이 이미 추적하던 README.md의 내용이 바뀌었습니다.','A previously tracked README.md was edited.','追跡済みのREADME.mdが変更されました。','已跟踪的 README.md 内容被修改。'),'change'),
        row('no changes added to commit',loc('지금 상태로는 커밋에 포함할 내용이 스테이징되지 않았습니다.','Nothing has been staged for the next commit.','次のコミットに含める変更が未ステージです。','当前没有暂存可提交的内容。'))
      ],
      diff:[
        row('$ git diff',loc('아직 스테이징하지 않은 추적 파일의 줄별 차이를 확인합니다.','Show unstaged line-level differences in tracked files.','追跡済みファイルの未ステージ差分を表示します。','显示已跟踪文件的未暂存差异。')),
        row('diff --git a/README.md b/README.md',loc('비교 대상 파일입니다. a는 변경 전, b는 변경 후를 가리킵니다.','The file being compared; a is old and b is new.','比較するファイル。aは変更前、bは変更後です。','比较的文件；a 为修改前，b 为修改后。')),
        row('--- a/README.md',loc('---는 수정하기 전 파일을 나타내는 머리글입니다.','--- identifies the old file (not a deleted code line).','---は変更前のファイルを示す見出しです。','--- 表示旧文件标题，不是删除的代码行。'),'old'),
        row('+++ b/README.md',loc('+++는 수정한 뒤 파일을 나타내는 머리글입니다.','+++ identifies the new file (not an added code line).','+++は変更後のファイルを示す見出しです。','+++ 表示新文件标题，不是新增的代码行。'),'new'),
        row('@@ -1,2 +1,2 @@',loc('변경 전 1행부터 2줄, 변경 후 1행부터 2줄을 비교한다는 뜻입니다.','The old and new blocks both start at line 1 and span 2 lines.','変更前後とも1行目から2行分を比較します。','修改前后均从第 1 行开始，共 2 行。'),'hunk'),
        row(' # GitMaster demo',loc('앞에 공백이 있는 줄은 변경되지 않은 문맥입니다.','An unchanged context line begins with a space.','先頭が空白の行は変更されていない文脈です。','行首空格表示未修改的上下文。')) ,
        row('-Learn by doing.',loc('맨 앞의 -는 이전 버전에서 사라지거나 교체된 줄입니다.','The leading minus means the old line was removed or replaced.','先頭の-は削除・置換された旧行を示します。','行首 - 表示旧行被删除或替换。'),'old'),
        row('+Learn Git by doing.',loc('맨 앞의 +는 변경 후 새로 들어간 줄입니다.','The leading plus means a line was added in the new version.','先頭の+は変更後の新しい行を示します。','行首 + 表示新加入的代码行。'),'new')
      ]
    },
    team: {
      status:[
        row('$ git status',loc('민지의 기능 브랜치가 어떤 상태인지 확인합니다.','Inspect the current feature branch.','機能ブランチの状態を確認します。','查看功能分支状态。')),
        row('On branch feature/task-filter',loc('현재 main이 아닌 feature/task-filter 브랜치에서 작업하고 있습니다.','You are on feature/task-filter, not main.','mainではなくfeature/task-filterにいます。','当前在 feature/task-filter 分支，而不是 main。')),
        row('Changes not staged for commit:',loc('README.md를 수정했지만 아직 git add 하지 않았습니다.','README.md was edited but not yet staged.','README.mdを編集しましたが、未ステージです。','README.md 已修改但尚未暂存。')),
        row('  modified: README.md',loc('README.md는 이미 Git이 추적 중인 수정 파일입니다.','README.md is a tracked file with local edits.','README.mdは追跡済みで変更されています。','README.md 是已跟踪的修改文件。'),'change'),
        row('Untracked files: src/filter.js',loc('새로 만든 src/filter.js는 Git이 아직 추적하지 않습니다. git add src/filter.js가 필요합니다.','The new src/filter.js is not tracked yet. Stage it with git add src/filter.js.','新規ファイルsrc/filter.jsはまだ未追跡。git addが必要です。','新文件 src/filter.js 尚未被跟踪，需要 git add。'),'new')
      ],
      diff:[
        row('$ git diff',loc('스테이징 전 추적 파일의 차이를 확인합니다. 신규 파일은 따로 확인하세요.','Shows unstaged edits to tracked files; inspect untracked files separately.','追跡済みファイルの未ステージ差分を表示します。','查看已跟踪文件的未暂存差异。')),
        row('diff --git a/README.md b/README.md',loc('이 예제에서는 README.md 변경이 비교됩니다.','In this example README.md has tracked changes.','この例はREADME.mdの変更を比較します。','本示例比较 README.md 的修改。')),
        row('--- a/README.md',loc('수정 이전의 README.md를 의미합니다.','The original README.md file.','変更前のREADME.mdです。','修改前的 README.md。'),'old'),
        row('+++ b/README.md',loc('수정 이후의 README.md를 의미합니다.','The edited README.md file.','変更後のREADME.mdです。','修改后的 README.md。'),'new'),
        row('@@ -1,2 +1,2 @@',loc('변경 전후 모두 첫 줄부터 두 줄을 비교합니다.','The changed block spans two lines starting at line 1.','先頭から2行分の変更を表します。','从第 1 行开始比较 2 行。'),'hunk'),
        row(' # FocusBoard',loc('앞에 공백이 있는 줄은 변경되지 않은 기존 내용입니다.','A context line without edits begins with a space.','先頭が空白の行は変更されていません。','前导空格表示没有变化的行。')) ,
        row('-Task list',loc('이전 문구가 제거되거나 교체되었습니다.','The old description was removed or replaced.','以前の文章が削除・置換されました。','旧说明被删除或替换。'),'old'),
        row('+Task list with filter',loc('필터 기능 설명이 새로 추가되었습니다.','The new description mentions the filter feature.','フィルター機能の説明を追加しました。','新说明增加了筛选功能。'),'new')
      ]
    }
  };
  const esc = str => String(str??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  function render(scope,lang,tab,line,attr){
    const l=I18N[lang]?lang:'ko',t=I18N[l], data=items[scope]||items.base;
    const active=tab==='diff'?'diff':'status', rows=data[active], idx=Math.max(0,Math.min(rows.length-1,line|0));
    const current=rows[idx];
    const attrName=attr==='team'?'data-intro-act':'data-git-overview';
    const action=(name)=>` ${attrName}="${name}"`;
    const footerNote=(scope==='team' ? (active==='diff'?t.untracked:t.tracked+' '+t.untracked):(active==='diff'?t.noChange:t.tracked));
    return `<div class="git-output-lesson" role="region" aria-label="${esc(t.heading)}">
      <div class="gol-header"><strong>▣ ${esc(t.heading)}</strong><div class="gol-tabs" role="group" aria-label="Git commands"><button type="button" class="${active==='status'?'active':''}"${action('example-tab')} data-example-tab="status" aria-pressed="${active==='status'}">git status</button><button type="button" class="${active==='diff'?'active':''}"${action('example-tab')} data-example-tab="diff" aria-pressed="${active==='diff'}">git diff</button></div></div>
      <div class="gol-body"><div class="gol-terminal" aria-label="Terminal output example">${rows.map((r,i)=>`<button type="button"${action('example-line')} data-example-line="${i}" class="gol-line ${r.color?'gol-'+r.color:''} ${idx===i?'active':''}" aria-pressed="${idx===i}" title="${esc(r.description[l])}">${esc(r.code)}</button>`).join('')}</div>
      <div class="gol-meaning"><div class="gol-meaning-label">💡 ${esc(t.step)}</div><code>${esc(current.code.replace(/^\$ /,''))}</code><p aria-live="polite">${esc(current.description[l])}</p><small>${esc(footerNote)}</small></div></div>
      <div class="gol-caption">ⓘ ${esc(t.sample)}</div>
    </div>`;
  }
  window.GitOutputExamples={render};
})();
