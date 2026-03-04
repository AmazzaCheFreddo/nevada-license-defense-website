/**
 * Shorten all filenames in public/ to under 75 characters.
 * Writes public/rename-map.json (old path -> new path) for updating references.
 */
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const MAX_LEN = 74; // filename (basename) must be <= 74 so total < 75

function walk(dir, fileList = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      walk(full, fileList);
    } else {
      fileList.push(full);
    }
  }
  return fileList;
}

function toWebPath(fullPath) {
  const rel = path.relative(PUBLIC_DIR, fullPath).replace(/\\/g, '/');
  return '/' + rel;
}

const allFiles = walk(PUBLIC_DIR);
const renames = []; // { oldFull, newFull, oldWeb, newWeb }
const dirCounters = new Map(); // dir -> Set of used base names for collision check

for (const fullPath of allFiles) {
  const basename = path.basename(fullPath);
  if (basename.length <= MAX_LEN) continue;

  const dir = path.dirname(fullPath);
  const ext = path.extname(basename);
  let stem = basename.slice(0, -ext.length);

  // Target: stem + ext <= MAX_LEN. So stem <= MAX_LEN - ext.length
  const maxStemLen = MAX_LEN - ext.length;
  if (!dirCounters.has(dir)) dirCounters.set(dir, new Set());
  const used = dirCounters.get(dir);

  let newStem = stem.slice(0, maxStemLen);
  // Ensure uniqueness
  let suffix = 0;
  let candidate = newStem + ext;
  while (used.has(candidate)) {
    const suffixStr = '-' + (suffix++).toString(36);
    newStem = stem.slice(0, maxStemLen - suffixStr.length) + suffixStr;
    candidate = newStem + ext;
  }
  used.add(candidate);

  const newFull = path.join(dir, candidate);
  renames.push({
    oldFull: fullPath,
    newFull,
    oldWeb: toWebPath(fullPath),
    newWeb: toWebPath(newFull),
  });
}

// Apply renames
for (const r of renames) {
  fs.renameSync(r.oldFull, r.newFull);
  console.log(r.oldWeb, '->', r.newWeb);
}

// Write mapping for reference updates (old web path -> new web path)
const map = {};
for (const r of renames) {
  map[r.oldWeb] = r.newWeb;
}
fs.writeFileSync(
  path.join(__dirname, 'rename-map.json'),
  JSON.stringify(map, null, 2),
  'utf8'
);

console.log('\nRenamed', renames.length, 'files. Mapping written to scripts/rename-map.json');
