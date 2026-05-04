const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./pages').concat(walk('./components'));
let h1Data = [];
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let h1Count = 0;
  const regex = /<h1[\s\S]*?<\/h1>/gi;
  let match;
  while ((match = regex.exec(content)) !== null) {
    h1Count++;
  }
  if (h1Count > 1) {
    console.log(`Multiple H1s in ${file}: ${h1Count}`);
  }
});
