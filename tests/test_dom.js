const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const XLSXNode = require('xlsx');

const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8')
  .replace(/<script src="https:\/\/cdn\.sheetjs\.com[^"]*"><\/script>/, ''); // stub out CDN load; we inject XLSX manually

const fileBuf = fs.readFileSync(path.join(__dirname, '../data/Offered_Course_Report.xlsx'));

const dom = new JSDOM(html, { runScripts: 'outside-only', url: 'http://localhost/index.html' });
const { window } = dom;

window.XLSX = XLSXNode; // same API surface (read, utils.sheet_to_json) as the browser standalone build
window.fetch = async (url) => {
  if (!url.includes('Offered_Course_Report.xlsx')) throw new Error('unexpected fetch ' + url);
  return {
    ok: true,
    status: 200,
    headers: { get: (h) => (h === 'last-modified' ? new Date().toUTCString() : null) },
    arrayBuffer: async () => fileBuf.buffer.slice(fileBuf.byteOffset, fileBuf.byteOffset + fileBuf.byteLength),
  };
};
window.console = console;

const scriptEl = [...window.document.querySelectorAll('script')].find(s => !s.src);
// top-level const/let in a classic script never become window properties (true in real browsers too) -
// expose the handful of internals this test needs to inspect, without touching the shipped file.
const code = scriptEl.textContent + '\nwindow.STATE=STATE; window.searchEntities=searchEntities; window.selectEntity=selectEntity;';
const runner = new window.Function(code);

(async () => {
  try {
    runner.call(window);
    // boot() is async and fires at the end of the script; wait a tick for it to resolve
    await new Promise(r => setTimeout(r, 300));

    const STATE = window.STATE;
    console.log('records:', STATE.records.length);
    console.log('faculty entities:', STATE.searchIndex.filter(e=>e.type==='faculty').length);
    console.log('section(cohort) entities:', STATE.searchIndex.filter(e=>e.type==='section').length);
    console.log('course entities:', STATE.searchIndex.filter(e=>e.type==='course').length);
    console.log('room entities:', STATE.searchIndex.filter(e=>e.type==='room').length);
    console.log('banner html (should be empty on success):', JSON.stringify(window.document.getElementById('banner').innerHTML));

    // ---- exercise search ----
    const r1 = window.searchEntities('mashiour');
    console.log('\nsearch "mashiour" ->', r1.map(e=>e.type+':'+e.label));

    const r2 = window.searchEntities('b1');
    console.log('search "b1" ->', r2.slice(0,5).map(e=>e.type+':'+e.label+' ('+e.sub+')'));

    const r3 = window.searchEntities('CSC1103');
    console.log('search "CSC1103" ->', r3.map(e=>e.type+':'+e.label));

    const r4 = window.searchEntities('DS0203');
    console.log('search "DS0203" ->', r4.map(e=>e.type+':'+e.label));

    // ---- exercise single-entity render ----
    const facEnt = r1[0];
    window.selectEntity(facEnt, 'A');
    console.log('\nAfter selecting faculty', facEnt.label);
    console.log('gridStart/End:', STATE.gridStart, STATE.gridEnd);
    console.log('day columns populated:', [...window.document.querySelectorAll('.daycol')].map(c => c.getAttribute('data-day')+':'+c.children.length).join(', '));
    console.log('table rows:', window.document.querySelectorAll('#schedTableBody tr').length);
    console.log('mainArea display:', window.document.getElementById('mainArea').style.display);

    // ---- exercise compare render ----
    window.STATE.compareOn = true;
    const secEnt = window.STATE.searchIndex.find(e=>e.type==='section' && e.id==='B1');
    window.selectEntity(secEnt, 'B');
    console.log('\nAfter compare', facEnt.label, 'vs', secEnt.label);
    console.log('gaps panel non-empty:', window.document.getElementById('gapsPanel').innerHTML.length > 50);
    console.log('legend html snippet:', window.document.querySelector('.legend').outerHTML.slice(0,160));

    // ---- exercise course view (this is the one that mirrors the reference image: many sections of one course) ----
    window.STATE.compareOn = false;
    const courseEnt = window.STATE.searchIndex.find(e=>e.id==='CSC1104');
    window.selectEntity(courseEnt, 'A');
    console.log('\nCourse view CSC1104: blocks in Sunday col:', window.document.querySelector('.daycol[data-day="Sunday"]').children.length);

    // ---- detail popover ----
    const anyEv = window.document.querySelector('.ev');
    if (anyEv) { anyEv.dispatchEvent(new window.MouseEvent('click', {bubbles:true})); }
    console.log('overlay open after click:', window.document.getElementById('overlay').classList.contains('open'));
    console.log('detail box has content:', window.document.getElementById('detailBox').innerHTML.length > 50);

    // ---- filter interaction sanity ----
    const cb = window.document.querySelector('input[data-fgroup="status"][value="Freshman"]');
    console.log('\nFreshman checkbox found & checked by default:', !!cb, cb && cb.checked);

    console.log('\nWARNINGS collected during parse:', STATE.warnings.length);
    console.log('\nALL CHECKS RAN WITHOUT THROWING.');
  } catch (e) {
    console.error('TEST FAILED:', e);
    process.exit(1);
  }
})();
