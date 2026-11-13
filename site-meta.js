/* GitMaster promotional banner: label + link, independent of simulator and user progress. */
(function(){
'use strict';
const copy={
ko:{label:'',line:'대화가 이어지는 하루, 가족의 안심까지',cta:'키노라 만나보기',alt:'KINORA 여섯 AI 반려친구',aria:'KINORA 여섯 반려친구와 가족 안부 서비스 소개, 새 탭에서 열기',site:'ko'},
en:{label:'',line:'Everyday conversations, peace of mind for family',cta:'Explore KINORA',alt:'KINORA six friendly companions',aria:'Explore KINORA companions and family reassurance in a new tab',site:'en'},
ja:{label:'',line:'会話がつなぐ毎日、家族に安心を',cta:'KINORAを見る',alt:'KINORAの6人の仲間',aria:'KINORAのサービスを見る（別タブ）',site:'ja'},
zh:{label:'',line:'温暖对话每一天，家人多一份安心',cta:'认识 KINORA',alt:'KINORA六位AI伙伴',aria:'了解 KINORA，使用新标签页打开',site:'zh-Hans'}
};
const meta={
ko:{title:'GitMaster Academy | 실습으로 배우는 Git·GitHub 협업',description:'Git 기초부터 36개 실습, PR 리뷰 및 승인까지 10개 협업 미션과 PDF 전자책으로 배우세요.',og:'ko_KR'},
en:{title:'GitMaster Academy | Learn Git & GitHub by Doing',description:'Learn Git with 36 interactive labs, 10 team PR review missions, animations and a PDF textbook.',og:'en_US'},
ja:{title:'GitMaster Academy | 実践で学ぶGit・GitHub共同開発',description:'Git初心者向けの36演習、PRレビューや承認を学ぶ10の協業ミッション、アニメーションとPDF教材。',og:'ja_JP'},
zh:{title:'GitMaster Academy | 通过实践学习Git和GitHub协作',description:'通过36个Git练习、10个PR团队任务、动画教程与PDF电子书从基础学习Git。',og:'zh_CN'}
};
function setMeta(selector,value){const elem=document.querySelector(selector);if(elem)elem.setAttribute('content',value);}
function update(lang){const l=copy[lang]||copy.ko;const m=meta[lang]||meta.ko;const a=document.getElementById('kinora-top-ad');if(a){
a.href='https://www.kinora.date/?lang='+encodeURIComponent(l.site);
a.setAttribute('aria-label',l.aria);
const kicker=a.querySelector('.kinora-ad-kicker');if(kicker)kicker.innerHTML='<b>KINORA</b>';
const line=a.querySelector('.kinora-ad-line');if(line)line.textContent=l.line;
const cta=a.querySelector('.kinora-ad-link');if(cta)cta.textContent=l.cta+' ↗';
const img=a.querySelector('img');if(img)img.alt=l.alt;
}
setMeta('meta[name="description"]',m.description);
setMeta('meta[property="og:title"]',m.title);
setMeta('meta[property="og:description"]',m.description);
setMeta('meta[property="og:locale"]',m.og);
setMeta('meta[name="twitter:title"]',m.title);
setMeta('meta[name="twitter:description"]',m.description);
// Social crawlers read the built static HTML. A deploy script makes all OG URLs absolute.
}
window.GitMasterPromo={update};
})();
