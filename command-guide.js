/* GitMaster Academy — concise, localized explanations for Git command components. */
(function(){
'use strict';
const labels={
 ko:{title:'명령어 구성 해설',parts:'각 부분의 의미',git:'Git 프로그램을 실행합니다.',branch:'브랜치를 이동합니다.',command:'Git에게 수행할 작업을 지정하는 하위 명령입니다.',file:'작업할 파일 경로입니다.',branchName:'브랜치의 이름입니다. 예시는 원하는 이름으로 바꿀 수 있습니다.',remote:'원격 저장소의 별칭입니다. origin은 관례적인 기본 이름입니다.',commitRef:'HEAD는 현재 체크아웃한 커밋을 가리킵니다.',commitMessage:'이 커밋을 설명하는 메시지입니다. 공백이 있으므로 따옴표로 감쌉니다.',tag:'버전을 구분하는 태그 이름입니다.',other:'이 명령에 전달하는 대상 또는 값입니다.',option:'옵션',argument:'인자',optionHelp:'옵션은 명령의 동작 방식을 바꿉니다. - 한 개는 보통 짧은 옵션, -- 두 개는 긴 옵션입니다.',optionLabel:'옵션 뜻',readMore:'구성 전체 보기',tips:'같은 명령어라도 옵션에 따라 결과가 달라집니다.',warn:'주의',same:'동일 의미',verbPrefix:'',commandSummary:'명령',
 },
 en:{title:'Command breakdown',parts:'What each part means',git:'Runs the Git program.',branch:'Switches branches.',command:'The Git subcommand specifies the operation.',file:'Path of the file to work on.',branchName:'Name of a branch. You can replace this example name.',remote:'Name of a remote repository. origin is the conventional default.',commitRef:'HEAD refers to your currently checked-out commit.',commitMessage:'Commit message describing the change. Quotes keep words together.',tag:'Name of a version tag.',other:'A target or value passed to the command.',option:'Option',argument:'Argument',optionHelp:'Options change how commands behave: a single hyphen usually introduces a short option, two hyphens a long one.',optionLabel:'Option meaning',readMore:'Show all parts',tips:'Options can change a command’s behavior.',warn:'Caution',same:'Long form',verbPrefix:'',commandSummary:'Command'},
 ja:{title:'コマンドの構造',parts:'それぞれの意味',git:'Git プログラムを起動します。',branch:'ブランチを切り替えます。',command:'Git に実行させるサブコマンドです。',file:'操作対象のファイルのパスです。',branchName:'ブランチ名です。例の名前は変更できます。',remote:'リモートの別名です。origin は一般的な名前です。',commitRef:'HEAD は現在チェックアウト中のコミットを示します。',commitMessage:'変更を説明するコミットメッセージです。空白を含むため引用符で囲みます。',tag:'バージョンを表すタグ名です。',other:'コマンドに渡す対象または値です。',option:'オプション',argument:'引数',optionHelp:'オプションで動作が変わります。- は短い形式、-- は長い形式です。',optionLabel:'オプションの意味',readMore:'各部分を詳しく見る',tips:'同じコマンドでもオプションで結果が変わります。',warn:'注意',same:'長い形式',verbPrefix:'',commandSummary:'コマンド'},
 zh:{title:'命令结构说明',parts:'每一部分的含义',git:'运行 Git 程序。',branch:'切换分支。',command:'指定 Git 要执行的子命令。',file:'要操作的文件路径。',branchName:'分支名称，可替换示例名称。',remote:'远程仓库的别名，origin 是惯用名称。',commitRef:'HEAD 表示当前检出的提交。',commitMessage:'本次提交的说明文字。包含空格时使用引号。',tag:'版本标签名称。',other:'传给命令的目标或参数值。',option:'选项',argument:'参数',optionHelp:'选项会改变命令的行为。单个 - 通常表示短选项，-- 表示长选项。',optionLabel:'选项含义',readMore:'查看完整结构',tips:'同一个命令使用不同选项，结果也可能不同。',warn:'注意',same:'长形式',verbPrefix:'',commandSummary:'命令'}
};
const verbs={
 status:['현재 저장소의 상태를 확인합니다.','Show current repository status.','現在の状態を確認します。','查看当前仓库状态。'],
 add:['파일 변경을 스테이징합니다.','Stage selected changes.','変更をステージします。','暂存文件更改。'],
 commit:['스테이징한 변경을 기록합니다.','Record staged changes.','ステージ済みの変更を記録します。','提交暂存的更改。'],
 diff:['두 상태 사이의 차이를 확인합니다.','Compare changes.','変更の差分を確認します。','比较差异。'],
 log:['커밋 이력을 조회합니다.','Display commit history.','コミット履歴を表示します。','查看提交历史。'],
 show:['커밋 또는 객체의 내용을 보여줍니다.','Show an object or commit.','コミットなどの内容を表示します。','显示提交等对象的内容。'],
 branch:['브랜치 목록을 표시하거나 관리합니다.','List or manage branches.','ブランチを表示・管理します。','显示或管理分支。'],
 switch:['작업할 브랜치를 전환합니다.','Switch the working branch.','作業ブランチを切り替えます。','切换工作分支。'],
 merge:['다른 브랜치의 변경을 통합합니다.','Merge changes from another branch.','別のブランチを統合します。','合并其他分支的更改。'],
 remote:['원격 저장소의 별칭과 주소를 관리합니다.','Manage remote repositories.','リモートの名前と URL を管理します。','管理远程仓库名称与地址。'],
 push:['로컬 커밋을 원격 저장소로 보냅니다.','Send commits to a remote.','ローカルのコミットを送信します。','将本地提交推送到远程。'],
 fetch:['원격 이력을 가져오되 병합하지 않습니다.','Download remote history without merging.','マージせずにリモート履歴を取得します。','获取远程历史但不合并。'],
 pull:['원격 변경을 가져와 현재 브랜치에 통합합니다.','Fetch and integrate remote changes.','取得して現在のブランチに統合します。','拉取并整合远程更改。'],
 restore:['파일 내용이나 스테이징 상태를 복구합니다.','Restore file or index state.','ファイルやステージ状態を復元します。','恢复文件或暂存状态。'],
 revert:['기존 커밋을 취소하는 새 커밋을 생성합니다.','Create a new commit that undoes another.','変更を打ち消す新しいコミットを作ります。','创建新提交以撤销旧提交。'],
 reset:['브랜치의 HEAD를 이동합니다. 옵션에 따라 파일도 변경됩니다.','Move HEAD, potentially changing index/files.','HEAD を移動します。オプションによってファイルも変わります。','移动 HEAD，具体影响取决于选项。'],
 reflog:['로컬 HEAD/참조의 이동 기록을 보여줍니다.','Show local reference movements.','ローカル参照の移動履歴を表示します。','查看本地引用移动记录。'],
 stash:['작업 중인 변경을 임시 보관하거나 적용합니다.','Store or reapply work in progress.','作業中の変更を一時保存・再適用します。','暂存或恢复进行中的修改。'],
 tag:['커밋에 버전 이름을 붙입니다.','Attach a tag name to a commit.','コミットにバージョン名を付けます。','给提交添加版本标签。'],
 'cherry-pick':['다른 커밋의 변경을 현재 브랜치에 적용합니다.','Apply changes from a selected commit.','指定したコミットの変更を適用します。','应用某个提交的更改。'],
 rebase:['커밋을 다른 기준 위에 다시 적용합니다.','Replay commits on a new base.','別の基点にコミットを再適用します。','在新基点上重放提交。'],
 worktree:['같은 저장소를 다른 작업 폴더에서도 사용합니다.','Use another working directory for this repository.','別の作業ディレクトリを作ります。','创建另一个工作目录。'],
 bisect:['이진 탐색으로 문제가 생긴 커밋을 찾습니다.','Find a problematic commit by binary search.','二分探索で原因コミットを探します。','二分定位引入错误的提交。']
};
const flags={
 '-c':{switch:['새 브랜치를 만든 다음 그 브랜치로 즉시 이동합니다.','Create a branch, then switch to it.','新しいブランチを作成して切り替えます。','创建新分支并立即切换。'],alias:'--create'},
 '-C':{switch:['기존 브랜치가 있어도 시작 지점을 재설정하여 생성·전환합니다. 기존 참조가 바뀔 수 있어 주의합니다.','Force-create/reset a branch and switch. Use with caution.','既存ブランチを上書きして切り替えるため注意します。','强制重建分支并切换，注意已有分支。'],alias:'--force-create',risk:true},
 '-m':{commit:['바로 뒤의 문자열을 커밋 메시지로 지정합니다.','Use the following text as the commit message.','続く文字列をコミットメッセージにします。','把后面的文本作为提交说明。'],alias:'--message'},
 '-u':{push:['원격 브랜치를 이후 push/pull의 기본 추적 대상으로 설정합니다.','Set the remote branch as the upstream tracking branch.','リモートブランチを上流ブランチに設定します。','设置远程分支为默认上游跟踪分支。'],alias:'--set-upstream'},
 '-v':{remote:['원격 저장소의 fetch/push 주소를 자세히 표시합니다.','Show fetch and push URLs of remotes.','リモート URL を表示します。','显示远程仓库的抓取和推送地址。'],alias:'--verbose'},
 '-b':{worktree:['새 작업 폴더용 브랜치를 함께 생성합니다.','Create a new branch for the worktree.','作業ツリー用の新規ブランチを作成します。','为新工作区创建分支。']},
 '-f':{branch:['기존 참조를 강제로 이동시킬 수 있습니다. 주의가 필요합니다.','Force updating a branch reference; caution.','ブランチ参照を強制更新するため注意します。','强制更新分支引用，需谨慎。'],risk:true},
 '--oneline':['커밋을 짧은 해시와 한 줄 제목으로 표시합니다.','Display one compact line per commit.','各コミットを短い1行で表示します。','每次提交显示为简短一行。'],
 '--graph':['커밋의 분기·병합 관계를 선으로 보여줍니다.','Draw branch and merge relationships.','分岐とマージを線で表示します。','以图形显示分支与合并关系。'],
 '--all':['현재 브랜치만이 아니라 모든 참조의 커밋을 포함합니다.','Include commits reachable from all refs.','すべての参照から到達できるコミットを含めます。','包括所有引用可达的提交。'],
 '--staged':['작업 파일이 아니라 스테이징된 변경을 비교합니다.','Compare staged changes against HEAD.','ステージ済みの変更を HEAD と比較します。','比较暂存区与 HEAD 的差异。'],
 '--cached':['스테이징된 변경을 비교합니다. --staged와 같은 뜻입니다.','Alias for --staged; show staged changes.','--staged と同じでステージ済みの変更を比較します。','与 --staged 相同，查看已暂存更改。'],
 '--soft':{reset:['HEAD만 이동하고 스테이징 및 작업 파일은 유지합니다. 공유 이력에 주의합니다.','Move HEAD but keep index and worktree. Use cautiously.','HEAD だけを移動し、ステージ・作業ファイルを維持します。','仅移动 HEAD，保留暂存区与工作目录。'],risk:true},
 '--hard':{reset:['HEAD와 스테이징·작업 파일을 기준 상태로 맞춥니다. 변경이 사라질 수 있습니다.','Reset HEAD, index, and worktree. Local edits may be lost.','HEAD・ステージ・作業ファイルをリセットします。変更消失に注意。','重置 HEAD、暂存区及工作区，可能丢失修改。'],risk:true},
 '--force':{push:['원격 등 기존 기록을 덮어쓸 수 있습니다. 협업 시 특히 위험합니다.','Force the action; can overwrite shared history.','共有履歴を上書きする危険があります。','强制执行，可能覆盖共享历史。'],risk:true},
 '--set-upstream':['원격 추적 브랜치를 지정합니다.','Set upstream tracking branch.','上流ブランチを設定します。','设置上游跟踪分支。'],
 '--create':['새 브랜치를 생성한 뒤 전환합니다.','Create and switch to a new branch.','新規ブランチを作成して切り替えます。','创建并切换到新分支。'],
 '--message':['뒤에 오는 텍스트를 커밋 메시지로 사용합니다.','Use the following commit message.','次の文字列をコミットメッセージとして使います。','使用后面的提交说明。']
};
const idx={ko:0,en:1,ja:2,zh:3};
function escape(x){return String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function lex(cmd){return (String(cmd||'').match(/"[^"]*"|'[^']*'|[^\s"']+/g)||[]);}
function detail(cmd,lang){const l=labels[lang]||labels.ko,n=idx[lang]??0;const parts=lex(cmd);if(parts[0]!=='git'||parts.length<2)return null;const verb=parts[1],summary=verbs[verb]?.[n]||l.command;let previousOption='';let flagDetails=[];const items=parts.map((token,i)=>{
  if(i===0)return {token,kind:'program',meaning:l.git};
  if(i===1)return {token,kind:'command',meaning:summary};
  if(token.startsWith('-')&&token!=='-'){
   const spec=flags[token];const val=spec?.[verb]|| (Array.isArray(spec)?spec:null)||[l.option,l.option,l.option,l.option];
   const meaning=val[n]||val[0];let alias=spec?.alias||'';
   const info={token,kind:'option',meaning,alias,risk:!!spec?.risk};
   flagDetails.push(info);previousOption=token;return info;
  }
  let meaning=l.other,kind='argument';
  if(token.startsWith('"')||token.startsWith("'"))meaning=l.commitMessage;
  else if(token==='HEAD'||token.startsWith('HEAD~'))meaning=token==='HEAD'?l.commitRef:({ko:'HEAD에서 첫 번째 부모 방향으로 지정한 개수만큼 이전 커밋입니다.',en:'Move that many first-parent steps backward from HEAD.',ja:'HEAD から指定数だけ親コミットに戻ります。',zh:'从 HEAD 沿第一父提交回退指定次数。'}[lang]);
  else if(token==='origin')meaning=l.remote;
  else if(token==='main'||token==='master'||token.startsWith('feature/')||token.startsWith('fix/')||((verb==='switch'||verb==='merge'||verb==='rebase'||verb==='branch')&&!token.startsWith('.')&&!(previousOption==='-m')) )meaning=l.branchName;
  else if(/^https?:\/\//.test(token))meaning=({ko:'원격 저장소 주소 예시입니다. example.invalid는 실제 연결 주소가 아닙니다.',en:'Sample remote URL; example.invalid is not a live repository.',ja:'リモートの URL 例で、example.invalid は実在しません。',zh:'远程仓库 URL 示例，example.invalid 并非真实地址。'}[lang]);
  else if(token.startsWith('v')&&/^v\d/.test(token))meaning=l.tag;
  else if(/[/\\]|\.(md|js|txt|json|html|env)$/.test(token)||token==='file')meaning=l.file;
  else if(previousOption==='-m'||previousOption==='--message')meaning=l.commitMessage;
  return {token,kind,meaning};
 });
 return {items,flags:flagDetails,summary,lang,l};
}
function render(cmd,lang,opts={}){const data=detail(cmd,lang);if(!data)return '';const {items,flags:options,l}=data;
 const allow=opts.allowPlain!==false;if(!options.length&&!allow)return '';
 const compact=opts.compact!==false;
 const badges=options.map(v=>`<span class="syntax-flag${v.risk?' syntax-risk':''}" title="${escape(v.meaning)}">${escape(v.token)} = ${escape(v.meaning)}${v.risk?' ⚠':''}</span>`).join('');
 return `<div class="syntax-guide" data-syntax-guide="1">${badges?`<div class="syntax-flag-list">${badges}</div>`:''}<details class="syntax-details"><summary>🔎 ${escape(l.title)} <span aria-hidden="true">▸</span></summary><div class="syntax-detail-body"><p class="syntax-note">${escape(l.optionHelp)}</p><div class="syntax-tokens">${items.map(v=>`<div class="syntax-token"><code class="syntax-type-${v.kind}">${escape(v.token)}</code><span>${escape(v.meaning)}${v.alias?` <small>(${escape(l.same)}: <code>${escape(v.alias)}</code>)</small>`:''}${v.risk?` <b class="syntax-risk-text">⚠ ${escape(l.warn)}</b>`:''}</span></div>`).join('')}</div><button type="button" class="btn subtle sm" data-book-topic="options">▧ PDF · ${escape(l.title)} ↗</button></div></details></div>`;
}
window.GitCommandGuide={detail,render,lex};
})();
