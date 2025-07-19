const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const baseDir = path.resolve(__dirname, '../src');
const pagesDir = path.join(baseDir, 'pages');

function walkDir(dir, ext, files=[]) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(dirent => {
    const res = path.join(dir, dirent.name);
    if (dirent.isDirectory()) {
      walkDir(res, ext, files);
    } else if (res.endsWith(ext)) {
      files.push(res);
    }
  });
  return files;
}

function checkFileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (e) {
    return false;
  }
}


function verifyHtml(file) {
  const html = fs.readFileSync(file, 'utf8');
  const dir = path.dirname(file);
  const missing = [];
  const $ = cheerio.load(html);

  $('[href], [src]').each((_, el) => {
    const value = $(el).attr('href') || $(el).attr('src');
    if (!value) return;
    if (/^(https?:|mailto:|tel:)/.test(value)) return;
    if (value.startsWith('/') && value.endsWith('.html')) return;
    const absPath = value.startsWith('/') ? (() => {
      const cleaned = value.replace(/^\//, '');
      return cleaned.startsWith('images/') || cleaned.startsWith('assets/')
        ? path.join(baseDir, 'assets', cleaned.replace(/^assets\//, ''))
        : path.join(baseDir, cleaned);
    })() : path.resolve(dir, value);
    if (!checkFileExists(absPath)) missing.push(value);
  });

  $('script').each((_, el) => {
    const content = $(el).html() || '';
    const fetchRegex = /fetch\(['"]([^'\"]+)['"]\)/g;
    let m;
    while ((m = fetchRegex.exec(content)) !== null) {
      const value = m[1];
      if (/^https?:/.test(value)) continue;
      const absPath = value.startsWith('/') ? (() => {
        const cleaned = value.replace(/^\//, '');
        if (cleaned.startsWith('images/') || cleaned.startsWith('assets/')) {
          return path.join(baseDir, 'assets', cleaned.replace(/^assets\//, ''));
        }
        return path.join(baseDir, cleaned);
      })() : path.resolve(dir, value);
      if (!checkFileExists(absPath)) missing.push(value);
    }
  });

  return missing;
}
const htmlFiles = walkDir(pagesDir, '.html');
let failed = false;
htmlFiles.forEach(file => {
  const missing = verifyHtml(file);
  if (missing.length) {
    failed = true;
    console.error(`Missing paths in ${path.relative(baseDir, file)}:`);
    missing.forEach(m => console.error(`  - ${m}`));
  }
});

if (failed) {
  console.error('Some files contain invalid references.');
  process.exit(1);
} else {
  console.log('All page references look valid.');
}
