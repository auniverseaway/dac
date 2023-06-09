import { makeLink, makeUl, makeOl, makeBr, makeBlock } from './index.js';

const { getLibs } = await import('../../../../scripts/utils.js');
const { createTag } = await import(`${getLibs()}/utils/utils.js`);
const { html, render } = await import(`${getLibs()}/deps/htm-preact.js`);

function expand(e) {
  const group = e.target.closest('.da-button-group');
  group.classList.toggle('expand');
}


function Toolbar() {
  return html`
    <div class=da-toolbar>
      <div class=da-button-group>
        <button
          data-label="Heading"
          aria-label="Add heading"
          onClick=${expand}
          class="da-editor-tool da-editor-tool-h"/>
        <div class=da-button-pallette-heading>
          <button
            onClick=${expand}
            aria-label="Add heading 1"
            data-wysihtml-command="formatBlock"
            data-wysihtml-command-value="h1"
            class="da-editor-tool da-editor-tool-h1"/>
          <button
            onClick=${expand}
            aria-label="Add heading 2"
            data-wysihtml-command="formatBlock"
            data-wysihtml-command-value="h2"
            class="da-editor-tool da-editor-tool-h2"/>
          <button
            onClick=${expand}
            aria-label="Add heading 3"
            data-wysihtml-command="formatBlock"
            data-wysihtml-command-value="h3"
            class="da-editor-tool da-editor-tool-h3"/>
          <button
            onClick=${expand}
            aria-label="Add heading 4"
            data-wysihtml-command="formatBlock"
            data-wysihtml-command-value="h4"
            class="da-editor-tool da-editor-tool-h4"/>
          <button
            onClick=${expand}
            aria-label="Add heading 5"
            data-wysihtml-command="formatBlock"
            data-wysihtml-command-value="h5"
            class="da-editor-tool da-editor-tool-h5"/>
          <button
            onClick=${expand}
            aria-label="Add heading 6"
            data-wysihtml-command="formatBlock"
            data-wysihtml-command-value="h6"
            class="da-editor-tool da-editor-tool-h6"/>
        </div>
      </div>
      <button
        data-label="Bold"
        aria-label="Make bold"
        data-wysihtml-command="bold"
        title="CTRL+B"
        class="da-editor-tool da-editor-tool-b"/>
      <button
        data-label="Italic"
        aria-label="Make italic"
        data-wysihtml-command="italic"
        title="CTRL+I"
        class="da-editor-tool da-editor-tool-i"/>
      <button
        data-label="Unorderd list"
        aria-label="Add unordered list"
        data-wysihtml-command="insertUnorderedList"
        class="da-editor-tool da-editor-tool-ul"/>
      <button
        data-label="Orderd list"
        aria-label="Add ordered list"
        data-wysihtml-command="insertOrderedList"
        class="da-editor-tool da-editor-tool-ol"/>
      <hr/>
      <div class=da-button-group>
        <button
          data-label="Link"
          aria-label="Add link"
          data-wysihtml-command="createLink"
          class="da-editor-tool da-editor-tool-a"/>
        <button
          data-label="Image"
          aria-label="Add image"
          data-wysihtml-command="insertImage"
          class="da-editor-tool da-editor-tool-img"/>
      </div>
      <hr/>
      <button
        data-label="Section break"
        aria-label="Add section break"
        onClick=${makeBr}
        class="da-editor-tool da-editor-tool-hr"/>
      <button
        data-label="Block"
        aria-label="Add empty block"
        onClick=${makeBlock}
        class="da-editor-tool da-editor-tool-block"/>
      <hr/>
      <button
        data-label="Libraries"
        aria-label="Open library"
        class="da-editor-tool da-editor-tool-library"/>
    </div>
    <div class=da-toolbar-extras>
      <div class="da-button-pallette-link" data-wysihtml-dialog="insertImage" style="display: none;">
        <input class="da-pallette-input" data-wysihtml-dialog-field="src" value="http://"/>
        <button class="da-pallette-button da-pallette-button-ok" data-wysihtml-dialog-action="save">OK</button>
        <button data-wysihtml-dialog-action="cancel">Cancel</button>
      </div>

      <div
        class="da-button-pallette-link"
        data-wysihtml-dialog="createLink"
        style="display: none;">
        <input class=da-pallette-input data-wysihtml-dialog-field="href" placeholder="https://hlx.page"/>
        <button class="da-pallette-button da-pallette-button-ok" data-wysihtml-dialog-action="save">OK</button>
        <button class=da-pallette-button data-wysihtml-dialog-action="cancel">Cancel</button>
        <button class="da-pallette-button da-pallette-button-destroy" data-wysihtml-command="removeLink">Remove</button>
      </div>

      <div class="da-button-pallette-link" data-wysihtml-hiddentools="table" style="display: none;">
        <button class="da-pallette-button da-pallette-button-split" data-wysihtml-command="mergeTableCells">Split</button>
        <button data-wysihtml-command="addTableCells" data-wysihtml-command-value="above">row-before</button>
        <button data-wysihtml-command="addTableCells" data-wysihtml-command-value="below">row-after</button>
        <button data-wysihtml-command="addTableCells" data-wysihtml-command-value="before">col-before</button>
        <button data-wysihtml-command="addTableCells" data-wysihtml-command-value="after">col-after</button>
      
        <button data-wysihtml-command="deleteTableCells" data-wysihtml-command-value="row">delete row</button>
        <button data-wysihtml-command="deleteTableCells" data-wysihtml-command-value="column">delete col</button>
      </div>
    </div>
  `;
}

export default async function init() {
  const el = createTag('div', { class: 'da-editor-tools' });
  render(html`<${Toolbar} />`, el);



  return el;
}
