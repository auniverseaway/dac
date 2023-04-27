import { origin } from '../browse/state/index.js';
import getTitle from './title/view.js';
import getToolbar from './toolbar/view.js';
import { getTable } from './utils.js';

const { getLibs } = await import('../../../scripts/utils.js');
const { createTag, loadScript } = await import(`${getLibs()}/utils/utils.js`);

async function getContent(path) {
  try {
    const resp = await fetch(`${origin}${path}`);
    if (resp.status !== 200) return '';
    const html = await resp.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const sections = doc.body.querySelectorAll('main > div');
    sections.forEach((section) => {
      const blocks = section.querySelectorAll('div[class]');
      blocks.forEach((block) => {
        const table = getTable(block);
        block.parentElement.replaceChild(table, block);
      });
    });

    if (sections.length === 0) return doc.body.querySelector('main').innerHTML;
    return [...sections];
  } catch {
    return '';
  }
}

export default async function init(el) {
  const title = await getTitle();

  const toolbar = await getToolbar(el);

  const editor = createTag('div', { class: 'da-editor', contenteditable: true }, '<p>write something</p>');
  const wrapper = createTag('div', { class: 'da-editor-wrapper' }, [ toolbar, editor ]);

  const meta = createTag('div', { class: 'da-meta' });

  editor.addEventListener('input', (e) => {
    console.log(e);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'b' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      const sel = document.getSelection();
      const range = sel.getRangeAt(0);
      const strong = document.createElement('strong');
      range.surroundContents(strong);
      
    }
  });

  document.addEventListener("selectionchange", () => {
    
    // console.log(anchorNode);
    // if (anchorNode.nodeName === 'DIV') {
    //   const p = createTag('p', {}, anchorNode.innerHTML);
    //   anchorNode.parentElement.replace(p, anchorNode);
    // }
  });

  // await loadScript('/blocks/edit/deps/wysihtml/wysihtml.js');
  // await loadScript('/blocks/edit/deps/wysihtml/wysihtml.all-commands.js');
  // await loadScript('/blocks/edit/deps/wysihtml/wysihtml.table_editing.js');
  // await loadScript('/blocks/edit/deps/wysihtml/wysihtml.toolbar.js');
  // await loadScript('/blocks/edit/deps/wysihtml/advanced_and_extended.js');

  // const opts = {
  //   toolbar,
  //   parserRules:  wysihtmlParserRules,
  //   useLineBreaks: false
  // };
  // new wysihtml.Editor(editor, opts);

  // const dom = await getContent(window.location.hash.replace('#', ''));
  // editor.append(...dom);

  el.append(title, wrapper, meta);
}
