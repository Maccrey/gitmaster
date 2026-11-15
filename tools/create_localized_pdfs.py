from pathlib import Path
import json, re, subprocess, fitz

ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/'ebook/GitMaster_Academy_Practical_Git_KO.pdf'
SIZE=(595.276,841.89)

COPY={
'en':dict(name='ENGLISH EDITION',title='Git by Doing',subtitle='A practical field guide from first commit to safe release',intro='This companion workbook follows the GitMaster Academy browser labs. Read the concept, run the command in the matching lab, inspect the result, and explain what changed.',mission="Today's mission",approach='How to approach it',why='Why this matters',check='Checkpoints',note='Learning note',self='Self-check',chapter='CHAPTER',lab='LAB',command='Command practice',answer='Try to answer in your own words before looking at the next page.',team='Team workflow',team_intro='Practice a protected-main workflow with separate branches, pull requests, review, CI, approval, and merge.',orientation='Git practice orientation',options='Command options',toc='Table of contents',appendix='Appendix',safe='Use a practice repository. Review every command before running it on real work.'),
'ja':dict(name='日本語版',title='実践 Git ガイド',subtitle='初めてのコミットから安全なリリースまで',intro='この補助教材は GitMaster Academy のブラウザー演習に対応しています。概念を読み、対応する演習でコマンドを実行し、結果を確認して何が変わったか説明しましょう。',mission='今日のミッション',approach='進め方',why='なぜ重要か',check='確認ポイント',note='学習メモ',self='セルフチェック',chapter='CHAPTER',lab='LAB',command='コマンド演習',answer='次のページを見る前に、自分の言葉で説明してみましょう。',team='チーム開発フロー',team_intro='分離したブランチ、Pull Request、レビュー、CI、承認、マージを保護された main で練習します。',orientation='Git 実践オリエンテーション',options='コマンドオプション',toc='目次',appendix='付録',safe='練習用リポジトリを使い、実際の作業では実行前に必ず確認してください。'),
'zh':dict(name='中文版',title='实战 Git 学习指南',subtitle='从首次提交到安全发布的实践手册',intro='本配套教材对应 GitMaster Academy 浏览器实验。先阅读概念，再在对应实验中运行命令、检查结果，并说明发生了什么变化。',mission='本次任务',approach='操作方法',why='为什么重要',check='检查要点',note='学习笔记',self='自我检查',chapter='CHAPTER',lab='LAB',command='命令练习',answer='在查看下一页前，先用自己的话回答。',team='团队协作流程',team_intro='在受保护的 main 上练习独立分支、Pull Request、审查、CI、批准和合并。',orientation='Git 实践导读',options='命令选项',toc='目录',appendix='附录',safe='请使用练习仓库。对真实项目执行命令前务必先检查。')}

COPY['en'].update(chapter_body='Practice the concepts, commands, and recovery decisions in this chapter.',lab_approach='Run the command shown in the browser lab and inspect the repository state. Try to answer in your own words before looking at the next page.',lab_why='This exercise builds a reliable habit for {goal} operations.',lab_check='Confirm the command output, the repository state, and the matching web lab result.',team_body='Use feature branches and a pull request to keep main reviewable. Separate the code change, review conversation, CI result, approval, and merge.',orientation_body='Git records changes so you can inspect, review, recover, and release with confidence. GitHub adds remote sharing, pull requests, and code review.')
COPY['ja'].update(chapter_body='この章では概念、コマンド、復旧の判断を実践します。',lab_approach='ブラウザー演習に表示されたコマンドを実行し、リポジトリの状態を確認します。次のページを見る前に自分の言葉で説明してみましょう。',lab_why='この演習で {goal} 操作の安全な習慣を身につけます。',lab_check='コマンドの出力、リポジトリの状態、対応するWeb演習の結果を確認します。',team_body='機能ブランチとPull Requestを使い、mainをレビュー可能な状態に保ちます。変更、レビューの会話、CI結果、承認、マージを分けて確認します。',orientation_body='Gitは変更を記録し、確認・レビュー・復旧・リリースを安全に行えるようにします。GitHubは共有、Pull Request、コードレビューを提供します。')
COPY['zh'].update(chapter_body='本章练习核心概念、命令以及恢复决策。',lab_approach='运行浏览器实验中显示的命令，并检查仓库状态。在查看下一页前先用自己的话说明。',lab_why='本实验帮助你建立安全执行 {goal} 操作的习惯。',lab_check='确认命令输出、仓库状态以及对应网页实验的结果。',team_body='使用功能分支和 Pull Request，让 main 始终保持可审查。分别检查代码变更、审查对话、CI 结果、批准和合并。',orientation_body='Git记录变更，让你能够检查、审查、恢复并安全发布。GitHub提供远程共享、Pull Request和代码审查。')

def data():
    js="const fs=require('fs'),vm=require('vm');const c={window:{}};vm.runInNewContext(fs.readFileSync('content.js','utf8'),c);process.stdout.write(JSON.stringify(c.window.ACADEMY_DATA));"
    return json.loads(subprocess.check_output(['node','-e',js],cwd=ROOT))

def wrap(s,width=82):
    if re.search(r'[\u3040-\u30ff\u3400-\u9fff]', str(s)):
        text=str(s).replace('\n',''); width=43; return [text[i:i+width] for i in range(0,len(text),width)]
    out=[]; line=''
    for w in str(s).split():
        if line and len(line)+len(w)+1>width: out.append(line); line=w
        else: line=w if not line else line+' '+w
    if line: out.append(line)
    return out

def add(doc,heading,kicker,blocks,lang):
    c=COPY[lang]; font={'en':'helv','ja':'japan','zh':'china-s'}[lang]; bold={'en':'hebo','ja':'japan','zh':'china-s'}[lang]
    p=doc.new_page(width=SIZE[0],height=SIZE[1]); p.draw_rect(fitz.Rect(0,0,*SIZE),color=(.035,.075,.15),fill=(.035,.075,.15))
    p.insert_text((58,55),'GITMASTER ACADEMY  /  THE FIELD GUIDE',fontsize=11,color=(.42,.86,.78),fontname=bold)
    p.insert_text((58,82),kicker,fontsize=9,color=(.60,.72,.90),fontname=bold)
    p.insert_textbox(fitz.Rect(58,105,540,170),heading,fontsize=25,lineheight=1.12,color=(.95,.97,1),fontname=bold)
    y=205
    for label,body in blocks:
        p.insert_text((58,y),label.upper(),fontsize=9,color=(.47,.91,.80),fontname=bold); y+=17
        for line in wrap(body):
            p.insert_text((58,y),line,fontsize=10.5,color=(.78,.84,.94),fontname=font); y+=15
        y+=13
        if y>780: break
    p.draw_line((58,790),(537,790),color=(.18,.30,.48),width=1)
    p.insert_text((58,815),c['safe'],fontsize=8.5,color=(.48,.61,.78),fontname=font)

def build(lang,code,d,source):
    c=COPY[lang]; chapters={x['id']:x for x in d['chapters']}; lessons={x['id']:x for x in d['lessons']}; out=fitz.open()
    for n in range(149):
        raw=source[n].get_text('text'); lm=re.search(r'LAB\s+L(\d{2})',raw); cm=re.search(r'CHAPTER\s+(\d{2})',raw)
        lab=f'L{lm.group(1)}' if lm else None; ch=int(cm.group(1)) if cm else None
        if n==0: add(out,c['title'],c['name'],[(c['subtitle'],c['intro']),('12 CHAPTERS / 36 HANDS-ON LABS','GitMaster Academy · 2026')],lang)
        elif lab:
            x=lessons[lab]; add(out,f"{c['lab']} {lab} / {x['title'][lang]}",f"{c['chapter']} {x['chapter']:02d}",[(c['mission'],x['description'][lang]),(c['approach'],c['lab_approach']),(c['why'],c['lab_why'].format(goal=x['goal'])) ,(c['check'],c['lab_check']),(c['note'],c['intro'])],lang)
        elif ch and 5<=n<=64:
            x=chapters[ch]
            if 'SELF-CHECK' in raw: add(out,f"{c['self']} · {x['title'][lang]}",f"{c['chapter']} {ch:02d}",[(c['self'],f"Can you explain the difference between the working tree, staging area, local commits, and remote state in {x['title'][lang]}?"),(c['check'],c['answer'])],lang)
            else: add(out,x['title'][lang],f"{c['chapter']} {ch:02d}",[(c['intro'],c['chapter_body']),(c['approach'],c['intro']),(c['why'],c['safe'])],lang)
        elif 1<=n<=3: add(out,[c['title'],c['toc'],f"{c['title']} / Study plan"][n-1],'START HERE',[(c['intro'],c['intro']),(c['check'],c['safe'])],lang)
        elif 90<=n<=94: add(out,f"{c['appendix']} · {c['options']}",f"{c['options']} / {n+1}",[(c['command'],'git status · git diff · git add · git commit · git switch · git merge · git restore · git revert · git reset · git reflog'),(c['why'],c['intro']),(c['check'],c['answer'])],lang)
        elif 117<=n<=132: add(out,f"{c['team']} · {n-117:02d}",c['team'],[(c['team_intro'],c['team_body']),(c['check'],c['answer']),(c['note'],c['safe'])],lang)
        elif n>=145: add(out,f"{c['orientation']} · {n-144:02d}",c['orientation'],[(c['intro'],c['orientation_body']),(c['command'],'edit → git status → git diff → git add → git commit → git push → pull request → review → merge → tag'),(c['check'],c['answer'])],lang)
        else: add(out,f"{c['title']} · {n+1:03d}",c['appendix'],[(c['intro'],c['intro']),(c['command'],'git status · git diff · git log · git branch · git switch · git merge · git restore · git revert · git reset · git reflog'),(c['note'],c['safe'])],lang)
    out.set_metadata({'title':c['title'],'author':'GitMaster Academy','subject':f"{c['name']} ChatGPT translated companion workbook",'keywords':f"Git, GitHub, {c['name']}, ChatGPT translation"})
    path=ROOT/f'ebook/GitMaster_Academy_Practical_Git_{code}.pdf'; out.save(path,garbage=4,deflate=True); out.close(); return path

if __name__=='__main__':
    d=data(); src=fitz.open(SOURCE)
    for lang,code in [('en','EN'),('ja','JA'),('zh','ZH')]: print(build(lang,code,d,src))
    src.close()
