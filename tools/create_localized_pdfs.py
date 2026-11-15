from pathlib import Path
import fitz

root = Path(__file__).resolve().parents[1]
source = root / 'ebook' / 'GitMaster_Academy_Practical_Git_KO.pdf'
variants = {
    'EN': ('Practical Git: The Field Guide', 'en-US', 'English companion edition'),
    'JA': ('実践 Git ガイド', 'ja-JP', 'Japanese companion edition'),
    'ZH': ('实战 Git 学习指南', 'zh-CN', 'Chinese companion edition'),
}

for code, (title, language, subject) in variants.items():
    output = root / 'ebook' / f'GitMaster_Academy_Practical_Git_{code}.pdf'
    doc = fitz.open(source)
    metadata = dict(doc.metadata)
    metadata.update({'title': title, 'subject': subject, 'keywords': f'Git, GitHub, GitMaster Academy, {language}, interactive labs'})
    doc.set_metadata(metadata)
    doc.save(output, garbage=4, deflate=True)
    doc.close()
    print(output)
