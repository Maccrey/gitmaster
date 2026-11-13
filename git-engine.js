/* GitMaster Academy — educational Git subset simulator (no shell or network access).
 * All state lives in the current browser; real repositories are never touched.
 */
(function(){
'use strict';
const cp=x=>JSON.parse(JSON.stringify(x));
const filesEq=(a,b)=>JSON.stringify(Object.keys(a||{}).sort().map(k=>[k,a[k]]))===JSON.stringify(Object.keys(b||{}).sort().map(k=>[k,b[k]]));
const has=(obj,k)=>Object.prototype.hasOwnProperty.call(obj,k);
// Unified diff: unchanged context gets a blank prefix, removed lines '-', added '+'.
// This is deliberately faithful for text files with normal line endings (no binary support).
function textLines(text){if(!text)return [];const lines=text.split('\n');if(lines[lines.length-1]==='')lines.pop();return lines;}
function unifiedDiff(file,oldText,newText,oldExists=true,newExists=true){
 const a=textLines(oldText||''),b=textLines(newText||'');
 const max=400;
 if(a.length>max||b.length>max)return `diff --git a/${file} b/${file}\n(educational simulator: file over ${max} lines; use smaller text for diff practice)`;
 const dp=Array.from({length:a.length+1},()=>new Uint16Array(b.length+1));
 for(let i=a.length-1;i>=0;i--)for(let j=b.length-1;j>=0;j--)dp[i][j]=a[i]===b[j]?dp[i+1][j+1]+1:Math.max(dp[i+1][j],dp[i][j+1]);
 const body=[];let i=0,j=0;
 while(i<a.length||j<b.length){
  if(i<a.length&&j<b.length&&a[i]===b[j]){body.push(' '+a[i]);i++;j++;}
  else if(i<a.length&&(j===b.length||dp[i+1][j]>=dp[i][j+1])){body.push('-'+a[i++]);}
  else{body.push('+'+b[j++]);}
 }
 const coord=(n)=>n===0?'0,0':`1,${n}`;
 return `diff --git a/${file} b/${file}\n--- ${oldExists?'a/'+file:'/dev/null'}\n+++ ${newExists?'b/'+file:'/dev/null'}\n@@ -${coord(a.length)} +${coord(b.length)} @@\n`+body.join('\n');
}

function tokens(s){const out=[];const re=/"((?:\\.|[^"\\])*)"|'((?:\\.|[^'\\])*)'|([^\s]+)/g;let m;while((m=re.exec(s)))out.push((m[1]??m[2]??m[3]).replace(/\\(["'\\])/g,'$1'));return out;}
class GitLabEngine{
 constructor(scenario='fresh',saved=null){if(saved){this.s=cp(saved);return;}this.s={commits:{},seq:0,branches:{},branch:'main',working:{},index:{},remote:{},remoteRefs:{},tracking:{},stash:[],tags:{},history:[],terminal:[],reflog:[],pendingMerge:null,conflicts:[],initialHead:null,meta:{},milestones:[],archivedRefs:{}};this.seed(scenario);this.s.history=[];this.s.terminal=[{type:'info',text:'GitMaster educational sandbox — type git help to see supported commands.'}];this.s.initialHead=this.head();}
 // Preserve the entire commit DAG between consecutive lessons. Git history stays real:
 // new fixture commits explicitly descend from the prior main tip, not a fake UI-only graph.
 static continueFrom(scenario,previousState,previousLab,nextLab){
  const old=cp(previousState),e=new GitLabEngine(scenario);
  const milestone={lab:previousLab,head:old.branches[old.branch],branch:old.branch};
  const milestones=[...(old.milestones||[]),milestone];
  const archives={...(old.archivedRefs||{})};
  for(const [name,id] of Object.entries(old.branches))archives[`${previousLab}/${name}`]=id;
  const seamless=new Set(['L01>L02','L02>L03','L05>L06','L07>L08','L08>L09','L15>L16','L19>L20','L22>L23','L24>L25','L32>L33']);
  if(seamless.has(`${previousLab}>${nextLab}`)){
   e.s=old;
   if(nextLab==='L09'){e.s.branch='main';e.s.working=e.snap(e.s.branches.main);e.s.index={};}
   if(nextLab==='L02'){e.s.meta={...(e.s.meta||{}),editRequired:true};}e.s.history=[];e.s.terminal=[{type:'info',text:`Continued from ${previousLab}: previous Git commits and working state preserved.`}];
   e.s.initialHead=e.head();e.s.milestones=milestones;e.s.archivedRefs=archives;
   e.s.meta={...(old.meta||{}),preparedFrom:previousLab,preparedFor:nextLab};
   return e;
  }
  const fixture=e.s;
  const offset=Number(old.seq)||0;
  const idMap=Object.fromEntries(Object.keys(fixture.commits).map(id=>[id,'a'+String(Number(id.slice(1))+offset).padStart(6,'0')]));
  const fixtureRoot=Object.values(fixture.commits).find(c=>!c.parents.length)?.id;
  const anchor=old.branches.main||old.branches[old.branch];
  const fresh={};
  for(const [id,c] of Object.entries(fixture.commits)){
   const newId=idMap[id];fresh[newId]={...cp(c),id:newId,parents:c.parents.map(p=>idMap[p])};
   if(id===fixtureRoot){fresh[newId].message=`lab: prepare ${nextLab} exercise`;if(anchor)fresh[newId].parents=[anchor];}
  }
  fixture.commits={...old.commits,...fresh};fixture.seq=offset+fixture.seq;
  fixture.branches=Object.fromEntries(Object.entries(fixture.branches).map(([n,id])=>[n,idMap[id]]));
  fixture.remoteRefs=Object.fromEntries(Object.entries(fixture.remoteRefs).map(([n,id])=>[n,idMap[id]||id]));
  fixture.tracking=Object.fromEntries(Object.entries(fixture.tracking).map(([n,id])=>[n,idMap[id]||id]));
  fixture.tags=Object.fromEntries(Object.entries(fixture.tags).map(([n,id])=>[n,idMap[id]||id]));
  fixture.pendingMerge=idMap[fixture.pendingMerge]||fixture.pendingMerge;
  fixture.initialHead=e.head();fixture.milestones=milestones;fixture.archivedRefs=archives;
  fixture.reflog=[`prepared ${nextLab} after ${previousLab}`,...old.reflog];
  fixture.meta={...fixture.meta,preparedFrom:previousLab,preparedFor:nextLab};
  return e;
 }
 head(){return this.s.branches[this.s.branch]}
 c(id){return this.s.commits[id]||null}
 snap(id=this.head()){return cp(this.c(id)?.files||{})}
 snapshotIndex(){const out=this.snap();Object.keys(this.s.index).forEach(k=>{if(this.s.index[k]===null)delete out[k];else out[k]=this.s.index[k]});return out;}
 makeCommit(message,files,parents){const id='a'+String(++this.s.seq).padStart(6,'0');this.s.commits[id]={id,message,files:cp(files),parents:parents||[]};return id;}
 move(id,action){const old=this.head();this.s.branches[this.s.branch]=id;this.s.reflog.unshift(`${old||'0000000'} → ${id}: ${action}`)}
 seed(scenario){const s=this.s;baseInit(this);
  function basicCommit(branch='main',file='README.md',content='Updated guide\n',message='docs: improve guide'){
   const orig=s.branch;s.branch=branch;s.working[file]=content;s.index[file]=content;const id=this.makeCommit(message,this.snapshotIndex(),[this.head()]);this.move(id,message);s.index={};s.branch=orig;if(branch===orig)s.working=this.snap();return id;
  }
  const changeReadme=()=>{s.working['README.md']='# GitMaster demo\nLearn Git by doing.\n'};
  const changeApp=()=>{s.working['app.js']='export function greet(name) { return `Hello, ${name}!`; }\n'};
  if(['dirtyReadme','dirtyBoth','stagedReadme'].includes(scenario))changeReadme();
  if(['dirtyApp','dirtyBoth'].includes(scenario))changeApp();
  if(scenario==='stagedReadme')s.index['README.md']=s.working['README.md'];
  if(scenario==='twoCommits'){basicCommit.call(this,'main','app.js','export const version = 2;\n','feat: update application');}
  if(scenario==='mergeReady'){s.branches['feature/login']=s.branches.main;basicCommit.call(this,'feature/login','login.js','export const login = () => true;\n','feat: implement login');s.branch='main';s.working=this.snap();}
  if(scenario==='branchDiverged'||scenario==='conflict'){
    const base=this.head();s.branches['feature/login']=base;
    basicCommit.call(this,'main','app.js','export const theme = "light";\n','style: update theme');
    basicCommit.call(this,'feature/login','app.js','export const theme = "dark";\n','feat: dark theme');
    s.branch='main';s.working=this.snap();
    if(scenario==='conflict')this._merge('feature/login');
  }
  if(scenario==='aheadRemote'){s.remote.origin='https://example.invalid/team/demo.git';s.remoteRefs.main=this.head();basicCommit.call(this,'main','README.md','# Demo v2\n','docs: improve readme');}
  if(scenario==='remoteAhead'){s.remote.origin='https://example.invalid/team/demo.git';const old=this.head();const remote=this.makeCommit('feat: remote update',{...this.snap(),remote:'fetched code\n'},[old]);s.remoteRefs.main=remote;}
  if(scenario==='withStash'){changeApp();this._stash();}
  if(scenario==='cherryReady'){s.branches.fix=this.head();basicCommit.call(this,'fix','fix.js','export const fixed = true;\n','fix: prevent regression');s.branch='main';s.working=this.snap();}
  if(scenario==='rebaseReady'){s.branches['feature/docs']=this.head();basicCommit.call(this,'main','app.js','export const version = 2;\n','feat: v2');basicCommit.call(this,'feature/docs','README.md','# Documentation improved\n','docs: clarify installation');s.branch='feature/docs';s.working=this.snap();}
  if(scenario==='focusBoard'){
   const base=this.head();
   const files={
    'README.md':'# FocusBoard\nA small team task board.\n',
    'src/tasks.js':'export const tasks = [];\n',
    'src/ui.js':'export function renderTasks(tasks) {\n  return "<ul></ul>";\n}\n',
    '.gitignore':'node_modules/\n',
    'package.json':'{"name":"focusboard","version":"0.1.0","private":true}\n'
   };
   const id=this.makeCommit('chore: scaffold FocusBoard',files,[base]);
   this.move(id,'focusboard scaffold');s.working=this.snap();
   s.meta={...s.meta,project:'FocusBoard'};
  }
  if(scenario==='secrets'){s.working['.env']='API_KEY=DEMO_NOT_REAL\n';s.working['.gitignore']='node_modules/\n';}
  if(scenario==='dirtyApp' || scenario==='dirtyBoth'){s.meta.aiEdit=true;}
 }
 ignored(name){const lines=(this.s.working['.gitignore']||this.snap()['.gitignore']||'').split(/\r?\n/).map(x=>x.trim()).filter(x=>x&&!x.startsWith('#'));return lines.some(x=>x===name||x.endsWith('/')&&name.startsWith(x)||x.startsWith('*.')&&name.endsWith(x.slice(1)));}
 status(){const head=this.snap(),idx=this.snapshotIndex(),work=this.s.working,staged=[],modified=[],untracked=[];const names=new Set([...Object.keys(head),...Object.keys(idx),...Object.keys(work)]);for(const k of [...names].sort()){
   if(idx[k]!==head[k])staged.push(k);
   if(has(idx,k)){if(work[k]!==idx[k])modified.push(k)}else if(has(work,k)&&!this.ignored(k))untracked.push(k);
 }
 return {staged,modified,untracked,clean:staged.length+modified.length+untracked.length===0&&!this.s.conflicts.length};}
 edit(file,text){if(!/^[\w.\-/]+$/.test(file)||file.includes('..')||file.startsWith('/')||file.includes('//'))throw Error('Invalid educational file path.');this.s.working[file]=text;if(file==='app.js')this.s.meta.userEditedApp=true;}
 deleteFile(file){if(has(this.s.working,file))delete this.s.working[file];}
 preview(file,text){const baseline=this.snapshotIndex();return baseline[file]===text?'(no diff)':unifiedDiff(file,baseline[file],text,has(baseline,file),true);}
 ancestors(id){const seen=new Set();const go=x=>{if(!x||seen.has(x))return;seen.add(x);(this.c(x)?.parents||[]).forEach(go)};go(id);return seen;}
 ancestor(a,b){const as=this.ancestors(a);let current=b;const q=[b],seen=new Set();while(q.length){current=q.shift();if(!current||seen.has(current))continue;if(as.has(current))return current;seen.add(current);q.push(...this.c(current).parents)}return null;}
 hasDirty(){const q=this.status();return !q.clean;}
 _status(){const q=this.status();const list=[];list.push('On branch '+this.s.branch);if(this.s.conflicts.length)list.push('Unmerged paths:\n  '+this.s.conflicts.join('\n  '));if(q.staged.length)list.push('Changes to be committed:\n  '+q.staged.map(x=>(!has(this.snap(),x)?'new file: ':!has(this.snapshotIndex(),x)?'deleted: ':'modified: ')+x).join('\n  '));if(q.modified.length)list.push('Changes not staged for commit:\n  '+q.modified.map(x=>(!has(this.s.working,x)?'deleted: ':'modified: ')+x).join('\n  '));if(q.untracked.length)list.push('Untracked files:\n  '+q.untracked.join('\n  '));if(q.clean)list.push('nothing to commit, working tree clean');return list.join('\n\n')}
 _diff(staged=false,file=null){const a=staged?this.snap():this.snapshotIndex(),b=staged?this.snapshotIndex():this.s.working;
  const names=[...new Set([...Object.keys(a),...Object.keys(b)])].sort().filter(k=>(!file||k===file)&&a[k]!==b[k]&&(staged||has(a,k)));
  if(!names.length)return '(no diff)';return names.map(k=>unifiedDiff(k,a[k],b[k],has(a,k),has(b,k))).join('\n\n');}

 _add(args){
  const paths=args.includes('.')?[...new Set([...Object.keys(this.snap()),...Object.keys(this.s.working)])]:args;
  if(!paths.length)throw Error('Usage: git add <file|.>');
  const base=this.snap();const staged=[];
  for(const path of paths){
   if(this.ignored(path)&&!has(base,path))continue;
   if(!has(this.s.working,path)&&!has(base,path))throw Error('pathspec did not match: '+path);
   if(this.s.conflicts.includes(path)){
    const content=this.s.working[path]||'';
    if(content.includes('<<<<<<<')||content.includes('>>>>>>>'))throw Error('Resolve conflict markers in '+path+' before staging.');
    this.s.conflicts=this.s.conflicts.filter(x=>x!==path);
   }
   const next=has(this.s.working,path)?this.s.working[path]:null;
   if(next===base[path]||(next===null&&!has(base,path)))delete this.s.index[path];
   else this.s.index[path]=next;
   staged.push(path);
  }
  return staged.length?'Staged: '+staged.join(', '):'Nothing to stage';
 }
 _commit(message){if(!message)throw Error('Commit message required: git commit -m "message"');if(this.s.conflicts.length)throw Error('Resolve all merge conflicts before committing.');const changes=Object.keys(this.s.index);if(!changes.length||filesEq(this.snapshotIndex(),this.snap()))throw Error('nothing to commit');const parents=this.s.pendingMerge?[this.head(),this.s.pendingMerge]:[this.head()];const id=this.makeCommit(message,this.snapshotIndex(),parents);this.move(id,'commit: '+message);this.s.index={};this.s.pendingMerge=null;return `[${this.s.branch} ${id}] ${message}\n ${changes.length} file(s) changed`}
 _merge(name){const other=this.s.branches[name];if(!other)throw Error('Unknown branch: '+name);if(this.hasDirty())throw Error('Commit or stash local edits before merging.');const current=this.head();if(this.ancestors(current).has(other))return 'Already up to date.';if(this.ancestors(other).has(current)){this.move(other,'merge: '+name);this.s.working=this.snap();return `Fast-forward to ${other}`;}
  const base=this.snap(this.ancestor(current,other)),ours=this.snap(current),theirs=this.snap(other);const out=cp(ours),conflict=[];
  for(const k of new Set([...Object.keys(base),...Object.keys(ours),...Object.keys(theirs)])){
   if(ours[k]===theirs[k])continue;
   if(ours[k]===base[k]){if(theirs[k]===undefined)delete out[k];else out[k]=theirs[k];}
   else if(theirs[k]!==base[k]){conflict.push(k);out[k]=`<<<<<<< HEAD\n${ours[k]||''}=======\n${theirs[k]||''}>>>>>>> ${name}\n`;}
  }
  this.s.working=out;this.s.pendingMerge=other;this.s.conflicts=conflict;
  // Git stages cleanly merged paths even when another path has conflicts.
  for(const k of new Set([...Object.keys(ours),...Object.keys(out)])){
   if(ours[k]!==out[k]&&!conflict.includes(k))this.s.index[k]=has(out,k)?out[k]:null;
  }
  if(conflict.length)return 'CONFLICT (content): '+conflict.join(', ')+'\nEdit conflict markers, git add files, then git commit.';
  return this._commit('Merge branch '+name);
 }
 _stash(){const staged=this.snapshotIndex(),head=this.snap();if(filesEq(head,this.s.working)&&!Object.keys(this.s.index).length)throw Error('No local changes to save');const tracked={};for(const k of new Set([...Object.keys(head),...Object.keys(staged)]))if(this.s.working[k]!==head[k]||staged[k]!==head[k])tracked[k]=this.s.working[k];this.s.stash.unshift({tracked,index:cp(this.s.index)});this.s.index={};for(const k of Object.keys(head))this.s.working[k]=head[k];return 'Saved working directory and index state WIP on '+this.s.branch;}
 _revert(){if(this.hasDirty())throw Error('Commit or stash changes before reverting.');const latest=this.c(this.head());if(!latest||!latest.parents.length)throw Error('No parent commit to revert.');if(latest.parents.length>1)throw Error('Merge revert requires -m; not part of this simulator.');const parent=this.snap(latest.parents[0]);const id=this.makeCommit('Revert "'+latest.message+'"',parent,[this.head()]);this.move(id,'revert');this.s.working=cp(parent);return `[${this.s.branch} ${id}] Revert "${latest.message}"`}
 _rebase(name){if(this.hasDirty())throw Error('Commit or stash before rebase.');const target=this.s.branches[name];if(!target)throw Error('Unknown branch');const current=this.head(),common=this.ancestor(current,target);if(!common)throw Error('No common base');if(common===target)return 'Current branch already based on '+name;const chain=[];let p=current;while(p&&p!==common){chain.unshift(this.c(p));p=this.c(p)?.parents[0]};let onto=target,files=this.snap(onto);
  for(const old of chain){const base=this.snap(old.parents[0]);for(const k of new Set([...Object.keys(base),...Object.keys(old.files)]))if(base[k]!==old.files[k]){if(old.files[k]===undefined)delete files[k];else files[k]=old.files[k];}onto=this.makeCommit(old.message,files,[onto]);}
  this.move(onto,'rebase onto '+name);this.s.working=this.snap();return `Successfully rebased ${chain.length} commit(s) onto ${name}.\n(Teaching subset: advanced conflict handling not simulated.)`}
 _cherry(ref){if(this.hasDirty())throw Error('Commit or stash first');const id=this.s.branches[ref]||ref,from=this.c(id);if(!from||!from.parents[0])throw Error('Commit not found');const parent=this.snap(from.parents[0]),files=this.snap();for(const k of new Set([...Object.keys(parent),...Object.keys(from.files)]))if(parent[k]!==from.files[k]){if(from.files[k]===undefined)delete files[k];else files[k]=from.files[k];}const newid=this.makeCommit(from.message,files,[this.head()]);this.move(newid,'cherry-pick '+ref);this.s.working=this.snap();return `[${this.s.branch} ${newid}] ${from.message}\n(Teaching subset: advanced conflict handling not simulated.)`}
 run(raw){const input=raw.trim();if(!input)return '';let output='';try{const v=tokens(input);const [cmd,sub,...a]=v;if(cmd==='help'||cmd==='git'&&sub==='help')output='Supported: git status, add, commit, diff, log, show, branch, switch, merge, remote, push, fetch, pull, restore, revert, reset --soft, reflog, stash, tag, cherry-pick, rebase\nEditor: modify files in the Files panel.  Shell commands do not run.';
 else if(cmd==='clear'){this.s.terminal=[];output='';}
 else if(cmd!=='git')throw Error('Git command required. Type git help. No shell execution is available.');
 else if(sub==='status')output=this._status();
 else if(sub==='add')output=this._add(a);
 else if(sub==='commit'){const i=a.indexOf('-m');if(i<0)throw Error('Use git commit -m "message"');output=this._commit(a.slice(i+1).join(' '));}
 else if(sub==='diff')output=this._diff(a.includes('--staged')||a.includes('--cached'),a.find(x=>!x.startsWith('-')&&x!=='--')||null);
 else if(sub==='log'){const all=a.includes('--all');let ids=all?[...Object.values(this.s.branches),...Object.values(this.s.archivedRefs||{})]:[this.head()];const seen=new Set(),logs=[];while(ids.length){const id=ids.shift();if(!id||seen.has(id))continue;seen.add(id);const c=this.c(id);logs.push((a.includes('--graph')?'* ':'')+id+' '+c.message);ids.push(...c.parents);}output=logs.join('\n');}
 else if(sub==='show'){const id=a[0]&&!['HEAD'].includes(a[0])?(this.s.branches[a[0]]||a[0]):this.head(),c=this.c(id);if(!c)throw Error('Unknown commit');output=`commit ${id}\n${c.message}\n`+(c.parents[0]?this._summaryDiff(this.snap(c.parents[0]),c.files):'initial commit');}
 else if(sub==='branch'){if(!a.length)output=Object.keys(this.s.branches).map(x=>(x===this.s.branch?'* ':'  ')+x).join('\n');else if(a[0]==='-d') {const name=a[1];if(!name||name===this.s.branch||!this.s.branches[name])throw Error('Cannot delete this branch');if(!this.ancestors(this.head()).has(this.s.branches[name]))throw Error('Branch not fully merged');delete this.s.branches[name];output='Deleted branch '+name;}else{if(this.s.branches[a[0]])throw Error('Branch already exists');this.s.branches[a[0]]=this.head();output='Created branch '+a[0];}}
 else if(sub==='switch'||sub==='checkout'){if(this.hasDirty())throw Error('Please commit or stash your changes first.');let name=a[0];if(name==='-c'||name==='-b'){name=a[1];if(!name)throw Error('Branch name required');if(this.s.branches[name])throw Error('Branch already exists');this.s.branches[name]=this.head();}if(!this.s.branches[name])throw Error('Unknown branch '+name);this.s.branch=name;this.s.working=this.snap();this.s.reflog.unshift('checkout: '+name);output='Switched to branch '+name;}
 else if(sub==='merge'){if(!a[0])throw Error('Specify branch to merge');output=this._merge(a[0]);}
 else if(sub==='restore'){if(a[0]==='--staged'){const file=a[1];if(!file)throw Error('Specify file');if(!has(this.s.index,file))throw Error('File is not staged');delete this.s.index[file];output='Unstaged '+file;}else{const file=a[0];if(!file)throw Error('Specify file');const idx=this.snapshotIndex();if(!has(idx,file))throw Error('File is untracked or unknown');this.s.working[file]=idx[file];output='Restored working file '+file;}}
 else if(sub==='reset'){if(a[0]!=='--soft'||a[1]!=='HEAD~1')throw Error('This lab supports only: git reset --soft HEAD~1');const old=this.c(this.head());if(!old?.parents.length)throw Error('No parent commit');const prior=this.snap(old.parents[0]),current=this.snap();this.move(old.parents[0],'reset --soft');for(const k of new Set([...Object.keys(current),...Object.keys(prior)]))if(current[k]!==prior[k])this.s.index[k]=has(current,k)?current[k]:null;output='HEAD is now at '+this.head()+' (staged content preserved)';}
 else if(sub==='revert'){if(a[0]!=='HEAD')throw Error('Use git revert HEAD in this lab');output=this._revert();}
 else if(sub==='reflog')output=this.s.reflog.map((x,i)=>`HEAD@{${i}} ${x}`).join('\n')||'HEAD@{0} initial checkout';
 else if(sub==='stash'){if(a[0]==='pop'){const entry=this.s.stash[0];if(!entry)throw Error('No stash entries found');if(this.hasDirty())throw Error('Working tree not clean; resolve before stash pop');this.s.stash.shift();Object.keys(entry.tracked).forEach(k=>this.s.working[k]=entry.tracked[k]);this.s.index=cp(entry.index);output='Applied and dropped stash@{0}';}else if(a[0]==='list')output=this.s.stash.map((x,i)=>`stash@{${i}}: WIP`).join('\n')||'(empty stash)';else output=this._stash();}
 else if(sub==='tag'){if(!a.length)output=Object.keys(this.s.tags).join('\n');else{if(this.s.tags[a[0]])throw Error('Tag already exists');this.s.tags[a[0]]=this.head();output='Tag created: '+a[0];}}
 else if(sub==='cherry-pick')output=this._cherry(a[0]);
 else if(sub==='rebase')output=this._rebase(a[0]);
 else if(sub==='remote'){if(a[0]==='add'&&a[1]&&a[2]){if(this.s.remote[a[1]])throw Error('Remote already exists');this.s.remote[a[1]]=a[2];output='Added simulated remote '+a[1];}else if(a[0]==='-v')output=Object.entries(this.s.remote).map(([k,v])=>`${k}\t${v} (fetch)\n${k}\t${v} (push)`).join('\n');else throw Error('Use git remote add origin <url> or git remote -v');}
 else if(sub==='push'){const rem=a.includes('-u')?a[a.indexOf('-u')+1]:a[0],br=a.includes('-u')?a[a.indexOf('-u')+2]:a[1];if(!this.s.remote[rem])throw Error('Remote not found');if(!this.s.branches[br])throw Error('Branch not found');const prev=this.s.remoteRefs[br];if(prev&&!this.ancestors(this.s.branches[br]).has(prev))throw Error('non-fast-forward: fetch remote changes first');this.s.remoteRefs[br]=this.s.branches[br];this.s.tracking[br]=this.s.branches[br];output='To '+this.s.remote[rem]+'\n '+br+' -> '+br+' (simulated push)';}
 else if(sub==='fetch'){if(!this.s.remote[a[0]||'origin'])throw Error('Remote not found');this.s.tracking=cp(this.s.remoteRefs);output='Fetched remote references (simulation; no network)';}
 else if(sub==='pull'){const remote=a[0]||'origin',br=a[1]||this.s.branch;if(!this.s.remote[remote])throw Error('Remote not found');if(this.hasDirty())throw Error('Commit or stash before pull');const rid=this.s.remoteRefs[br];if(!rid)throw Error('Remote branch not found');this.s.tracking[br]=rid;if(this.ancestors(rid).has(this.head())){this.move(rid,'pull: '+br);this.s.working=this.snap();output='Fast-forwarded from '+remote+'/'+br;}else if(this.ancestors(this.head()).has(rid))output='Already up to date.';else throw Error('Divergent histories; explicit strategy required.');}
 else throw Error('Unsupported in this educational simulator: '+sub+'\nSee PDF for actual Git commands.');
 this.s.history.push(input);this.s.terminal.push({type:'command',text:'$ '+input});if(output)this.s.terminal.push({type:'output',text:output});return output;
 }catch(err){const out='error: '+err.message;this.s.history.push(input);this.s.terminal.push({type:'command',text:'$ '+input},{type:'error',text:out});return out;}}
 _summaryDiff(a,b){return [...new Set([...Object.keys(a),...Object.keys(b)])].filter(k=>a[k]!==b[k]).map(k=>` ${a[k]===undefined?'A':b[k]===undefined?'D':'M'}  ${k}`).join('\n')||'(no changes)';}
 check(goal){const s=this.s,h=s.history,st=this.status(),last=this.c(this.head()),hasCmd=(prefix)=>h.some(x=>x.startsWith(prefix));switch(goal){
 case 'status':return hasCmd('git status');case 'stage':return has(s.index,'README.md')&&Object.keys(s.index).length===1&&typeof s.index['README.md']==='string'&&s.index['README.md'].trim().length>0&&s.index['README.md']!==this.snap()['README.md'];
 case 'commit':return last?.message==='docs: update guide'&&this.head()!==s.initialHead;
 case 'diff':return hasCmd('git diff')&&(!s.meta.requiresEdit||(s.meta.userEditedApp&&s.working['app.js']!==this.snapshotIndex()['app.js']&&s.working['app.js']?.includes('function greet(')));case 'log':return hasCmd('git log --oneline');case 'show':return hasCmd('git show');
 case 'unstage':return !has(s.index,'README.md')&&s.working['README.md']!==this.snap()['README.md']&&hasCmd('git restore --staged');
 case 'newbranch':return s.branch==='feature/login';case 'featurecommit':return s.branch==='feature/login'&&last?.message==='feat: login'&&has(last.files,'app.js');
 case 'merge':return s.branch==='main'&&this.ancestors(this.head()).has(s.branches['feature/login']);
 case 'resolve':return !s.pendingMerge&&!s.conflicts.length&&hasCmd('git commit')&&this.c(this.head()).parents.length===2;
 case 'graph':return hasCmd('git log --graph --oneline --all');case 'branchlist':return hasCmd('git branch');
 case 'remote':return !!s.remote.origin;case 'push':return !!s.remoteRefs.main&&s.remoteRefs.main===s.branches.main;case 'fetch':return !!s.tracking.main&&s.branches.main!==s.tracking.main;
 case 'pull':return !!s.tracking.main&&s.branches.main===s.tracking.main;
 case 'audit':return hasCmd('git status')&&hasCmd('git log');case 'selective':return has(s.index,'app.js')&&!has(s.index,'README.md');
 case 'restore':return s.working['README.md']===this.snap()['README.md'];case 'revert':return last?.message.startsWith('Revert "');
 case 'reflog':return hasCmd('git reflog');case 'softreset':return this.head()!==s.initialHead && false || hasCmd('git reset --soft')&&Object.keys(s.index).length>0;
 case 'stash':return s.stash.length>0&&st.clean;case 'stashpop':return s.stash.length===0&&s.working['app.js']!==this.snap()['app.js'];
 case 'tag':return s.tags['v1.0.0']===this.head();case 'cherry':return hasCmd('git cherry-pick')&&has(this.snap(),'fix.js');
 case 'rebase':return hasCmd('git rebase main')&&this.ancestors(this.head()).has(s.branches.main);
 case 'ignore':return this.ignored('.env')&&hasCmd('git status');
 case 'capstone':return s.branch==='main'&&has(s.branches,'feature/final')&&has(this.snap(),'app.js')&&this.snap()['app.js']!=='export const version = 1;\n'&&s.tags['v2.0.0']===this.head()&&this.ancestors(this.head()).has(s.branches['feature/final']);
 default:return false;}}
}
function baseInit(e){const s=e.s;const initial={ 'README.md':'# GitMaster demo\nLearn by doing.\n', 'app.js':'export const version = 1;\n', '.gitignore':'node_modules/\n'};const base=e.makeCommit('chore: initial project',initial,[]);s.branches.main=base;s.branch='main';s.working=cp(initial);s.reflog=['initial commit '+base];}
window.GitLabEngine=GitLabEngine;
})();
