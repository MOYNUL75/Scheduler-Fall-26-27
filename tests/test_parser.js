// Fast, DOM-free regression test for the parsing rules that live inside index.html's
// <script> block (findHeaderRow, parseFacultyList, parseTimeToMinutes, stripSectionSuffix).
// Re-implemented here deliberately (not imported) so this test still catches drift if
// someone edits the logic in index.html without keeping this file in sync -- run both
// this file AND test_dom.js (which executes the real index.html code) before every deploy.
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const buf = fs.readFileSync(path.join(__dirname, '../data/Offered_Course_Report.xlsx'));
const wb = XLSX.read(buf, { type: 'buffer' });
const ws = wb.Sheets[wb.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, defval: '' });

function findHeaderRow(rows) {
  for (let i = 0; i < Math.min(rows.length, 30); i++) {
    const row = rows[i].map(c => String(c).trim().toLowerCase().replace(/\s+/g, ' '));
    if (row.includes('class id') && row.includes('faculty') && row.includes('section')) return i;
  }
  return -1;
}
function parseFacultyList(raw) {
  const s = String(raw || '').trim();
  if (!s || s === '-') return [];
  const matches = [...s.matchAll(/\[([^\]]+)\]/g)].map(m => m[1].trim().replace(/\s+/g, ' ')).filter(Boolean);
  if (matches.length) return matches;
  return [s.replace(/\s+/g, ' ')];
}
function parseTimeToMinutes(t) {
  const s = String(t || '').trim();
  const m = s.match(/^(\d{1,2}):(\d{2})\s*([AP]M)$/i);
  if (!m) return null;
  let h = parseInt(m[1], 10); const min = parseInt(m[2], 10); const ap = m[3].toUpperCase();
  if (ap === 'PM' && h !== 12) h += 12;
  if (ap === 'AM' && h === 12) h = 0;
  return h * 60 + min;
}

let failures = 0;
function assert(cond, msg) { if (!cond) { failures++; console.error('FAIL:', msg); } else { console.log('ok  :', msg); } }

const headerIdx = findHeaderRow(rows);
assert(headerIdx === 0, 'header row auto-detected at index 0');

const header = rows[headerIdx].map(c => String(c).trim());
const colMap = {}; header.forEach((h, i) => { if (h) colMap[h] = i; });
const get = (row, name) => String(row[colMap[name]] ?? '').trim();

let total = 0, scheduled = 0, timeParseFailures = 0;
const facultySet = new Set();
for (let i = headerIdx + 1; i < rows.length; i++) {
  const r = rows[i];
  if (!r || r.every(c => String(c).trim() === '')) continue;
  const classId = get(r, 'Class ID'), courseCode = get(r, 'Course Code');
  if (!classId || !courseCode) continue;
  total++;
  const day = get(r, 'Day'), st = get(r, 'Start Time'), et = get(r, 'End Time');
  const sm = parseTimeToMinutes(st), em = parseTimeToMinutes(et);
  if (day && sm !== null && em !== null) scheduled++;
  if (st && sm === null) timeParseFailures++;
  parseFacultyList(get(r, 'Faculty')).forEach(n => facultySet.add(n));
}

assert(total === 4402, 'total structural rows parsed == 4402 (was true for the snapshot this app ships with)');
assert(scheduled === 4109, 'scheduled (day+time present) rows == 4109');
assert(timeParseFailures === 0, 'zero unparseable time strings');
assert(facultySet.size === 434, 'distinct individual instructors == 434 after splitting co-taught cells');

// co-instructor split sanity: this exact row is known (from manual inspection) to list 3 names
const known = rows.find(r => get(r, 'Course Code') === 'ARC1114' && get(r, 'Section') === 'D1');
assert(known && parseFacultyList(get(known, 'Faculty')).length === 3, 'known co-taught ARC1114/D1 row splits into 3 instructors');

console.log('\n' + (failures ? failures + ' FAILURE(S)' : 'ALL PARSER CHECKS PASSED'));
process.exit(failures ? 1 : 0);
