const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const XLSXNode = require('xlsx');

const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8')
  .replace(/<script src="https:\/\/cdn\.sheetjs\.com[^"]*"><\/script>/, '');
const fileBuf = fs.readFileSync(path.join(__dirname, '../data/Offered_Course_Report.xlsx'));

const dom = new JSDOM(html, { runScripts: 'outside-only', url: 'http://localhost/index.html' });
const { window } = dom;
window.XLSX = XLSXNode;
window.fetch = async () => ({
  ok: true, status: 200, headers: { get: () => null },
  arrayBuffer: async () => fileBuf.buffer.slice(fileBuf.byteOffset, fileBuf.byteOffset + fileBuf.byteLength),
});

const scriptEl = [...window.document.querySelectorAll('script')].find(s => !s.src);
const code = scriptEl.textContent + '\nwindow.STATE=STATE;';
new window.Function(code).call(window);

setTimeout(() => {
  const STATE = window.STATE;
  for (const n of ['AJMERI NUSRAT SHOMA', 'DR. SANJIB BARUA', 'NUSHRAT-E-HOQUE']) {
    const recs = STATE.idx.faculty.get(n);
    console.log(n, '->', recs ? recs.length + ' sessions, sample courseCode=' + recs[0].courseCode + ' section=' + recs[0].section : 'NOT FOUND');
  }
  const shared = STATE.records.filter(r => r.courseCode === 'ARC1114' && r.section === 'D1');
  console.log('ARC1114/D1 rows facultyList:', shared.map(r => r.facultyList));
}, 300);
