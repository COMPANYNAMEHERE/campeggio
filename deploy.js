const { execSync } = require('child_process');

function run(cmd) {
  execSync(cmd, { stdio: 'inherit' });
}

function isClean() {
  try {
    execSync('git diff-index --quiet HEAD --');
    return true;
  } catch (e) {
    return false;
  }
}

if (!isClean()) {
  console.error('Working tree is dirty. Commit or stash changes first.');
  process.exit(1);
}

try {
  run('git subtree push --prefix src origin gh-pages');
} catch (e) {
  console.error('Deployment failed.');
  process.exit(1);
}
